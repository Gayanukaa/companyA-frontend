import React from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';

import { useState, useEffect } from 'react';




export function ViewStocks(props) {

    const tableData = {
        name: "Sample Table",
        heading: ["Column 1", "Column 2", "Column 3"],
        body: [
            <tr key="row1">
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
            </tr>,
            <tr key="row2">
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
            </tr>,
            // Add more rows as needed
        ],
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>View Stocks</h1>
                    </div>

                    <TableComp data={tableData} />

                </div>

            </main>
        </>
    )
}


export function DashboardView(props) {

    const dataList = [
        {
            image: avatar,
            altText: "Avatar 1",
            count: 5,
            name: "John Doe"
        },
        {
            image: avatar,
            altText: "Avatar 2",
            count: 3,
            name: "Jane Smith"
        },
        {
            image: avatar,
            altText: "Avatar 3",
            count: 7,
            name: "Bob Johnson"
        }
    ];

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Dashboard</h1>
                    </div>

                    <CardComp data={dataList} />
                </div>
            </main>
        </>
    )
}


export function PlaceOrder(props) {

    const [houseNumber, setHouseNumber] = useState("");
    const [streetName, setStreetName] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const shippingAddress = `${houseNumber} ${streetName}, ${city}, ${postalCode}`;
        console.log("Form submitted with shipping address:", shippingAddress);
        // Reset the form
        setHouseNumber("");
        setStreetName("");
        setCity("");
        setPostalCode("");
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Place Order</h1>
                    </div>
                </div>

                {/* Add spacing between head title and form */}
                <div style={{ marginTop: "20px" }}>
                    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
                        <label style={{ display: "block", marginBottom: "10px" }}>
                            House Number:
                            <input
                                type="text"
                                value={houseNumber}
                                onChange={(e) => setHouseNumber(e.target.value)}
                                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                                placeholder="Enter house number"
                            />
                        </label>
                        <label style={{ display: "block", marginBottom: "10px" }}>
                            Street Name:
                            <input
                                type="text"
                                value={streetName}
                                onChange={(e) => setStreetName(e.target.value)}
                                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                                placeholder="Enter street name"
                            />
                        </label>
                        <label style={{ display: "block", marginBottom: "10px" }}>
                            City:
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                                placeholder="Enter city"
                            />
                        </label>
                        <label style={{ display: "block", marginBottom: "10px" }}>
                            Postal Code:
                            <input
                                type="text"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                                placeholder="Enter postal code"
                            />
                        </label>
                        <button type="submit" style={{ display: "block", width: "100%", padding: "10px", marginTop: "10px", fontSize: "16px", color: "#fff", backgroundColor: "#007bff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Place Order</button>
                    </form>
                </div>
            </main>
        </>
    );
}

export function OrderHistory() {
    const [salesRecords, setSalesRecords] = useState([]);

    useEffect(() => {
        // Fetch data from backend when component mounts
        fetchSalesRecords();
    }, []);

    const fetchSalesRecords = async () => {
        try {
            const response = await fetch('/sales-records');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setSalesRecords(data);
        } catch (error) {
            console.error('Error fetching sales records:', error);
        }
    };

    const handleRefundRequest = (orderId) => {
        // Implement refund request logic here
        console.log('Requesting refund for order:', orderId);
    };

    return (
        <div>
            <h2>Order History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Components</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {salesRecords.map(record => (
                        <tr key={record.order_ID}>
                            <td>{record.order_ID}</td>
                            <td>{record.order_date}</td>
                            <td>{record.order_amount}</td>
                            <td>{record.components.join(', ')}</td>
                            <td>
                                <button onClick={() => handleRefundRequest(record.order_ID)}>Request Refund</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  }
  