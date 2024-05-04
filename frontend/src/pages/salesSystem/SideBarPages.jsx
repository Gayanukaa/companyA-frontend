import React, {useEffect, useState} from "react";
import TableComp from '../../components/sideComps/TableComp'
import * as reqSend from "../../global/reqSender.jsx";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export function ViewStocks(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        reqSend.defaultReq("GET", 'api/existingProducts', null, response => {
                if (response.status === 200 && response.data) {
                    setData(response.data);
                } else {
                    console.error("Invalid response format:", response);
                }
                setLoading(false); // Set loading to false after data is fetched
            },
            error => {
                console.error("API request failed:", error);
                setLoading(false); // Set loading to false if request fails
            });
    }, []);

    const tableData = (data) => {
        const heading = ["ID", "Price", "Warehouse ID", "Name", "Quantity", "Threshold Quantity", "Weight", "Size", "Reorder Quantity", "State of Product", "Inventory Type"];
        const body = data.map((item, index) => (
            <tr key={`row${index}`}>
                <td>{item.id}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.warehouseId}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.thresholdQuantity}</td>
                <td>{item.weight}</td>
                <td>{item.size}</td>
                <td>{item.reorderQuantity}</td>
                <td>{item.stateOfProduct}</td>
                <td>{item.inventoryType}</td>
            </tr>
        ));

        return {
            heading,
            body,
        };
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>View Stocks</h1>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <TableComp data={tableData(data)} />
                )}
            </div>
        </main>
    );
}


export function DashboardView() {
    const [formData, setFormData] = useState({
        itemId: '',
        quantity: 0,
        price: 0,
        warehouseId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        return new Promise((resolve, reject) => {

            const requestData = {
                "itemId": formData.itemId,
                "quantity": formData.quantity,
                "price": parseFloat(formData.price),
                "warehouseId": formData.warehouseId
            };
            console.log(requestData);
            reqSend.defaultReq("POST", "api/existingProducts/updateStock", requestData,
                response => {
                    if (response.status === 200 && response.data) {
                        console.log("Data saved successfully");
                        resolve();
                    } else {
                        console.error("Invalid response format:", response);
                        reject(new Error("Invalid response format"));
                    }
                },
                error => {
                    console.error("API request failed:", error);
                    reject(error);
                }
            );
        });
    };


    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <form onSubmit={handleSubmit}>
                <Box marginLeft="10vw" marginRight="10vw" marginTop="20vh">
                    <Typography variant="h4" align="center" gutterBottom>
                        Add Products
                    </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Item ID"
                            name="itemId"
                            value={formData.itemId}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Warehouse ID"
                            name="warehouseId"
                            value={formData.warehouseId}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                           Update product information
                        </Button>
                    </Grid>
                </Grid>
                </Box>
            </form>
        </Box>
    );
}