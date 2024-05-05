import React from "react";
// import { useEffect } from 'react';
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';



export function DashboardView(props) {

    const dataList = [
        {
            image: avatar,
            altText: "Avatar 1",
            count: "Finance Manager",
            name: "Michael Brown"
        },
        
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