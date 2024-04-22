import React, { useEffect, useState } from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';
import { Stack, Button, TextField } from '@mui/material'
import * as reqSend from '../../global/reqSender.jsx';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export function DashboardView(props) {
    const dataList = [
        {
            image: avatar,
            altText: "Avatar 1",
            count: 5,
            name: "John Doe"
        },
        {
            image: avatar,
            altText: "Avatar 2",
            count: 3,
            name: "Jane Smith"
        },
        {
            image: avatar,
            altText: "Avatar 3",
            count: 7,
            name: "Bob Johnson"
        }
    ];

    const [tableData, setTableData] = useState(null);
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const [showDeleteItemForm, setShowDeleteItemForm] = useState(false);
    const [msg, setmsg] = useState('');
    const [delmsg, setDelmsg] = useState('');
    const [warehouseOptions, setWarehouseOptions] = useState([]);
    const [stockOptions, setStockOptions] = useState([]);

    useEffect(() => {
        fetchData();
        fetchWarehouseOptions();
        fetchDeleteItemData();
    }, []);

    const fetchData = () => {
        reqSend.defaultReq("GET", 'api/v1/stock', {},
            response => {
                if (response.status === 200 && response.data) {
                    const fetchedData = response.data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.warehouseId}</td>
                            <td>{item.price}</td>
                            <td>{item.stateOfProduct}</td>
                        </tr>
                    ));
                    setTableData({
                        name: "Inventory Table",
                        heading: ["Item No", "Item Name", "Quantity", "Warehouse","Unit Price","State of Item"],
                        body: fetchedData,
                    });
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    const fetchWarehouseOptions = () => {
        reqSend.defaultReq("GET", 'api/v1/warehouse', {},
            response => {
                if (response.status === 200 && response.data) {
                    const options = response.data.map(warehouse => ({
                        id: warehouse.warehouseId,
                        name: warehouse.name
                    }));
                    setWarehouseOptions(options);
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    const handleAddItemClick = () => {
        setShowAddItemForm(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = {
            name: event.target.inputItemName.value,
            quantity: event.target.inputQuantity.value,
            thresholdQuantity: event.target.inputThresholdQuantity.value,
            reorderQuantity: event.target.inputReorderQuantity.value,
            weight: event.target.inputWeight.value,
            size: event.target.inputSize.value,
            price: event.target.inputPrice.value,
            warehouseId: event.target.inputWarehouse.value,
            stateOfProduct: event.target.inputStateOfProduct.value,
            inventoryType: event.target.inputInventoryType.value
        };

        for (const key in formData) {
            if (!formData[key]) {
                setmsg("Please fill in all fields");
                return;
            }
        }

        reqSend.defaultReq("POST", 'api/v1/stock/addStock', formData,
            response => {
                if (response.status === 201) {
                    setmsg('Item added successfully');
                    fetchData();
                } else {
                    console.error("Error adding item:", response);
                    setmsg("Error adding item. Please try again later.");
                }
            },
            error => {
                console.error("Error adding item:", error);
                setmsg("Error adding item. Please try again later.");
            }
        );
    };

    const formAddItem = (
        <div className="addItemForm" style={{ border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
            <form onSubmit={handleSubmit}>
                <h2>Add Item</h2>
                <IconButton
                    aria-label="close"
                    onClick={() => setShowAddItemForm(false)}
                    style={{ position: "absolute", top: "5px", right: "5px" }}
                >
                    <CloseIcon />
                </IconButton>
                <table>
                <tr>
                            <td colSpan="3"><label className="form-label">Item Name</label></td>
                            <td colSpan="2"><input type="text" className="form-control" id="inputItemName"/></td>
                        </tr>
                        <tr>
                            <td><label className="form-label">Quantity</label></td>
                            <td><input type="number" className="form-control" id="inputQuantity" min="0" step="1" /></td>
                            <td><label className="form-label">Threshold Quantity</label></td>
                            <td><input type="number" className="form-control" id="inputThresholdQuantity" min="0" step="1" /></td>
                            <td><label className="form-label">Reorder Quantity</label></td>
                            <td><input type="number" className="form-control" id="inputReorderQuantity" min="10" step="1" /></td>
                        </tr>
                        <tr>
                            <td><label className="form-label">Weight</label></td>
                            <td><input type="number" className="form-control" id="inputWeight" min="0" step="1" /></td>
                            <td><label className="form-label">Size</label></td>
                            <td><input type="number" className="form-control" id="inputSize" min="0" step="1" /></td>
                            <td><label className="form-label">Price</label></td>
                            <td><input type="number" className="form-control" id="inputPrice" min="0" step="0.1" /></td>
                        </tr>
                        <tr>
                            <td><label className="form-label">Warehouse</label></td>
                            <td>
                                <select className="form-select" id="inputWarehouse">
                                    {warehouseOptions.map(option => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </select>
                            </td>

                            <td><label className="form-label">State of Item</label></td>
                            <td>
                                <select className="form-select" id="inputStateOfProduct">
                                    <option value="NEW">New</option>
                                    <option value="ORDERED">Ordered</option>
                                    <option value="IN_STOCK">In Stock</option>
                                    <option value="LOW_STOCK">Low Stock</option>
                                    <option value="DAMAGED">Damaged</option>
                                </select>
                            </td>
                            <td><label className="form-label">Inventory Type</label></td>
                            <td>
                                <select className="form-select" id="inputInventoryType">
                                    <option value="STOCKS">Stocks</option>
                                    <option value="SUPPLIES">Supplies</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </td>
                        </tr>

                </table>
                {msg && <p style={{ color: "red" }}>{msg}</p>}
            </form>
        </div>
    );

    const handleDeleteItemClick = () => {
        setShowDeleteItemForm(true);
    };

    const fetchDeleteItemData = () => {
        reqSend.defaultReq("GET", 'api/v1/stock', {},
            response => {
                if (response.status === 200 && response.data) {
                    const options = response.data.map(item => ({
                        id: item.id,
                        name: item.name
                    }));
                    setStockOptions(options);
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };
    
    const handleDeleteItemSubmit = (event) => {
        event.preventDefault();
        const selectedItem = event.target.selectItem.value;

        reqSend.defaultReq("DELETE", `api/v1/stock/deleteStock/${selectedItem}`, {},
            response => {
                if (response.status === 200) {
                    setDelmsg('Item deleted successfully');
                    fetchData();
                } else {
                    setDelmsg("Error deleting item. Please try again later.");
                }
            },
            error => {
                setDelmsg("Error deleting item. Please try again later.");
            }
        );
    };

    const formDeleteItem = (
        <div className="deleteItemForm" style={{ border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
            <form onSubmit={handleDeleteItemSubmit}>
                <h2>Delete Item</h2>
                <IconButton
                    aria-label="close"
                    onClick={() => setShowDeleteItemForm(false)}
                    style={{ position: "absolute", top: "5px", right: "5px" }}
                >
                    <CloseIcon />
                </IconButton>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="selectItem">Select Item to Delete:</label></td>
                            <td>
                                <select id="selectItem" name="selectItem">
                                    {stockOptions.map(option => (
                                        <option key={option.id} value={option.id}>{option.id} - {option.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button type="submit" className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table> 
                {delmsg && <p style={{ color: "red" }}>{delmsg}</p>}
            </form>
        </div>
    );

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Dashboard</h1>
                </div>

                <div>
                    <Stack direction="row" spacing={2}>
                        <button onClick={handleAddItemClick} type="button" className="btn btn-primary">Add Item</button>
                        <button onClick={handleDeleteItemClick} type="button" className="btn btn-danger">Delete Item</button>
                    </Stack>
                </div>
                
                <div className="full-width-components">
                    {showAddItemForm && formAddItem}
                    {showDeleteItemForm && formDeleteItem}

                    { tableData && (
                        <TableComp data={tableData} />
                    )}
                </div>      
                
                <div className="full-width-components">
                    <CardComp data={dataList} />
                </div>
                
            </div>
        </main>
    );
}

export function OrderItems(props) {
    const [tableData, setTableData] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [shipmentButtonDisabled, setShipmentButtonDisabled] = useState(true);

    const fetchData = () => {
        reqSend.defaultReq("POST", 'api/v1/stock/checkQuantity', {},
            response => {
                if (response.status === 200 && response.data) {
                    const fetchedData = response.data.map(item => (
                        <tr key={item.alertId}>
                            <td>{item.alertId}</td>
                            <td>{item.itemId}</td>
                            <td>{item.itemName}</td>
                            <td>{item.reorderQuantity}</td>
                        </tr>
                    ));
                    setTableData({
                        name: "Items Quantity Below the Required Limit",
                        heading: ["Alert No", "Item No", "Item Name", "Required Quantity"],
                        body: fetchedData,
                    });
                    setShowTable(true);
                    setShipmentButtonDisabled(false);
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Order Items</h1>
                    </div>

                    <Stack direction="row" spacing={2}>
                        <button onClick={fetchData} type="button" className="btn btn-primary">Show Items to Order</button>
                        <button disabled={shipmentButtonDisabled} type="button" className="btn btn-primary">Place Shipment</button>
                        <button type="button" className="btn btn-primary">Show Items to Order</button>
                    </Stack>

                    {showTable && tableData && (
                        <TableComp data={tableData} />
                    )}
                </div>
            </main>
        </>
    )
}


export function ViewReports(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        
        reqSend.defaultReq("GET", 'api/v1/invReports/details', {}, 
                response => {
                    if (response.status === 200 && response.data) {
                        setData(response.data);
                    } else {
                        console.error("Invalid response format:", response);
                    }
                },
                error => {
                    console.error("API request failed:", error);
                }
            );

    }, [])

    const [val, setVal] = useState("Hello There")

    const change = event => {
        setVal(event.target.value) 
    };

    const deleteClick = () => {
        reqSend.defaultReq("DELETE", 'api/v1/invReports/deleteReports/G0008', {},
            response => {
                if (response.status === 200 && response.data) {
                    console.log(response.data);
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
    );
    };

    const generateClick = () => {
        reqSend.defaultReq("POST", 'api/v1/invReports/generate', {},
            response => {
                if (response.status === 200 && response.data) {
                    console.log(response.data);
                    window.location.reload();
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    return (
        <>
            <main>
                <div className="head-title" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack spacing={2} alignItems="center">
                        <div className="left">
                            <h1>Report Generation</h1>   
                        </div>
                            <Button onClick={generateClick} maxWidth='40px' variant="contained">Generate Report</Button>
                            <Stack spacing={2} direction={"row"}>
                                <Button onClick={deleteClick} size="small" style={{ width: '40%' }} variant="contained" color="error">Delete</Button>
                                <TextField onChange={change} value={val} size="small" style={{ maxwidth: '500px', width: '100%'}} id="outlined-basic" label="Report ID" variant="outlined" />
                            </Stack>
                    </Stack>

                </div>
                <div class="container" style={{ textAlign: 'center' }}>
                <div className="mt-5">
                    <h4 style={{ marginBottom: '20px' }} >Past generated reports:</h4>
                    <table class="table table-bordered table-hover table-sm" style={{ width: '70%', margin: 'auto' }} >
                        <thead class="thead-light">
                            <tr>
                               <th>Report ID</th>
                               <th>Date & Time</th>
                            </tr>
                        </thead>
                    <tbody>
                        {data.map((report, index) => (
                            <tr key={index}>
                                <td>{report.reportId}</td>
                                <td>{report.generatedDateAndTime}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>

            </main>
        </>
    )
}

// export function ViewRepairs(props) {

//     const tableData = {
//         name: "Sample Table",
//         heading: ["Column 1", "Column 2", "Column 3"],
//         body: [
//             <tr key="row1">
//                 <td>Data 1</td>
//                 <td>Data 2</td>
//                 <td>Data 3</td>
//             </tr>,
//             <tr key="row2">
//                 <td>Data 4</td>
//                 <td>Data 5</td>
//                 <td>Data 6</td>
//             </tr>,
//             // Add more rows as needed
//         ],
//     };


//     useEffect(() => {
        
//         reqSend.defaultReq("GET", 'api/v1/repair/getDamagedItems', {}, 
//                 response => {
//                     if (response.status === 200 && response.data) {
//                         console.log(response.data);
//                     } else {
//                         console.error("Invalid response format:", response);
//                     }
//                 },
//                 error => {
//                     console.error("API request failed:", error);
//                 }
//             );

//     }, [])

//     return (
//         <>
//             <main>
//                 <div className="head-title">
//                     <div className="left">
//                         <h1>View Stocks</h1>
//                     </div>

//                     <TableComp data={tableData} />

//                 </div>

//             </main>
//         </>
//     )
// }

export function ViewRepairs(props) {

    const tableData = {
        name: "Information on repairs",
        heading: ["Column 1", "Column 2", "Column 3"],
        body: [
            <tr key="row1">
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
            </tr>,
            <tr key="row2">
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
            </tr>,
            <tr key="row3">
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
            </tr>,
            <tr key="row4">
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
            </tr>,
            // Add more rows as needed
        ],
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Repairs</h1>
                    </div>

                    <TableComp data={tableData} />

                </div>

            </main>
        </>
    )
}
