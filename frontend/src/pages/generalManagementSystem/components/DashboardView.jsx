import React, { useState, useEffect } from 'react';
import StatisticsCard from './StatisticsCard';
import { BarGraphComponent, SimpleLineChart, BasicPie } from './Graphs';
import { Card, CardContent, Grid } from '@mui/material';
import * as reqSend from '../../../global/reqSender.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';


const DashboardView = () => {
    const [graphData, setGraphData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


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


                <StatisticsCard />

                <div className="left" style={{ marginTop: '25px' }}>
                    <h3>Analysis</h3>
                </div>

                <Grid container spacing={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Grid item xs={12} lg={12}>

                        <h6 style={{ textAlign: 'center' }}>Records of Past Sales</h6>

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

                        <h6 style={{ textAlign: 'center' }}>Records of Stocks</h6>

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


                    <Grid item xs={12} lg={12}>

                        <h6 style={{ textAlign: 'center' }}>Stocks in each Warehouse</h6>

                        <Card variant="outlined">
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                {
                                    isLoading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <BasicPie pieChartData={graphData.warehouseData} />
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
