import React, { useState, useEffect } from "react";
import { defaultReq } from '../../global/reqSender.jsx';
import TableComp from '../../components/sideComps/TableComp';
import Swal from 'sweetalert2';

const ViewLoanDetails = () => {
    const [loanId, setLoanId] = useState('');
    const [loanDetails, setLoanDetails] = useState([]);

    useEffect(() => {
        getAllLoanDetails();
    }, []);

    const getAllLoanDetails = () => {
        defaultReq('GET','api/getLoanDetails', null,
            (response) => {
                if (response.status === 200 && response.data) {
                    setLoanDetails(response.data);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to fetch loan details.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            (error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message || 'Failed to fetch loan details.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        );
    };

    const loanTable = {
        name: 'Loan Details of All loans',
        heading: ['Facility Id', 'Bank Name', 'Initial Loan Amount', 'Current Loan Amount', 'Monthly Loan Amount',
                'Total Paid Amount', 'Interest Rate', 'Loan Term In Months', 'Loan Status', 'Start Date'],
        body: loanDetails.map((ld, index) => (
            <tr key={index}>
                <td>{ld.facilityId}</td>
                <td>{ld.bankName}</td>
                <td>{ld.initialLoanAmount}</td>
                <td>{ld.currentLoanAmount}</td>
                <td>{ld.monthlyLoanAmount}</td>
                <td>{ld.totalPaidAmount}</td>
                <td>{ld.interestRate}</td>
                <td>{ld.loanTermInMonths}</td>
                <td>{ld.loanStatus}</td>
                <td>{ld.startDate}</td>
            </tr>
        )),
    };

    const handleUpdateLoans = () => {
        if (!loanId) {
            console.log("Please provide a loan ID.");
            return;
        }

        const selectedLoan = loanDetails.find(loan => loan.facilityId === loanId);
        if (!selectedLoan) {
            console.log(`Loan with ID ${loanId} not found.`);
            return;
        }

        if (selectedLoan.currentLoanAmount === 0) {
            console.log(`Loan with ID ${loanId} has already been paid off.`);
            // Display a message indicating that the loan has been paid off
            Swal.fire({
                title: 'Loan Paid Off',
                text: `Loan with ID ${loanId} has already been paid off.`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Proceed with the update request for loan status
        defaultReq('PUT', `api/updateLoanStatus/${loanId}`, null,
            (response) => {
                if (response.status === 200) {
                    console.log(`Loan status updated successfully for facility ID ${loanId}`);
                    window.location.reload();
                } else {
                    console.log("Failed to update loan status.");
                }
            },
            (error) => {
                console.log("An error occurred while updating loan status:", error.message || error);
            }
        );
    };

    return (
        <>
            <style>
                {`
                    .bottom-component {
                        margin-top: 25px;
                    }
    
                    .update-loans {
                        display: flex; /* Change to flex */
                        justify-content: center; /* Add space between items */
                        align-items: center; /* Center items vertically */
                    }
    
                    .left {
                        flex: 1; /* Allow left content to grow */
                    }
    
                    .search-box {
                        display: flex;
                        align-items: center;
                        border: 1px solid #ccc;
                        border-radius: 18px;
                        padding: 5px;
                        background-color: #242424;
                        width: 300px;
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
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                        border-radius: 10px;
                        padding: 10px 20px;
                        cursor: pointer;
                        outline: none;
                    }
    
                    .view-all-button:hover {
                        background-color: #0056b3;
                    }
    
                    .view-all-button:active {
                        background-color: #004080;
                    }
                `}
            </style>
    
            {loanDetails && (
                <div>
                    <TableComp data={loanTable} />
                </div>
            )}

            <div className="bottom-component">
                <div className="left">
                    <h3>Update Loan Details</h3>
                </div>

                <div className="update-loans">
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder='Enter Loan ID to Update'
                            value={loanId}
                            onChange={(e) => setLoanId(e.target.value)}
                        />
                    </div>
        
                    <button className="view-all-button" onClick={handleUpdateLoans}>Update Loans (Monthly)</button>
                </div>
            </div>
        </>
    );
};

export default ViewLoanDetails;
