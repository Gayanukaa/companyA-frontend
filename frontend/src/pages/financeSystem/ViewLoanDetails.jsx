import React, { useState, useEffect } from "react";
import { defaultReq } from '../../global/reqSender.jsx';
import TableComp from '../../components/sideComps/TableComp';
import Swal from 'sweetalert2';

const ViewLoanDetails = () => {
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

            {loanDetails && (
                <div>
                    <TableComp data={loanTable} />
                </div>
            )}
        
        </>

        
    );
};

export default ViewLoanDetails;
