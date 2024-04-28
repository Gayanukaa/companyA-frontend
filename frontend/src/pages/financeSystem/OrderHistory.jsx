import React from "react";
import TableComp from '../../components/sideComps/TableComp'
import { useState} from "react";
import searchimg from '../../assets/search.png';
import Swal from 'sweetalert2';
import { defaultReq } from '../../global/reqSender.jsx';
import AllOrders from "./AllOrders.jsx";
import { useNavigate } from 'react-router-dom';


export function OrderHistory(props) {

    const [orderId, setOrderId] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [showAllOrderDetails, setShowAllOrderDetails] = useState(false);
    const navigate = useNavigate();
    

    const handleSearch = () => {
        if (!orderId) {
            Swal.fire({ title: 'Error!', text: 'Please enter a order ID', icon: 'error', confirmButtonText: 'OK' });
            return;
        }
    
        defaultReq('GET', `api/bill/${orderId}`, null, 
            (response) => {
                if (response.status === 200 && response.data) {
                    console.log('Response:', response);
                    setOrderDetails(response.data);
                } else {
                    // Handle error response
                    Swal.fire({ title: 'Error!', text: 'Failed to fetch order details.', icon: 'error', confirmButtonText: 'OK' });
                }
            },
            (error) => {
                console.error('Error:', error);
                // Handle request error
                Swal.fire({ title: 'Error!', text: error.message || 'Failed to fetch order details.', icon: 'error', confirmButtonText: 'OK' });
            }
        );
    };
    

    

    const orderTable = {
        name: `Order Details: ${orderDetails?.order_ID}`,
        heading: ["Attribute", "Value"],
        body: [
            <tr key="row1">
                <td>Order ID</td>
                <td>{orderDetails?.order_ID}</td>
            </tr>,
                <tr key="row2">
                <td>Date</td>
                <td>{orderDetails?.order_date}</td>
            </tr>,
            <tr key="row2">
                <td>Amount</td>
                <td>{orderDetails?.order_amount}</td>
            </tr>,
        ],
    };

    const handleViewAllOrderDetails = () => {
        setShowAllOrderDetails(true); // Set state to show all employee salaries
        setOrderId('');
        setOrderDetails(null);
        navigate('/finantial-management/view-all-order-details');
    };

    const handleBackToIndividualOrderDetails = () => {
        setShowAllOrderDetails(false); // Set state to hide all employee salaries
    };

    return (
        <>
            <style>{`

                .search-box .head title{
                    display: ${showAllOrderDetails ? 'none' : 'block'};
                }

                .search-box {
                    display: flex;
                    align-items: center;
                    border: 1px solid #ccc;
                    border-radius: 18px;
                    padding: 5px;
                    background-color: #242424;
                }

                .search-box input[type="text"] {
                    border: none;
                    outline: none;
                    padding: 5px;
                    margin-right: 5px;
                    width: 250px;
                    height: 40px;
                    background-color: transparent;
                    color: #fff;
                }

                .search-icon {
                    cursor: pointer;
                    width: 25px;
                    height: 25px;
                }

                .search-icon:hover {
                    opacity: 0.8;
                }

                .view-all-button {
                    display: block;
                    position: fixed;
                    bottom: 40px;
                    left: calc(50% + 125px);
                    transform: translateX(-50%);
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    padding: 10px 20px;
                    cursor: pointer;
                    outline: none;
                    margin-right: 20px;
                    visibility: ${showAllOrderDetails ? 'hidden' : 'visible'};
                }
                
                .view-all-button:hover {
                    background-color: #0056b3;
                }
                
                .view-all-button:active {
                    background-color: #004080;
                }

            `}</style>
            
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Enter Order ID</h1>
                    </div>

                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder='Search'
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                        <img 
                            src={searchimg} 
                            alt="" 
                            className="search-icon"
                            onClick={() => handleSearch()}
                        />
                    </div>
                </div>

                {orderDetails && (
                    <div>
                        <TableComp data={orderTable} />
                    </div>
                )}

                <button className="view-all-button" onClick={handleViewAllOrderDetails}>View Order Details of All Orders</button>

                {showAllOrderDetails && <AllOrders onBackToIndividualOrderDetails={handleBackToIndividualOrderDetails} />}
                
            </main>
        </>
    );
}
