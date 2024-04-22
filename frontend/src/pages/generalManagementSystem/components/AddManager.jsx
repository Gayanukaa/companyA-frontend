// SignUpForm.js
import React, { useState } from 'react';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CardForm from './CardForm';
// import "../../../styles/styles.css";
import '../../../styles/dashboard.css';

const AddManager = () => {
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


  const systemRoles = [
    { role: 'quality_assurance_manager', label: 'General Manager' },
    { role: 'inventory_manager', label: 'Inventory Manager' },
    { role: 'customer_order_manager', label: 'Customer Order Manager' },
    { role: 'financial_manager', label: 'Financial Manager' },
    { role: 'human_resource_manager', label: 'Human Resource Manager' },
    { role: 'logistic_manager', label: 'Logistic Manager' },
    { role: 'manufacturing_manager', label: 'Manufacturing Manager' },
    { role: 'sales_manager', label: 'Sales Manager' },
    { role: 'training_development_manager', label: 'Training Development Manager' },
    { role: 'general_manager', label: 'General Manager' },
  ];

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
            <h1>Create Manager Account</h1>
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
                      name="role"
                      onChange={handleChange}
                      value={formData.role}
                    >
                      {systemRoles.map((roleObject) => (
                        <MenuItem key={roleObject.role} value={roleObject.role}>
                          {roleObject.label}
                        </MenuItem>
                      ))}
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

export default AddManager;
