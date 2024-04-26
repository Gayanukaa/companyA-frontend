import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

function NavBar({ totalPrice, itemCount, onEmptyCart }) {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <HomeIcon fontSize="large" style={{ marginRight: '8px' }} />
                    </IconButton>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' , marginLeft:'auto'}}>
                    <div style={{ marginRight: '16px' }}>
                        <span style={{ marginRight: '4px' }}>Total Price:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div style={{ marginRight: '16px' }}>
                        <span style={{ marginRight: '4px' }}>Items:</span>
                        <span>{itemCount}</span>
                    </div>
                    <Button variant="contained" onClick={onEmptyCart}>
                        Empty Cart
                    </Button>
                </div>
            </Toolbar>
        </AppBar>

    );
}

export default NavBar;
