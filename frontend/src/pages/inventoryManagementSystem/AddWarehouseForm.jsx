import * as reqSend from '../../global/reqSender.jsx';
import React, { useState, useEffect } from 'react';

export default function AddWarehouseForm({ onClose }) {
    
    const formAddWarehouse = (
        <div className="deleteItemForm" style={{ border: "2px solid #ccc", padding: "10px", borderRadius: "10px", position: "relative" }}>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Warehouse Name</label></td>
                            <td>
                                <input type='text'></input>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Loacation</label></td>
                            <td>
                                <input type='text'></input>
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
                        <h5 class="modal-title">Add Warehouse</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
                        {formAddWarehouse}
                    </div>
                    <div class="modal-footer">
                        <button onClick={handleAddWarehouseSubmit} class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
