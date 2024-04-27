import React from 'react';
import {useEffect, useState} from 'react';
import ProductList from "./components/ProductList.jsx";
import Modal from "./components/PopupModal.jsx";

const ProductPage = () => {
    const get_url = "api/products";
    const get_val = "api/products/validateStock-Muliple";

   const [isOpen, setIsOpen] = useState(true); // Set initial state to true
    useEffect(() => {
        document.body.classList.add('overflow-hidden');
    }, []);
    const closePopup = () => {
        setIsOpen(false);
        document.body.classList.remove('overflow-hidden');

    };

    return (
        <div>
            <Modal isOpen= {isOpen} close={closePopup} />
            <ProductList get_url={get_url} get_val={get_val}/>
        </div>
    );
};



export default ProductPage;
