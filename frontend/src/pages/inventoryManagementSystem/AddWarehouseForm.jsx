import * as reqSend from '../../global/reqSender.jsx';
import React, { useState } from 'react';

export default function AddWarehouseForm({ onClose }) {
    const [warehouseName, setWarehouseName] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    const handleAddWarehouse = () => {
        const payload = {
            name: warehouseName,
            location: location,
            inventoryList: []
        };

        reqSend.defaultReq("POST", 'api/v1/warehouse/addWarehouse', payload,
            response => {
                if (response.status === 201) {
                    setMessage('Warehouse added successfully.')
                } else {
                    console.error("Failed to add warehouse:", response);
                    setMessage('Error creating warehouse.')
                }
            },
            error => {
                console.error("Error adding warehouse:", error);
                setMessage('Error :', error)
            }
        );
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Add Warehouse</h2>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="deleteItemForm" style={{ border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
                            <form>
                                {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><label>Warehouse Name</label></td>
                                            <td>
                                                <input type='text' value={warehouseName} onChange={(e) => setWarehouseName(e.target.value)}></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label>Location</label></td>
                                            <td>
                                                <input type='text' value={location} onChange={(e) => setLocation(e.target.value)}></input>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleAddWarehouse}>Add Warehouse</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
