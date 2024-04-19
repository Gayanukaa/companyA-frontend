import React, { useEffect } from 'react'
import './Login.css'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { forwardRef, useImperativeHandle } from 'react';
import { motion } from "framer-motion";
import * as reqSend from '../../../global/reqSender.jsx';

import bg1 from '../../../assets/bg1.jpeg';



const Login = (props) => {

    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [managerPosition, setManagerPosition] = useState('');
    const [showAlert, setShowAlert] = useState(null);


    const positions = [
        { value: 'general_manager', label: 'General Manager' },
        { value: 'inventory_manager', label: 'Inventory Manager' },
        { value: 'human_resource_manager', label: 'Human Resource Manager' },
        { value: 'customer_order_manager', label: 'Customer Order Manager' },
        { value: 'financial_manager', label: 'Financial Manager' },
        { value: 'logistic_manager', label: 'Logistic Manager' },
        { value: 'manufacturing_manager', label: 'Manufacturing Manager' },
        { value: 'quality_assurance_manager', label: 'Quality Assurance Manager' },
        { value: 'sales_manager', label: 'Sales Manager' },
        { value: 'training_development_manager', label: 'Training and Development Manager' },
    ];


    const systemRoles = {
        quality_assurance_manager: '/qualityassuarance-management',
        inventory_manager: '/inventory-management',
        customer_order_manager: '/customerorder-management',
        financial_manager: '/finantial-management',
        human_resource_manager: '/humanResource-management',
        logistic_manager: '/logistic-management',
        manufacturing_manager: '/manufacturing-management',
        sales_manager: '/sales-management',
        training_development_manager: '/trainingdevelopment-management',
        customer: '/'
    };
    


    const navigateToManagerPortal = (role) => {
        const portalLink = systemRoles[role] || '/general-management';
        navigate(portalLink);
    };


    
    const submitLogForm = () => {
        if (loginEmail && loginPassword && props.role) {
            const loginFormData = {
                email: loginEmail,
                password: loginPassword,
                role: props.role
            };
    
            reqSend.defaultReq("POST", 'api/login', loginFormData, 
                response => {
                    if (response.status === 200 && response.data && response.data.role) {
                        navigateToManagerPortal(response.data.role);
                    } else {
                        console.error("Invalid response format:", response);
                    }
                },
                error => {
                    console.error("API request failed:", error);
                }
            );
        } else {
            console.error("Missing or invalid login credentials");
        }
    };
    



    return (

        <section id="sectionLogin">
            <img src={bg1} className="bg" />
            <div className="overlay"></div>
            <motion.div animate={{ y: 0, opacity: 1 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.3, duration: 0.5 }} className="logIn ">

                <h2>{props.role && props.role === "manager" ? "Manager Login" : props.role === "customer" ? "Customer Login" : ""}</h2>

                {showAlert && (
                    <Alert severity="error">Error -<strong>{showAlert}</strong></Alert>
                )}

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            onChange={e => { setLoginEmail(e.target.value); setShowAlert(null) }}
                            id="email" label="Email Address" variant="outlined" fullWidth />
                    </Grid>
                </Grid>


                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            onChange={e => { setLoginPassword(e.target.value); setShowAlert(null) }}
                            id="password" label="Password" variant="outlined" type="password" fullWidth />
                    </Grid>
                </Grid>

                <div className="inputBox">
                    <input type="submit" value="Log In" id="btn" onClick={submitLogForm} />
                </div>
                <div className="group">
                    <Link to="/" className='nav-avatar-list'>Forgot password</Link>
                    <Link to="/register" className='nav-avatar-list'> Sign Up</Link>
                </div>


            </motion.div>


        </section>
    )
}


export default Login;