import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestOperations = () => {
  const [tests, setTests] = useState([]);
  const [newTestId, setNewTestId] = useState('');
  const [newTestName, setNewTestName] = useState('');
  const [fetchTestId, setFetchTestId] = useState('');
  const [fetchedTest, setFetchedTest] = useState(null);
  const [deleteTestId, setDeleteTestId] = useState('');
  const [deleteResponse, setDeleteResponse] = useState('');

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/v1/tests');
      setTests(response.data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const handleAddTest = async () => {
    try {
      const response = await axios.post('http://localhost:8090/api/v1/tests/addTest', {
        testId: newTestId,
        name: newTestName,
      });
      setTests([...tests, response.data]);
      setNewTestId('');
      setNewTestName('');
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };

  const handleDeleteTest = async () => {
    try {
      const response = await axios.delete(`http://localhost:8090/api/v1/tests/delete/${deleteTestId}`);
      setTests(tests.filter((test) => test.testId !== deleteTestId));
      setDeleteResponse(response.data);
      setDeleteTestId('');
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  const handleFetchTest = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/api/v1/tests/getTest/${fetchTestId}`);
      setFetchedTest(response.data);
    } catch (error) {
      console.error('Error fetching test:', error);
    }
  };

  return (
    <div>
      <h1>All Available Tests</h1>
      <ul>
        {tests.map((test) => (
          <li key={test.testId}>
            {test.name}
          </li>
        ))}
      </ul>
      <div>
        {/*<input
          type="text"
          placeholder="Enter test ID"
          value={newTestId}
          onChange={(e) => setNewTestId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter test name"
          value={newTestName}
          onChange={(e) => setNewTestName(e.target.value)}
        />
  <button onClick={handleAddTest}>Add Test</button>*/}
  <h2>Add New Test</h2>
      <form onSubmit={handleAddTest}>
        <label>
          Test ID:
          <input
            type="text"
            value={newTestId}
            onChange={(e) => setNewTestId(e.target.value)}
            required
          />
        </label>
        <label>
          Test Name:
          <input
            type="text"
            value={newTestName}
            onChange={(e) => setNewTestName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Test</button>
        </form>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter test ID to fetch"
          value={fetchTestId}
          onChange={(e) => setFetchTestId(e.target.value)}
        />
        <button onClick={handleFetchTest}>Fetch Test</button>
        {fetchedTest && (
          <div>
            <h2>Fetched Test</h2>
            <p>ID: {fetchedTest.testId}</p>
            <p>Name: {fetchedTest.name}</p>
          </div>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter test ID to delete"
          value={deleteTestId}
          onChange={(e) => setDeleteTestId(e.target.value)}
        />
        <button onClick={handleDeleteTest}>Delete Test</button>
        {deleteResponse && <p>{deleteResponse}</p>}
      </div>
    </div>
  );
};

export default TestOperations;
