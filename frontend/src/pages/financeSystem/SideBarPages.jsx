import React from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';
import { useState } from "react";
import searchimg from '../../assets/search.png';
import Swal from 'sweetalert2';
import { defaultReq } from '../../global/reqSender.jsx'; 




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

export function ViewEmployee(props) {
    const [employeeId, setEmployeeId] = useState('');
    const [salaryDetails, setSalaryDetails] = useState(null);

    const handleSearch = () => {
        if (!employeeId) {
            Swal.fire({ title: 'Error!', text: 'Please enter an employee ID', icon: 'error', confirmButtonText: 'OK' });
            return;
        }

        defaultReq('GET', 'api/getEmployeeSalary', null, 
            (response) => {
                if (response.status === 200 && response.data) {
                    console.log('Response:', response);
                    setSalaryDetails(response.data[0]);
                
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

    return (
        <>
            <style>{`
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
                        <h2>Employee Salary Details:  {salaryDetails.employeeName}</h2>
                        <table className="salary-table">
                            <thead>
                                <tr>
                                    <th>Attribute</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Basic Salary</td>
                                    <td>{salaryDetails.basicSalary}</td>
                                </tr>
                                <tr>
                                    <td>Tax</td>
                                    <td>{salaryDetails.tax}</td>
                                </tr>
                                <tr>
                                    <td>Gross Salary</td>
                                    <td>{salaryDetails.grossSalary}</td>
                                </tr>
                                <tr>
                                    <td>Net Salary</td>
                                    <td>{salaryDetails.netSalary}</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </>
    );
}