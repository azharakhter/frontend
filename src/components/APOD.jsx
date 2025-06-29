import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, subDays, isToday } from 'date-fns';
import {
    Box,
    Typography,
    TextField,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    IconButton,
    useMediaQuery,
    useTheme,
    Button
} from '@mui/material';
import {
    ChevronLeft,
    ChevronRight,
    CalendarToday,
    Copyright,
    Image,
    VideoLibrary,
    SatelliteAlt,
    Refresh
} from '@mui/icons-material';

const APOD = () => {
    const [apod, setApod] = useState({});
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchAPOD = async (selectedDate) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}apod/getdata?date=${selectedDate}`);
            if (response.status == 200 && response.data) {
                setApod(response.data.data);
            } else {
                throw new Error('No data received');
            }
        } catch (err) {
            console.log('response', err);
            setError('Failed to fetch APOD. Please try another date.');
            setApod(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAPOD(date);
    }, [date]);

    const handlePrevDay = () => {
        const prevDay = subDays(new Date(date), 1);
        setDate(format(prevDay, 'yyyy-MM-dd'));
    };

    const handleNextDay = () => {
        const today = new Date();
        if (date < format(today, 'yyyy-MM-dd')) {
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);
            setDate(format(nextDay, 'yyyy-MM-dd'));
        }
    };

    const handleRefresh = () => {
        fetchAPOD(date);
    };

    return (
        <Box sx={{
            maxWidth: '1200px',
            mx: 'auto',
            p: isMobile ? 2 : 4,
            backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9))',
            borderRadius: 2,
            minHeight: '70vh'
        }}>
            <Stack
                direction={isMobile ? 'column' : 'row'}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                mb={4}
            >
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}
                >
                    Astronomy Picture of the Day
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton
                        onClick={handlePrevDay}
                        disabled={loading}
                        color="primary"
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' },
                            '&:disabled': { opacity: 0.5 }
                        }}
                    >
                        <ChevronLeft sx={{ color: 'common.white' }} />
                    </IconButton>

                    <TextField
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputProps={{
                            startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />,
                            sx: {
                                color: 'text.primary',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'divider',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'primary.main',
                                },
                            }
                        }}
                        inputProps={{
                            max: format(new Date(), 'yyyy-MM-dd'),
                            sx: { py: 1 }
                        }}
                        size="small"
                    />

                    <IconButton
                        onClick={handleNextDay}
                        disabled={date >= format(new Date(), 'yyyy-MM-dd') || loading}
                        color="primary"
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' },
                            '&:disabled': { opacity: 0.5 }
                        }}
                    >
                        <ChevronRight sx={{ color: 'common.white' }} />
                    </IconButton>

                    <IconButton
                        onClick={handleRefresh}
                        color="primary"
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' },
                            '&:disabled': { opacity: 0.5 }
                        }}
                    >
                        <Refresh sx={{ color: 'common.white' }} />
                    </IconButton>
                </Stack>
            </Stack>

            {loading ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '500px',
                    textAlign: 'center'
                }}>
                    <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main', mb: 3 }} />
                    <Typography variant="h6" color="text.secondary">
                        Loading cosmic wonder for {date}...
                    </Typography>
                </Box>
            ) : error ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '500px',
                    textAlign: 'center'
                }}>
                    <SatelliteAlt sx={{ fontSize: 80, color: 'error.main', mb: 3 }} />
                    <Alert
                        severity="error"
                        sx={{
                            mb: 4,
                            backgroundColor: 'error.dark',
                            color: 'error.contrastText',
                            width: '100%',
                            maxWidth: '600px'
                        }}
                    >
                        {error}
                    </Alert>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            onClick={() => setDate(format(new Date(), 'yyyy-MM-dd'))}
                            startIcon={<CalendarToday />}
                        >
                            Today's Image
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleRefresh}
                            startIcon={<Refresh />}
                        >
                            Retry
                        </Button>
                    </Stack>
                </Box>
            ) : apod ? (
                <Card sx={{
                    backgroundColor: 'background.paper',
                    boxShadow: theme.shadows[10],
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[16]
                    }
                }}>
                    {apod.media_type === 'image' ? (
                        <CardMedia
                            component="img"
                            image={apod.hdurl}
                            alt={apod.title}
                            sx={{
                                height: { xs: 300, sm: 450, md: 600 },
                                objectFit: 'cover',
                                backgroundImage: 'linear-gradient(to bottom right, rgba(25, 118, 210, 0.1), rgba(156, 39, 176, 0.1))'
                            }}
                        />
                    ) : (
                        <Box sx={{
                            position: 'relative',
                            pt: '56.25%',
                            overflow: 'hidden',
                            backgroundColor: 'background.default'
                        }}>
                            <iframe
                                src={apod.url}
                                title={apod.title}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 'none'
                                }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </Box>
                    )}

                    <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                        <Stack direction="row" spacing={1} mb={2}>
                            <Chip
                                icon={apod.media_type === 'image' ? <Image /> : <VideoLibrary />}
                                label={apod.media_type === 'image' ? 'Image' : 'Video'}
                                color="primary"
                                size="small"
                            />
                            <Chip
                                icon={<Copyright />}
                                label={apod.copyright || 'Public Domain'}
                                variant="outlined"
                                size="small"
                                sx={{ color: 'text.secondary' }}
                            />
                        </Stack>

                        <Typography
                            variant="h4"
                            component="h3"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                color: 'text.primary'
                            }}
                        >
                            {apod.title}
                        </Typography>

                        <Typography
                            variant="body1"
                            paragraph
                            sx={{
                                color: 'text.secondary',
                                mb: 4,
                                lineHeight: 1.7
                            }}
                        >
                            {apod.explanation}
                        </Typography>

                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.disabled',
                                    fontStyle: 'italic'
                                }}
                            >
                                Date: {apod.date}
                            </Typography>
                            {!isToday(new Date(date)) && (
                                <Button
                                    size="small"
                                    onClick={() => setDate(format(new Date(), 'yyyy-MM-dd'))}
                                    startIcon={<CalendarToday />}
                                >
                                    View Today's
                                </Button>
                            )}
                        </Stack>
                    </CardContent>
                </Card>
            ) : (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '500px',
                    textAlign: 'center',
                    p: 4
                }}>
                    <SatelliteAlt sx={{
                        fontSize: 80,
                        color: 'text.disabled',
                        mb: 3
                    }} />
                    <Typography variant="h5" color="text.primary" gutterBottom>
                        No Cosmic Content Found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Select a different date to explore NASA's Astronomy Picture of the Day.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setDate(format(new Date(), 'yyyy-MM-dd'))}
                        startIcon={<CalendarToday />}
                    >
                        View Today's Image
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default APOD;