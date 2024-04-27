import React from 'react';
import ProductList from "./components/ProductList.jsx";
import Modal from "./components/PopupModal.jsx";

const ProductPage = () => {
    const get_url = "api/products";
    const get_val = "api/products/validateStock-Multiple";

    return (
        <div>
            <Modal/>
            <ProductList get_url={get_url} get_val={get_val}/>
        </div>
    );
};

export default ProductPage;
