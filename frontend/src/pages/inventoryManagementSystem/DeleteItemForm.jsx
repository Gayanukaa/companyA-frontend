import * as reqSend from '../../global/reqSender.jsx';
import React, { useState, useEffect } from 'react';

export default function DeleteItemForm({ onClose }) {
    const [stockOptions, setStockOptions] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchDeleteItemData();
    }, []);

    const fetchDeleteItemData = () => {
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

    const handleDeleteItemSubmit = (event) => {
        event.preventDefault();
        const selectedItem = document.getElementById('selectItem').value;

        reqSend.defaultReq("DELETE", `api/v1/inventory/deleteInventory/${selectedItem}`, {},
            response => {
                if (response.status === 200) {
                    setMessage('Item Deleted Successfully');
                } else {
                    setMessage('Error Deleting the Item. Try Again');
                }
            },
            error => {
                setMessage('Error Deleting the Item :',error);
            }
        );
    };

    const formDeleteItem = (
        <div className="deleteItemForm" style={{ border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
            <form>
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
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">Delete Item</h2>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
                        {formDeleteItem}
                    </div>
                    <div class="modal-footer">
                        <button onClick={handleDeleteItemSubmit} class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
