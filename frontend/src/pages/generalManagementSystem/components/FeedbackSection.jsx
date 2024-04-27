import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Box, Button, IconButton,Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import avatar from '../../../assets/avatar.svg';
import '../../../styles/dashboard.css';
import * as reqSend from '../../../global/reqSender.jsx';


import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import TrashIcon from "./TrashIcon";



const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);



const FeedbackSection = () => {
    const [expanded, setExpanded] = React.useState('panel1');
    const [value, setValue] = useState(0);
    const [feedbackData, setFeedbackData] = useState([]);


    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleTabValueChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleMarkAsReadClick = (event, id) => {
        event.stopPropagation();
        markAsRead(id);
    };

    const markAsRead = (id) => {
        reqSend.defaultReq("PUT", `api/feedback/mark-as-read?id=${id}`, {},
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

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        deleteFeedback();
    };



    useEffect(() => {

        axios.get("http://localhost:8090/api/feedback/view")
            .then(response => {
                setFeedbackData(response.data);
            })
            .catch(error => {
                console.error("Error fetching feedback data:", error);
            });
    }, [handleMarkAsReadClick]);


    return (
        <main>
            <div>

                <h1>Feedback</h1><br></br>
                <div className="feedback-container">
                    <div>
                        <Tabs value={value} onChange={handleTabValueChange}>
                            <Tab label="Unread" />
                            <Tab label="Read" />
                        </Tabs>


                        {feedbackData && value === 0 && feedbackData.filter(feedback => feedback.isRead === 0).length === 0 ? (
                            <Alert severity="info">No Unread Messages</Alert>
                        ) : (
                            feedbackData && value === 0 && feedbackData.map((feedback, index) => (
                                feedback.isRead === 0 && (
                                    <Accordion key={index}>
                                        <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon />}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar src={feedback.avatar} alt="Avatar" sx={{ mr: 2 }} />
                                                    <Grid>
                                                        <Typography variant="h6">{feedback.subject}</Typography>
                                                        <Typography variant="body1" >{feedback.name}</Typography>
                                                        <Typography variant="caption">{new Date(feedback.timestamp).toLocaleString()}</Typography>
                                                    </Grid>
                                                </Box>
                                                <Button onClick={(e) => handleMarkAsReadClick(e, feedback.id)} variant='contained' className='markAsRead'>Mark as Read</Button>                                    </Box>
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <Typography variant="body1">{feedback.message}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            ))
                        )}



                        {feedbackData && value === 1 && feedbackData.map((feedback, index) => (
                            feedback.isRead === 1 && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon />}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar src={feedback.avatar} alt="Avatar" sx={{ mr: 2 }} />
                                                <Grid>
                                                    <Typography variant="h6">{feedback.subject}</Typography>
                                                    <Typography variant="body1" >{feedback.name}</Typography>
                                                    <Typography variant="caption">{new Date(feedback.timestamp).toLocaleString()}</Typography>
                                                </Grid>
                                            </Box>
                                            <TrashIcon onClick={handleDeleteClick} />
                                        </Box>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Typography variant="body1">{feedback.message}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        ))}
                    </div>
                </div>

            </div>
        </main>

    );
}

export default FeedbackSection;
