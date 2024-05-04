import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const CardComp = ({ data }) => {
    return (
        <Grid container spacing={52}>
            {data.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}> {/* Adjust the grid size according to your layout */}
                    <Box boxShadow={5} borderRadius={5} style={{width: '350px', height: '150px'}}>
                        <Card variant="outlined" style={{width: '350px', height: '150px', borderRadius: '20px'}}>
                            <CardContent>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <img src={item.image} alt={item.altText} style={{ width: '100px', height: '100px' }} />
                                    </div>
                                    <div>
                                        <Typography variant="h5" component="div">
                                            {item.count}
                                        </Typography>
                                        <Typography variant="h5" color="textSecondary" component="p">
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

export default CardComp;
