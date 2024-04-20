import React from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';


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

    const tableData = {
        name: "Report 1",
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
                        <h1>Report Generation</h1>
                    </div>

                    <TableComp data={tableData} />

                </div>

            </main>
        </>
    )
}

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