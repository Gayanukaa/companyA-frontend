import React from 'react';
import Button from '@mui/material/Button';
import { checkStock } from '../sales/CheckStockLogic.jsx';
import {useMediaQuery} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import CircularProgress from '@mui/material/CircularProgress';

function CheckStock({ showUnavailable, items, data, count, get_val, totalPrice, payBills,loading, setloading }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const buttonHeight = isSmallScreen ? "40px" : "50px";
    const buttonWidth = isSmallScreen ? "130px" : "160px";
    const fontSize = isSmallScreen ? "0.8rem" : "medium";
    const handleCheckStock = () => {
        setloading(true);
        checkStock(items, data, get_val, showUnavailable, totalPrice,payBills);
    };

    return (

            <Button
                variant="contained"
                color="primary"
                style={{ height: buttonHeight, fontSize: fontSize, width: buttonWidth}}
                className="m-8"
                onClick={handleCheckStock}
                disabled={count <= 0}
                sx={{ opacity: count <= 0 ? 0.5 : 1, pointerEvents: count <= 0 ? 'none' : 'auto' }}
            >
                {loading ?
                    <CircularProgress size={20} color="inherit"/>
                : "Check Out"}
            </Button>

    );
}

export default CheckStock;
