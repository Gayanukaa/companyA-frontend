import React, {useState} from 'react';
import { Container, Box } from '@mui/material';
import ProductCard from "./ProductCard.jsx";
import NavBar from "./NavBar.jsx";
import CheckStock from "./CheckStock.jsx";
import useProductListLogic from '../sales/ProductListLogic.jsx';
import ShowUnavailable from "./ShowUnavailable.jsx";

function ProductList({ get_url, get_val }) {
    const [showUnavailable, setShowUnavailable] = useState(false);
    const [unavailableItems, setUnavailableItems] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);

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
            <ShowUnavailable isOpen={showUnavailable} close={closePopup} data={data} unavailableItems={unavailableItems} finalPrice={finalPrice}/>

            <NavBar totalPrice={totalPrice} itemCount={itemCount} onEmptyCart={handleEmptyCart} />

            <Container maxWidth="lg" className="mt-3" >
                <Box display="flex" justifyContent="center">
                    <Box display="flex" flexDirection="column" alignItems="center" width="100%" sx={{ gap: 2 }}>
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
                        <CheckStock showUnavailable={showUnavailableModal} items={itemCounts} data={data} count={itemCount} get_val={get_val} />
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default ProductList;

