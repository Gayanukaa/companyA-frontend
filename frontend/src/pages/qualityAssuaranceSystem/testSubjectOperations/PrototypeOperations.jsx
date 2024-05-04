import React, { useState } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const PrototypeOperations = () => {
  const [prototypes, setPrototypes] = useState([]);
  const [selectedPrototype, setSelectedPrototype] = useState(null);
  const [inputId, setInputId] = useState('');
  const [deletePrototypeId, setDeletePrototypeId] = useState('');
  const [deletingMessage, setDeletingMessage] = useState('');
  const [showAll, setShowAll] = useState(false);

  const [updatingPrototypeId, setUpdatingPrototypeId] = useState('');
  const [newTestName, setNewTestName] = useState('');
  const [updatingMessage, setUpdatingMessage] = useState('');

  const [inspectPrototypeId, setInspectPrototypeId] = useState('');
  const [inspectTestId, setInspectTestId] = useState('');
  const [inspectResponse, setInspectResponse] = useState('');

  const [createPrototypeId, setCreatePrototypeId] = useState('');
  const [prototypeExpectedTest, setPrototypeExpectedTest] = useState('');
  const [prototypeReceivedDate, setPrototypeReceivedDate] = useState('');
  const [createMessage, setCreateMessage] = useState('');

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

  const changeTest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8090/api/v1/prototypes/changeTest', null, {
        params: {
          prototypeId: updatingPrototypeId, 
          newTestName: newTestName
        }
      });
      setUpdatingMessage(response.data);
    } catch (error) {
      setUpdatingMessage('Error occurred. Please try again.');
    }
};

  const deletePrototypeById = async () => {
    try {
      const response = await axios.delete(`http://localhost:8090/api/v1/prototypes/delete/${deletePrototypeId}`);
      getAllPrototypes();
      setDeletePrototypeId('');
      setSelectedPrototype(null);
      setDeletingMessage(response.data);
    } catch (error) {
      console.error('Error deleting prototype by ID:', error);
      setDeletingMessage('Error occurred. Please try again.');
    }
  };

  const handleTestPrototype = async () => {
    try {
      const response = await axios.put('http://localhost:8090/api/v1/prototypes/inspect', null, {
        params: {
          prototypeId: inspectPrototypeId,
          testId: inspectTestId
        }
      });
      setInspectResponse(response.data);
    } catch (error) {
      console.error('Error testing prototype:', error);
      setInspectResponse('Error testing prototype. Please try again.');
    }
  };

  const handleCreatePrototype = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:8090/api/v1/prototypes/createprototype', {
        id: createPrototypeId,
        expectedTest: prototypeExpectedTest,
        receivedDate: prototypeReceivedDate,
      });
      setCreateMessage(response.data);
      setCreatePrototypeId('');
      setPrototypeExpectedTest('');
      setPrototypeReceivedDate('');
      setCreateMessage(response.data);
    } catch (error) {
      console.error('Error creating prototype:', error);
      setCreateMessage('Error occurred. Please try again.');
    }
  };
  

  const handleShowAllClick = () => {
    getAllPrototypes();
    setShowAll(true);
  };

  return (
    <div style={{ margin: '30px 0' }}>
      <Button onClick={handleShowAllClick} variant="contained" color ="primary">Show All Prototypes</Button>
      {showAll && (
        <div>
        <Typography variant="h6" gutterBottom>All Prototypes with received dates and current test status</Typography>
        <table style={{ maxWidth: '700px' }}>
          <thead>
          <tr>
            <th>Prototype ID</th>
            <th>Received Date</th>
            <th>Test Status</th>
        </tr>
        </thead>
        <tbody>
          {prototypes.map(prototype => (
          <tr key={prototype.id}>
          <td>{prototype.id}</td>
          <td>{prototype.receivedDate}</td>
          <td>{prototype.testStatus}</td>
        </tr>
          ))}
        </tbody>
      </table>
        </div>
      )}

      <div style={{ margin: '30px 0' }}>
      <TextField
        type="text"
        variant="outlined"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
        label="Enter Prototype ID"
        style={{ marginRight: '6px' }}
      />
        <Button onClick={getPrototypeById} variant="contained" color ="primary">Get Prototype</Button>
      </div>
      {selectedPrototype && (
        <div>
          <h2>Selected Prototype</h2>
          <p>ID: {selectedPrototype.id}</p>
          <p>Received Date: {selectedPrototype.receivedDate}</p>
          <p>Test Status: {selectedPrototype.testStatus}</p>
          <p>Expected Test: {selectedPrototype.expectedTest}</p>
          {selectedPrototype.allocatedTest && (
            <div>
              <h3>Allocated Test</h3>
              <p>Test ID: {selectedPrototype.allocatedTest.testId}</p>
              <p>Name: {selectedPrototype.allocatedTest.name}</p>
            </div>
          )}
        </div>  
      )}

      <div style={{ margin: '30px 0' }}>
      <TextField
        type="text"
        variant="outlined"
        value={deletePrototypeId}
        onChange={(e) => setDeletePrototypeId(e.target.value)}
        label="Enter Prototype ID"
        style={{ marginRight: '6px' }}
      />
        <Button onClick={deletePrototypeById} variant="contained" color ="secondary">Delete Prototype</Button>
        {deletingMessage && <p>{deletingMessage}</p>}
      </div>

      <div style={{ margin: '30px 0' }}>
      <Typography variant="h6" gutterBottom>Update Test Method</Typography>
      <form onSubmit={changeTest}>
        <div style={{ marginBottom: '6px' }}>
          <TextField
            type="text"
            variant="outlined"
            value={updatingPrototypeId}
            onChange={(e) => setUpdatingPrototypeId(e.target.value)}
            label="Updating Prototype ID"
            required
            style={{ marginRight: '6px' }}
          />
        <TextField
          type="text"
          variant="outlined"
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
    <Typography variant="h6" gutterBottom>Test Prototype</Typography>
      <div style={{ marginBottom: '6px' }}>
      <TextField
        type="text"
        variant="outlined"
        value={inspectPrototypeId}
        onChange={(e) => setInspectPrototypeId(e.target.value)}
        label="Prototype ID"
        style={{ marginRight: '6px' }}
      />
      <TextField
        type="text"
        variant="outlined"
        value={inspectTestId}
        onChange={(e) => setInspectTestId(e.target.value)}
        label="Test ID"
        style={{ marginRight: '6px' }}
      />
      </div>
      <Button onClick={handleTestPrototype} variant="contained" color ="primary">Test Prototype</Button>
      {inspectResponse && <p>{inspectResponse}</p>}
    </div>

    <div style={{ margin: '30px 0' }}>
    <Typography variant="h6" gutterBottom>Add New Prototype</Typography>
      <form onSubmit={handleCreatePrototype}>
        <div style={{ marginBottom: '6px' }}>
        <TextField
          type="text"
          variant="outlined"
          value={createPrototypeId}
          onChange={(e) => setCreatePrototypeId(e.target.value)}
          label="ID"
          required
          style={{ marginRight: '6px' }}
        />
        <TextField
          type="text"
          variant="outlined"
          value={prototypeExpectedTest}
          onChange={(e) => setPrototypeExpectedTest(e.target.value)}
          label="Expected Test"
          required
          style={{ marginRight: '6px' }}
        />
        <TextField
          type="text"
          variant="outlined"
          value={prototypeReceivedDate}
          onChange={(e) => setPrototypeReceivedDate(e.target.value)}
          label="Received Date"
          required
          style={{ marginRight: '6px' }}
        />
        </div>
        <Button type="submit" variant="contained" color ="primary">Add Prototype</Button>
      </form>
      {createMessage && <p>{createMessage}</p>}
    </div>

    </div>
  );
};

export default PrototypeOperations;
