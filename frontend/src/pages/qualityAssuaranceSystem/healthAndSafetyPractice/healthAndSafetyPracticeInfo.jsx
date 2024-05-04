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

const healthAndSafetyPracticeInfo = () => {
  const [practices, setPractices] = useState([]);
  const [newPractice, setNewPractice] = useState({
    id: '',
    testName: '',
    equipments: [],
    safetyGuidelines: [],
    safetyLevel: '',
    responsiblePersonContactNo: ''
  });

  useEffect(() => {
    fetchPractices();
  }, []);

  const fetchPractices = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/v1/health-safety-practices/get-all');
      setPractices(response.data);
    } catch (error) {
      console.error('Error fetching practices:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPractice({ ...newPractice, [name]: value });
  };

  const addPractice = async () => {
    try {
      const response = await axios.post('http://localhost:8090/api/v1/health-safety-practices/create', newPractice);
      setPractices([...practices, response.data]);
      setNewPractice({
        id: '',
        testName: '',
        equipments: [],
        safetyGuidelines: [],
        safetyLevel: '',
        responsiblePersonContactNo: ''
      });
    } catch (error) {
      console.error('Error adding practice:', error);
    }
  };

  const deletePractice = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/v1/health-safety-practices/delete?id=${id}`);
      setPractices(practices.filter(practice => practice.id !== id));
    } catch (error) {
      console.error('Error deleting practice:', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2">Health and Safety Practices</Typography>
          <List>
            {practices.map((practice) => (
              <ListItem key={practice.id}>
                <ListItemText
                  primary={`${practice.testName} - ${practice.safetyLevel} - ${practice.responsiblePersonContactNo}`}
                />
                <Button onClick={() => deletePractice(practice.id)} variant="contained" color="secondary">
                  Delete Practice
                </Button>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3">Add New Practice</Typography>
          <TextField
            label="ID"
            name="id"
            value={newPractice.id}
            onChange={handleInputChange}
            style={{ marginRight: 10 }}
            variant="outlined"
          />
          <TextField
            label="Test Name"
            name="testName"
            value={newPractice.testName}
            onChange={handleInputChange}
            style={{ marginRight: 10 }}
            variant="outlined"
          />
          <TextField
            label="Safety Level"
            name="safetyLevel"
            value={newPractice.safetyLevel}
            onChange={handleInputChange}
            style={{ marginRight: 10 }}
            variant="outlined"
          />
          <TextField
            label="Responsible Contact Number"
            name="responsiblePersonContactNo"
            value={newPractice.responsiblePersonContactNo}
            onChange={handleInputChange}
            style={{ marginRight: 10 }}
            variant="outlined"
          />
          <Button onClick={addPractice} variant="contained" color="primary">
            Add Practice
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default healthAndSafetyPracticeInfo;
