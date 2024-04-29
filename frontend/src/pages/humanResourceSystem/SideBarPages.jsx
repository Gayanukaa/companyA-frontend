import React from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';

import { BugReportOutlined } from "@mui/icons-material";
/*import DashboardCard from "./ButtonCard";*/



/*
export function EmployeeRegistration(props) {

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

export function EmployeeDetails(props) {

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
*/

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
            count: 8,
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
                    {/*<CardComp data={dataList} />*/}
                </div>
                <div>
                    <DashboardCard name='Attendence Details'/>
                    <DashboardCard name='Employee Settings'/>
                </div>
            </main>
        </>
    )
}


