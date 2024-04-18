import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Alert from '@mui/material/Alert';
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2'
import './Login.css'
import { motion } from "framer-motion";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import bg2 from '../../../assets/bg1.jpeg';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
})


export default function Register() {


    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.countries);
            });
    }, []);


    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);

    const [createdCountry, setcreatedCountry] = useState(null);
    const [showAlert, setShowAlert] = useState(null);

    const [role, setRole] = useState(0);
    const [store, setStore] = useState('STOR_1');





    console.log(role)
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

        address: yup.string()
            .required('Address is required'),

        // country: yup.string()
        //     .required('Required'),

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
            address: '',
            // country: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            // console.log(values);
            handleSignupSubmit(values);
        },
    });



    const handleSignupSubmit = async (values) => {

        if (createdCountry) {

            const signInFormData = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                address: values.address,
                country: createdCountry,
                role: role,
                store: (role==1|| role==5|| role ==6) ? store: -1   
            }

            try {
                axios.post('http://localhost:3001/user/sign-up', signInFormData).then(response => {

                    const responseStatusReg = response.status;
                    if (responseStatusReg === 200 || responseStatusReg === 201) {
                        const registeredUser = {
                            email: values.email,
                            password: values.password
                        }



                        axios.post('http://localhost:3001/user/login', registeredUser).then(response2 => {
                            const responseStatusLog = response2.status;
                            if (responseStatusLog === 200 || responseStatusLog === 201) {

                                localStorage.setItem('token', response2.data['token']);

                                navigate('/');
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
        } else {
            setShowAlert("Please select your country");


        }

    }





    return (
        <section id="sectionLogin">
            <img src={bg2} class="bg" />
            <div class="overlay"></div>
            <motion.div animate={{ y: 0, opacity: 1 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.3, duration: 0.5 }} class="logIn ">

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
                            name="address"
                            value={formik.values.address}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            onChange={e => { formik.handleChange(e) }} id="address" label="Address" variant="outlined" fullWidth />
                    </Grid>
                </Grid>

                <Grid container spacing={2} >
                    <Grid item xs={12} style={{ zIndex: '100' }}>
                        <Autocomplete
                            id="country-select-demo"
                            options={countries}
                            autoHighlight
                            name="country"
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            onSelect={e => { setcreatedCountry(e.target.value); }}
                            renderInput={(params) => (
                                <TextField

                                    {...params}
                                    label="Country"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />



                    </Grid>
                </Grid>

                <Grid container spacing={2} >
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
                </Grid>


               {
                (role==1|| role==5|| role ==6) ?
                <Grid container spacing={2} >
                <Grid item xs={12} style={{  }}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={store}
                        label="Store"
                        onChange={(e)=>{setStore(e.target.value)}}
                        fullWidth
                        
                    >
                        <MenuItem value={'STOR_1'}>Colombo</MenuItem>
                        <MenuItem value={'STOR_2'} >Negombo</MenuItem>
                        <MenuItem value={'STOR_3'} >Galle</MenuItem>
                        <MenuItem value={'STOR_4'} >Matara</MenuItem>
                        <MenuItem value={'STOR_5'} >Jaffna</MenuItem>
                        <MenuItem value={'STOR_6'} >Trinco</MenuItem>
                       
                        
                    </Select>

                 
                </Grid>
            </Grid>:null
               }

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
                <div class="inputBox">
                    <input onClick={formik.handleSubmit} type="submit" value="Sign Up" id="btn" />
                </div>
                <div class="group">
                    <Link to="/login" className='nav-avatar-list'> Forgot password</Link>
                    <Link to="/login" className='nav-avatar-list'> Log In</Link>
                    {/* <a href="#">Forgot password</a>
                <a href="#">Sign Up</a> */}
                </div>


            </motion.div>


        </section>

    );
}
