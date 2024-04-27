import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { checkStock } from '../sales/CheckStockLogic.jsx';

function CheckStock({ showUnavailable, items, data, count, get_val }) {

    const handleCheckStock = () => {
        checkStock(items, data, get_val, showUnavailable);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2} mb={2}>
            <Button
                variant="contained"
                color="primary"
                className="m-8"
                onClick={handleCheckStock}
                disabled={count <= 0}
                sx={{ opacity: count <= 0 ? 0.5 : 1, pointerEvents: count <= 0 ? 'none' : 'auto' }}
            >
                Check Stock
            </Button>
        </Box>
    );
}

export default CheckStock;
