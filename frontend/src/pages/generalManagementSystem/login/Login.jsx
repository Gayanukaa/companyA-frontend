import React, { useEffect } from 'react'
import './Login.css'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { forwardRef, useImperativeHandle } from 'react';
import { motion } from "framer-motion";

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
    

    const submitLogForm = () => {
        if (loginEmail !== "" && loginPassword !== "") {

            const loginFormData = {
                email: loginEmail,
                password: loginPassword
            }


            axios.post('http://localhost:3001/user/login', loginFormData).then(response => {
                const responseStatus = response.status;
                console.log(response.data)
                if (responseStatus === 200 | responseStatus === 201) {
                    localStorage.setItem('token', response.data['token']);
                    localStorage.setItem('role', response.data['role']);
                    localStorage.setItem('store', response.data['store']);
                    if (response.data.status === 0) {
                        navigate('/');
                    } else {
                        navigate('/dashboard');
                    }

                    Toast.fire({ icon: 'success', title: 'You have successfully logged in!' });
                } else {
                    setShowAlert(response.data['message'])
                }
            }).catch(error => { // Handle any errors
                setShowAlert("Error Occured")
            });
        } else {
            setShowAlert("Some fiels are Empty")
        }
    }



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

                {props.role && props.role === "manager" && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Position"
                                value={managerPosition}
                                onChange={e => setManagerPosition(e.target.value)}
                                variant="outlined"
                            >
                                {positions.map(position => (
                                    <MenuItem key={position.value} value={position.value}>
                                        {position.label}
                                    </MenuItem>
                                ))}

                            </TextField>
                        </Grid>
                    </Grid>
                )}

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