import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';


const LandingPage = () => {
    return (
        <div>
            <AppBar position="static" sx={{ marginBottom: 4 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Company A
                    </Typography>

                    <Button component={Link} to="/login/manager" variant="contained" color="secondary" sx={{ marginRight: 2 }}>
                        Manager Login
                    </Button>
                    <Button component={Link} to="/login/customer" variant="contained" color="secondary">
                        Customer Login
                    </Button>

                </Toolbar>
            </AppBar>
            <Container>
                <header sx={{ textAlign: 'center', marginTop: 8, marginBottom: 4 }}>
                    <Typography variant="h3" gutterBottom>Welcome to Our Website</Typography>
                    <Typography variant="body1" gutterBottom>
                        This is the Landing page for testing. This will be changed soon...
                    </Typography>
                    <Button variant="contained" color="primary">Get Started</Button>
                </header>

            </Container>
        </div>
    );
}

export default LandingPage;