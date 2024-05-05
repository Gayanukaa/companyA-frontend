import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Box from "@mui/material/Box";
import {useMediaQuery} from "@mui/material";

const ProductCard = ({title,id, price,items,   onAddToCart , onRemoveFromCart}) => {
    const theme= useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const buttonHeight = isSmallScreen ? "30px" : "40px";
    const buttonSize = isSmallScreen ? "small" : "medium";
    const roundedPrice = parseFloat(price).toFixed(2);

    return (
        <Card sx={{ width: '100%',
                    [theme.breakpoints.up("sm")]:{
                        width: '70%',
                        padding: '10px'
                    }
                    }}>
            <CardContent sx={{ display: 'flex',
                         [theme.breakpoints.down("md")]: {
                               flexDirection: "column",
                               justifyContent: 'space-between',
                             alignItems:"flex-start",
                               gap: '20px'
                              },
                               alignItems: 'center',
                               justifyContent: 'space-between',
                }}>
                <div>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                        Rs {roundedPrice}
                    </Typography>
                </div>
                <Box sx={{ width: '300px', height: '40px',display: 'flex', alignItems: 'center', justifyContent: 'space-around',
                    [theme.breakpoints.down("sm")]:{
                        width: "100%"
                    }}}>


                <Button variant="contained" size={buttonSize} style={{height:buttonHeight}} onClick={()=> {onAddToCart(id,price);}}  >Add to Cart</Button>
                <Button variant="outlined" size={buttonSize} style={{height:buttonHeight}} onClick={()=>{onRemoveFromCart(id,price);}}>REMOVE</Button>
                <span style={{
                                border: '1px solid #ccc',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                                height: buttonHeight,
                                width: buttonHeight
                            }}>{items}</span>
                </Box>

        </CardContent>
</Card>


    );
};

export default ProductCard;

