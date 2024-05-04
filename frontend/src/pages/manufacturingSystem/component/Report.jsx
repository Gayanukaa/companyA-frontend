import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { defaultReq } from "../../../global/reqSender";
import './Report.css';


function Report() {

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({})
    const [status ,setStatus] = useState(null);

    const [name, setName] = useState(null);
    const [reports, setReports] = useState([]);

    function formatDate(dateString) {
      // Create a new Date object using the input date string
      const date = new Date(dateString);
  
      // Check if the date is valid
      if (isNaN(date)) {
          return "Invalid Date";
      }
  
      // Format the date into a standard format (e.g., YYYY-MM-DD)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
  
      return `${year}-${month}-${day}`;
  }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform input validation
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        const formErrors = {};
        // Example validation: Check if required fields are empty
        const requiredFields = ['reportName', "reportDate", "createdBy", "description", "numberOfOrdersCompleted", "totalQuantityOfProductsCompleted"];
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
            "reportName": formDataObject["reportName"],
            "reportDate": formDataObject["reportDate"],
            "createdBy": formDataObject["createdBy"],
            "description": formDataObject["description"],
            "numberOfOrdersCompleted": formDataObject["numberOfOrdersCompleted"],
            "totalQuantityOfProductsCompleted": formDataObject["totalQuantityOfProductsCompleted"]
          }
          
      
          defaultReq("post", "api/reports/create", data, (res) => {
              console.log("Updated Successfully", res.data);
              setStatus("Report Submitted Successfully");
          } , (res) => {
            console.log(res);
            setError("Something Went Wrong!");
          }, (err) => {
              console.log(err);
              setError("Error Happened");
          })
    
        }
      };

      const getReports = () => {
        defaultReq("get", `api/reports/${name}`, null, (res) => {
          setReports(res.data);
        } , (res) => {
        console.log(res);
        setError("Something Went Wrong!");
        }, (err) => {
          console.log(err);
          setError("Error Happened while fetch reports");
        })
      }


      return (
        <div>
          <div>
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
            Report
          </Typography>
    
         
          <TextField
            name="reportName"
            label="Report Name"
            type="text"
            color="secondary"
            focused
            error={!!errors.reportName}
            helperText={errors.reportName}
          />

<TextField
            name="reportDate"
            label="Report Date"
            type="date"
            color="secondary"
            focused
            error={!!errors.reportDate}
            helperText={errors.reportDate}
          />

<TextField
            name="createdBy"
            label="Created By"
            type="text"
            color="secondary"
            focused
            error={!!errors.createdBy}
            helperText={errors.createdBy}
          />

<TextField
            name="description"
            label="Description"
            type="text"
            color="secondary"
            focused
            error={!!errors.description}
            helperText={errors.description}
          />

<TextField
            name="numberOfOrdersCompleted"
            label="Number of Order Completed"
            type="number"
            color="secondary"
            focused
            error={!!errors.numberOfOrdersCompleted}
            helperText={errors.numberOfOrdersCompleted}
          />

<TextField
            name="totalQuantityOfProductsCompleted"
            label="Total Quantity of Products Completed"
            type="number"
            color="secondary"
            focused
            error={!!errors.totalQuantityOfProductsCompleted}
            helperText={errors.totalQuantityOfProductsCompleted}
          />
    
    
    
    
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
    
          {status && (
            <div className="msg status">{status}</div>
          )}

          {error && (
            <div className="msg error">{error}</div>
          )}
        </Box>
          </div>

          <div className="report-form">
            <h1>Get Reports</h1>

            <div className="form-box">
              <label>Enter Name </label>
              <input type="text" required id="report_name" value={name} onChange={e => setName(e.target.value)}/>
              <button id="report-btn" onClick={getReports}>Get Reports</button>
            </div>

            <div className="report-grid">
              {reports.map((report, index) => (
                <div className="report-box">
                  <div className="report-col">
                    Report ID: <i>{report.id}</i>
                  </div>
                  <div className="report-col">
                    Report Name: <i>{report.reportName}</i>
                  </div>
                  <div className="report-col">
                    Report Date: <i>{formatDate(report.reportDate)}</i>
                  </div>
                  <div className="report-col">
                    Description: <i>{report.description}</i>
                  </div>
                  <div className="report-col">
                    Number of Orders Completed: <i>{report.numberOfOrdersCompleted}</i>
                  </div>
                  <div className="report-col">
                    Total Quantity of Products Completed: <i>{report.totalQuantityOfProductsCompleted}</i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default Report