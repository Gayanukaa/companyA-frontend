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
    <div>
      <h2>All Samples</h2>
      <button onClick={handleShowAllClick}>Show All Samples</button>
      {showAll && (
        <ul>
          {samples.map(sample => (
            <li key={sample.id}>{sample.id} - {sample.receivedDate}</li>
          ))}
        </ul>
      )}

      <div>
        <input
          type="text"
          value={getSampleId}
          onChange={(e) => setGetSampleId(e.target.value)}
          placeholder="Enter Sample ID to Get"
        />
        <button onClick={getSampleById}>Get Sample by ID</button>
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

        <div>
        <input
          type="text"
          value={deleteSampleId}
          onChange={(e) => setDeleteSampleId(e.target.value)}
          placeholder="Enter Sample ID to Delete"
        />
        <button onClick={deleteSampleById}>Delete Sample by ID</button>
        {deletingMessage && <p>{deletingMessage}</p>}
      </div>

      <div>
      <h2>Update Test Method</h2>
      <form onSubmit={changeTest}>
        <div>
          <label>Updating Sample ID:</label>
          <input
            type="text"
            value={updatingSampleId}
            onChange={(e) => setUpdatingSampleId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Test Name:</label>
          <input
            type="text"
            value={newTestName}
            onChange={(e) => setNewTestName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Test Method</button>
      </form>
      {updatingMessage && <p>{updatingMessage}</p>}
    </div>

    <div>
      <h2>Test Sample</h2>
      <div>
        <label>Sample ID:</label>
        <input
          type="text"
          value={inspectSampleId}
          onChange={(e) => setInspectSampleId(e.target.value)}
        />
      </div>
      <div>
        <label>Test ID:</label>
        <input
          type="text"
          value={inspectTestId}
          onChange={(e) => setInspectTestId(e.target.value)}
        />
      </div>
      <button onClick={handleTestSample}>Test Sample</button>
      {inspectResponse && <p>{inspectResponse}</p>}
    </div>

    <div>
      <h2>Create Sample</h2>
      <form onSubmit={handleCreateSample}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            value={createSampleId}
            onChange={(e) => setCreateSampleId(e.target.value)}
          />
        </div>
        <div>
          <label>Expected Test:</label>
          <input
            type="text"
            value={sampleExpectedTest}
            onChange={(e) => setSampleExpectedTest(e.target.value)}
          />
        </div>
        <div>
          <label>Received Date:</label>
          <input
            type="text"
            value={sampleReceivedDate}
            onChange={(e) => setSampleReceivedDate(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {createMessage && <p>{createMessage}</p>}
    </div>
    </div>
  );
};

export default SampleOperations;