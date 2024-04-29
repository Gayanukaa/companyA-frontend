import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { defaultReq } from "../../../global/reqSender";

// Define the enums
const StateOfProduct = {
  NEW: "New",
  ORDERED: "Ordered",
  IN_STOCK: "In Stock",
  LOW_STOCK: "Low Stock",
  DAMAGED: "Damaged",
};

const InventoryType = {
  STOCKS: "Stocks",
  SUPPLIES: "Supplies",
};

const FormInput = (props) => {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const { onChange } = props; // Only using onChange from props for demo purposes

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform input validation
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    const formErrors = {};
    // Example validation: Check if required fields are empty
    const requiredFields = ['id', 'quantity'];
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
        "id": parseInt(formDataObject["id"]),
        "quantity": parseInt(formDataObject["quantity"])
      }

      defaultReq("put", "api/v1/inventory/updateMaterialRequest", data, (res) => {
          console.log("Updated Successfully", res.data);
          setStatus(res.data);
      } , (res) => {
        console.log(res)
      }, (err) => {
          console.log(err);
          setErrors("Error Happened");
      })

    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        Material Request Form
      </Typography>

      {/* New ID section */}
        <TextField
        name="id"
        label="ID"
        color="secondary"
        focused
        error={!!errors.id}
        helperText={errors.id}
      />

     
      <TextField
        name="quantity"
        label="Quantity"
        type="number"
        color="secondary"
        focused
        error={!!errors.quantity}
        helperText={errors.quantity}
      />




      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>

      {status && (
        <div style={{display: "flex", margin: "10px 150px", justifyContent: "center", backgroundColor: "limegreen", padding: "5px"}}>
          {status}
        </div>
      )}
    </Box>
  );
}

export default FormInput;
