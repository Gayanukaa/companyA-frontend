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



    const systemRoles = {
        quality_assurance_manager: '/qualityassuarance-management/dashboard',
        inventory_manager: '/inventory-management/dashboard',
        customer_order_manager: '/customerorder-management/dashboard',
        financial_manager: '/finantial-management/dashboard',
        human_resource_manager: '/humanResource-management/dashboard',
        logistic_manager: '/logistic-management/dashboard',
        manufacturing_manager: '/manufacturing-management/dashboard',
        sales_manager: '/sales-management/dashboard',
        training_development_manager: '/trainingdevelopment-management/dashboard',
        general_manager: '/general-management/dashboard',
        customer: '/'
    };
    


    const navigateToManagerPortal = (role) => {
        const portalLink = systemRoles[role];
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
                        localStorage.setItem("role", response.data.role);
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
                
                <div className="group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/sign-up" className='nav-avatar-list'>Don't have an account? Sign Up</Link>
                </div>
            </motion.div>
        </section>
    )
}


export default Login;