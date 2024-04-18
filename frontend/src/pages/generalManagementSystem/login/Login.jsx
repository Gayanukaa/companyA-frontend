import React from 'react'
import './Login.css'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { forwardRef, useImperativeHandle } from 'react';
import { motion } from "framer-motion";

import bg1 from '../../../assets/bg1.jpeg';






function Login() {

    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showAlert, setShowAlert] = useState(null);


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
                    if (response.data.status===0){
                        navigate('/');
                    }else{
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

                <h2>Log In</h2>
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
                    <Link to="/" className='nav-avatar-list'> Forgot password</Link>
                    <Link to="/register" className='nav-avatar-list'> Sign Up</Link>
                    {/* <a href="#">Forgot password</a>
                    <a href="#">Sign Up</a> */}
                </div>


            </motion.div>


        </section>
    )
}


export default forwardRef(Login)