import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, TextField } from '@mui/material';

const ReportDelete = () => {
  const [deleteReportId, setDeleteReportId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setDeleteReportId(event.target.value);
    setResponseMessage('');
    setError(null);
  };

  const deleteReport = async () => {
    try {
      const response = await axios.delete(`http://localhost:8090/api/v1/SmpReports/delete/${deleteReportId}`);
      setResponseMessage(response.data);
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
      } else {
        setError('Error deleting report. Please try again.');
      }
    }
  };

  return (
    <div>
      <TextField
        type="text"
        value={deleteReportId}
        onChange={handleInputChange}
        placeholder="Enter Report ID"
        variant="outlined"
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="secondary" onClick={deleteReport} style={{ marginRight: '10px' }}>
        Delete Report
      </Button>
      {responseMessage && <Typography variant="body1">{responseMessage}</Typography>}
      {error && <Typography variant="body1" style={{ color: 'red' }}>{error}</Typography>}
    </div>
  );
};

export default ReportDelete;
