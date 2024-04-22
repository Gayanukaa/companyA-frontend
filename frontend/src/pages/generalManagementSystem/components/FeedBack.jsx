import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import avatar from '../../../assets/avatar.svg';
import '../../../styles/dashboard.css';

const FeedbackCard = ({ name, email, message }) => {
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
                        <Typography variant="h5" component="div">
                            Feedback
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
                </div>
            </CardContent>
        </Card>
    );
}

const FeedbackSection = () => {
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:8090/feedback/view")
            .then(response => {
                setFeedbackData(response.data);
            })
            .catch(error => {
                console.error("Error fetching feedback data:", error);
            });
    }, []);

    return (
        <main>
            <div style={{ 	top:' 2px',left: '2px',bottom: '2px' }}>
              
                    <h1>Feedback Section</h1><br></br>
                    <div className="feedback-container">
                        {feedbackData.map((feedback, index) => (
                            <FeedbackCard
                                key={index}
                                name={feedback.name}
                                email={feedback.email}
                                message={feedback.message}
                            />
                        ))}
                    </div>
               
            </div>
        </main>

    );
}

export default FeedbackSection;
