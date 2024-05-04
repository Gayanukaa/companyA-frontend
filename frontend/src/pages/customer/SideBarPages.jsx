import React from "react";
import TableComp from "../../components/sideComps/TableComp";
import * as reqSend from "../../global/reqSender";

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";



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
                const response = await axios.get("http://localhost:8090/api/v1/userDetails", {
                    params: {
                        email: "nimesh@mp.com"
                    }
                });
                setUserData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserData();
    }, []);

    return (
        <main style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundPosition: 'center',
        }}>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                textAlign: 'center',
            }}>
                {userData ? (
                    <div>
                        <h2>About me</h2>
                        <p>First Name: {userData.firstName}</p>
                        <p>Last Name: {userData.lastName}</p>
                        <p>Contact Number: {userData.mobileNumber}</p>
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
    const [orderId, setorderId] = useState();
    const [orderStatuses, setOrderStatuses] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from backend when component mounts
        axios
            .get(
                `http://localhost:8090/api/v1/salesRecord?user_ID=${localStorage.getItem("userId")
                    ? localStorage.getItem("userId")
                    : "66189fd589a3a818a791a9c2"
                }`
            )
            .then((response) => {
                setSalesRecords(response.data.orders);
                console.log();
            })
            .catch((error) => {
                // Handle any errors that occur during the fetch
                console.error("Error fetching order status:", error);
            });
    }, []);


    useEffect(() => {
        // Fetch order statuses for all orders in salesRecords
        const fetchStatuses = async () => {
            const statuses = await Promise.all(
                salesRecords.map(record => fetchOrderStatuses(record.order_ID))
            );
            // Update orderStatuses state with the fetched statuses
            setOrderStatuses(statuses);
        };
        // Call fetchStatuses when component mounts
        fetchStatuses();
    }, [salesRecords]);


    const fetchOrderStatuses = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:8090/api/v1/getOrderStatus?orderID=${orderId}`);
            return response.data.status; // Return status from response
        } catch (error) {
            console.error("Error fetching order status:", error);
            return ""; // Return an empty string in case of error
        }
    };



    const fetchSalesRecords = async () => {
        try {
            const response = await fetch("/sales-records");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setSalesRecords(data);
        } catch (error) {
            console.error("Error fetching sales records:", error);
        }
    };

    const handleRefundRequest = (orderId) => {
        navigate("/");
        console.log("Requesting refund for order:", orderId);
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
                        <th>Refund Status</th>
                    </tr>
                </thead>
                <tbody>
                    {salesRecords.map((record, index) => {


                        return (
                            <tr key={record.order_ID}>
                                <td>{record.order_ID}</td>
                                <td>{record.order_date}</td>
                                <td>{record.order_amount}</td>
                                <td>{record.components.join(", ")}</td>
                                <td>
                                    <button
                                        style={{
                                            display: "block",
                                            width: "100%",
                                            padding: "10px",
                                            marginTop: "10px",
                                            fontSize: "16px",
                                            color: "#fff",
                                            backgroundColor: "#007bff",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleRefundRequest(record.order_ID)}
                                    >
                                        Request Refund
                                    </button>
                                </td>
                                <td>{orderStatuses[index]}</td>
                            </tr>
                        );
                    })}
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
