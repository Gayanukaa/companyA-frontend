import React, { useState, useEffect } from "react";
import { defaultReq } from '../../global/reqSender.jsx';
import TableComp from '../../components/sideComps/TableComp.jsx'
import { useNavigate } from 'react-router-dom';

export function FinanceOverview(props) {
    const [financeDetails, setFinanceDetails] = useState(null);
    const navigate = useNavigate();

    const getFinanceDetails = () => {
        defaultReq('GET','api/financeOverview', null,
            (response) => {
                if (response.status === 200 && response.data) {
                    setFinanceDetails(response.data);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to fetch finance details.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            (error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message || 'Failed to fetch finance details.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        );
    };

    useEffect(() => {
        getFinanceDetails();
    }, []);

    const financeTable = {
        name: `Finance Overview`,
        heading: ["Finance Type", "Reference Number", "Amount"],
        body: financeDetails ? financeDetails.map((detail, index) => (
            <tr key={index}>
                <td>{detail.type}</td>
                <td>{detail.referenceNumber}</td>
                <td>{detail.amount}</td>
            </tr>
        )) : [],
    };

    return (
        <>
            <style>{`

            `}</style>
            
            <main>
                {financeDetails && (
                    <div>
                        <TableComp data={financeTable} />
                    </div>
                )}
            </main>
        </>
    );
}
