import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Paper,
    Grid,
    Select,
    MenuItem,
    Chip,
    useTheme,
    useMediaQuery,
    Stack,
    Container
} from '@mui/material';
import {
    SatelliteAlt as SatelliteAltIcon,
    CameraAlt as CameraAltIcon,
    DateRange as DateRangeIcon,
    Search as SearchIcon,
    Refresh as RefreshIcon,
    CheckCircle as CheckCircleIcon,
    Dangerous as DangerousIcon
} from '@mui/icons-material';
import DatePicker from './DatePicker';
import ImageGallery from './ImageGallery';

const MarsRover = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [filters, setFilters] = useState({
        rover: 'curiosity',
        camera: 'all',
        earth_date: new Date().toISOString().split('T')[0]
    });

    const CAMERAS = {
        curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
        opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
        spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
    };

    const ROVER_INFO = {
        curiosity: {
            name: 'Curiosity',
            landing: '2012-08-06',
            max_date: new Date().toISOString().split('T')[0],
            total_photos: 'Over 1 million',
            status: 'active'
        },
        opportunity: {
            name: 'Opportunity',
            landing: '2004-01-25',
            max_date: '2018-06-11',
            total_photos: 'Over 228,000',
            status: 'complete'
        },
        spirit: {
            name: 'Spirit',
            landing: '2004-01-04',
            max_date: '2010-03-22',
            total_photos: 'Over 124,000',
            status: 'complete'
        }
    };

    const fetchPhotos = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                rover: filters.rover,
                earth_date: filters.earth_date,
                camera: filters.camera !== 'all' ? filters.camera : undefined
            };
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}mars/getPhotos`, { params });
            if (response.status == 200 && response.data) {
                setPhotos(response.data.data || []);

            } else {
                throw new Error('No data received');
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch Mars photos. Please try again.');
            console.error('Error fetching Mars photos:', err);
            setPhotos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, [filters.rover, filters.earth_date]);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value,
            // Reset camera when rover changes
            ...(name === 'rover' ? { camera: 'all' } : {})
        }));
    };

    return (
        <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4 }}>
            <Paper elevation={3} sx={{
                p: isMobile ? 2 : 4,
                mb: 4,
                backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9))'
            }}>
                <Typography variant="h3" component="h2" sx={{
                    fontWeight: 700,
                    mb: 4,
                    color: 'text.primary',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    Mars Rover Photos
                </Typography>

                {/* Rover Info Cards */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{
                            p: 3,
                            backgroundColor: 'primary.dark',
                            color: 'common.white'
                        }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                <SatelliteAltIcon />
                                <Typography variant="subtitle1">Rover</Typography>
                            </Stack>
                            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                                {ROVER_INFO[filters.rover].name}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{
                            p: 3,
                            backgroundColor: 'secondary.dark',
                            color: 'common.white'
                        }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                <DateRangeIcon />
                                <Typography variant="subtitle1">Landing Date</Typography>
                            </Stack>
                            <Typography variant="h5">{ROVER_INFO[filters.rover].landing}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{
                            p: 3,
                            backgroundColor: ROVER_INFO[filters.rover].status === 'active' ? 'success.dark' : 'error.dark',
                            color: 'common.white'
                        }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                {ROVER_INFO[filters.rover].status === 'active' ?
                                    <CheckCircleIcon /> : <DangerousIcon />}
                                <Typography variant="subtitle1">Status</Typography>
                            </Stack>
                            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                                {ROVER_INFO[filters.rover].status}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{
                            p: 3,
                            backgroundColor: 'info.dark',
                            color: 'common.white'
                        }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                <CameraAltIcon />
                                <Typography variant="subtitle1">Total Photos</Typography>
                            </Stack>
                            <Typography variant="h5">{ROVER_INFO[filters.rover].total_photos}</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Search Filters */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
                            Select Rover
                        </Typography>
                        <Select
                            value={filters.rover}
                            onChange={(e) => handleFilterChange('rover', e.target.value)}
                            fullWidth
                            sx={{
                                backgroundColor: 'background.paper',
                                color: 'text.primary'
                            }}
                        >
                            {Object.keys(ROVER_INFO).map(rover => (
                                <MenuItem key={rover} value={rover}>
                                    {ROVER_INFO[rover].name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
                            Select Camera
                        </Typography>
                        <Select
                            value={filters.camera}
                            onChange={(e) => handleFilterChange('camera', e.target.value)}
                            fullWidth
                            sx={{
                                backgroundColor: 'background.paper',
                                color: 'text.primary'
                            }}
                        >
                            <MenuItem value="all">All Cameras</MenuItem>
                            {CAMERAS[filters.rover].map(cam => (
                                <MenuItem key={cam} value={cam}>{cam}</MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <DatePicker
                            label="Earth Date"
                            selectedDate={filters.earth_date}
                            onChange={(date) => handleFilterChange('earth_date', date)}
                            maxDate={ROVER_INFO[filters.rover].max_date}
                            minDate={ROVER_INFO[filters.rover].landing}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Button
                            variant="contained"
                            onClick={fetchPhotos}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                            fullWidth
                            sx={{
                                height: '56px',
                                backgroundColor: 'primary.main',
                                '&:hover': { backgroundColor: 'primary.dark' }
                            }}
                        >
                            {loading ? 'Searching...' : 'Search Photos'}
                        </Button>
                    </Grid>
                </Grid>

                {error && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        {error}
                    </Alert>
                )}
            </Paper>

            {/* Results Header */}
            {!loading && photos.length > 0 && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    p: 2,
                    backgroundColor: 'background.paper',
                    borderRadius: 1
                }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {photos.length} {photos.length === 1 ? 'Photo' : 'Photos'} Found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Showing {Math.min(photos.length, 30)} of {photos.length}
                    </Typography>
                </Box>
            )}

            {/* Photo Gallery */}
            <ImageGallery
                images={photos?.slice(0, 30)}
                loading={loading}
                columns={isMobile ? 1 : 3}
                emptyMessage={`No photos available for ${ROVER_INFO[filters.rover].name} on ${filters.earth_date}`}
                renderImage={(photo) => (
                    <Paper elevation={3} sx={{
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: theme.shadows[8]
                        }
                    }}>
                        <Box
                            component="img"
                            src={photo.img_src}
                            alt={`Mars rover ${photo.rover.name}`}
                            sx={{
                                width: '100%',
                                height: 250,
                                objectFit: 'cover'
                            }}
                            loading="lazy"
                        />
                        <Box sx={{ p: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                {photo.camera.full_name}
                            </Typography>
                            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Sol: {photo.sol}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {photo.earth_date}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <Chip
                                    label={photo.rover.name}
                                    size="small"
                                    color="default"
                                    variant="outlined"
                                />
                                <Chip
                                    label={photo.camera.name}
                                    size="small"
                                    color="primary"
                                />
                            </Stack>
                        </Box>
                    </Paper>
                )}
            />
        </Container>
    );
};

export default MarsRover;