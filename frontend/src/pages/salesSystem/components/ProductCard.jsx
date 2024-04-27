import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import RemoveIcon from '@mui/icons-material/Remove';
const ProductCard = ({title,id, price,items,   onAddToCart , onRemoveFromCart}) => {
    const theme= useTheme();

    const roundedPrice = parseFloat(price).toFixed(2);

    return (
        <Card sx={{ width: '80%', height: '150px' }}>
            <CardContent sx={{ display: 'flex',
                         [theme.breakpoints.down("md")]: {
                               flexDirection: "column",
                              },
                               alignItems: 'center',
                               justifyContent: 'space-between' }}>
                <div style={{ width: '70%' }}>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                        ${roundedPrice}
                    </Typography>
                </div>
                <div style={{width: '300px', display: 'flex', alignItems: 'center',flexDirection: 'column' }}>
                <div style={{ width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <Button variant="contained" style={{ width: '140px', height: '40px'  }} onClick={()=> {onAddToCart(id,price);}}  >Add to Cart</Button>
                  <Button variant="outlined" style={{ width: '80px', height: '40px', backgroundColor:'lightseagreen'  }} onClick={()=>{onRemoveFromCart(id,price);}}><RemoveIcon sx={{color:'black', fontSize:32}}/></Button>
                <span style={{
                                border: '1px solid #ccc',
                                width: '40px',
                                height: '40px',
                                textAlign: 'center',
                                padding: '8px'
                            }}>{items}</span>
                </div>
                </div>
        </CardContent>
</Card>


    );
};

export default ProductCard;

