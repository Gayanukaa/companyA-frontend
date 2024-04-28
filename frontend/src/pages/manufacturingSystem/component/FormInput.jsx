import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

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
  const { onChange } = props; // Only using onChange from props for demo purposes

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform input validation
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    const formErrors = {};
    // Example validation: Check if required fields are empty
    const requiredFields = ['id', 'warehouseId', 'name', 'quantity', 'thresholdQuantity', 'weight', 'size', 'reorderQuantity', 'stateOfProduct', 'inventoryType'];
    requiredFields.forEach((field) => {
      if (!formDataObject[field]) {
        formErrors[field] = `${field} is required`;
      }
    });
    setErrors(formErrors);

    // If there are no errors, submit the form or handle the data
    if (Object.keys(formErrors).length === 0) {
      // Submit the form or handle the data here
      console.log("Form submitted successfully:", formDataObject);
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
        name="warehouseId"
        label="Warehouse ID"
        color="secondary"
        focused
        error={!!errors.warehouseId}
        helperText={errors.warehouseId}
      />
      <TextField
        name="name"
        label="Name"
        color="secondary"
        focused
        error={!!errors.name}
        helperText={errors.name}
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
      {/* Add similar TextField components for other inputs */}

      {/* Select component for stateOfProduct */}
      <TextField
        select
        name="stateOfProduct"
        label="State of Product"
        color="secondary"
        focused
        error={!!errors.stateOfProduct}
        helperText={errors.stateOfProduct}
      >
        {Object.values(StateOfProduct).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Select component for inventoryType */}
      <TextField
        select
        name="inventoryType"
        label="Inventory Type"
        color="secondary"
        focused
        error={!!errors.inventoryType}
        helperText={errors.inventoryType}
      >
        {Object.values(InventoryType).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

export default FormInput;
