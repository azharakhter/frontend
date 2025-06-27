import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

const ImageGallery = ({
    images,
    loading,
    columns = 3,
    renderImage,
    emptyMessage = "No images found"
}) => {
    // const theme = useTheme();

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px'
            }}>
                <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
            </Box>
        );
    }

    if (!images || images.length === 0) {
        return (
            <Box sx={{
                textAlign: 'center',
                py: 8,
                backgroundColor: 'background.paper',
                borderRadius: 2
            }}>
                <SatelliteAltIcon sx={{
                    fontSize: 60,
                    color: 'text.disabled',
                    mb: 2
                }} />
                <Typography variant="h6" color="text.secondary">
                    {emptyMessage}
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {images.map((item, index) => (
                <Grid item xs={12} sm={6} md={12 / columns} key={item.id || index}>
                    {renderImage(item)}
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGallery;