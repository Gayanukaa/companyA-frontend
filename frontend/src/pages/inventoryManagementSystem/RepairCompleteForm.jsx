import * as reqSend from '../../global/reqSender.jsx';
import React, { useState, useEffect } from 'react';

export default function RepairCompleteForm({ onClose }) {
    const [itemsUnderRepair, setItemsUnderRepair] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchRepairItems();
    }, []);

    const fetchRepairItems = () => {
        reqSend.defaultReq("GET", 'api/v1/repair/getAllRepairs', {},
            response => {
                if (response.status === 200 && response.data) {
                    const options = response.data.map(item => ({
                        id: item.id,
                        name: item.name
                    }));
                    setItemsUnderRepair(options);
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

    const handleRepairs = (event) => {
        event.preventDefault();
        const selectedItem = document.getElementById('selectItem').value;
        console.log(selectedItem)

        reqSend.defaultReq("GET", `api/v1/repair/itemsRepairDone/${selectedItem}`, {},
            response => {
                if (response.status === 200) {
                    setMessage('Repair process is complete');
                } else {
                    setMessage('Error Repairing the Item. Try Again');
                }
            },
            error => {
                setMessage('Error Repairing the Item :',error);
                console.log('Error')
            }
        );
    };

    const formDeleteItem = (
        <div className="deleteItemForm" style={{ border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="selectItem">Items that are under repair:</label></td>
                            <td>
                                <select id="selectItem" name="selectItem">
                                    {itemsUnderRepair.map(option => (
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
                        <h2 class="modal-title">Complete Repair</h2>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
                        {formDeleteItem}
                    </div>
                    <div class="modal-footer">
                        <button onClick={handleRepairs} class="btn btn-success">Repair</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
