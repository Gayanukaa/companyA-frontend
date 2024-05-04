import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import LandingPageCarousel from './components/LandingPageCarousel';
import SearchBar from './components/SearchBar';
import LandingPageCard from './components/LandingPageCard';
import ContactUs from './components/ContactUs';
import MenuIcon from '@mui/icons-material/Menu';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Footer from './components/Footer';


const LandingPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null);

    const handleMenuOpen = (event) => {
        setMenuOpen(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuOpen(null);
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);


    useEffect(() => {
        const smoothScroll = (target) => {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth',
                });
            }
        };

        // Add event listeners to anchor links for smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                smoothScroll(target);
            });
        });
    }, []);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div style={{ backgroundColor: '#F2F3F4' }}>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Toolbar sx={{ bgcolor: 'white', height: 80 }}>
                        <Typography variant="h5" component="div" sx={{ color: 'rgba(0, 0, 0, 0.87)', flexGrow: 1 }}>
                            Company A***
                        </Typography>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            <Button component="a" href="#featured-products" variant="contained" color="inherit" sx={{ marginRight: 1, color: 'black', height: 75, width: 130 }}>
                                Products
                            </Button>
                            <Button component='a' href='#about-us' variant="contained" color="inherit" sx={{ marginRight: 1, color: 'black', height: 75, width: 130 }}>
                                About
                            </Button>
                            <Button component='a' href='#contact-us' variant="contained" color="inherit" sx={{ marginRight: 60, color: 'black', height: 75, width: 130 }}>
                                Contact Us
                            </Button>

                            <Button component={Link} to="/login/manager" variant="contained" color="secondary" sx={{ marginRight: 2 }}>
                                Manager Login
                            </Button>
                            <Button component={Link} to="/login/customer" variant="contained" color="success">
                                Customer Login
                            </Button>
                        </Box>

                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton onClick={handleMenuOpen}>
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={menuOpen}
                                open={Boolean(menuOpen)}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem component='a' href='#featured-products' onClick={handleMenuClose}>Products</MenuItem>
                                <MenuItem component='a' href='#about-us' onClick={handleMenuClose}>About</MenuItem>
                                <MenuItem component='a' href='#contact-us' onClick={handleMenuClose}>Contact Us</MenuItem>

                                <MenuItem component={Link} to="/login/manager" onClick={handleMenuClose}>Manager Login</MenuItem>
                                <MenuItem component={Link} to="/login/customer" onClick={handleMenuClose}>Customer Login</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <SearchBar /><br />

            <Container>
                <Typography variant="h4" component="div" sx={{ mt: 4 }}>
                    Quality. Expertise. Innovation.
                </Typography>
                <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                    Premier destination for cutting-edge electronics and innovative technology.
                </Typography>
                <ul>
                    <li>Störk-Tronic manufactures state-of-the-art premium temperature measurement and control systems.</li>
                    <li>Our employees are technically very well skilled which is due to our many years of experience in numerous industrial sectors.</li>
                    <li>Our development and production is exclusively done in Germany, which keeps us customer-oriented.</li>
                    <li>Therefore, we are able to find perfect customised solutions and can thus improve our customers' competitive situation in the long-term.</li>
                </ul>
            </Container>

            <div className="card" id="featured-products">
                <div className="card-body">
                    <h4>Featured Products</h4>
                </div>
            </div><br />

            <Container >
                <LandingPageCarousel /><br />
                <LandingPageCarousel /><br />
            </Container><br />

            <div className="card" id="about-us">
                <div className="card-body">
                    <h4>About Our Service</h4>
                </div>
            </div><br />

            <Container>
                <LandingPageCard />
                <div className="row row-cols-1 row-cols-md-3 g-4"></div>
            </Container><br></br>

            <div className="card" id="contact-us">
                <div className="card-body">
                    <h4>Contact Us</h4>
                </div>
            </div><br />

            <Container>
                <ContactUs />
            </Container><br />



            {isVisible && (
                <Button
                    onClick={scrollToTop}
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Button>
            )}



            <div className=" bg-secondary mb-3">
                <div className="card-body">
                    <Footer />
                </div>
            </div>




        </div>
    );
}

export default LandingPage;
