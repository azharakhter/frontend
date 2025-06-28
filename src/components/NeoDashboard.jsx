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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    useTheme,
    useMediaQuery,
    Stack
} from '@mui/material';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import DatePicker from './DatePicker';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import WarningIcon from '@mui/icons-material/Warning';
import SpeedIcon from '@mui/icons-material/Speed';
import NearMeIcon from '@mui/icons-material/NearMe';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RefreshIcon from '@mui/icons-material/Refresh';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const NeoDashboard = () => {
    const [neoData, setNeoData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [dateRange, setDateRange] = useState({
        start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0]
    });

    const fetchNeoData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}neo/getNeo`, {
                params: dateRange
            });

            if (response.status == 200 && response.data) {

                setNeoData(response.data.data || {});
            } else {
                throw new Error('No data received');
            }

        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch NEO data. Please try again.');

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNeoData();
    }, []);

    const getChartData = () => {
        const hazardous = [];
        const nonHazardous = [];
        const sizeDistribution = { small: 0, medium: 0, large: 0 };

        Object.values(neoData)
            .flat()
            .forEach(neo => {
                const diameter = neo.estimated_diameter?.meters?.estimated_diameter_max || 0;
                const isHazardous = neo.is_potentially_hazardous_asteroid;

                if (isHazardous) {
                    hazardous.push(neo);
                } else {
                    nonHazardous.push(neo);
                }

                if (diameter < 100) sizeDistribution.small++;
                else if (diameter < 500) sizeDistribution.medium++;
                else sizeDistribution.large++;
            });

        const velocityData = Object.values(neoData)
            .flat()
            .map(neo => {
                const velocity = neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || 0;
                return {
                    id: neo.id,
                    name: neo.name,
                    velocity: parseFloat(velocity).toFixed(2),
                    diameter: neo.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(0) || 'N/A',
                    hazardous: neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'
                };
            })
            .sort((a, b) => b.velocity - a.velocity)
            .slice(0, 10);

        const closestApproach = Object.values(neoData)
            .flat()
            .map(neo => {
                const missDistance = neo.close_approach_data?.[0]?.miss_distance?.kilometers || 0;
                return {
                    id: neo.id,
                    name: neo.name,
                    distance: parseFloat(missDistance).toFixed(0),
                    velocity: parseFloat(
                        neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second
                    ).toFixed(2),
                    date: neo.close_approach_data?.[0]?.close_approach_date
                };
            })
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 10);

        return {
            hazardousCount: hazardous.length,
            nonHazardousCount: nonHazardous.length,
            sizeData: [
                { name: 'Small (<100m)', value: sizeDistribution.small },
                { name: 'Medium (100-500m)', value: sizeDistribution.medium },
                { name: 'Large (>500m)', value: sizeDistribution.large }
            ],
            velocityData,
            closestApproach
        };
    };

    const chartData = Object.keys(neoData).length > 0 ? getChartData() : null;
    const totalAsteroids = chartData ? chartData.hazardousCount + chartData.nonHazardousCount : 0;

    return (
        <Box sx={{
            maxWidth: '1200px',
            mx: 'auto',
            p: isMobile ? 2 : 4,
            backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9))',
            borderRadius: 2,
            minHeight: '70vh'
        }}>
            <Paper elevation={3} sx={{
                p: 4,
                mb: 4,
                backgroundColor: 'background.paper'
            }}>
                <Typography variant="h3" component="h2" sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 4,
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    Near Earth Objects Dashboard
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={5} md={3}>
                        <DatePicker
                            label="Start Date"
                            selectedDate={dateRange.start}
                            onChange={(date) => setDateRange({ ...dateRange, start: date })}
                            maxDate={new Date().toISOString().split('T')[0]}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5} md={3}>
                        <DatePicker
                            label="End Date"
                            selectedDate={dateRange.end}
                            onChange={(date) => setDateRange({ ...dateRange, end: date })}
                            maxDate={new Date().toISOString().split('T')[0]}
                            minDate={dateRange.start}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} md={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Button
                            variant="contained"
                            onClick={fetchNeoData}
                            disabled={loading}
                            startIcon={<RefreshIcon />}
                            fullWidth
                            sx={{
                                height: '56px',
                                backgroundColor: 'primary.main',
                                '&:hover': { backgroundColor: 'primary.dark' }
                            }}
                        >
                            {loading ? 'Loading...' : 'Update'}
                        </Button>
                    </Grid>
                </Grid>

                {error && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        {error}
                    </Alert>
                )}

                {totalAsteroids > 0 ? (
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{
                                p: 3,
                                backgroundColor: 'primary.dark',
                                color: 'common.white'
                            }}>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                    <SatelliteAltIcon />
                                    <Typography variant="subtitle1">Total Asteroids</Typography>
                                </Stack>
                                <Typography variant="h4">{totalAsteroids}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{
                                p: 3,
                                backgroundColor: 'success.dark',
                                color: 'common.white'
                            }}>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                    <SatelliteAltIcon />
                                    <Typography variant="subtitle1">Non-Hazardous</Typography>
                                </Stack>
                                <Typography variant="h4">{chartData.nonHazardousCount}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{
                                p: 3,
                                backgroundColor: 'error.dark',
                                color: 'common.white'
                            }}>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                    <WarningIcon />
                                    <Typography variant="subtitle1">Potentially Hazardous</Typography>
                                </Stack>
                                <Typography variant="h4">{chartData.hazardousCount}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{
                                p: 3,
                                backgroundColor: 'secondary.dark',
                                color: 'common.white'
                            }}>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                    <CalendarMonthIcon />
                                    <Typography variant="subtitle1">Date Range</Typography>
                                </Stack>
                                <Typography variant="h6">
                                    {dateRange.start} to {dateRange.end}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                ) : !loading && (
                    <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: 'background.paper' }}>
                        <SatelliteAltIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            No Asteroid Data Found
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Try selecting a different date range. Data is available from 1900 to 2100.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setDateRange({
                                start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                                end: new Date().toISOString().split('T')[0]
                            })}
                            startIcon={<RefreshIcon />}
                        >
                            Reset Date Range
                        </Button>
                    </Paper>
                )}
            </Paper>

            {loading ? (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '300px'
                }}>
                    <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
                </Box>
            ) : totalAsteroids > 0 && (
                <Box sx={{ mt: 4 }}>
                    {/* Size Distribution */}
                    <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: 'background.paper' }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                            Size Distribution
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={chartData.sizeData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {chartData.sizeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: theme.palette.background.paper,
                                                borderColor: theme.palette.divider,
                                                color: theme.palette.text.primary
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={2}>
                                    {chartData.sizeData.map((item, index) => (
                                        <Box key={index}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Box sx={{
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: '50%',
                                                    backgroundColor: COLORS[index]
                                                }} />
                                                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body1" fontWeight="medium">
                                                    {item.value}
                                                </Typography>
                                            </Stack>
                                            <Box sx={{
                                                width: '100%',
                                                height: 8,
                                                bgcolor: 'background.default',
                                                borderRadius: 4,
                                                mt: 1
                                            }}>
                                                <Box sx={{
                                                    width: `${(item.value / totalAsteroids) * 100}%`,
                                                    height: '100%',
                                                    borderRadius: 4,
                                                    bgcolor: COLORS[index]
                                                }} />
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Velocity Comparison */}
                    <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: 'background.paper' }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                            <SpeedIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                            Top 10 Fastest Asteroids (km/s)
                        </Typography>
                        <Box sx={{ height: 400, mb: 4 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData.velocityData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: theme.palette.text.secondary }}
                                    />
                                    <YAxis tick={{ fill: theme.palette.text.secondary }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: theme.palette.background.paper,
                                            borderColor: theme.palette.divider,
                                            color: theme.palette.text.primary
                                        }}
                                        formatter={(value) => [`${value} km/s`, 'Velocity']}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="velocity"
                                        name="Velocity (km/s)"
                                        fill={theme.palette.primary.main}
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>

                        <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'background.default' }}>
                                        <TableCell sx={{ fontWeight: 600 }}>Asteroid</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Velocity (km/s)</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Diameter (m)</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Hazardous</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {chartData.velocityData.map((neo) => (
                                        <TableRow key={neo.id} hover>
                                            <TableCell sx={{ fontWeight: 500 }}>{neo.name}</TableCell>
                                            <TableCell sx={{ color: 'primary.main' }}>{neo.velocity}</TableCell>
                                            <TableCell>{neo.diameter}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={neo.hazardous}
                                                    size="small"
                                                    color={neo.hazardous === 'Yes' ? 'error' : 'success'}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    {/* Closest Approach */}
                    <Paper elevation={3} sx={{ p: 4, backgroundColor: 'background.paper' }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                            <NearMeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                            Closest Approaches (km)
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'background.default' }}>
                                        <TableCell sx={{ fontWeight: 600 }}>Asteroid</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Distance (km)</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Velocity (km/s)</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Approach Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {chartData.closestApproach.map((neo) => (
                                        <TableRow key={neo.id} hover>
                                            <TableCell sx={{ fontWeight: 500 }}>{neo.name}</TableCell>
                                            <TableCell sx={{ color: 'warning.main' }}>
                                                {parseInt(neo.distance).toLocaleString()} km
                                            </TableCell>
                                            <TableCell sx={{ color: 'primary.main' }}>{neo.velocity}</TableCell>
                                            <TableCell>{neo.date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};

export default NeoDashboard;