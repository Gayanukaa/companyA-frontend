import React, { useEffect, useState } from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';
import * as reqSend from '../../global/reqSender.jsx';
import { Stack } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
    const [selectedItem, setSelectedItem] = useState('');
    const [msg, setmsg] = useState('');

    useEffect(() => {
        fetchData();
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

    const handleAddItemClick = () => {
        setShowAddItemForm(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        

        // Gather form data
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

        // Check for missing fields
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
                    <tbody>
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
                                    <option value="W0001">Warehouse 1</option>
                                    <option value="W0002">Warehouse 2</option>
                                    <option value="W0003">Warehouse 3</option>
                                    <option value="W0004">Warehouse 4</option>
                                    <option value="W0005">Warehouse 5</option>
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
                    </tbody>
                </table>
                {msg && <p style={{ color: "red" }}>{msg}</p>}
            </form>
        </div>
    );

    const handleDeleteItemClick = () => {
        setShowDeleteItemForm(true);
    };

    const handleDeleteItemSubmit = (event) => {
        event.preventDefault();
        const selectedItem = event.target.selectItem.value;
        // Send API request to delete item
        // Update state or show message accordingly
        console.log("Selected item to delete:", selectedItem);
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
                <label htmlFor="selectItem">Select Item to Delete:</label>
                <select id="selectItem" name="selectItem">
                    <option value="item1">Item 1</option>
                    <option value="item2">Item 2</option>
                    <option value="item3">Item 3</option>
                </select>
                <button type="submit" className="btn btn-danger">Delete</button>
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

/*export function OrderItems(props) {
    const [tableData, setTableData] = useState(null);
    const [showTable, setShowTable] = useState(false);

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

                    <button onClick={fetchData} type="button" className="btn btn-primary">Show Items to Order</button>

                    {showTable && tableData && (
                        <TableComp data={tableData} />
                    )}
                </div>
            </main>
        </>
    )
}*/

export function ViewReports(props) {

    const tableData = {
        name: "Report 1",
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
                        <h1>Report Generation</h1>
                    </div>

                    <TableComp data={tableData} />

                </div>

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
