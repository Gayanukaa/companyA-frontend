import React from 'react';
import Button from '@mui/material/Button';
import { checkStock } from '../sales/CheckStockLogic.jsx';
import {useMediaQuery} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

function CheckStock({ showUnavailable, items, data, count, get_val, totalPrice, payBills }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const buttonHeight = isSmallScreen ? "40px" : "50px";
    const fontSize = isSmallScreen ? "0.8rem" : "medium";
    const handleCheckStock = () => {
        checkStock(items, data, get_val, showUnavailable, totalPrice,payBills);
    };

    return (

            <Button
                variant="contained"
                color="primary"
                style={{ height: buttonHeight, fontSize: fontSize }}
                className="m-8"
                onClick={handleCheckStock}
                disabled={count <= 0}
                sx={{ opacity: count <= 0 ? 0.5 : 1, pointerEvents: count <= 0 ? 'none' : 'auto' }}
            >
                Checkout
            </Button>

    );
}

export default CheckStock;
