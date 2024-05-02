import React, { useState, useEffect } from "react";
import { defaultReq } from '../../global/reqSender.jsx';
import TableComp from '../../components/sideComps/TableComp';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AllOrders = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getAllOrderDetails();
    }, []);

    const getAllOrderDetails = () => {
        defaultReq('GET','api/getOrderHistory', null,
            (response) => {
                if (response.status === 200 && response.data) {
                    setOrderDetails(response.data);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to fetch order details.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            (error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message || 'Failed to fetch order details.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        );
    };

    const orderTable = {
        name: 'Order Details of All orders',
        heading: ['Order ID', 'Order Date', 'Order Amount'],
        body: orderDetails.map((orderDetails, index) => (
            <tr key={index}>
                <td>{orderDetails.order_ID}</td>
                <td>{orderDetails.order_date}</td>
                <td>{orderDetails.order_amount}</td>
            </tr>
        )),
    };

    return (
        <>

            <style>
                {`
                
                    .view-individual-button {
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
                    }
                    
                    .view-individual-button:hover {
                        background-color: #0056b3;
                    }
                    
                    .view-individual-button:active {
                        background-color: #004080;
                    }
                `}
            </style>


            <div>
                <TableComp data={orderTable} />
                <button className="view-individual-button" onClick={() => navigate(-1)}>Back to Individual Order Details</button>
                
            </div>

        
        </>

        
    );
};

export default AllOrders;
