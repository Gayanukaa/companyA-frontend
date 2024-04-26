import '../../styles/dashboard.css';
import '../../styles/style.css';

import { Route, Routes } from 'react-router-dom';

import ProductPage from "./ProductPage.jsx";
import ExistingProductsPage from "./ExistingProductsPage.jsx";


export default function Dashboard() {

 return (
        <>
            <Routes>

                <Route path="/dashboard" element={<ProductPage />} />
                <Route path="/existingproducts" element={<ExistingProductsPage />} />
            </Routes>

        </>
    )
}