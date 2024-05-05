import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const CardComp = ({ data }) => {
    return (
        <Grid container spacing={2}>
            {data.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}> {/* Adjust the grid size according to your layout */}
                    <Box boxShadow={3}>
                        <Card variant="outlined">
                            <CardContent>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <img src={item.image} alt={item.altText} style={{ width: '50px', height: '50px' }} />
                                    </div>
                                    <div>
                                        <Typography variant="h5" component="div">
                                            {item.count}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.email}
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardComp;
