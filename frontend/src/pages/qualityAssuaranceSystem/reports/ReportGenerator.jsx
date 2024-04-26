import React, { useState } from 'react';
import axios from 'axios';

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
      <button onClick={generateReport} disabled={loading}>
        {buttonText}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {report && (
        <div>
          <p>Report ID: {report.id}</p>
          <p>Report Type: {report.reportType}</p>
          <p>Generated Date and Time: {report.generatedDateAndTime}</p>
          <table style={{ margin: '0 auto', borderCollapse: 'collapse', border: '1px solid black' }}>
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