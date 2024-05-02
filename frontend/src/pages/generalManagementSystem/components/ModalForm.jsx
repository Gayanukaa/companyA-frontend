import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import '../../../styles/dashboard.css';
import { useLocation, useNavigate } from 'react-router-dom';
import * as reqSend from '../../../global/reqSender.jsx';
import { systemRoles } from '../data/RoleDetails.jsx';
import Swal from 'sweetalert2';

const ModalForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [managerDetails, setManagerDetails] = useState({});
  const [managerIdVariable, setManagerIdVariable] = useState();
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    if (location.state && location.state.managerId) {
      const managerId = location.state.managerId;
      setManagerIdVariable(managerId);
      const url = `api/manager/findById?id=${managerId}`;

      reqSend.defaultReq(
        "GET",
        url,
        {},
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


  useEffect(() => {
    setFormData({
      id: managerIdVariable || '',
      firstName: managerDetails.firstName || '',
      lastName: managerDetails.lastName || '',
      email: managerDetails.email || '',
      mobileNumber: managerDetails.mobileNumber || '',
      role: managerDetails.role || ''
    });
  }, [managerDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      role: ''
    });


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed && formData) {
        Swal.fire({
          title: "Updated!",
          text: "Manager has been updated.",
          icon: "success"
        });

        reqSend.defaultReq(
          "POST",
          'api/manager/updateById',
          formData,
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate('/general-management/view-managers');
    }
    });

  }


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
                    label="Mobile Number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Select Role</InputLabel>
                    <Select
                      onChange={handleChange}
                      value={formData.role}
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
                  <Button onClick={handleSubmit} variant="contained" color="primary">
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
