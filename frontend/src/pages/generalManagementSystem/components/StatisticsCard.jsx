import React, { useState, useEffect } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

function StatisticsCard() {
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        fetch('https://spring-boot-companya.azurewebsites.net/api/count')
            .then(response => response.json())
            .then(data => {
                
                const keys = Object.keys(data[0]);
                const values = Object.values(data[0]);

                
                const newData = keys.map((key, index) => ({
                    name: key.charAt(0).toUpperCase() + key.slice(1), 
                    count: values[index], 
                    image: index === 3 ? <DirectionsCarIcon fontSize="large" style={{ color: '#3C91E6' }} /> : <PeopleAltIcon fontSize="large" style={{ color: '#3C91E6' }} />,
                    altText: `Image ${index + 1}`,
                }));

                
                setApiData(newData);
            })
            .catch(error => {
                console.error('Error fetching API data:', error);
            });
    }, []);

    return (
        <Grid container spacing={2}>
            {apiData && apiData.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Box boxShadow={3}>
                        <Card variant="outlined">
                            <CardContent>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '10px', paddingRight: '10px' }}>
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>{item.count}</p>
                                        {item.image}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default StatisticsCard;
