// SignUpForm.js
import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import '../../../styles/dashboard.css';
import { useLocation } from 'react-router-dom';
import * as reqSend from '../../../global/reqSender.jsx';



const ModalForm = () => {

  const location = useLocation();
  const [managerDetails, setManagerDetails] = useState();

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


  useEffect(() => {
    if (location.state && location.state.managerId) {
      const managerId = location.state.managerId;

      const url = `api/manager/findById?id=${managerId}`;

      reqSend.defaultReq("GET", url, {},
        response => {
          if (response.status === 200 && response.data && response.data.role) {
            setManagerDetails(response.data);
          } else {
            console.error("Invalid response format:", response);
          }
        },
        error => {
          console.error("API request failed:", error);
        }
      );
    }
  }, [location.state]);


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
            <h1>Update Manager Details</h1>
          </div>

          <div className="card-theme">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={managerDetails && managerDetails.firstName ? managerDetails.firstName : ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={managerDetails && managerDetails.lastName ? managerDetails.lastName : ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={managerDetails && managerDetails.email ? managerDetails.email : ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={managerDetails && managerDetails.mobileNumber ? managerDetails.mobileNumber : ""}
                    onChange={handleChange}
                  />
                </Grid>


                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Select Role</InputLabel>
                    <Select
                      onChange={handleChange}
                      value={managerDetails && managerDetails.role ? managerDetails.role : ""}
                      name="role"
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
                    Update
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

export default ModalForm;
