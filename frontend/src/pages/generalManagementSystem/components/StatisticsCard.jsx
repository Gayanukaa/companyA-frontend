import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const StatisticsCard = ({ data }) => {
    return (
        <Grid container spacing={2}>
            {data.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Box boxShadow={3}>
                        <Card variant="outlined">
                            <CardContent>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '10px', paddingRight: '10px' }}>
                                    <div>
                                        {/* <img src={item.image} alt={item.altText} style={{ width: '50px', height: '50px' }} /> */}
                                        {item.image}
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <Typography variant="h4" component="div">
                                            {item.count}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary" component="p">
                                            {item.name}
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

export default StatisticsCard;
