import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link as MuiLink,
    Divider,
    IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    const footerLinks = [
        { title: 'About', links: ['Company', 'Team', 'Careers'] },
        { title: 'Resources', links: ['API Docs', 'Tutorials', 'Blog'] },
        { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
    ];

    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                color: 'text.secondary',
                py: 6,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Logo and description */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                            NASA Space Explorer
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Discover the cosmos through NASA's open APIs. Explore stunning space imagery,
                            Mars rover photos, and near-Earth objects.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <IconButton aria-label="Facebook" color="inherit">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton aria-label="Twitter" color="inherit">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton aria-label="Instagram" color="inherit">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton aria-label="LinkedIn" color="inherit">
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Footer links */}
                    {footerLinks.map((section) => (
                        <Grid item xs={6} md={2} key={section.title}>
                            <Typography variant="subtitle1" sx={{ color: 'text.primary', mb: 2 }}>
                                {section.title}
                            </Typography>
                            {section.links.map((link) => (
                                <MuiLink
                                    key={link}
                                    component={Link}
                                    to="#"
                                    variant="body2"
                                    sx={{
                                        display: 'block',
                                        mb: 1,
                                        color: 'text.secondary',
                                        '&:hover': {
                                            color: 'primary.light',
                                        },
                                    }}
                                >
                                    {link}
                                </MuiLink>
                            ))}
                        </Grid>
                    ))}

                    {/* Newsletter */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" sx={{ color: 'text.primary', mb: 2 }}>
                            Subscribe to our newsletter
                        </Typography>
                        <Box component="form" sx={{ display: 'flex', gap: 1 }}>
                            <input
                                type="email"
                                placeholder="Your email"
                                style={{
                                    flexGrow: 1,
                                    padding: '8px 12px',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(255, 255, 255, 0.23)',
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#1976d2',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                }}
                            >
                                Subscribe
                            </button>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'divider' }} />

                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} NASA Space Explorer. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;