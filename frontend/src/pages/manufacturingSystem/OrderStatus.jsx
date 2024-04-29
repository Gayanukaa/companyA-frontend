import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Button, Grid, Input, TextField } from '@mui/material';

const API_ENDPOINT = "http://localhost:8090/api";

export function OrderStatus(props) {

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Order Status</h1>
                    </div>

                </div>

                <OrderStatusForm />


            </main>
        </>
    )
}



const OrderStatusForm = () => {
    const [orderId, setOrderId] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Here you can make a POST request to update the order status or handle additional information
            console.log('Order Status:', orderStatus);
            console.log('Additional Info:', additionalInfo);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    const handleSubmitGetOrderStatus = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${API_ENDPOINT}/production/task/GetOrderStatus?orderID=${orderId}`);
            setOrderStatus(response.data.status)
        } catch (error) {

            setError('Error fetching the order status')
            console.error('Error fetching order status:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmitGetOrderStatus}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>

                        <FormControl fullWidth>
                            <TextField
                                placeholder='Please Enter the Order Id'
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Get Order Status</Button>
                    </Grid>
                </Grid>
            </form>

            {error && <div>{error}</div>}
            {(!error && !loading) && (
               <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            
                                <FormControl fullWidth>
                                    <InputLabel>Order Status</InputLabel>
                                    <Select
                                        value={orderStatus}
                                        onChange={(e) => setOrderStatus(e.target.value)}
                                    >
                                        <MenuItem value="pending">Pending</MenuItem>
                                        <MenuItem value="processing">Processing</MenuItem>
                                        <MenuItem value="shipped">Shipped</MenuItem>
                                        <MenuItem value="delivered">Delivered</MenuItem>
                                    </Select>
                                </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">Update Order Status</Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </div>
    );
};

