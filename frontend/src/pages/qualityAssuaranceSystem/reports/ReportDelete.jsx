import React, { useState } from 'react';
import axios from 'axios';

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
      <input
        type="text"
        value={deleteReportId}
        onChange={handleInputChange}
        placeholder="Enter Report ID"
      />
      <button onClick={deleteReport}>Delete Report</button>
      {responseMessage && <p>{responseMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ReportDelete;
