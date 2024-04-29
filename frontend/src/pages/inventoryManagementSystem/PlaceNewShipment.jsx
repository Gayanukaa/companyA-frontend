import * as reqSend from '../../global/reqSender.jsx';
import React, { useState, useEffect } from 'react';

export default function PlaceNewShipment({ onClose }) {
    const [stockOptions, setStockOptions] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [manager, setManager] = useState([]);
    const [message, setMessage] = useState('');


    useEffect(() => {
        fetchItemData();
        fetchSupplierOptions();
        fetchManagerOptions();
    }, []);

    const fetchItemData = () => {
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

    const fetchSupplierOptions = () => {
        reqSend.defaultReq("GET", 'api/v1/suppliers/supplierDetails', {},
            response => {
                if ((response.status === 200) && response.data) {
                    const options = response.data.map(supplier => ({
                        id: supplier.supplierId,
                        companyName: supplier.companyName,
                    }));
                    setSupplier(options);
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    const fetchManagerOptions = () => {
        reqSend.defaultReq("GET", 'api/v1/inventoryManager/details', {},
            response => {
                if (response.status === 200 && response.data) {
                    const options = response.data.map(manager => ({
                        id: manager.managerId,
                        managerName: manager.managerName,
                    }));
                    setManager(options);
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    const handleSaveChanges = () => {
        const itemId = document.getElementById('selectItem').value;
        const requestedQuantity = document.getElementById('inputQuantity').value;
        const inventoryManagerId = document.getElementById('selectManager').value;
        const supplierId = document.getElementById('selectSupplier').value;

        const payload = {
            itemId: itemId,
            requestedQuantity: requestedQuantity,
            inventoryManagerId: inventoryManagerId,
            supplierId: supplierId
        };

        reqSend.defaultReq("POST", 'api/v1/shipments/placeCustomShipment', payload,
            response => {
                if (response.status === 201) {
                    setMessage('Shipment created successfully.');
                } else {
                    setMessage('Error. Failed to create shipment');
                    console.error("Failed to create shipment:", response);
                }
            },
            error => {
                setMessage('Error creating shipment');
                console.error("Error creating shipment:", error);
            }
        );
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Place New Shipment</h2>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
                        <table style={{ border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
                            <tbody>
                                <tr>
                                    <td>Item</td>
                                    <td>
                                        <select id="selectItem" name="selectItem" style={{ width: '250px'}}>
                                            {stockOptions.map(option => (
                                                <option key={option.id} value={option.id}>{option.id} - {option.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Quantity</td>
                                    <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <input type="number" className="form-control" id="inputQuantity" min="0" step="1" style={{ borderWidth: '2px', width: '250px'}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Supplier</td>
                                    <td>
                                        <select id="selectSupplier" style={{ width: '250px'}}>
                                            {supplier.map(option => (
                                                <option key={option.id} value={option.id}>{option.id}-{option.companyName}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Inventory Manager</td>
                                    <td>
                                        <select id="selectManager" style={{ width: '250px'}}>
                                            {manager.map(option => (
                                                <option key={option.id} value={option.id}>{option.id}-{option.managerName}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Place Shipments</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
