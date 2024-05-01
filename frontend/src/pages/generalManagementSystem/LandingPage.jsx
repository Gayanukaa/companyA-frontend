import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import LandingPageCarousel from './components/LandingPageCarousel';
import SearchBar from './components/SearchBar';
import LandingPageCard from './components/LandingPageCard';
import ContactUs from './components/ContactUs';


const LandingPage = () => {
    return (
        <div style={{ backgroundColor: '#F2F3F4 ' }}>
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
            <SearchBar /><br></br><br></br>


          <div className='container'>
          <h1>Quality. Expertise. Innovation.</h1>
<h1>Premier destination for cutting-edge electronics and innovative technology.</h1>
<ul>
  <li>Störk-Tronic manufactures state-of-the-art premium temperature measurement and control systems.</li>
  <li>Our employees are technically very well skilled which is due to our many years of experience in numerous industrial sectors.</li>
  <li>Our development and production is exclusively done in Germany, which keeps us customer-oriented.</li>
  <li>Therefore, we are able to find perfect customised solutions and can thus improve our customers' competitive situation in the long-term.</li>
</ul><br></br><br></br>

          </div>
          





                <div className="card">
                    <div className="card-body">
                        <h4>Featured Products</h4>
                    </div>
                </div><br></br>

                <div className="container">

                    <LandingPageCarousel /><br></br>
                    <LandingPageCarousel /><br></br>
                    </div><br></br>
                    
                <div class="card">
                    <div class="card-body">
                        <h4>About Our Service</h4>
                    </div>
                </div><br></br>
                <div className="container">
                    <LandingPageCard />
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h4>Contact Us</h4>
                    </div>
                </div><br></br>
                <div className="container">
                    <ContactUs/>

                    </div><br></br>
            </div>
            );
}

            export default LandingPage;
