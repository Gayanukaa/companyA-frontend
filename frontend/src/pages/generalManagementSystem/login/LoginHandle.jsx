import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';

const LoginHandle = () => {

    return (
        <>
            <Routes>
                <Route path="/manager" element={<Login role="manager" />} />
                <Route path="/customer" element={<Login role="customer" />} />
            </Routes>
        </>
    );
}

export default LoginHandle;
