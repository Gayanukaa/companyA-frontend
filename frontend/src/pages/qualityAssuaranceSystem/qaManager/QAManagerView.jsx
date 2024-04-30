import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const QAManagerView = () => {
  const [managers, setManagers] = useState([]);
  const [newManager, setNewManager] = useState({
    id:'',
    name: '',
    mobileNumber: '',
    email: ''
  });
  const [selectedManager, setSelectedManager] = useState(null);
  const [testSubjects, setTestSubjects] = useState([]);
  const [concludeTestStatus, setConcludeTestStatus] = useState('');
  const [newTestSubjectId, setNewTestSubjectId] = useState('');
  const [notCheckedTestSubjects, setNotCheckedTestSubjects] = useState([]);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/v1/qaManager');
      setManagers(response.data);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewManager({ ...newManager, [name]: value });
  };

  const addManager = async () => {
    try {
      const response = await axios.post('http://localhost:8090/api/v1/qaManager/addQAManager', newManager);
      setManagers([...managers, response.data]);
      setNewManager({ id:'', name: '', mobileNumber: '', email: '' });
    } catch (error) {
      console.error('Error adding manager:', error);
    }
  };

  const deleteManager = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/v1/qaManager/delete/${id}`);
      setManagers(managers.filter(manager => manager.id !== id));
    } catch (error) {
      console.error('Error deleting manager:', error);
    }
  };

  const fetchTestSubjects = async (managerId) => {
    try {
      const response = await axios.get(`http://localhost:8090/api/v1/qaManager/getQAManager/{id}?id=${managerId}`);
      setSelectedManager(response.data);
      setTestSubjects(response.data.assignedTestSubjects);
    } catch (error) {
      console.error('Error fetching test subjects:', error);
    }
  };

  const addTestSubject = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8090/api/v1/qaManager/assignManager?qaManagerId=${selectedManager.id}&testSubjectId=${newTestSubjectId}`);
      setTestSubjects([...testSubjects, response.data]);
      setNewTestSubjectId('');
    } catch (error) {
      console.error('Error adding test subject:', error);
    }
  };  

  const concludeTest = async (testSubjectId) => {
    try {
      await axios.put(`http://localhost:8090/api/v1/qaManager/concludeTest?qaManagerId=${selectedManager.id}&testSubjectId=${testSubjectId}`);
      setConcludeTestStatus('Test concluded successfully');
    } catch (error) {
      console.error('Error concluding test:', error);
      setConcludeTestStatus('Error concluding test');
    }
  };

  const getNotCheckedTestSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/v1/qaManager/notCheckedItems');
      setNotCheckedTestSubjects(response.data);
    } catch (error) {
      console.error('Error fetching not checked test subjects:', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2">Quality Assurance Managers</Typography>
          <List>
            {managers.map((manager) => (
              <ListItem key={manager.id}>
                <ListItemText primary={`${manager.name} - ${manager.email} - ${manager.mobileNumber}`} />
                <Button onClick={() => fetchTestSubjects(manager.id)} variant="contained" color="primary">View Test Subjects</Button>
                <Button onClick={() => deleteManager(manager.id)} variant="contained" color="secondary">Delete Manager</Button>
              </ListItem>
            ))}
          </List>
        </Grid>

        {selectedManager && (
          <Grid item xs={12}>
            <Typography variant="h3">Test Subjects Assigned to {selectedManager.name}</Typography>
            <List>
              {testSubjects.map((subject) => (
                <ListItem key={subject.id}>
                  <ListItemText primary={`${subject.id} - ${subject.testStatus}- ${subject.receivedDate}- ${subject.expectedTest}`} />
                  <Button onClick={() => concludeTest(subject.id)} variant="contained" color="primary">Conclude Test</Button>
                </ListItem>
              ))}
            </List>
            {concludeTestStatus && <Typography>{concludeTestStatus}</Typography>}
            <Typography variant="h3">Assign New Test Subject to {selectedManager.name}</Typography>
            <TextField
              label="Test Subject Id"
              name="testSubjectId"
              value={newTestSubjectId}
              onChange={(e) => setNewTestSubjectId(e.target.value)}
            />
            <Button onClick={addTestSubject} variant="contained" color="primary">Assign Test Subject</Button>
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="h3">Add New Manager</Typography>
          <TextField
            label="ID"
            name="id"
            value={newManager.id}
            onChange={handleInputChange}
          />
          <TextField
            label="Name"
            name="name"
            value={newManager.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={newManager.mobileNumber}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            name="email"
            value={newManager.email}
            onChange={handleInputChange}
          />
          <Button onClick={addManager} variant="contained" color="primary">Add Manager</Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3">Items to be checked</Typography>
          <Button onClick={getNotCheckedTestSubjects} variant="contained" color="primary">Get Not Checked Test Subjects</Button>
          <List>
            {notCheckedTestSubjects.map((subject) => (
              <ListItem key={subject.id}>
                <ListItemText primary={`${subject.id} - ${subject.testStatus}- ${subject.receivedDate}- ${subject.expectedTest}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QAManagerView;
