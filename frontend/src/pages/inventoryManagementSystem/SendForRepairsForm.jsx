import * as reqSend from '../../global/reqSender.jsx';
import React, { useState, useEffect } from 'react';

export default function DeleteItemForm({ onClose }) {
    const [repairItems, setRepairItems] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchDamageItem();
    }, []);

    const fetchDamageItem = () => {
        reqSend.defaultReq("GET", 'api/v1/repair/getDamagedItems', {},
            response => {
                if (response.status === 200 && response.data) {
                    setRepairItems(response.data);
                    console.log(response.data);
                    console.log(repairItems);
                    console.log("Inside the if statement")
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    console.log(repairItems);

    const handleSendItemForRepairs = (event) => {
        event.preventDefault();
        const selectedItem = document.getElementById('selectItem').value;
        reqSend.defaultReq("GET", `api/v1/repair/sendForRepairs/${selectedItem}`, {},
            response => {
                if (response.status === 200) {
                    setMessage('Item has been sent for repairs');
                } else {
                    setMessage('Error sending the item for repairs. Try Again');
                }
            },
            error => {
                setMessage('Error sending the item for repairs :',error);
            }
        );
    };

    const formDeleteItem = (
        <div className="deleteItemForm" style={{ border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="selectItem">Select Damaged Item to send for repairs:</label></td>
                            <td>
                                <select id="selectItem" name="selectItem">
                                    {repairItems.map(option => (
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
                        <h5 class="modal-title">Repairs</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
                        {formDeleteItem}
                    </div>
                    <div class="modal-footer">
                        <button onClick={handleSendItemForRepairs} class="btn btn-success">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
