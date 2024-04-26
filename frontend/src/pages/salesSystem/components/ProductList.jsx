import React, { useState, useEffect } from 'react';
import ProductCard from "./ProductCard.jsx";
import NavBar from "./NavBar.jsx";
import CheckStock from "./CheckStock.jsx";
import {Container} from "@mui/material";
import Box from '@mui/material/Box';
import * as reqSend from '../../../global/reqSender.jsx';

function ProductList({get_url, get_val}) {
    //data -> product list, itemCounts -> count of each item in cart, totalPrice -> total price of items in cart, itemCount -> total number of items in cart
    const [data, setData] = useState([]);
    const [itemCounts, setItemCounts] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemCount, setItemCount] = useState(0);


    useEffect(() => {
        // Fetch data and populate list from API at given url
        reqSend.defaultReq("GET", get_url, null, response => {
            if (response.status === 200 && response.data) {
                setData(response.data);
                const initialItemCounts = {};
                response.data.forEach(item => {
                    initialItemCounts[item.id] = 0; // Initialize count to 0 for each item
                });
                setItemCounts(initialItemCounts);
            } else {
                console.error("Invalid response format:", response);
            }
        },
            error => {
                console.error("API request failed:", error);
            }
            );

    }, [get_url]);

//empty cart
    const handleEmptyCart = () => {

        setTotalPrice(0);
        setItemCount(0);
        setItemCounts(prevCounts => {
            const resetCounts = {};
            Object.keys(prevCounts).forEach(itemId => {
                resetCounts[itemId] = 0; // Set count to 0 for each item ID
            });
            return resetCounts;
        });
    };
//Add to Cart
    const handleAddToCart = (itemId,price) => {
        setItemCounts(prevCounts => ({
            ...prevCounts,
            [itemId]: prevCounts[itemId] + 1 // Increment count for the item
        }));
        setTotalPrice(totalPrice + price);
        setItemCount(itemCount + 1);
    };


    // Function to handle removing an item from cart
    const handleRemoveFromCart = (itemId,price) => {
        if (itemCounts[itemId] > 0) { // Ensure count is greater than 0
            setItemCounts(prevCounts => ({
                ...prevCounts,
                [itemId]: prevCounts[itemId] - 1
            }));

        }
        if (totalPrice>0 && itemCount>0){
            setTotalPrice(totalPrice - price);
            setItemCount(itemCount - 1);
        }
    };

//Maps list of products to ProductCard components
    return (
        <div>
            <NavBar totalPrice={totalPrice} itemCount={itemCount} onEmptyCart={handleEmptyCart}/>


            <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
                <Box display="flex" justifyContent="center">
                    <Box display="flex" flexDirection="column" alignItems="center" width="100%"  sx={{ gap: 2 }}>
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
                    <CheckStock items={itemCounts} data={data} count={itemCount} get_val={get_val}/>
            </Box>


            </Box>
            </Container>
        </div>
    );
}


export default ProductList;
