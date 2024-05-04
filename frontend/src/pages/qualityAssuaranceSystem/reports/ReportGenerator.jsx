import React, { useState } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ReportGenerator = ({ reportType, buttonText }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateReport = () => {
    setLoading(true);
    const endpoint = reportType === 'sample' 
      ? 'http://localhost:8090/api/v1/SmpReports/samples/generate' 
      : 'http://localhost:8090/api/v1/SmpReports/prototypes/generate';
    axios.post(endpoint)
      .then(response => {
        setReport(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error generating report.');
        setLoading(false);
      });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={generateReport} disabled={loading} style={{ marginBottom: '10px' }}>
        {buttonText}
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {report && (
        <div>
          <Typography>Report ID: {report.id}</Typography>
          <Typography>Report Type: {report.reportType}</Typography>
          <Typography>Generated Date and Time: {report.generatedDateAndTime}</Typography>
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
export default ReportGenerator;