import React, { useEffect, useState } from 'react';
import * as reqSend from '../../global/reqSender.jsx';

export default function PlaceShipments({ onClose }) {
    const [tableData, setTableData] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [manager, setManager] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [formValues, setFormValues] = useState({}); 
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        fetchSupplierOptions();
        fetchManagerOptions();
    }, []);

    useEffect(() => {
        if (tableData.length > 0 && supplier.length > 0 && manager.length > 0) {
            setLoading(false);
        }
    }, [tableData, supplier, manager]);

    const fetchData = () => {
        reqSend.defaultReq('POST', 'api/v1/inventory/checkQuantity', {},
            response => {
                if (response.status === 200 && response.data) {
                    const fetchedData = response.data.map(item => ({
                        alertId: item.alertId,
                        itemId: item.itemId,
                        itemName: item.itemName,
                        orderQuantity: item.reorderQuantity,
                        id: item.alertId
                    }));
                    setTableData(fetchedData);
                } else {
                    console.error('Invalid response format:', response);
                }
            },
            error => {
                console.error('API request failed:', error);
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

    const handleCheckboxChange = (event, row) => {
        const checked = event.target.checked;
        if (checked) {
            setSelectedRows([...selectedRows, row]);
        } else {
            setSelectedRows(selectedRows.filter(selectedRow => selectedRow.id !== row.id));
        }
    };

    const handleSupplierChange = (event, row) => {
        const supplierId = event.target.value;
        setFormValues({ ...formValues, [row.id]: { ...formValues[row.id], supplierId } });
    };

    const handleManagerChange = (event, row) => {
        const managerId = event.target.value;
        setFormValues({ ...formValues, [row.id]: { ...formValues[row.id], managerId } });
    };

    const handleSubmit = () => {
        setLoading(true);
        const payload = {
            stockAlerts: selectedRows.map(row => ({
                alertId: row.alertId,
                itemId: row.itemId,
                reorderQuantity: formValues[row.id]?.quantity
            })),
            inventoryManagerId: formValues[selectedRows[0].id]?.managerId, 
            supplierId: formValues[selectedRows[0].id]?.supplierId 
        };

        reqSend.defaultReq('POST', 'api/v1/shipments/createShipment', payload,
            response => {
                if (response.status === 200 && response.data) {
                    setLoading(false);
                    setMessage('Shipment created successfully.');
                } else {
                    setMessage('Shipment created successfully.');
                    setLoading(false);
                }
            },
            error => {
                console.error('API request failed:', error);
                setMessage('Error creating shipment.');
                setLoading(false);
            }
        );
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            {loading && (
                <div className="d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
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
            )}
            {!loading && (
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Select Item to Place Shipments</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Selected</th>
                                        <th>Item No</th>
                                        <th>Item Name</th>
                                        <th>Order Quantity</th>
                                        <th>Supplier</th>
                                        <th>Inventory Manager</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map(row => (
                                        <tr key={row.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(row)}
                                                    onChange={(event) => handleCheckboxChange(event, row)}
                                                />
                                            </td>
                                            <td>{row.itemId}</td>
                                            <td>{row.itemName}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="quantity"
                                                    id={`inputQuantity_${row.id}`}
                                                    min={row.orderQuantity}
                                                    step="1"
                                                    style={{ width: '100px', textAlign: 'center' }}
                                                    value={formValues[row.id]?.quantity || ''}
                                                    onChange={(event) => setFormValues({ ...formValues, [row.id]: { ...formValues[row.id], quantity: event.target.value } })}
                                                    name="quantity"
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    className="form-supplier"
                                                    value={formValues[row.id]?.supplierId || ''}
                                                    onChange={(event) => handleSupplierChange(event, row)}
                                                    style={{ width: '90%' }}
                                                >
                                                    <option value="">Select Supplier</option>
                                                    {supplier.map(option => (
                                                        <option key={option.id} value={option.id}>{option.companyName}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    className="form-manager"
                                                    value={formValues[row.id]?.managerId || ''}
                                                    onChange={(event) => handleManagerChange(event, row)}
                                                    style={{ width: '90%' }}
                                                >
                                                    <option value="">Select Manager</option>
                                                    {manager.map(option => (
                                                        <option key={option.id} value={option.id}>{option.managerName}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
