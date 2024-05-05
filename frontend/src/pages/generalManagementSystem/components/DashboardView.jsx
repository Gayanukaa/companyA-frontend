import React, { useState, useEffect } from 'react';
import StatisticsCard from './StatisticsCard';
import { BarGraphComponent, SimpleLineChart, BasicPie } from './Graphs';
import { Card, CardContent, Grid } from '@mui/material';
import * as reqSend from '../../../global/reqSender.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


const DashboardView = () => {
    const [graphData, setGraphData] = useState([]);
    const [apiData, setApiData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const icons = [
        <PeopleAltIcon fontSize="large" style={{ color: '#3C91E6' }} />,
        <ManageAccountsIcon fontSize="large" style={{ color: '#3C91E6' }} />,
        <InventoryIcon fontSize="large" style={{ color: '#3C91E6' }} />,
        <LocalShippingIcon fontSize="large" style={{ color: '#3C91E6' }} />
    ];

    const transformData = (apiData) => {
        return Object.entries(apiData).map(([key, value], index) => ({
            name: `${key.charAt(0).toUpperCase() + key.slice(1)}`,
            count: value,
            image: icons[index],
            altText: 'Image 1',
        }));
    };


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


        reqSend.defaultReq("GET", "api/count", {},
            response => {
                if (response.status === 200 && response.data) {
                    setApiData(response.data);
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

                <StatisticsCard data={apiData ? transformData(apiData[0]) : []} />

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
