import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Alert from '@mui/material/Alert';
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2'
import './Login.css'
import { motion } from "framer-motion";


import bg2 from '../../../assets/bg1.jpeg';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
})


export default function Register() {

    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(null);

    const [store, setStore] = useState('STOR_1');




    const validationSchema = yup.object({
        firstName: yup.string()
            .min(2, 'Min 2 characters')
            .max(15, 'Max 15 characters')
            .required('Required'),
        lastName: yup.string()
            .min(2, 'Min 2 characters')
            .max(15, 'Max 15 characters')
            .required('Required'),

        email: yup.string()
            .email('Invalid email format')
            .required('Required'),

        mobileNumber: yup.string()
            .required('Address is required'),

        password: yup.string()
            .required('Required')
            .test('uppercase', 'Must include at least 1 uppercase character', value =>
                /[A-Z]/.test(value)
            )
            .test('lowercase', 'Must include at least 1 lowercase character', value =>
                /[a-z]/.test(value)
            )
            .test('special', 'Must include at least 1 special character', value =>
                /[@$!%*?&]/.test(value)
            )
            .test('number', 'Must include at least 1 number', value =>
                /\d/.test(value)
            )
            .test('minLength', 'Must be at least 8 characters long', value =>
                value.length >= 8
            ),

        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });


    // validateReg
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            handleSignupSubmit(values);
        },
    });



    const handleSignupSubmit = async (values) => {

            const signInFormData = {
                firstName: values.firstName,
                lastName: values.lastName,
                mobileNumber: values.mobileNumber,
                email: values.email,
                password: values.password,
                role: 'customer',
            }

            console.log(signInFormData);

            try {
                axios.post('https://spring-boot-companya.azurewebsites.net/customer/register', signInFormData).then(response => {

                    const responseStatusReg = response.status;
                    if (responseStatusReg === 200 || responseStatusReg === 201) {
                        const registeredUser = {
                            email: values.email,
                            password: values.password,
                            role: 'customer'
                        }



                        axios.post('https://spring-boot-companya.azurewebsites.net/api/login', registeredUser).then(response2 => {
                            const responseStatusLog = response2.status;
                            if (responseStatusLog === 200 || responseStatusLog === 201) {

                                localStorage.setItem("role", response2.data.role);

                                navigate('/customer/dashboard');
                                Toast.fire({ icon: 'success', title: 'You have successfully Registered!' });
                            } else {
                                setShowAlert(response2.data['message'])
                            }
                        }).catch(error => { // Handle any errors
                            setShowAlert("Error")
                        });

                    } else {
                        setShowAlert(response.data['message'])
                    }

                }).catch(() => { // Handle any errors
                    setShowAlert("Error");

                });
            } catch (err) {
        }

    }





    return (
        <section id="sectionLogin">
            <img src={bg2} className="bg" />
            <div className="overlay"></div>
            <motion.div animate={{ y: 0, opacity: 1 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.3, duration: 0.5 }} className="logIn ">

                <h2>Sign Up</h2>
                {showAlert && (
                    <Alert severity="error">Error -<strong>{showAlert}</strong></Alert>
                )}

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            name="firstName"
                            value={formik.values.firstName}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            onChange={e => { formik.handleChange(e) }} id="first-name" label="First Name" variant="outlined" fullWidth />
                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            name="lastName"
                            value={formik.values.lastName}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            onChange={e => { formik.handleChange(e) }} id="last-name" label="Last Name" variant="outlined" fullWidth />
                    </Grid>
                </Grid>


                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onChange={e => { formik.handleChange(e); setShowAlert(null) }} id="email" label="Email Address" variant="outlined" fullWidth />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="mobileNumber"
                            value={formik.values.address}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            onChange={e => { formik.handleChange(e) }} id="mobileNumber" label="Mobile Number" variant="outlined" fullWidth />
                    </Grid>
                </Grid>


                {/* <Grid container spacing={2} >
                    <Grid item xs={12} style={{  }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Role"
                            onChange={(e)=>{setRole(e.target.value)}}
                            fullWidth
                        >
                            <MenuItem value={0}>Customer</MenuItem>
                            <MenuItem value={1}>Store Manager</MenuItem>
                            <MenuItem value={2}>Delevery Manager</MenuItem>
                            <MenuItem value={3}>Route Manager</MenuItem>
                            <MenuItem value={4}>Product Manager</MenuItem>
                            <MenuItem value={5}>Driver</MenuItem>
                            <MenuItem value={6}>Driver Assistant</MenuItem>
                            
                        </Select>   
                    </Grid>
                </Grid> */}


                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            name="password"
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onChange={e => { formik.handleChange(e) }} id="password" label="Password" variant="outlined" type="password" fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            onChange={e => { formik.handleChange(e) }} id="confirm-password" label="Confirm Password" variant="outlined" type="password" fullWidth />
                    </Grid>
                </Grid>
                <div className="inputBox">
                    <input onClick={formik.handleSubmit} type="submit" value="Sign Up" id="btn" />
                </div>

                <div className="group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/login/customer" className='nav-avatar-list'>Already have an account? Log In</Link>
                </div>
            </motion.div>


        </section>

    );
}
