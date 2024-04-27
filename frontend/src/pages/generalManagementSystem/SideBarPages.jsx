import React from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp';
import ApprovalCard from "./components/Approvals.jsx"
import avatar from '../../assets/avatar.svg';
import axios from "axios";
import { useEffect, useState } from "react";
import TrashIcon from "./components/TrashIcon";
import { useNavigate } from 'react-router-dom';
import { systemRoles } from './data/RoleDetails.jsx';



export function ViewManagers(props) {
    const [data, setData] = useState(null)
    const [tabledata, settabledata] = useState(null)
    const navigate = useNavigate();
    const updateManagerButtonClick = (managerId) => {
        navigate('/general-management/update-managers', { state: { managerId: managerId } });
    };
    const addManagerButtonClick = () => {
        const portalLink = '/general-management/add-managers';
        navigate(portalLink);
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    useEffect(() => {
        // Fetch manager data from API
        axios.get("http://localhost:8090/api/manager/viewAllManagers")
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.error("Error fetching manager data:", error);
            });
    }, []);
    useEffect(() => {
        if (data != null) {
            settabledata(
                {
                    heading: ["Person", "Name", "e-mail", "Role", "edit", ""],
                    body: data.map((tablerow, index) => {

                        const roleLabel = systemRoles.find(role => role.role === tablerow.role)?.label || 'Unknown Role';

                        return (
                            <tr key={index}>
                                <td><img src={avatar} alt="Avatar" /></td>
                                <td>{tablerow.firstName + " " + tablerow.lastName}</td>
                                <td >{tablerow.email}</td>
                                <td>{roleLabel}</td>
                                <td><button onClick={() => updateManagerButtonClick(tablerow.id)} className="btn btn-dark">Update</button></td>
                                <td><TrashIcon /></td>
                            </tr>
                        )
                    }),
                }
            )
        }
    }, [data]);
    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>View Managers</h1>
                    </div>
                    <div className="right">
                        <button onClick={addManagerButtonClick} className="btn btn-primary">Add Manager</button>
                    </div>
                    {tabledata ?
                        <TableComp data={tabledata} />
                        : null}

                </div>
            </main>
        </>
    )
}

export function DashboardView(props) {
    const [data, setData] = useState(null)
    const [listdata, setCardData] = useState(null)

    useEffect(() => {
        // Fetch manager data from API
        axios.get("http://localhost:8090/api/manager/viewAllManagers")
            .then(response => {
                // console.log(response.data);
                setData(response.data)
            })
            .catch(error => {
                console.error("Error fetching manager data:", error);
            });
    }, []);

    // Inside your functional component
    useEffect(() => {
        if (data != null) {
            setCardData(data.map((manager, index) => ({
                image: avatar,
                altText: `Avatar ${index + 1}`,
                name: manager.email,
                count: manager.lastName
            })));
        }
    }, [data]);


    return (
        <>
            <main>

                <br></br>
                <div className="head-title">
                    <div className="left">
                        <h1>Vehicle</h1>
                    </div>

                    {listdata ?
                        <CardComp data={listdata} />
                        : null}
                </div>
            </main>

        </>
    )
}

export function ApprovalSection(props) {
    const [approvalData, setApprovalData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8090/api/request/view")
            .then(response => {
                const sortedData = response.data.sort((a, b) => a.status - b.status);
                setApprovalData(sortedData);
            })
            .catch(error => {
                console.error("Error fetching approval data:", error);
            });
    }, []);

    return (
        <main>
            <div style={{ top: ' 2px', left: '2px', bottom: '2px' }}>
                <h1>Reequests</h1><br></br>
                <div className="feedback-container">
                    {approvalData.length > 0 ? (
                        approvalData.map((request, index) => (
                            <ApprovalCard
                                key={index}
                                name={request.name}
                                email={request.email}
                                message={request.message}
                                status={request.status}
                            />
                        ))
                    ) : (
                        <p>No approval requests found.</p>
                    )}
                </div>
            </div>
        </main>
    );
}


