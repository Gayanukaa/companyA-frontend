import React from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';
import Typography from '@mui/material/Typography';

export function DashboardView(props) {
    const dataList = [
        {
            image: avatar,
            altText: "Avatar 1",
            count: "Finance Manager",
            name: "Michael Brown",
            email: "michael.brown@example.com" 
        },
        
    ];

    return (
        <>
            <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div>
                    <div className="head-title" style={{ textAlign: 'center' }}>
                        <Typography variant="h1">Dashboard</Typography>
                        <Typography variant="body1">{dataList[0].email}</Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}> 
                        <CardComp data={dataList} style={{ width: '300px' }} />
                    </div>
                </div>
            </main>
        </>
    )
}
