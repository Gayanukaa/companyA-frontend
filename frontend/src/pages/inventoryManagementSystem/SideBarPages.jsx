import React, { useEffect, useState } from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';
import { Stack, Button, TextField } from '@mui/material'
import * as reqSend from '../../global/reqSender.jsx';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaceShipments from "./PlaceShipments.jsx";
import Shipment from '../../assets/Shipment.jpg';
import CardCompInventory from "./CardCompInventory.jsx"
import Box from '@mui/material/Box';
import PlaceNewShipment from "./PlaceNewShipment.jsx";
import './invReport.css';

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
        reqSend.defaultReq("GET", 'api/v1/inventory', {},
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

        reqSend.defaultReq("POST", 'api/v1/inventory/addStock', formData,
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
        reqSend.defaultReq("GET", 'api/v1/inventory', {},
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

        reqSend.defaultReq("DELETE", `api/v1/inventory/deleteInventory/${selectedItem}`, {},
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
                        <button onClick={handleAddItemClick} type="button" className="btn btn-primary justify-center gap-2"><AddIcon/>Add Item</button>
                        <button onClick={handleDeleteItemClick} type="button" className="btn btn-danger justify-center gap-2"><DeleteIcon/>Delete Item</button>
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
    const [showShipmentForm, setShowShipmentForm] = useState(false);
    const [shipmentsData, setShipmentsData] = useState([]);
    const [showNewShipmentForm, setShowNewShipmentForm] = useState(false);
    
    useEffect(() => {
        fetchShipmentsData();
    }, []);

    const fetchShipmentsData = () => {
        reqSend.defaultReq("GET", 'api/v1/shipments/getShipments', {},
            response => {
                if (response.status === 200 && response.data) {
                    setShipmentsData(response.data);
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    const dataList = shipmentsData.map(shipment => ({
        image: Shipment,
        altText: shipment.id,
        count: `${shipment.id} | Tracking Number - ${shipment.trackingNumber}`,
        name: shipment.supplierId.companyName
    }));

    const fetchData = () => {
        reqSend.defaultReq("POST", 'api/v1/inventory/checkQuantity', {},
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

    const toggleShipmentForm = () => {
        setShowShipmentForm(!showShipmentForm);
      };

    const toggleNewShipmentForm = () => {
        setShowNewShipmentForm(!showNewShipmentForm);
     };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                <h1>Order Items</h1>
                </div>
        
                <Stack direction="row" spacing={2}>
                <button onClick={fetchData} type="button" className="btn btn-primary">Show Items to Order</button>
                <button disabled={shipmentButtonDisabled} onClick={toggleShipmentForm} type="button" className="btn btn-primary">Place Shipment</button>
                <button onClick={toggleNewShipmentForm} type="button" className="btn btn-primary">Place New Shipment</button>
                </Stack>
        
                {showShipmentForm && <PlaceShipments onClose={toggleShipmentForm} />}
                {showNewShipmentForm && <PlaceNewShipment onClose={toggleNewShipmentForm} />}
        
                {showTable && tableData && (
                <TableComp data={tableData} />
                )}
            </div>
            <br></br>
            <div className="full-width-components">
                <Box boxShadow={5} borderRadius={8} bgcolor={"white"} padding={2}>
                    <h2>Placed Shipments</h2>
                    <CardCompInventory data={dataList} />
                    <br></br>
                </Box>
            </div>
        </main>
    );
}



export function ViewReports(props) {

    const [data, setData] = useState([])

    // Responsible for getting data for the main table
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

    // Reads the value given to the 'delete report' text field
    const [val, setVal] = useState("")

    const change = event => {
        setVal(event.target.value)
        console.log(val) 
    };

    const deleteClick = () => {
        const reportIds = data.map(jsondata => jsondata.reportId);
        console.log("DeleteClicked")
        console.log(reportIds);
        if (reportIds.includes(val)) {
        reqSend.defaultReq("DELETE", `api/v1/invReports/deleteReport/${val}`, {},
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
    }
    else {
        console.log(val);
        alert("Please enter a valid ReportId");
    }
    };

    // Shows the report when show is clicked
    const [showReportForm, setReportForm] = useState(false);
    const [showVal, setShowVal] = useState("")
    const [invReport, setInvReport] = useState([])

    const changeShowVal = event => {
        setShowVal(event.target.value)
    } 

    // const showClick = () => {
    //     setReportForm(true);
    //     console.log("ShowClicked")
    //     const report = data.find(report => report.reportId === showVal);
    //     console.log(data);
    //     console.log(report);
    //     setCurrentReport(report);
    // };

    const showClick = () => {
        setReportForm(true);
        console.log(data)
        console.log("ShowClicked")
        console.log(showVal)
        const reportIds = data.map(jsondata => jsondata.reportId);
        console.log(reportIds)
        console.log(reportIds.includes(showVal))
        if (reportIds.includes(showVal)) {
            console.log('Inside the if statement')
            console.log(data)
            reqSend.defaultReq("GET", `api/v1/invReports/getReport/${showVal}`, {},
            response => {
                if (response.status === 200 && response.data) {
                    setInvReport(response.data);
                    // console.log(response.data)
                    console.log(data)
                    console.log(Object.keys(jsonData).length)
                    console.log("get invReport success")
                } else {
                    console.error("Invalid response format:", response);
                    console.log("Inside the else statement")
                }
            },
            error => {
                console.error("API request failed:", error);
            }
    );
    }
    else {
        console.log(val);
        alert("Please enter a valid ReportId");
    }
        console.log(invReport);
    };


    const fetchReport = () => {
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
    
    
    const [currentReport, setCurrentReport] = useState(null);

    // const handleShowClick = () => {
    //     setReportForm(true); 
    // }

    const reportForm = (
        <div className="addItemForm" style={{maxWidth: "750px", margin: "0 auto", border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
            <h2 style={{ textAlign: 'center' }}>Report Details</h2>
            <IconButton
                    aria-label="close"
                    onClick={() => setReportForm(false)}
                    style={{ position: "absolute", top: "5px", right: "5px" }}
                >
                    <CloseIcon />
            </IconButton>
            {Object.keys(invReport).length !== 0 && (
                        // <div>
                        // <h1>Report ID: {invReport.reportId}</h1>
                        //     <h2>Generated Date and Time: {invReport.generatedDateAndTime}</h2>
            
                        //     <h2>Warehouse Details:</h2>
                        //     <ul>
                        //     {Object.entries(invReport.warehouses).map(([warehouseId, warehouseName]) => (
                        //         <li key={warehouseId}>
                        //         {warehouseName} ({warehouseId})
                        //         </li>
                        //     ))}
                        //     </ul>
            
                        //     <h2>Items by Warehouse:</h2>
                        //     {Object.entries(invReport.warehouseItemsByWarehouse).map(([warehouseId, items]) => (
                        //     <div key={warehouseId}>
                        //         <h3>{invReport.warehouses[warehouseId]}</h3>
                        //         <ul>
                        //         {Object.entries(items).map(([itemId, itemName]) => (
                        //             <li key={itemId}>
                        //             {itemName} ({itemId})
                        //             </li>
                        //         ))}
                        //         </ul>
                        //     </div>
                        //     ))}
            
                        //     <h2>Most Remaining Items by Warehouse:</h2>
                        //     {Object.entries(invReport.mostRemainingItemsByWarehouse).map(([warehouseId, items]) => (
                        //     <div key={warehouseId}>
                        //         <h3>{invReport.warehouses[warehouseId]}</h3>
                        //         <ul>
                        //         {items.map((item, index) => (
                        //             <li key={index}>{item}</li>
                        //         ))}
                        //         </ul>
                        //     </div>
                        //     ))}
            
                        //     <h2>Total Worth by Warehouse:</h2>
                        //     <ul>
                        //     {Object.entries(invReport.totalWorth).map(([warehouseId, total]) => (
                        //         <li key={warehouseId}>
                        //         {invReport.warehouses[warehouseId]}: {total}
                        //         </li>
                        //     ))}
                        //     </ul>
                        // </div>
                        <div className="report-container">
                        <h4>Report ID: {invReport.reportId}</h4>
                        <Stack spacing={3}>
                            <h7>Generated Date and Time: {invReport.generatedDateAndTime}</h7>
                            <div className="section">
                                <h2>Warehouse Details:</h2>
                                <ul>
                                    {Object.entries(invReport.warehouses).map(([warehouseId, warehouseName]) => (
                                        <li key={warehouseId}>
                                            <span className="custom-bullet">&#8226;</span>
                                            {warehouseName} ({warehouseId})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Stack>

                        <div className="section">
                            <h2>Items by Warehouse:</h2>
                            {Object.entries(invReport.warehouseItemsByWarehouse).map(([warehouseId, items]) => (
                                <div key={warehouseId}>
                                    <h3>{invReport.warehouses[warehouseId]}</h3>
                                    <ul>
                                        {Object.entries(items).map(([itemId, itemName]) => (
                                            <li key={itemId}>
                                                <span className="custom-bullet">&#8226;</span>
                                                {itemName} ({itemId})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="section">
                            <h2>Most Remaining Items by Warehouse:</h2>
                            {Object.entries(invReport.mostRemainingItemsByWarehouse).map(([warehouseId, items]) => (
                                <div key={warehouseId}>
                                    <h3>{invReport.warehouses[warehouseId]}</h3>
                                    <ul>
                                        {items.map((item, index) => (
                                            <li key={index}>
                                                <span className="custom-bullet">&#8226;</span>
                                                {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="section">
                            <h2>Total Worth by Warehouse:</h2>
                            <ul>
                                {Object.entries(invReport.totalWorth).map(([warehouseId, total]) => (
                                    <li key={warehouseId}>
                                        <span className="custom-bullet">&#8226;</span>
                                        {invReport.warehouses[warehouseId]}: {total}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    )}
            {/* <div>
            <h1>Report ID: {invReport.reportId}</h1>
                <h2>Generated Date and Time: {invReport.generatedDateAndTime}</h2>

                <h2>Warehouse Details:</h2>
                <ul>
                {Object.entries(invReport.warehouses).map(([warehouseId, warehouseName]) => (
                    <li key={warehouseId}>
                    {warehouseName} ({warehouseId})
                    </li>
                ))}
                </ul>

                <h2>Items by Warehouse:</h2>
                {Object.entries(invReport.warehouseItemsByWarehouse).map(([warehouseId, items]) => (
                <div key={warehouseId}>
                    <h3>{invReport.warehouses[warehouseId]}</h3>
                    <ul>
                    {Object.entries(items).map(([itemId, itemName]) => (
                        <li key={itemId}>
                        {itemName} ({itemId})
                        </li>
                    ))}
                    </ul>
                </div>
                ))}

                <h2>Most Remaining Items by Warehouse:</h2>
                {Object.entries(invReport.mostRemainingItemsByWarehouse).map(([warehouseId, items]) => (
                <div key={warehouseId}>
                    <h3>{invReport.warehouses[warehouseId]}</h3>
                    <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    </ul>
                </div>
                ))}

                <h2>Total Worth by Warehouse:</h2>
                <ul>
                {Object.entries(invReport.totalWorth).map(([warehouseId, total]) => (
                    <li key={warehouseId}>
                    {invReport.warehouses[warehouseId]}: {total}
                    </li>
                ))}
                </ul>
            </div> */}
            
            
        </div>
    )

    const displayReport = () => {
        return (
            <div>
                <h1>Report ID: {invReport.reportId}</h1>
                <h2>Generated Date and Time: {invReport.generatedDateAndTime}</h2>

                <h2>Warehouse Details:</h2>
                <ul>
                    {Object.entries(invReport.warehouses).map(([warehouseId, warehouseName]) => (
                        <li key={warehouseId}>
                            {warehouseName} ({warehouseId})
                        </li>
                    ))}
                </ul>

                <h2>Items by Warehouse:</h2>
                {Object.entries(invReport.warehouseItemsByWarehouse).map(([warehouseId, items]) => (
                    <div key={warehouseId}>
                        <h3>{invReport.warehouses[warehouseId]}</h3>
                        <ul>
                            {Object.entries(items).map(([itemId, itemName]) => (
                                <li key={itemId}>
                                    {itemName} ({itemId})
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <h2>Most Remaining Items by Warehouse:</h2>
                {Object.entries(invReport.mostRemainingItemsByWarehouse).map(([warehouseId, items]) => (
                    <div key={warehouseId}>
                        <h3>{invReport.warehouses[warehouseId]}</h3>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}

                <h2>Total Worth by Warehouse:</h2>
                <ul>
                    {Object.entries(invReport.totalWorth).map(([warehouseId, total]) => (
                        <li key={warehouseId}>
                            {invReport.warehouses[warehouseId]}: {total}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    
    const createForm = () => {
        console.log("createForm function is running")
        return (
            <div>
                <h1>Report ID: {invReport.reportId}</h1>
                <h2>Generated Date and Time: {invReport.generatedDateAndTime}</h2>

                <h2>Warehouse Details:</h2>
                <ul>
                {Object.entries(invReport.warehouses).map(([warehouseId, warehouseName]) => (
                    <li key={warehouseId}>
                    {warehouseName} ({warehouseId})
                    </li>
                ))}
                </ul>

                <h2>Items by Warehouse:</h2>
                {Object.entries(invReport.warehouseItemsByWarehouse).map(([warehouseId, items]) => (
                <div key={warehouseId}>
                    <h3>{invReport.warehouses[warehouseId]}</h3>
                    <ul>
                    {Object.entries(items).map(([itemId, itemName]) => (
                        <li key={itemId}>
                        {itemName} ({itemId})
                        </li>
                    ))}
                    </ul>
                </div>
                ))}

                <h2>Most Remaining Items by Warehouse:</h2>
                {Object.entries(invReport.mostRemainingItemsByWarehouse).map(([warehouseId, items]) => (
                <div key={warehouseId}>
                    <h3>{invReport.warehouses[warehouseId]}</h3>
                    <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    </ul>
                </div>
                ))}

                <h2>Total Worth by Warehouse:</h2>
                <ul>
                {Object.entries(invReport.totalWorth).map(([warehouseId, total]) => (
                    <li key={warehouseId}>
                    {invReport.warehouses[warehouseId]}: {total}
                    </li>
                ))}
                </ul>
            </div>
        );
      };

    

    // Responsible for generating new
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
                    <Stack spacing={3} alignItems="center">
                    <div className="left">
                            <h1>Report Generation</h1>  

                        </div>
                            <Button onClick={generateClick} maxWidth='40px' variant="contained">Generate Report</Button>
                            <table>
                            <tr>
                                <td><Button onClick={deleteClick} size="medium"  variant="contained" endIcon={<DeleteIcon />} color="error">Delete</Button></td>
                                <td><TextField onChange={change}  size="small" value={val} id="outlined-basic" label="Report ID" variant="outlined" /></td>
                            </tr>
                            <tr>
                                <td><Button onClick={showClick} size="medium"  style={{ width: '30px', minWidth:'105px' }} variant="contained"  color="success" > Show </Button></td>
                                <td><TextField onChange={changeShowVal} value={showVal} size="small"  id="outlined-basic" label="Report ID" variant="outlined" /></td>
                                <td align="left"><button style={{ borderRadius: 4, background: 'none', padding: '5.5px 8px' }}><DownloadIcon/></button></td>
                            </tr>
                            </table>
                    </Stack>

                </div>
                <Stack spacing={4}>
                <div class="container" style={{ textAlign: 'center' }}>
                <div className="mt-5">
                    <h3 style={{ marginBottom: '20px' }} >Past generated reports:</h3>
                    <table class="table table-bordered table-hover table-sm" style={{ width: '70%', margin: 'auto' }} >
                        <thead class="thead-light">
                            <tr>
                               <th>Report ID</th>
                               <th>Date & Time</th>
                            </tr>
                        </thead>
                    <tbody>
                        {data.map((reports, index) => (
                            <tr key={index}>
                                <td>{reports.reportId}</td>
                                <td>{reports.generatedDateAndTime}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                
                </div>
                <div>
                    {showReportForm && reportForm} 
                    
                    <p>
                    {/* {report.map((item, index) => (
                        <div key={index}>
                            Report ID: {item.reportId}
                        </div>
                     ))} */}
                    </p>

                    {/* <p>Report ID: {currentReport.reportId}</p>                                        */}
                </div>
                </Stack>
{/* ////////////////////////////////// */}
                {/* <div>
                <h1>Report ID: {report.reportId}</h1>
                <h2>Generated Date and Time: {report.generatedDateAndTime}</h2>

                <h2>Warehouse Details:</h2>
                <ul>
                {Object.entries(report.warehouses).map(([warehouseId, warehouseName]) => (
                    <li key={warehouseId}>
                    {warehouseName} ({warehouseId})
                    </li>
                ))}
                </ul>

                <h2>Items by Warehouse:</h2>
                {Object.entries(report.warehouseItemsByWarehouse).map(([warehouseId, items]) => (
                <div key={warehouseId}>
                    <h3>{report.warehouses[warehouseId]}</h3>
                    <ul>
                    {Object.entries(items).map(([itemId, itemName]) => (
                        <li key={itemId}>
                        {itemName} ({itemId})
                        </li>
                    ))}
                    </ul>
                </div>
                ))}

                <h2>Most Remaining Items by Warehouse:</h2>
                {Object.entries(report.mostRemainingItemsByWarehouse).map(([warehouseId, items]) => (
                <div key={warehouseId}>
                    <h3>{report.warehouses[warehouseId]}</h3>
                    <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    </ul>
                </div>
                ))}

                <h2>Total Worth by Warehouse:</h2>
                <ul>
                {Object.entries(report.totalWorth).map(([warehouseId, total]) => (
                    <li key={warehouseId}>
                    {report.warehouses[warehouseId]}: {total}
                    </li>
                ))}
                </ul>
            </div> */}

            </main>
        </>
    )
}


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
