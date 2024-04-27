import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

const CardForm = ({ children }) => {
    return (
        // <Grid container spacing={2}>
        //     {data.map((item, index) => (
        //         <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}> {/* Adjust the grid size according to your layout */}
                    <Box sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
                        <Card variant="outlined">
                            <CardContent>
                            {children}

                            </CardContent>
                        </Card>
                    </Box>
        //         </Grid>
        //     ))}
        // </Grid>
    );
};

export default CardForm;

