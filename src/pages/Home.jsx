import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button
    // useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, path }) => {
    // const theme = useTheme();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                component={Link}
                to={path}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    backgroundColor: 'background.paper',
                    '&:hover': {
                        '& h3': {
                            color: 'primary.main',
                        },
                    },
                }}
            >
                <CardMedia
                    component="div"
                    sx={{
                        pt: '56.25%', // 16:9 aspect ratio
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        backgroundImage: 'linear-gradient(to bottom right, rgba(25, 118, 210, 0.3), rgba(156, 39, 176, 0.3))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '2px dashed rgba(255, 255, 255, 0.3)',
                        }}
                    />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        sx={{
                            transition: 'color 0.3s ease',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                    <Button
                        size="small"
                        color="primary"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Explore
                    </Button>
                </Box>
            </Card>
        </Grid>
    );
};

const Home = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                pt: 12,
                pb: 8,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography
                        variant="h1"
                        gutterBottom
                        sx={{
                            color: 'common.white',
                            mb: 3,
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        }}
                    >
                        NASA Space Explorer
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: '700px',
                            mx: 'auto',
                            mb: 4,
                        }}
                    >
                        Discover the cosmos through NASA's open APIs. Explore stunning space imagery,
                        Mars rover photos, and near-Earth objects.
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    <FeatureCard
                        title="Astronomy Picture of the Day"
                        path="/apod"
                        description="Discover the cosmos with NASA's iconic daily space images"
                    />
                    <FeatureCard
                        title="Mars Rover Photos"
                        path="/mars"
                        description="Explore the Martian surface through rover cameras"
                    />
                    <FeatureCard
                        title="Near Earth Objects"
                        path="/neo"
                        description="Track asteroids and comets near our planet"
                    />
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;