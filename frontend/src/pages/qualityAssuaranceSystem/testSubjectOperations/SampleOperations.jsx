import React, { useState } from 'react';
import axios from 'axios';

const SampleOperations = () => {
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [inputId, setInputId] = useState('');
  const [showAll, setShowAll] = useState(false);

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
      const response = await axios.get(`http://localhost:8090/api/v1/samples/getSample/${inputId}`);
      setSelectedSample(response.data);
    } catch (error) {
      console.error('Error fetching sample by ID:', error);
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
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Enter Sample ID"
        />
        <button onClick={getSampleById}>Get Sample by ID</button>
      </div>
      {selectedSample && (
        <div>
          <h2>Selected Sample</h2>
          <p>ID: {selectedSample.id}</p>
          <p>Received Date: {selectedSample.receivedDate}</p>
          <p>Test Status: {selectedSample.testStatus}</p>
          {selectedSample.allocatedTest && (
            <div>
              <h3>Allocated Test</h3>
              <p>Test ID: {selectedSample.allocatedTest.testId}</p>
              <p>Name: {selectedSample.allocatedTest.name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SampleOperations;
