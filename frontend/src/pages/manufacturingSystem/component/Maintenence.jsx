import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { defaultReq } from "../../../global/reqSender";
import "./Maintenence.css";

function Maintenence() {
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState();
    const [postMessage, setPostMessage] = useState();


    const submitRequest = (e) => {
        e.preventDefault();
        // Perform input validation
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        const formErrors = {};
        // Example validation: Check if required fields are empty
        const requiredFields = ['machineId', 'maintenanceType'];
        requiredFields.forEach((field) => {
          if (!formDataObject[field]) {
            formErrors[field] = `${field} is required`;
          }
        });
        setErrors(formErrors);
        console.log(formErrors);
    
        // If there are no errors, submit the form or handle the data
        if (Object.keys(formErrors).length === 0) {
          // Submit the form or handle the data here
    
          const data = {
            "machineId": parseInt(formDataObject["machineId"]),
            "maintenanceType": formDataObject["maintenanceType"]
          }

          console.log(data)
    
          defaultReq("post", "api/maintenance/addMaintenanceRequest", data, (res) => {
              console.log("Post Successfully", res.data);
              setPostMessage(res.data);
          } , (res) => {
            console.log(res)
          }, (err) => {
              console.log(err);
              setError("Error Happened");
          })
    
        }
    }

    const deleteRequest = (e) => {
        e.preventDefault();
        // Perform input validation
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        const formErrors = {};
        // Example validation: Check if required fields are empty
        const requiredFields = ['machineId', 'maintenanceType'];
        requiredFields.forEach((field) => {
          if (!formDataObject[field]) {
            formErrors[field] = `${field} is required`;
          }
        });
        setErrors(formErrors);
    
        // If there are no errors, submit the form or handle the data
        if (Object.keys(formErrors).length === 0) {
          // Submit the form or handle the data here
    
          const data = {
            "machineId": parseInt(formDataObject["machineId"]),
            "maintenanceType": parseInt(formDataObject["maintenanceType"])
          }
    
          defaultReq("delete", "api/maintenance/deleteMaintenanceRequest", data, (res) => {
              console.log("Delete Successfully", res.data);
              setDeleteMessage("Request Delete Successfully");
          } , (res) => {
            console.log(res)
          }, (err) => {
              console.log(err);
              setError("Error Happened");
          })
    
        }
    }

    const checkRequest = (e) => {
        e.preventDefault();
        // Perform input validation
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        const formErrors = {};
        // Example validation: Check if required fields are empty
        const requiredFields = ['machineId', 'maintenanceType'];
        requiredFields.forEach((field) => {
          if (!formDataObject[field]) {
            formErrors[field] = `${field} is required`;
          }
        });
        setErrors(formErrors);
    
        // If there are no errors, submit the form or handle the data
        if (Object.keys(formErrors).length === 0) {
          // Submit the form or handle the data here
            
            const mainId = formDataObject["machineId"];
            const mainType = formDataObject["maintenanceType"];
            
          defaultReq("get", `api/maintenance/checkMaintenanceRequest?machineId=${mainId}&maintenanceType=${mainType}`, null, (res) => {
            setStatus(res.data ? "True" : "False")
          } , (res) => {
            console.log(res)
          }, (err) => {
              console.log(err);
              setError("Error Happened");
          })
    
        }
    }

  return (
    <div className='maintenence'>

        {error && (
            <div className="error msg">
                {error}
            </div>
        )}

        <div className='section'>
        <Box
      component="form"
      onSubmit={submitRequest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" align="center" gutterBottom>
        Maintenence Request Form
      </Typography>

      {/* New ID section */}
        <TextField
        name="machineId"
        label="Machine ID"
        color="secondary"
        focused
        error={!!errors.main_id}
        helperText={errors.main_id}
      />

     
      <TextField
        name="maintenanceType"
        label="Maintenence Type"
        type="text"
        color="secondary"
        focused
        error={!!errors.main_type}
        helperText={errors.main_type}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>

        {postMessage && (
            <div className="msg">
                {postMessage}
            </div>
        )}
        </div>

        <div className='section'>

            <Box
      component="form"
      onSubmit={deleteRequest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <Typography variant="h4" align="center" gutterBottom>
        Maintenence Delete
      </Typography>

      <TextField
        name="machineId"
        label="Machine ID"
        color="secondary"
        focused
        error={!!errors.main_id}
        helperText={errors.main_id}
      />

    <TextField
        name="maintenanceType"
        label="Maintenence Type"
        color="secondary"
        focused
        error={!!errors.main_type}
        helperText={errors.main_type}
      />


        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} style={{backgroundColor: "red"}}>
        Delete
      </Button>
    </Box>

        {deleteMessage && (
            <div className="delete msg">
                {deleteMessage}
            </div>
        )}

        </div>

        <div className='section'>
        <Box
      component="form"
      onSubmit={checkRequest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <Typography variant="h4" align="center" gutterBottom>
        Check Maintenence
      </Typography>

      {/* New ID section */}
        <TextField
        name="machineId"
        label="Machine ID"
        color="secondary"
        focused
        error={!!errors.main_id}
        helperText={errors.main_id}
      />

    <TextField
        name="maintenanceType"
        label="Maintenence Type"
        color="secondary"
        focused
        error={!!errors.id}
        helperText={errors.id}
      />


        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} 
        style={{backgroundColor: "limegreen"}}>
        Check
      </Button>

      {status && (
        <div className='msg status'>{status}</div>
      )}
    </Box>
        </div>
    </div>
  )
}

export default Maintenence