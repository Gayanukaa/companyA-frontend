import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Typography, TextField, Button } from '@mui/material';

const SampleOperations = () => {
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [getSampleId, setGetSampleId] = useState('');
  const [deleteSampleId, setDeleteSampleId] = useState('');
  const [deletingMessage, setDeletingMessage] = useState('');
  const [showAll, setShowAll] = useState(false);

  const [updatingSampleId, setUpdatingSampleId] = useState('');
  const [newTestName, setNewTestName] = useState('');
  const [updatingMessage, setUpdatingMessage] = useState('');

  const [inspectSampleId, setInspectSampleId] = useState('');
  const [inspectTestId, setInspectTestId] = useState('');
  const [inspectResponse, setInspectResponse] = useState('');

  const [createSampleId, setCreateSampleId] = useState('');
  const [sampleExpectedTest, setSampleExpectedTest] = useState('');
  const [sampleReceivedDate, setSampleReceivedDate] = useState('');
  const [createMessage, setCreateMessage] = useState('');


  useEffect(() => {
    getAllSamples();
  }, []);

  const getAllSamples = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/v1/samples');
      setSamples(response.data);
    } catch (error) {
      console.error('Error fetching samples:', error);
    }
  };

  const getSampleById = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/api/v1/samples/getSample/${getSampleId}`);
      setSelectedSample(response.data);
    } catch (error) {
      console.error('Error fetching sample by ID:', error);
    }
  };

  const changeTest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8090/api/v1/samples/changeTest', null, {
        params: {
          sampleId: updatingSampleId, 
          newTestName: newTestName
        }
      });
      setUpdatingMessage(response.data);
    } catch (error) {
      setUpdatingMessage('Error occurred. Please try again.');
    }
};

  const deleteSampleById = async () => {
    try {
      const response = await axios.delete(`http://localhost:8090/api/v1/samples/delete/${deleteSampleId}`);
      getAllSamples();
      setDeleteSampleId('');
      setSelectedSample(null);
      setDeletingMessage(response.data);
    } catch (error) {
      console.error('Error deleting sample by ID:', error);
      setDeletingMessage(response.data);
    }
  };

  const handleTestSample = async () => {
    try {
      const response = await axios.put('http://localhost:8090/api/v1/samples/inspect', null, {
        params: {
          sampleId: inspectSampleId,
          testId: inspectTestId
        }
      });
      setInspectResponse(response.data);
    } catch (error) {
      console.error('Error testing sample:', error);
      setInspectResponse('Error testing sample. Please try again.');
    }
  };

  const handleCreateSample = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:8090/api/v1/samples/createsample', {
        id: createSampleId,
        expectedTest: sampleExpectedTest,
        receivedDate: sampleReceivedDate,
      });
      setCreateMessage(response.data);
      setCreateSampleId('');
      setSampleExpectedTest('');
      setSampleReceivedDate('');
    } catch (error) {
      console.error('Error creating sample:', error);
    }
  };
  

  const handleShowAllClick = () => {
    getAllSamples();
    setShowAll(true);
  };

  return (
    <div style={{ margin: '30px 0' }}>
      <Button onClick={handleShowAllClick} variant="contained" color ="primary">Show All Samples</Button>
      {showAll && (
        <div>
        <Typography variant="h6" gutterBottom>All Samples with received dates and current test status</Typography>
        <table style={{ maxWidth: '700px' }}>
          <thead>
          <tr>
          <th>Sample ID</th>
          <th>Received Date</th>
          <th>Test Status</th>
          </tr>
          </thead>
        <tbody>
          {samples.map(sample => (
          <tr key={sample.id}>
          <td>{sample.id}</td>
          <td>{sample.receivedDate}</td>
          <td>{sample.testStatus}</td>
        </tr>
          ))}
      </tbody>
      </table>
        </div>
      )}

      <div style={{ margin: '30px 0' }}>
      <TextField
        type="text"
        value={getSampleId}
        onChange={(e) => setGetSampleId(e.target.value)}
        label="Enter Sample ID"
      />
        <Button onClick={getSampleById} variant="contained" color ="primary">Get Sample</Button>
      </div>
      {selectedSample && (
        <div>
          <h2>Selected Sample</h2>
          <p>ID: {selectedSample.id}</p>
          <p>Received Date: {selectedSample.receivedDate}</p>
          <p>Test Status: {selectedSample.testStatus}</p>
          <p>Expected Test: {selectedSample.expectedTest}</p>
          {selectedSample.allocatedTest && (
            <div>
              <h3>Allocated Test</h3>
              <p>Test ID: {selectedSample.allocatedTest.testId}</p>
              <p>Name: {selectedSample.allocatedTest.name}</p>
            </div>
          )}
        </div>
      )}

        <div style={{ margin: '30px 0' }}>
        <TextField
          type="text"
          value={deleteSampleId}
          onChange={(e) => setDeleteSampleId(e.target.value)}
          label="Enter Sample ID"
        />
        <Button onClick={deleteSampleById} variant="contained" color ="secondary">Delete Sample</Button>
        {deletingMessage && <p>{deletingMessage}</p>}
      </div>

      <div style={{ margin: '30px 0' }}>
      <Typography variant="h6" gutterBottom>Update Test Method</Typography>
      <form onSubmit={changeTest}>
        <div style={{ marginBottom: '6px' }}>
        <TextField
          type="text"
          value={updatingSampleId}
          onChange={(e) => setUpdatingSampleId(e.target.value)}
          label="Updating Sample ID"
          required
          style={{ marginRight: '6px' }}
        />
        <TextField
          type="text"
          value={newTestName}
          onChange={(e) => setNewTestName(e.target.value)}
          label="New Test Name"
          required
          style={{ marginRight: '6px' }}
        />
        </div>
        <Button type="submit" variant="contained" color ="primary">Update Test Method</Button>
      </form>
      {updatingMessage && <p>{updatingMessage}</p>}
    </div>

    <div style={{ margin: '30px 0' }}>
    <Typography variant="h6" gutterBottom>Test Sample</Typography>
      <div style={{ marginBottom: '6px' }}>
      <TextField
        type="text"
        value={inspectSampleId}
        onChange={(e) => setInspectSampleId(e.target.value)}
        label="Sample ID"
        style={{ marginRight: '6px' }}
      />
      <TextField
        type="text"
        value={inspectTestId}
        onChange={(e) => setInspectTestId(e.target.value)}
        label="Test ID"
        style={{ marginRight: '6px' }}
      />
      </div>
      <Button onClick={handleTestSample} variant="contained" color ="primary">Test Sample</Button>
      {inspectResponse && <p>{inspectResponse}</p>}
    </div>

    <div style={{ margin: '30px 0' }}>
    <Typography variant="h6" gutterBottom>Add New Sample</Typography>
      <form onSubmit={handleCreateSample}>
        <div style={{ marginBottom: '6px' }}>
        <TextField
          type="text"
          value={createSampleId}
          onChange={(e) => setCreateSampleId(e.target.value)}
          label="ID"
          required
        />
        </div>
        <div style={{ marginBottom: '6px' }}>
        <TextField
          type="text"
          value={sampleExpectedTest}
          onChange={(e) => setSampleExpectedTest(e.target.value)}
          label="Expected Test"
          required
        />
        </div>
        <div style={{ marginBottom: '6px' }}>
        <TextField
          type="text"
          value={sampleReceivedDate}
          onChange={(e) => setSampleReceivedDate(e.target.value)}
          label="Received Date"
          required
        />
        </div>
        <Button type="submit" variant="contained" color ="primary">Add Sample</Button>
      </form>
      {createMessage && <p>{createMessage}</p>}
    </div>
    </div>
  );
};

export default SampleOperations;