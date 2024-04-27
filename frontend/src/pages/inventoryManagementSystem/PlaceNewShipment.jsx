import * as reqSend from '../../global/reqSender.jsx';
import React, { useState, useEffect } from 'react';

export default function PlaceNewShipment({onClose}) {
    const [stockOptions, setStockOptions] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [manager, setManager] = useState([]);

    useEffect(() => {
        fetchItemData();
        fetchSupplierOptions();
        fetchManagerOptions();
    }, []);

    //Test

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

  return (
    <div className="modal" style={{ display: 'block', backgroundColor:'rgba(0, 0, 0, 0.5)' }}>
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Place New Shipment</h5>
                    <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table>
                        <tr>
                            <td>Item</td>
                            <td>
                                <select id="selectItem" name="selectItem">
                                    {stockOptions.map(option => (
                                        <option key={option.id} value={option.id}>{option.id} - {option.name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Quantity</td>
                            <td>
                                <input type="number" className="form-control" id="inputQuantity" min="0" step="1"></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Supplier</td>
                            <td>
                                <select>
                                    {supplier.map(option => (
                                    <option key={option.id} value={option.id}>{option.id}-{option.companyName}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Inventory Manager</td>
                            <td>
                                <select>
                                    {manager.map(option => (
                                    <option key={option.id} value={option.id}>{option.id}-{option.managerName}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    )
}

