import React, { useEffect, useState } from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';
import { Stack, Button, TextField } from '@mui/material'
import * as reqSend from '../../global/reqSender.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export function OrderItems(props) {

    const tableData = {
        name: "Order Items",
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
            <tr key="row3">
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
            </tr>,
            <tr key="row4">
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
            </tr>,
            // Add more rows as needed
        ],
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Order Items</h1>
                    </div>

                    <TableComp data={tableData} />

                </div>

            </main>
        </>
    )
}


export function ViewReports(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        
        reqSend.defaultReq("GET", 'api/v1/invReports/details', {}, 
                response => {
                    if (response.status === 200 && response.data) {
                        setData(response.data);
                    } else {
                        console.error("Invalid response format:", response);
                    }
                },
                error => {
                    console.error("API request failed:", error);
                }
            );

    }, [])

    const [val, setVal] = useState("Hello There")

    const change = event => {
        setVal(event.target.value) 
    };

    const deleteClick = () => {
        reqSend.defaultReq("DELETE", 'api/v1/invReports/deleteReports/G0008', {},
            response => {
                if (response.status === 200 && response.data) {
                    console.log(response.data);
                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
    );
    };

    const generateClick = () => {
        reqSend.defaultReq("POST", 'api/v1/invReports/generate', {},
            response => {
                if (response.status === 200 && response.data) {
                    console.log(response.data);
                    window.location.reload();
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
                <div className="head-title" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack spacing={2} alignItems="center">
                        <div className="left">
                            <h1>Report Generation</h1>   
                        </div>
                            <Button onClick={generateClick} maxWidth='40px' variant="contained">Generate Report</Button>
                            <Stack spacing={2} direction={"row"}>
                                <Button onClick={deleteClick} size="small" style={{ width: '40%' }} variant="contained" color="error">Delete</Button>
                                <TextField onChange={change} value={val} size="small" style={{ maxwidth: '500px', width: '100%'}} id="outlined-basic" label="Report ID" variant="outlined" />
                            </Stack>
                    </Stack>

                </div>
                <div class="container" style={{ textAlign: 'center' }}>
                <div className="mt-5">
                    <h4 style={{ marginBottom: '20px' }} >Past generated reports:</h4>
                    <table class="table table-bordered table-hover table-sm" style={{ width: '70%', margin: 'auto' }} >
                        <thead class="thead-light">
                            <tr>
                               <th>Report ID</th>
                               <th>Date & Time</th>
                            </tr>
                        </thead>
                    <tbody>
                        {data.map((report, index) => (
                            <tr key={index}>
                                <td>{report.reportId}</td>
                                <td>{report.generatedDateAndTime}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>

            </main>
        </>
    )
}

// export function ViewRepairs(props) {

//     const tableData = {
//         name: "Sample Table",
//         heading: ["Column 1", "Column 2", "Column 3"],
//         body: [
//             <tr key="row1">
//                 <td>Data 1</td>
//                 <td>Data 2</td>
//                 <td>Data 3</td>
//             </tr>,
//             <tr key="row2">
//                 <td>Data 4</td>
//                 <td>Data 5</td>
//                 <td>Data 6</td>
//             </tr>,
//             // Add more rows as needed
//         ],
//     };


//     useEffect(() => {
        
//         reqSend.defaultReq("GET", 'api/v1/repair/getDamagedItems', {}, 
//                 response => {
//                     if (response.status === 200 && response.data) {
//                         console.log(response.data);
//                     } else {
//                         console.error("Invalid response format:", response);
//                     }
//                 },
//                 error => {
//                     console.error("API request failed:", error);
//                 }
//             );

//     }, [])

//     return (
//         <>
//             <main>
//                 <div className="head-title">
//                     <div className="left">
//                         <h1>View Stocks</h1>
//                     </div>

//                     <TableComp data={tableData} />

//                 </div>

//             </main>
//         </>
//     )
// }

export function ViewRepairs(props) {

    const tableData = {
        name: "Information on repairs",
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
            <tr key="row3">
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
            </tr>,
            <tr key="row4">
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
            </tr>,
            // Add more rows as needed
        ],
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Repairs</h1>
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