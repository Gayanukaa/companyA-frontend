import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';

function PreviousReports() {
  const [reports, setReports] = useState([]);
  const [showReports, setShowReports] = useState(false);

  useEffect(() => {
    if (showReports) {
      fetchReports();
    }
  }, [showReports]);

  const fetchReports = async () => {
    try {
      const response = await axios.get('https://spring-boot-companya.azurewebsites.net/api/v1/SmpReports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const toggleReports = () => {
    setShowReports(!showReports);
  };

  return (
    <div>
      <h4>Previously Generated Reports</h4>
      <Button variant="contained" color="primary" onClick={toggleReports}>{showReports ? "Hide Previous Reports" : "Show Previous Reports"}</Button>
      {showReports && (
        <table style={{ maxWidth: '600px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Report Type</th>
              <th>Generated Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.reportType}</td>
                <td>{report.generatedDateAndTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PreviousReports;
