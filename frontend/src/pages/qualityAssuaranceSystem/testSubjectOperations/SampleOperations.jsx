import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SampleOperations = () => {
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [getSampleId, setGetSampleId] = useState('');
  const [deleteSampleId, setDeleteSampleId] = useState('');
  const [showAll, setShowAll] = useState(false);

  const [updatingSampleId, setUpdatingSampleId] = useState('');
  const [newTestName, setNewTestName] = useState('');
  const [updatingMessage, setUpdatingMessage] = useState('');

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
      await axios.delete(`http://localhost:8090/api/v1/samples/delete/${deleteSampleId}`);
      getAllSamples();
      setDeleteSampleId('');
      setSelectedSample(null);
    } catch (error) {
      console.error('Error deleting sample by ID:', error);
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
    </div>
  );
};

export default SampleOperations;