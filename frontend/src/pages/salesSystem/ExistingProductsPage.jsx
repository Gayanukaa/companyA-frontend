import React from 'react';
import ProductList from "./components/ProductList.jsx";



const ExistingProductsPage = () => {
    const get_url = "api/existingProducts";
    const get_val = "api/existingProducts/validateStock-Muliple";


    return (
        <div>
            <ProductList get_url={get_url} get_val={get_val}/>
        </div>
    );
};


export default ExistingProductsPage;
