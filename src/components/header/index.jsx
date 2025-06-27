import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { name: 'APOD', path: '/apod' },
        { name: 'Mars Rover', path: '/mars' },
        { name: 'Near Earth Objects', path: '/neo' },
    ];

    const drawer = (
        <Box
            sx={{
                width: 250,
                backgroundColor: theme.palette.background.paper,
                height: '100%',
                padding: 2
            }}
        >
            <List>
                {navItems.map((item) => (
                    <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.path}
                        onClick={handleDrawerToggle}
                    >
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
                <ListItem
                    button
                    component={Link}
                    to="/login"
                    onClick={handleDrawerToggle}
                    sx={{
                        marginTop: 2,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        }
                    }}
                >
                    <ListItemText
                        primary="Login"
                        sx={{ color: '#fff', textAlign: 'center' }}
                    />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
                    padding: '10px 0'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{
                                textDecoration: 'none',
                                color: 'inherit',
                                fontWeight: 700,
                                letterSpacing: '1px'
                            }}
                        >
                            NASA Explorer
                        </Typography>
                    </Box>

                    {isLargeScreen ? (
                        <>
                            {/* Center Navigation */}
                            <Box sx={{ display: 'flex', gap: 4 }}>
                                {navItems.map((item) => (
                                    <Button
                                        key={item.name}
                                        component={Link}
                                        to={item.path}
                                        sx={{
                                            color: 'text.primary',
                                            '&:hover': {
                                                color: 'primary.light',
                                                backgroundColor: 'transparent',
                                            }
                                        }}
                                    >
                                        {item.name}
                                    </Button>
                                ))}
                            </Box>

                            {/* Right Side Login */}
                            <Button
                                variant="contained"
                                component={Link}
                                to="/login"
                                sx={{
                                    borderRadius: '20px',
                                    padding: '8px 24px'
                                }}
                            >
                                Login
                            </Button>
                        </>
                    ) : (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: theme.palette.background.paper,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Header;