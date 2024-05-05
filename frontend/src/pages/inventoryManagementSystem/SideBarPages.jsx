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
import Shipment from '../../assets/Shipment.png';
import CardCompInventory from "./CardCompInventory.jsx"
import Box from '@mui/material/Box';
import PlaceNewShipment from "./PlaceNewShipment.jsx";
import './invReport.css';
import CreateItemForm from "./CreateItemForm.jsx";
import DeleteItemForm from "./DeleteItemForm.jsx";
import AddWarehouseForm from "./AddWarehouseForm.jsx";
import SendForRepairsForm from "./SendForRepairsForm.jsx"
import BuildIcon from '@mui/icons-material/Build';
import './custom.css'
import Warehouse from '../../assets/Warehouse.png';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ElectronicItem from '../../assets/ElectronicItem.png';
import CardCompDashboard from "./CardCompDashboard.jsx"

import TaskAlt from '@mui/icons-material/TaskAlt';
import Summarize from '@mui/icons-material/Summarize';
import RepairCompleteForm from "./RepairCompleteForm.jsx";
import RefreshIcon from '@mui/icons-material/Refresh';


export function DashboardView(props) {
    const [tableData, setTableData] = useState(null);
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const [showDeleteItemForm, setShowDeleteItemForm] = useState(false);
    const [showSendForRepairsForm, setShowSendForRepairsForm] = useState(false);
    const [showAddWarehouseForm, setShowAddWarehouseForm] = useState(false);
    const [warehouseData, setWarehouseData] = useState([]);
    const [stockOptions, setStockOptions] = useState([]);
    const [shipmentsData, setShipmentsData] = useState([]);

    useEffect(() => {
        fetchData();
        fetchWarehouseData();
        fetchInventoryData();
        fetchShipmentsData();
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

    const fetchWarehouseData = () => {
        reqSend.defaultReq("GET", 'api/v1/warehouse', {},
            response => {
                if (response.status === 200 && response.data) {
                    setWarehouseData(response.data);
                    console.log(response);
                    } 
                    else {
                    console.error("Invalid response format:", response); 
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    const numOfWarehouses = warehouseData.length; 

    const fetchInventoryData = () => {
        reqSend.defaultReq("GET", 'api/v1/inventory', {},
            response => {
                if (response.status === 200 && response.data) {
                    const options = response.data.map(item => ({
                        id: item.id,
                        name: item.name
                    }));
                    setStockOptions(options);
                    console.log(options)
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    const numOfItems = stockOptions.length;

    const fetchShipmentsData = () => {
        reqSend.defaultReq("GET", 'api/v1/shipments/getShipments', {},
            response => {
                if (response.status === 200 && response.data) {
                    setShipmentsData(response.data); } 
                    else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    const numOfShipments = shipmentsData.length;

    const dataList = warehouseData.map(warehouse => ({
        image: Warehouse,
        altText: warehouse.warehouseId,
        count: `${warehouse.warehouseId} | ${warehouse.name}`,
        name: `Location - ${warehouse.location}`
    }));

    const dataCards = [
        {
            image: ElectronicItem,
            altText: "Avatar 1",
            count: "Number of Items",
            name: numOfItems
        },
        {
            image: Warehouse,
            altText: "Avatar 2",
            count: "Number of Warehouses",
            name: numOfWarehouses
        },
        {
            image: Shipment,
            altText: "Avatar 3",
            count: "Number of Shipments",
            name: numOfShipments
        }
    ];

    const handleRefreshTable = () => {
        fetchData(); 
    };

    const handleRefreshWarehouse = () => {
        fetchWarehouseData(); 
    };

    const toggleAddItemForm = () => {
        setShowAddItemForm(!showAddItemForm);
     };

    const toggleDeleteItemForm = () => {
        setShowDeleteItemForm(!showDeleteItemForm);
     };

     const toggleSendForRepairsForm = () => {
        setShowSendForRepairsForm(!showSendForRepairsForm);
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

                <div className="full-width-components"><CardCompDashboard data={dataCards} /></div>

                <div className="full-width-components"><hr class="border border-secondary border-2 opacity-50"></hr></div>

                <div>
                    
                    <Stack direction="row" spacing={45}>
                        <h2>Inventory Details</h2>
                        <Stack direction="row" spacing={2}>
                            <button onClick={toggleAddItemForm} type="button" className="btn btn-primary justify-center gap-2"><AddIcon/>Add Item</button>
                            <button onClick={toggleDeleteItemForm} type="button" className="btn btn-danger justify-center gap-2"><DeleteIcon/>Delete Item</button>
                            <button onClick={toggleSendForRepairsForm} type="button" className="btn btn-success justify-center gap-2"><BuildIcon/>Send For Repairs</button>
                            <button onClick={handleRefreshTable} className="btn btn-secondary"><RefreshIcon/></button>
                        </Stack>
                        
                    </Stack>

                    {showAddItemForm && <CreateItemForm onClose={toggleAddItemForm} />}
                    {showDeleteItemForm && <DeleteItemForm onClose={toggleDeleteItemForm} />}
                    {showSendForRepairsForm && <SendForRepairsForm onClose={toggleSendForRepairsForm} />}
                </div>
                
                <div className="full-width-components">
                    { tableData && (
                        <TableComp data={tableData} />
                    )}
                </div>      
                
                <div className="full-width-components"><hr class="border border-secondary border-2 opacity-50"></hr></div>

                <div>
                    <Stack direction="row" spacing={85}>
                        <h2>Warehouse Details</h2>
                            <button onClick={toggleAddWarehouseForm} type="button" className="btn btn-primary justify-center gap-2"><AddIcon/>Add Warehouse</button>
                    </Stack>
                    <br></br>
                    {showAddWarehouseForm && <AddWarehouseForm onClose={toggleAddWarehouseForm} />}
                </div>
                
                <div className="full-width-components">
                    <Box boxShadow={5} borderRadius={8} bgcolor={"white"} padding={2}>
                        <Stack direction="row" spacing={92}>
                            <h2>Excisting Warehouses</h2>
                            <button onClick={handleRefreshWarehouse} className="btn btn-secondary"><RefreshIcon/></button>
                        </Stack>
                        <br></br>
                        <CardCompInventory data={dataList} />
                        <br></br>
                    </Box>
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

    const handleRefreshShipments = () => {
        fetchShipmentsData(); 
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
            </div>
            <br></br>
            <div>
                <Stack direction="row" spacing={55}>
                    <button onClick={fetchData} type="button" className="btn btn-primary"><SearchIcon />View Items Whose Quantity Is Less Than Threshold</button>
                    <button disabled={shipmentButtonDisabled} onClick={toggleShipmentForm} type="button" class="btn btn-primary"><LocalShippingIcon /> Place Shipment For These Items</button>
                </Stack>
                {showShipmentForm && <PlaceShipments onClose={toggleShipmentForm} />}
            </div>
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
                    <Stack direction="row" spacing={73}>
                        <h2>Placed Shipments</h2>
                        <Stack direction="row" spacing={2}>
                            <button onClick={toggleNewShipmentForm} type="button" className="btn btn-primary"><AddIcon/>Place New Shipment</button>
                            <button onClick={handleRefreshShipments} className="btn btn-secondary"><RefreshIcon/></button> 
                        </Stack>    
                    </Stack>
                    <br></br>
                    {showNewShipmentForm && <PlaceNewShipment onClose={toggleNewShipmentForm} />}
                    
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
                                <td><Button onClick={deleteClick} size="medium"  variant="contained" startIcon={<DeleteIcon />} color="error">Delete</Button></td>
                                <td><TextField onChange={change}  size="small" value={val} id="outlined-basic" label="Report ID" variant="outlined" /></td>
                            </tr>
                            <tr>
                                <td><Button onClick={showClick} size="medium"  style={{ width: '30px', minWidth:'105px' }} variant="contained" startIcon={<Summarize />} color="success" > Show </Button></td>
                                <td><TextField onChange={changeShowVal} value={showVal} size="small"  id="outlined-basic" label="Report ID" variant="outlined" /></td>
                            </tr>
                            </table>
                            <div class="container">
                                <Stack spacing={2} direction="column" >
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
                                </Stack>
                            </div> 
                    </Stack>
                </div>
                <Stack spacing={4}>
                <div class="container">
                </div>
                <div>
                    {showReportForm && reportForm} 
                </div>
                </Stack>
            </main>
        </>
    )
}


export function ViewRepairs(props) {
    const [repairsTableData, setRepairsTableData] = useState(null);
    const [showRepairForm, setShowRepairForm] = useState(false);

    useEffect(() => {
        fetchRepairsData();
    }, []);

    const toggleShowRepairForm = () => {
        setShowRepairForm(!showRepairForm);
     };

    const fetchRepairsData = () => {
        reqSend.defaultReq("GET", 'api/v1/repair/getAllRepairs', {},
            response => {
                if (response.status === 200 && response.data) {
                    const fetchedRepairsData = response.data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.inventoryId}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ));
                    setRepairsTableData({
                        name: "Repairs Table",
                        heading: ["Repair ID", "Inventory ID", "Name", "Quantity"],
                        body: fetchedRepairsData,
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

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Repairs</h1>
                        <button onClick={toggleShowRepairForm} type="button" className="btn btn-success justify-center gap-2"><TaskAlt/>Complete Repair</button>
                        {showRepairForm && <RepairCompleteForm onClose={toggleShowRepairForm} />}
                    </div>
                    <div className="full-width-components">
                    { repairsTableData && (
                        <TableComp data={repairsTableData} />
                    )}
                    </div>  
                </div>

            </main>
        </>
    )
}
