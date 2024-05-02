import React, { useState, useEffect } from 'react';
import * as reqSend from '../../../global/reqSender.jsx';

function useProductListLogic(get_url) {
    const [data, setData] = useState([]);
    const [itemCounts, setItemCounts] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    //get all the products from the database
    useEffect(() => {
        reqSend.defaultReq("GET", get_url, null, response => {
                if (response.status === 200 && response.data) {
                    setData(response.data);
                    const initialItemCounts = {};
                    response.data.forEach(item => {
                        initialItemCounts[item.id] = 0;
                    });
                    setItemCounts(initialItemCounts);
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            });
    }, [get_url]);

    //empty the cart
    const handleEmptyCart = () => {
        setTotalPrice(0);
        setItemCount(0);
        setItemCounts(prevCounts => {
            const resetCounts = {};
            Object.keys(prevCounts).forEach(itemId => {
                resetCounts[itemId] = 0;
            });
            return resetCounts;
        });
    };

    //add an item to the cart, increment the item count, total price and individual item counts
    const handleAddToCart = (itemId, price) => {
        setItemCounts(prevCounts => ({
            ...prevCounts,
            [itemId]: prevCounts[itemId] + 1
        }));
        setTotalPrice(totalPrice + price);
        setItemCount(itemCount + 1);
    };

    //remove an item from the cart, decrement the item count, total price and individual item counts
    const handleRemoveFromCart = (itemId, price) => {
        if (itemCounts[itemId] > 0) {

            setItemCounts(prevCounts => ({
                ...prevCounts,
                [itemId]: prevCounts[itemId] - 1
            }));
            if (totalPrice > 0 && itemCount > 0) {
                setTotalPrice(totalPrice - price);
                setItemCount(itemCount - 1);
            }
        }

    };

    return {
        data,
        itemCounts,
        totalPrice,
        itemCount,
        handleEmptyCart,
        handleAddToCart,
        handleRemoveFromCart
    };
}

export default useProductListLogic;
