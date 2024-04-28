import React, {useState} from 'react';
import {Container, Box, Fab} from '@mui/material';
import ProductCard from "./ProductCard.jsx";
import CheckStock from "./CheckStock.jsx";
import useProductListLogic from '../sales/ProductListLogic.jsx';
import ShowUnavailable from "./ShowUnavailable.jsx";
import checkout from "../sales/checkOut.jsx";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useTheme from "@mui/material/styles/useTheme";
import {useMediaQuery} from "@mui/material";

function ProductList({ get_url, get_val }) {
    const [showUnavailable, setShowUnavailable] = useState(false);
    const [unavailableItems, setUnavailableItems] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const buttonHeight = isSmallScreen ? "40px" : "50px";
    const fontSize = isSmallScreen ? "0.8rem" : "medium";

    const {
        data,
        itemCounts,
        totalPrice,
        itemCount,
        handleEmptyCart,
        handleAddToCart,
        handleRemoveFromCart
    } = useProductListLogic(get_url);

    const showUnavailableModal = (unavailableItems) => {
        let price = 0;

        unavailableItems.forEach(item => {
            price += getPriceByItemId(item.itemId) * itemCounts[item.itemId] - getPriceByItemId(item.itemId) * getQuantityByItemId(item.itemId);
        });

        let finalPrice = (totalPrice - price).toFixed(2);
        setUnavailableItems(unavailableItems);
        setFinalPrice(finalPrice);
        setShowUnavailable(true);
        document.body.classList.add('overflow-hidden');
    };
    const closePopup = () => {
        setShowUnavailable(false);
        document.body.classList.remove('overflow-hidden');

    };
    const payBills = (Total) => {
        //need to check if any items are completely out of stock
        checkout(itemCounts,Total);
    }
    function getPriceByItemId(itemId) {
        const item = data.find(item => item.id === itemId);
        return item ? item.price : null;
    }

    function getQuantityByItemId(itemId) {
        const item = data.find(item => item.id === itemId);
        return item ? item.quantity : null;
    }

    return (
        <div>
            <ShowUnavailable isOpen={showUnavailable} close={closePopup} data={data} unavailableItems={unavailableItems} finalPrice={finalPrice} payBills={payBills}/>

            <AppBar position="sticky" color="primary">
                <Toolbar>
                    <Box style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', justifyContent: 'center' }}>
                        <div style={{ marginRight: '16px' ,height:buttonHeight,display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                            <span style={{fontSize:fontSize, marginRight: '4px' }}>Total Price:</span>
                            <span style={{fontSize:fontSize}}>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div style={{
                            marginRight: '16px',
                            height: buttonHeight,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{fontSize:fontSize, marginRight: '4px' }}>Items:</span>
                            <span style={{fontSize:fontSize}}>{itemCount}</span>
                        </div>

                        <CheckStock  showUnavailable={showUnavailableModal} items={itemCounts} data={data} count={itemCount} get_val={get_val} totalPrice={totalPrice} payBills={payBills}/>

                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" className="mt-3"  >
                <Box display="flex" justifyContent="center" >
                    <Box display="flex" flexDirection="column" alignItems="center" width="100%" sx={{ gap: 2 ,marginBottom:"20px"}}>
                        {data.map(item => (
                            <ProductCard
                                key={item.id}
                                id={item.id}
                                title={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                items={itemCounts[item.id]}
                                onAddToCart={handleAddToCart}
                                onRemoveFromCart={handleRemoveFromCart}
                            />
                        ))}
                    </Box>
                </Box>
                <Fab
                    variant="extended"
                    color="primary"
                    onClick={handleEmptyCart}
                    sx={{position:'fixed',
                        bottom:20,
                        right:20,}}
                >

                    EmptyCart
                </Fab>
            </Container>
        </div>
    );
}

export default ProductList;

