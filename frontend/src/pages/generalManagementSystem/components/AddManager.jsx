// SignUpForm.js
import React, { useState } from 'react';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CardForm from './CardForm';
// import "../../../styles/styles.css";
import '../../../styles/dashboard.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (send data to backend, etc.)
    console.log(formData);
    // Reset form after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: ''
    });
  };

  return (

    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Fill Manager Details</h1>
          </div>

          <div className="card-theme">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Select Role</InputLabel>
                      <Select
                        value={formData.role}
                        onChange={handleChange}
                        name="role"
                      >
                        <MenuItem value="admin">General Manager</MenuItem>
                        <MenuItem value="user">HR Manager</MenuItem>
                        <MenuItem value="user">Inventory Manager</MenuItem>
                        <MenuItem value="user">Logistic Manager</MenuItem>
                        <MenuItem value="user">Finance Manager</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
        </div>
      </main>
    </>
  );
};

export default SignUpForm;
