import React, { useEffect } from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';
import axios from "axios";


export function ViewManagers(props) {

    const tableData = {
        name: "Sample Table 1",
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


    useEffect(() => {

        axios.get('http://localhost:8090/api/manager/viewAllManagers')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });

    }, [])



    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>View Customers</h1>
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