import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65vh' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CircularProgress style={{ color: '#007bff', marginBottom: '10px' }} />
                <p style={{ fontSize: '18px', color: '#333' }}>Loading</p>
            </div>
        </Box>
    );
}

export default LoadingSpinner;
