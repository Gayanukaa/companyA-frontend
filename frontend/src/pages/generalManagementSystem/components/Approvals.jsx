import React from 'react';
import { Card, CardContent, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import avatar from '../../../assets/avatar.svg';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import * as reqSend from '../../../global/reqSender.jsx';

const ApprovalCard = ({ name, email, message, status, id, onApprove, onReject }) => {
  let statusText;
  let chipColor;
  switch (status) {
    case 0:
      statusText = "New";
      chipColor = 'warning'; // Assigning color for 'New' status
      break;
    case 2:
      statusText = "Rejected";
      chipColor = 'error'; // Assigning color for 'Rejected' status
      break;
    case 1:
      statusText = "Approved";
      chipColor = 'success'; // Assigning color for 'Approved' status
      break;
    default:
      statusText = "Unknown";
      chipColor = 'default'; // Default color
  }

  const approveRequest = (id) => {
    reqSend.defaultReq("POST", `api/request/approve?id=${id}`, {},
      response => {
        if (response.status === 200 && response.data) {

        } else {
          console.error("Invalid response format:", response);
        }
      },
      error => {
        console.error("API request failed:", error);
      }
    );
  }

  const rejectRequest = (id) => {
    reqSend.defaultReq("POST", `api/request/reject?id=${id}`, {},
      response => {
        if (response.status === 200 && response.data) {

        } else {
          console.error("Invalid response format:", response);
        }
      },
      error => {
        console.error("API request failed:", error);
      }
    );
  }

  const handleApproveClick = () => {
    approveRequest(id); // Assuming approveRequest is defined elsewhere
    onApprove(id); // Call the callback function with the request ID
  };

  const handleRejectClick = () => {
    rejectRequest(id); // Assuming approveRequest is defined elsewhere
    onReject(id); // Call the callback function with the request ID
  };

  return (
    <Card sx={{
      borderRadius: '20px',
      background: 'var(--light)',
      padding: '5px',
      overflowX: 'auto',
      width: 'calc(100% - 30px)',
      marginBottom: '5px',
      marginLeft: '5px',
      display: 'inline-block',
      position: 'relative', // Add relative positioning to the card container
    }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={avatar} alt="Avatar" sx={{ mr: 2 }} />
          <div>
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
          </div>
          <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
            <Stack direction="row" spacing={1}>
              <Chip label={statusText} size="medium" variant="filled" color={chipColor} />
            </Stack>
          </div>
          {status === 0 && (
            <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
              <Button onClick={handleApproveClick} variant="contained" color="primary" style={{ marginRight: '10px' }}>
                Approve
              </Button>
              <Button onClick={handleRejectClick} variant="contained" color="primary">
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ApprovalCard;
