import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button } from '@mui/material';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import avatar from '../../../assets/avatar.svg';
import '../../../styles/dashboard.css';

import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


const ApprovalCard = ({ name, email, message, status }) => {
  return (
    <Card sx={{
      borderRadius: '20px',
      background: 'var(--light)',
      padding: '24px',
      overflowX: 'auto',
      width: 'calc(50% - 30px)',
      marginBottom: '20px',
      marginLeft: '20px',
      display: 'inline-block'
    }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={avatar} alt="Avatar" sx={{ mr: 2 }} />
          <div>
            <Stack direction="row" spacing={1}>
              <Chip label={status} size="medium" variant="filled" color='success' style={{ position: 'relative', top: '-20px', left: '515px', textAlign: 'right' }} />
            </Stack>
            <Typography variant="h5" component="div">
              Request
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Name: {name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              E-mail: {email}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Message: {message}
            </Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '10px', marginRight: '10px' }}>
              Approve
            </Button>
            <Button variant="contained" color="primary" style={{ marginTop: '10px', marginRight: '10px' }}>
              Reject
            </Button>
            <Button variant="contained" color="primary" style={{ marginTop: '10px', marginRight: '10px' }}>
              Dismiss
            </Button>

          </div>
          <Button variant="contained" color="primary" style={{ position: 'absolute', top: '10px', right: '10px' }}>
            Action
          </Button>

        </div>

      </CardContent>
    </Card>
  )
}

const ApprovalSection = () => {
  const [approvalData, setApprovalData] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:8090/api/request/view")
      .then(response => {
        setApprovalData(response.data);
      })
      .catch(error => {
        console.error("Error fetching feedback data:", error);
      });
  }, []);
  return (
    <main>
      <div style={{ top: ' 2px', left: '2px', bottom: '2px' }}>

        <h1>Leave Requests</h1><br></br>
        <div className="feedback-container">
          {approvalData.map((request, index) => (
            <ApprovalCard
              key={index}
              name={request.name}
              email={request.email}
              message={request.message}
              status={request.status}
            />
          ))}

        </div>
        <h1>Recruitment Requests</h1><br></br>
        <div className="request-container">
          {approvalData.map((request, index) => (
            <ApprovalCard
              key={index}
              name={request.name}
              email={request.email}
              message={request.message}
              status={request.status}
            />
          ))}

        </div>

      </div>
    </main>

  )

}



export default ApprovalSection;
