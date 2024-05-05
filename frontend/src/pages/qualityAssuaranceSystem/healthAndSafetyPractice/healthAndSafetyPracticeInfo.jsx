import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const HealthAndSafetyPracticeInfo = () => {
  const [practices, setPractices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showForm1, setShowForm1] = useState(false)
  const [updateNewSafetyGuidelines, setUpdateNewSafetyGuidelines] = useState('');
  const [updateNewSafetyLevel, setUpdateNewSafetyLevel] = useState('');
  const [formError, setFormError] = useState('');
  const [fetchById, setFetchById] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateNewIssue, setUpdateNewIssue] = useState('');
  const [deleteId, setDeleteId] = useState(''); // ID for deletion
  const [inputId, setInputId] = useState('');
  const [fetchedPractice, setFetchedPractice] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [updateEquipments, setUpdateEquipments] = useState('');
  const [updateSafetyGuidelines, setUpdateSafetyGuidelines] = useState('');
  const [updateSafetyLevel, setUpdateSafetyLevel] = useState('');
  const [updateError, setUpdateError] = useState('');
  

  const [newPractice, setNewPractice] = useState({
    id: '',
    hazardType: '',
    equipments: '',
    safetyGuidelines: '',
    safetyLevel: '',
    responsiblePersonContactNo: ''
  });

  useEffect(() => {
    
  }, []);

  const fetchPractices = async () => {
    try {
      const response = await axios.get('https://spring-boot-companya.azurewebsites.net/api/v1/health-safety-practices/get-all');
      setPractices(response.data);
    } catch (error) {
      console.error('Error fetching practices:', error);
    }
  };

  const deletePracticeById = async () => {
    try {
      const response = await axios.delete(`https://spring-boot-companya.azurewebsites.net/api/v1/health-safety-practices/delete?id=${deleteId}`);
      alert(response.data);
      setPractices(practices.filter(practice => practice.id !== deleteId));
    } catch (error) {
      console.error(`Error deleting practice with ID ${deleteId}:`, error);
      alert("Failed to delete practice. Please check the ID and try again.");
    }
  };

  const getPracticeById = async () => {
    try {
      const response = await axios.get(`https://spring-boot-companya.azurewebsites.net/api/v1/health-safety-practices/get?id=${inputId}`);
      setFetchedPractice(response.data);
      setFetchError(''); // Clear previous errors
    } catch (error) {
      console.error('Error fetching practice by ID:', error);
      setFetchError('Could not fetch practice by ID.');
    }
  };

  const updatePractice = async () => {
    if (
      !updateId.trim() ||
      !updateEquipments.trim() ||
      !updateSafetyGuidelines.trim() ||
      !updateSafetyLevel.trim()
    ) {
      setUpdateError('All fields are required for updating.');
      return;
    }

    try {
      const response = await axios.put(`https://spring-boot-companya.azurewebsites.net/api/v1/health-safety-practices/update?id=${updateId}`, {
        equipments: updateEquipments.split(','),
        safetyGuidelines: updateSafetyGuidelines.split(','),
        safetyLevel: updateSafetyLevel
      });
      console.log('Practice updated:', response.data);
      alert('Safety Practice updated successfully');
      setUpdateError(''); // Clear any previous errors
      window.location.reload();
    } catch (error) {
      console.error(`Error updating practice with ID ${updateId}:`, error);
      setUpdateError('Error updating practice.');
    }
  };

  const addPractice = async () => {
    if (
      !newPractice.id ||
      !newPractice.hazardType ||
      !newPractice.equipments ||
      !newPractice.safetyGuidelines ||
      !newPractice.safetyLevel ||
      !newPractice.responsiblePersonContactNo
    ) {
      setFormError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('https://spring-boot-companya.azurewebsites.net/api/v1/health-safety-practices/create', {
        ...newPractice,
        equipments: newPractice.equipments.split(','),
        safetyGuidelines: newPractice.safetyGuidelines.split(',')
      });

      setPractices([...practices, response.data]);
      setShowForm(false);
      setFormError('');
    } catch (error) {
      console.error('Error creating practice:', error);
      setFormError('Error creating practice. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPractice({ ...newPractice, [name]: value });
  };

  return (
    <Container style={{ marginLeft: '2rem' }}> {/* Set left margin for alignment */}
      <Typography variant="h2" gutterBottom>
        Health and Safety Practices
      </Typography>
        <Typography variant="h5" gutterBottom style={{ marginTop: 10 }}>
          Add a new safety practice 
        </Typography>

      {showForm ? (
        <Grid container spacing={2}>
          
          <Grid item xs={2}>
            <TextField
              label="ID"
              variant="outlined"
              name="id" // Add name attribute
              value={newPractice.id}
              onChange={handleInputChange} // Ensure the correct event handler
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Hazard Type"
              variant="outlined"
              name="hazardType" // Add name attribute
              value={newPractice.hazardType}
              onChange={handleInputChange} // Ensure the correct event handler
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Equipments (comma-separated)"
              variant="outlined"
              style={{ width: '60%' }}
              name="equipments" // Add name attribute
              value={newPractice.equipments}
              onChange={handleInputChange} // Ensure the correct event handler
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Safety Guidelines (comma-separated)"
              variant="outlined"
              style={{ width: '60%' }}
              value={newPractice.safetyGuidelines}
              onChange={(e) => setNewPractice({ ...newPractice, safetyGuidelines: e.target.value })}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Safety Level"
              variant="outlined"
              name="safetyLevel"
              value={newPractice.safetyLevel}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Responsible Person Contact No."
              variant="outlined"
              name="responsiblePersonContactNo"
              value={newPractice.responsiblePersonContactNo}
              onChange={handleInputChange}
            />
          </Grid>
          {formError && (
            <Typography color="error">{formError}</Typography>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 10, marginBottom: 30  }}
              onClick={addPractice}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              style={{ marginRight: 10, marginBottom: 30  }}
              color="secondary"
              onClick={() => {
                setShowForm(false);
                setFormError('');
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Button
          variant="contained"
          style={{ marginBottom: 15 }}
          color="primary"
          onClick={() => setShowForm(true)}
        >
          Add Practice
        </Button>
      )}


      <Grid container spacing={2}>
      <Grid item xs={12}>
          <Typography variant="h5" gutterBottom style={{ marginTop: 10 }}>
          View an existing practice 
          </Typography>
          <TextField
            type="text"
            label="Enter ID"
            variant="outlined"
            style={{ marginRight: 10 }}
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            
          />
          <Button variant="contained" color="primary" onClick={getPracticeById}>
            Get Practice by ID
          </Button>
          {fetchError && (
            <Typography color="error">{fetchError}</Typography> // Display error message if fetching fails
          )}
        </Grid>

        {fetchedPractice && (
          <Grid item xs={12}>
            <Typography variant="h4">Practice Details:</Typography>
            <Typography>ID: {fetchedPractice.id}</Typography>
            <Typography>Hazard Type: {fetchedPractice.hazardType}</Typography>
            <Typography>Equipments: {fetchedPractice.equipments.join(', ')}</Typography>
            <Typography>Safety Guidelines: {fetchedPractice.safetyGuidelines.join(', ')}</Typography>
            <Typography>Safety Level: {fetchedPractice.safetyLevel}</Typography>
            <Typography>Responsible Person Contact No: {fetchedPractice.responsiblePersonContactNo}</Typography>
          </Grid>
        )}
        
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom style={{ marginTop: 10 }}>
          View All existing practices
          </Typography>
          <Button variant="contained" color="primary" style={{ marginBottom: 20 }} onClick={fetchPractices}>
          Get All Practices
          </Button>
          <Grid container spacing={2}>
            {practices.map(practice => (
              <Grid item xs={12} key={practice.id}>
                <div>
                  <Typography variant="h6">Practice ID: {practice.id}</Typography>
                  <Typography variant="body1">Hazard Type: {practice.hazardType}</Typography>
                  <Typography variant="body1">Equipments: {practice.equipments.join(', ')}</Typography>
                  <Typography variant="body1">Safety Guidelines: {practice.safetyGuidelines.join(', ')}</Typography>
                  <Typography variant="body1">Safety Level: {practice.safetyLevel}</Typography>
                  <Typography variant="body1">Responsible Person Contact No.: {practice.responsiblePersonContactNo}</Typography>
                  {/* Render other practice details as needed */}
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom style={{ marginTop: 10 }}>
          Delete an existing practice 
          </Typography>
          <TextField
            label="ID to Delete"
            variant="outlined"
            value={deleteId}
            style={{ marginRight: 10 }}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={deletePracticeById}
          >
            Delete 
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom style={{ marginTop: 20 }}>
        Update Health and Safety Practice
      </Typography>

      {showForm1 ? (
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              label="ID to Update"
              variant="outlined"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Equipments (comma-separated)"
              variant="outlined"
              style={{ width: '60%' }}
              value={updateEquipments}
              onChange={(e) => setUpdateEquipments(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Safety Guidelines (comma-separated)"
              style={{ width: '60%' }}
              variant="outlined"
              fullWidth
              value={updateSafetyGuidelines}
              onChange={(e) => setUpdateSafetyGuidelines(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              label="Safety Level"
              variant="outlined"
              fullWidth
              value={updateSafetyLevel}
              onChange={(e) => setUpdateSafetyLevel(e.target.value)}
            />
          </Grid>

          {updateError && (
            <Typography color="error">{updateError}</Typography>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 10, marginBottom: 30 }}
              onClick={updatePractice}
            >
              Update Practice
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: 10, marginBottom: 30 }}
              onClick={() => setShowForm1(false)} // Toggle to hide form
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Button
          variant="contained"
          style={{ marginBottom: 15 }}
          color="primary"
          onClick={() => setShowForm1(true)} // Toggle to show form
        >
          Update Practice
        </Button>
      )}
    </Container>
  );
};

export default HealthAndSafetyPracticeInfo;
