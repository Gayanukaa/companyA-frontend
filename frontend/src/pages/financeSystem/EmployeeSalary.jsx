import React from "react";
import TableComp from '../../components/sideComps/TableComp'
import { useState} from "react";
import searchimg from '../../assets/search.png';
import Swal from 'sweetalert2';
import { defaultReq } from '../../global/reqSender.jsx';
import AllEmployeeSalary from "./TotalSalary.jsx";
import { useNavigate } from 'react-router-dom';


export function ViewEmployee(props) {

    const [employeeId, setEmployeeId] = useState('');
    const [salaryDetails, setSalaryDetails] = useState(null);
    const [showAllEmployeeSalary, setShowAllEmployeeSalary] = useState(false);
    const navigate = useNavigate();
    

    const handleSearch = () => {
        if (!employeeId) {
            Swal.fire({ title: 'Error!', text: 'Please enter an employee ID', icon: 'error', confirmButtonText: 'OK' });
            return;
        }
    
        defaultReq('GET', `api/getEmployeeSalary/${employeeId}`, null, 
            (response) => {
                if (response.status === 200 && response.data) {
                    console.log('Response:', response);
                    setSalaryDetails(response.data);
                } else {
                    // Handle error response
                    Swal.fire({ title: 'Error!', text: 'Failed to fetch employee salary details.', icon: 'error', confirmButtonText: 'OK' });
                }
            },
            (error) => {
                console.error('Error:', error);
                // Handle request error
                Swal.fire({ title: 'Error!', text: error.message || 'Failed to fetch employee salary details.', icon: 'error', confirmButtonText: 'OK' });
            }
        );
    };
    

    

    const salaryTable = {
        name: `Employee Salary Details: ${salaryDetails?.employeeName}`,
        heading: ["Attribute", "Value"],
        body: [
            <tr key="row1">
                <td>Basic Salary</td>
                <td>{salaryDetails?.basicSalary}</td>
            </tr>,
            <tr key="row2">
                <td>Tax</td>
                <td>{salaryDetails?.tax}</td>
            </tr>,
            <tr key="row3">
                <td>Gross Salary</td>
                <td>{salaryDetails?.grossSalary}</td>
            </tr>,
            <tr key="row4">
                <td>Net Salary</td>
                <td>{salaryDetails?.netSalary}</td>
            </tr>,
        ],
    };

    const handleViewAllEmployeeSalary = () => {
        setShowAllEmployeeSalary(true); // Set state to show all employee salaries
        setEmployeeId('');
        setSalaryDetails(null);
        navigate('/finantial-management/view-all-salary-details');
    };

    const handleBackToIndividualSalaryDetails = () => {
        setShowAllEmployeeSalary(false); // Set state to hide all employee salaries
    };

    return (
        <>
            <style>{`

                .search-box .head title{
                    display: ${showAllEmployeeSalary ? 'none' : 'block'};
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
                    visibility: ${showAllEmployeeSalary ? 'hidden' : 'visible'};
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
                        <h1>Enter Employee ID</h1>
                    </div>

                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder='Search'
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                        />
                        <img 
                            src={searchimg} 
                            alt="" 
                            className="search-icon"
                            onClick={() => handleSearch()}
                        />
                    </div>
                </div>

                {salaryDetails && (
                    <div>
                        
                        <TableComp data={salaryTable} />
                    </div>
                )}

                <button className="view-all-button" onClick={handleViewAllEmployeeSalary}>View Salary Details of All Employees</button>

                {showAllEmployeeSalary && <AllEmployeeSalary onBackToIndividualSalaryDetails={handleBackToIndividualSalaryDetails} />}
                
            </main>
        </>
    );
}
