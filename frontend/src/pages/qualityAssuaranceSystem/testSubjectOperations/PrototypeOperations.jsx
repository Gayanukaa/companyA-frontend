import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrototypeOperations = () => {
  const [prototypes, setPrototypes] = useState([]);
  const [selectedPrototype, setSelectedPrototype] = useState(null);
  const [inputId, setInputId] = useState('');

  const getAllPrototypes = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/v1/prototypes/getAllPrototypes');
      setPrototypes(response.data);
    } catch (error) {
      console.error('Error fetching prototypes:', error);
    }
  };

  const getPrototypeById = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/api/v1/prototypes/getPrototype/{id}?id=${inputId}`);
      setSelectedPrototype(response.data);
    } catch (error) {
      console.error('Error fetching prototype by ID:', error);
    }
  };

  useEffect(() => {
    getAllPrototypes();
  }, []);

  return (
    <div>
      <h2>All Prototypes</h2>
      <ul>
        {prototypes.map(prototype => (
          <li key={prototype.id}>{prototype.id} - {prototype.receivedDate}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Enter Prototype ID"
        />
        <button onClick={getPrototypeById}>Get Prototype by ID</button>
      </div>
      {selectedPrototype && (
        <div>
          <h2>Selected Prototype</h2>
          <p>ID: {selectedPrototype.id}</p>
          <p>Received Date: {selectedPrototype.receivedDate}</p>
          <p>Test Status: {selectedPrototype.testStatus}</p>
          {selectedPrototype.allocatedTest && (
            <div>
              <h3>Allocated Test</h3>
              <p>Test ID: {selectedPrototype.allocatedTest.testId}</p>
              <p>Name: {selectedPrototype.allocatedTest.name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PrototypeOperations;
