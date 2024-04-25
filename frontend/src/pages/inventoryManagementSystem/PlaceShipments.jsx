import React, { useEffect, useState } from 'react';
import * as reqSend from '../../global/reqSender.jsx';

export default function PlaceShipments({ onClose }) {
  const [tableData, setTableData] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [manager, setManager] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [formValues, setFormValues] = useState({
    quantity: '',
    supplierId: '',
    managerId: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
    fetchSupplierOptions();
    fetchManagerOptions();
  }, []); 

  const fetchData = () => {
    reqSend.defaultReq('POST','api/v1/inventory/checkQuantity',{},
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

  const handleSubmit = () => {
    const selectedSupplierId = formValues.supplierId;
    const selectedManagerId = formValues.managerId;

    const payload = {
        stockAlerts: selectedRows.map(row => ({
            alertId: row.alertId,
            itemId: row.itemId,
            reorderQuantity: formValues[row.id]?.quantity
        })),
        inventoryManagerId: selectedManagerId,
        supplierId: selectedSupplierId 
    };

    reqSend.defaultReq('POST', 'api/v1/shipments/createShipment', payload,
        response => {
            if (response.status === 200 && response.data) {
                setMessage('Shipment created successfully.');
            } else {
                setMessage('Shipment created successfully.');
            }
        },
        error => {
            console.error('API request failed:', error);
            setMessage('Error creating shipment.');
        }
    );
};
  

  return (
    <div className="modal" style={{ display: 'block', backgroundColor:'rgba(0, 0, 0, 0.5)' }}>
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
                        value={formValues[row.id]?.quantity } 
                        onChange={(event) => setFormValues({ ...formValues, [row.id]: { ...formValues[row.id], quantity: event.target.value } })}
                        name="quantity"
                      />
                    </td>
                    <td>
                      <select 
                        className="form-supplier" 
                        value={formValues.supplierId}
                        onChange={(event) => setFormValues({ ...formValues, supplierId: event.target.value })}
                        name="supplierId"
                        style={{ width: '90%' }}
                      >
                        {supplier.map(option => (
                          <option key={option.id} value={option.id}>{option.id}-{option.companyName}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select 
                        className="form-manager" 
                        value={formValues.managerId}
                        onChange={(event) => setFormValues({ ...formValues, managerId: event.target.value })}
                        name="managerId"
                        style={{ width: '90%' }}
                      >
                        {manager.map(option => (
                          <option key={option.id} value={option.id}>{option.id}-{option.managerName}</option>
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
    </div>
  );
}
