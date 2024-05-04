import React, { useState, useEffect } from 'react';
import StatisticsCard from './StatisticsCard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { BarGraphComponent, SimpleLineChart, BasicPie } from './Graphs';
import { Card, CardContent, Grid } from '@mui/material';
import * as reqSend from '../../../global/reqSender.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';



const DashboardView = () => {
    const [graphData, setGraphData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


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


    useEffect(() => {
        reqSend.defaultReq("GET", "api/dashboard/graphs", {},
            response => {
                if (response.status === 200 && response.data) {
                    setGraphData(response.data);
                    setIsLoading(false);
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    }, [])

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

                <Grid container spacing={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Grid item xs={12} lg={12}>
                        <Card variant="outlined">
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                {
                                    isLoading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <SimpleLineChart lineGraphData={graphData.salesData} />
                                    )
                                }
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={12}>
                        <Card variant="outlined">
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                {
                                    isLoading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <BarGraphComponent barGraphData={graphData.inventoryData} />
                                    )
                                }
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Card variant="outlined">
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                {
                                    isLoading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <BasicPie />
                                    )
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>


        </main>

    );
}

export default DashboardView;
