import * as reqSend from '../../global/reqSender.jsx';
import React, { useState, useEffect } from 'react';

export default function CreateItemForm({onClose}) {
    const [warehouseOptions, setWarehouseOptions] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchWarehouseOptions();
    }, []);

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

    const handleSubmit = () => {
        const formData = {
            name: document.getElementById('inputItemName').value,
            quantity: document.getElementById('inputQuantity').value,
            thresholdQuantity: document.getElementById('inputThresholdQuantity').value,
            reorderQuantity: document.getElementById('inputReorderQuantity').value,
            weight: document.getElementById('inputWeight').value,
            size: document.getElementById('inputSize').value,
            price: document.getElementById('inputPrice').value,
            warehouseId: document.getElementById('inputWarehouse').value,
            stateOfProduct: document.getElementById('inputStateOfProduct').value,
            inventoryType: document.getElementById('inputInventoryType').value
        };
    
        for (const key in formData) {
            if (!formData[key]) {
                setMessage("Error. Please fill in all fields");
                return;
            }
        }
    
        reqSend.defaultReq("POST", 'api/v1/inventory/addStock', formData,
            response => {
                if (response.status === 201) {
                    setMessage('Item added successfully.');
                    //onClose(); // Close the modal after successful submission
                    fetchData();
                } else {
                    console.error("Error adding item:", response);
                    setMessage("Error adding item. Please try again later.");
                }
            },
            error => {
                console.error("Error adding item:", error);
                setMessage("Error adding item. Please try again later.");
            }
        );
    };
    
    
    const formAddItem = (
        <div className="addItemForm" style={{ border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
            <form>
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
                    </tbody>
                </table>
            </form>
        </div>
    );

    
  return (
    <div className="modal" style={{ display: 'block', backgroundColor:'rgba(0, 0, 0, 0.5)' }}>
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Item</h5>
                    <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
                    {formAddItem}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={handleSubmit} type="button" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
    )
}

