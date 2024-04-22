// SignUpForm.js
import React, { useState } from 'react';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CardForm from './CardForm';
// import "../../../styles/styles.css";
import '../../../styles/dashboard.css';
import * as reqSend from '../../../global/reqSender.jsx';
import { useNavigate } from 'react-router-dom';
import { systemRoles } from '../data/RoleDetails.jsx';



const AddManager = () => {
  const navigate = useNavigate();

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

    for (const key in formData) {
      if (formData[key] === '') {
        alert('Please fill in all fields');
        return;
      }
    }

    reqSend.defaultReq("POST", 'api/manager/createaccount', formData,
        response => {
          if (response.status === 200 && response.data) {
            navigate('/general-management/view-managers');
          } else {
            console.error("Invalid response format:", response);
          }
        },
        error => {
          console.error("API request failed:", error);
        }
      );



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
                  <Button onClick={handleSubmit} variant="contained" color="primary">
                    Create Account
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
