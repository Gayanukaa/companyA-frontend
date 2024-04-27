import React, { useState, useEffect } from "react";
import { defaultReq } from '../../global/reqSender.jsx';
import TableComp from '../../components/sideComps/TableComp';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AllEmployeeSalary = () => {
    const [employeeSalaries, setEmployeeSalaries] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getAllEmployeeSalaries();
    }, []);

    const getAllEmployeeSalaries = () => {
        defaultReq('GET','api/getEmployeeSalary',null,
            (response) => {
                if (response.status === 200 && response.data) {
                    setEmployeeSalaries(response.data);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to fetch employee salary details.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            (error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message || 'Failed to fetch employee salary details.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        );
    };

    const salaryTable = {
        name: 'Salary Details of All the Employees',
        heading: ['Employee ID', 'Employee Name', 'Basic Salary', 'Tax', 'Gross Salary', 'Net Salary'],
        body: employeeSalaries.map((salaryDetails, index) => (
            <tr key={index}>
                <td>{salaryDetails.employeeId}</td>
                <td>{salaryDetails.employeeName}</td>
                <td>{salaryDetails.basicSalary}</td>
                <td>{salaryDetails.tax}</td>
                <td>{salaryDetails.grossSalary}</td>
                <td>{salaryDetails.netSalary}</td>
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
                <TableComp data={salaryTable} />
                <button className="view-individual-button" onClick={() => navigate(-1)}>Back to Individual Salary Details</button>
                
            </div>

        
        </>

        
    );
};

export default AllEmployeeSalary;
