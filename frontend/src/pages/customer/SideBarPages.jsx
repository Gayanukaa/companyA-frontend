import React from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from "../../components/sideComps/TableComp";
import avatar from "../../assets/avatar.svg";
import * as reqSend from "../../global/reqSender";


import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";



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
    // User detail connect with backend
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/user-details');
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserData();
    }, []);

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Dashboard</h1>
                </div>
                {userData ? (
                    <div>
                        <h2>User Details</h2>
                        <p>Name: {userData.name}</p>
                        <p>Contact Number: {userData.contactNumber}</p>
                        <p>Email: {userData.email}</p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
                {error && <p>Error: {error}</p>}
            </div>
        </main>
    );
}


export function PlaceOrder(props) {
    // send the shipping data to backend

    const [addressLine1, setaddressLine1] = useState("");
    const [addressLine2, setaddressLine2] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [country, setcountry] = useState("");
    const [zipCode, setzipCode] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const shippingAddress = `${addressLine1} ${addressLine2}, ${city}, ${state}, ${country}, ${zipCode}`;
        console.log("Form submitted with shipping address:", shippingAddress);
        // Reset the form
        setaddressLine1("");
        setaddressLine2("");
        setcity("");
        setstate("");
        setcountry("");
        setzipCode("");

        const addressData = {
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,


        };

        console.log(addressData);



        reqSend.defaultReq("POST", 'api/v1/User delivery addresses', addressData,
            response => {
                if (response.status === 200 && response.data) {
                    navigate("/customer/products");
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
                            Address Line 1:
                            <input
                                type="text"
                                value={addressLine1}
                                onChange={(e) => setaddressLine1(e.target.value)}
                                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                                placeholder="Enter Address Line 1 "
                            />
                        </label>
                        <label style={{ display: "block", marginBottom: "10px" }}>
                            Address Line 2:
                            <input
                                type="text"
                                value={addressLine2}
                                onChange={(e) => setaddressLine2(e.target.value)}
                                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                                placeholder="Enter Address Line 2"
                            />
                        </label>
                        <label style={{ display: "block", marginBottom: "10px" }}>
                            City:
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setcity(e.target.value)}
                                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                                placeholder="Enter city"
                            />
                        </label>
                        <label style={{ display: "block", marginBottom: "10px" }}>
                            State:
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setstate(e.target.value)}
                                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                                placeholder="Enter state"
                            />
                        </label>
                        <label style={{ display: "block", marginBottom: "10px" }}>
                            Country:
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setcountry(e.target.value)}
                                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                                placeholder="Enter country"
                            />
                        </label>
                        <label style={{ display: "block", marginBottom: "10px" }}>
                            Zip Code:
                            <input
                                type="text"
                                value={zipCode}
                                onChange={(e) => setzipCode(e.target.value)}
                                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                                placeholder="Enter zip code"
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
export function GetQuotation() {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', // Add this line to center vertically
            height: '80vh' // Set height to the full viewport height
        }}>
            <button type="submit" style={{
                // Adjust width as needed
                width: "20%",
                padding: "10px",
                fontSize: "16px",
                color: "#fff",
                backgroundColor: "#007bff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
            }} onClick={() => { navigate("/customer/products") }}>Get Quotation</button>
        </div>
    );
}
