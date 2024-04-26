import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.get(`http://localhost:8090/api/v1/SmpReports/getReport/${id}`);
      setReport(response.data);
    } catch (error) {
      setError('Error fetching report. Please try again.'); 
    }
  };

  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={handleInputChange}
        placeholder="Enter Report ID"
      />
      <button onClick={fetchReport}>Fetch Report</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      {report && (
        <div>
          <p>Report ID: {report.id}</p>
          <p>Report Type: {report.reportType}</p>
          <p>Generated Date and Time: {report.generatedDateAndTime}</p>
          <table  style={{ margin: '0 auto', borderCollapse: 'collapse', border: '1px solid black' }}>
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
