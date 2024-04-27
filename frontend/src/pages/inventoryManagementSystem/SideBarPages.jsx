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
import CreateItemForm from "./CreateItemForm.jsx";
import DeleteItemForm from "./DeleteItemForm.jsx";
import AddWarehouseForm from "./AddWarehouseForm.jsx";

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
    const [showAddWarehouseForm, setShowAddWarehouseForm] = useState(false);

    useEffect(() => {
        fetchData();
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

    const toggleAddItemForm = () => {
        setShowAddItemForm(!showAddItemForm);
     };

    const toggleDeleteItemForm = () => {
        setShowDeleteItemForm(!showDeleteItemForm);
     };

    const toggleAddWarehouseForm = () => {
        setShowAddWarehouseForm(!showAddWarehouseForm);
     };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Dashboard</h1>
                </div>

                <div className="full-width-components"><hr class="border border-secondary border-2 opacity-75"></hr></div>

                <div>
                    
                    <Stack direction="row" spacing={2}>
                        <h2>Inventory Details</h2>
                        <button onClick={toggleAddItemForm} type="button" className="btn btn-primary justify-center gap-2"><AddIcon/>Add Item</button>
                        <button onClick={toggleDeleteItemForm} type="button" className="btn btn-danger justify-center gap-2"><DeleteIcon/>Delete Item</button>
                    </Stack>

                    {showAddItemForm && <CreateItemForm onClose={toggleAddItemForm} />}
                    {showDeleteItemForm && <DeleteItemForm onClose={toggleDeleteItemForm} />}
                </div>
                
                <div className="full-width-components">
                    { tableData && (
                        <TableComp data={tableData} />
                    )}
                </div>      
                
                <div className="full-width-components"><hr class="border border-secondary border-2 opacity-75"></hr></div>

                <div>
                    <Stack direction="row" spacing={87}>
                        <h2>Warehouse Details</h2>
                        <button onClick={toggleAddWarehouseForm} type="button" className="btn btn-primary justify-center gap-2"><AddIcon/>Add Warehouse</button>
                    </Stack>
                    {showAddWarehouseForm && <AddWarehouseForm onClose={toggleAddWarehouseForm} />}
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
    const [loading, setLoading] = useState(false); 
    
    useEffect(() => {
        fetchShipmentsData();
    }, []);

    const fetchShipmentsData = () => {
        setLoading(true); 
        reqSend.defaultReq("GET", 'api/v1/shipments/getShipments', {},
            response => {
                if (response.status === 200 && response.data) {
                    setShipmentsData(response.data);
                    setLoading(false); } 
                    else {
                    console.error("Invalid response format:", response);
                    setLoading(false); 
                }
            },
            error => {
                console.error("API request failed:", error);
                setLoading(false); 
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
        setLoading(true); 
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
                    setLoading(false); 
                } else {
                    console.error("Invalid response format:", response);
                    setLoading(false); 
                }
            },
            error => {
                console.error("API request failed:", error);
                setLoading(false); 
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
                <h1>Orders & Shipments</h1>
                </div>
                
                <Stack direction="row" spacing={2}>
                    <button onClick={fetchData} type="button" className="btn btn-primary">Show Items to Order</button>
                    <button disabled={shipmentButtonDisabled} onClick={toggleShipmentForm} type="button" class="btn btn-primary">Place Shipment</button>
                    <button onClick={toggleNewShipmentForm} type="button" className="btn btn-primary">Place New Shipment</button>
                </Stack>
        
                {showShipmentForm && <PlaceShipments onClose={toggleShipmentForm} />}
                {showNewShipmentForm && <PlaceNewShipment onClose={toggleNewShipmentForm} />}
            </div>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center' }}>                   
                {loading ? (
                    <div> 
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    
                ) : (
                    showTable && tableData && ( 
                        <TableComp data={tableData} />
                    )
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

    const [showVal, setShowVal] = useState("")

    const changeShowVal = event => {
        setShowVal(event.target.value)
    } 

    const [showReportForm, setReportForm] = useState(false);

    // const handleShowClick = () => {
    //     setReportForm(true); 
    // }

    const reportForm = (
        <div className="addItemForm" style={{ border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
            <h3>Report Details</h3>
            <IconButton
                    aria-label="close"
                    onClick={() => setReportForm(false)}
                    style={{ position: "absolute", top: "5px", right: "5px" }}
                >
                    <CloseIcon />
            </IconButton>
            
        </div>
    )

    const showClick = () => {
        setReportForm(true);
        console.log("ShowClicked")
        const report = data.find(report => report.reportId === showVal);
        console.log(data);
        console.log(report);
    }


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
                <Stack spacing={2}>
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
                <div>
                    {showReportForm && reportForm}
                    
                    
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
