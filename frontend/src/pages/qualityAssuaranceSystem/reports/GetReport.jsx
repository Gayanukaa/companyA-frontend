import React, { useState } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const GetReport = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [id, setId] = useState('');

  const handleInputChange = (event) => {
    setId(event.target.value);
    setError(null);
  };

  const fetchReport = async () => {
    try {
      const response = await axios.get(`https://spring-boot-companya.azurewebsites.net/api/v1/SmpReports/getReport/${id}`);
      setReport(response.data);
    } catch (error) {
      setError('Error fetching report. Please try again.'); 
    }
  };

  return (
    <div>
      <TextField
        type="text"
        value={id}
        onChange={handleInputChange}
        placeholder="Enter Report ID"
        variant="outlined"
        style={{ marginBottom: '10px', marginRight: '6px' }}
      />
      <Button variant="contained" color="primary" onClick={fetchReport} style={{ marginRight: '10px' }}>
        Fetch Report
      </Button>
      {error && <Typography variant="body1" style={{ color: 'red', marginBottom: '10px' }}>{error}</Typography>}
      {report && (
        <div>
          <Typography variant="body1">Report ID: {report.id}</Typography>
          <Typography variant="body1">Report Type: {report.reportType}</Typography>
          <Typography variant="body1">Generated Date and Time: {report.generatedDateAndTime}</Typography>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Test Name</th>
                <th>Received Date</th>
                <th>Test Status</th>
              </tr>
            </thead>
            <tbody>
              {report.reportContent.split('\n\n').map((sample, index) => (
                <tr key={index}>
                  {sample.split('\n').map((data, idx) => (
                    <td key={idx}>{data.split(': ')[1]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetReport;
