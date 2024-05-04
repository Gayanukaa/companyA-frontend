import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import { Alert, Button, Grid, Input, TextField } from '@mui/material';

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [openSnackBar, setOpenSnackBar] = React.useState(false);


    const handleUpdateOrderStatus = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            await axios.post(`${API_ENDPOINT}/production/task/updateOrderStatus?orderID=${orderId}&status=${orderStatus}`);
            setOpenSnackBar(true)
        } catch (error) {

            setError('Error updating the order status')
            console.error('Error fetching order status:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitGetOrderStatus = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${API_ENDPOINT}/production/task/GetOrderStatus?orderID=${orderId}`);
            setOrderStatus(response.data.status)
            console.log(response)
        } catch (error) {

            setError('Error fetching the order status')
            console.error('Error fetching order status:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
                <Alert
                    onClose={() => setOpenSnackBar(false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Order status with id {orderId} was changed to {orderStatus}
                </Alert>
            </Snackbar>

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
                        {loading && <LinearProgress sx={{ mt: 4 }} />}

                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Get Order Status</Button>
                    </Grid>
                </Grid>
            </form>
            {error && <div>{error}</div>}
            {
                (!error && !loading) && (
                    <form onSubmit={handleUpdateOrderStatus}>
                        <Grid sx={{ mt: 4 }} container spacing={3}>
                            <Grid item xs={12}>

                                <FormControl fullWidth>
                                    <InputLabel>Order Status</InputLabel>
                                    <Select
                                        value={orderStatus}
                                        onChange={(e) => setOrderStatus(e.target.value)}
                                    >
                                        <MenuItem value="processing">Processing</MenuItem>
                                        <MenuItem value="working">Working</MenuItem>
                                        <MenuItem value="pending">Pending</MenuItem>
                                        <MenuItem value="completed">Completed</MenuItem>
                                        <MenuItem value="cancelled">Cancelled</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">Update Order Status</Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            }
        </div >
    );
};

