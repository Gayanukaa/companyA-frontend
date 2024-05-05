import * as reqSend from '../../global/reqSender.jsx';
import React, { useState, useEffect } from 'react';

export default function DeleteItemForm({ onClose }) {
    const [shipmentsData, setShipmentsData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchShipmentsData();
    }, []);


    const fetchShipmentsData = () => {
        reqSend.defaultReq("GET", 'api/v1/shipments/getShipments', {},
            response => {
                if (response.status === 200 && response.data) {
                    const options = response.data.map(shipment => ({
                        id: shipment.id,
                    }));
                    setShipmentsData(options);
                    console.log(options) } 
                    else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    };

    const handleRecieveShipmentSubmit = (event) => {
        event.preventDefault();
        const selectedItem = document.getElementById('selectItem').value;

        reqSend.defaultReq("GET", `api/v1/shipments/receiveShipment/${selectedItem}`, {},
            response => {
                if (response.status === 200) {
                    setMessage('Shipment Recieved Successfully');
                } else {
                    setMessage('Error Recieve Shipment. Try Again');
                }
            },
            error => {
                setMessage('Error Recieving Shipment :',error);
            }
        );
    };

    const formRecieveShipment = (
        <div className="recieveShipmentForm" style={{ border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="selectItem">Select Shipment ID to Receive:</label></td>
                            <td>
                                <select id="selectItem" name="selectItem">
                                    {shipmentsData.map(option => (
                                        <option key={option.id} value={option.id}>{option.id}</option>
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
                        <h2 class="modal-title">Receive Shipment</h2>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
                        {formRecieveShipment}
                    </div>
                    <div class="modal-footer">
                        <button onClick={handleRecieveShipmentSubmit} class="btn btn-success">Receive</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
