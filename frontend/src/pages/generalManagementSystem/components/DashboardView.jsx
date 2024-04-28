import React, { useState, useEffect } from 'react';
import StatisticsCard from './StatisticsCard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { BarGraphComponent, SimpleLineChart, BasicPie } from './Graphs';
import { Card, CardContent, Grid } from '@mui/material';


const DashboardView = () => {
    const data = [
        {
            name: 'Total Managers',
            count: 10,
            image: <PeopleAltIcon fontSize="large" style={{ color: '#3C91E6' }} />,
            altText: 'Image 1',
        },
        {
            name: 'Total Managers',
            count: 10,
            image: <PeopleAltIcon fontSize="large" style={{ color: '#3C91E6' }} />,
            altText: 'Image 1',
        },
        {
            name: 'Total Managers',
            count: 10,
            image: <PeopleAltIcon fontSize="large" style={{ color: '#3C91E6' }} />,
            altText: 'Image 1',
        },
        {
            name: 'Total Managers',
            count: 10,
            image: <PeopleAltIcon fontSize="large" style={{ color: '#3C91E6' }} />,
            altText: 'Image 1',
        }
    ];

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Dashboard</h1>
                </div>


                <StatisticsCard data={data} />

                <div className="left" style={{ marginTop: '25px' }}>
                    <h3>Analysis</h3>
                </div>

                <Grid container spacing={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Grid item xs={12} lg={6}>
                        <Card variant="outlined">
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <BarGraphComponent />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card variant="outlined">
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <SimpleLineChart />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card variant="outlined">
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <BasicPie />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>


        </main>

    );
}

export default DashboardView;
