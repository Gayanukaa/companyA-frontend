import React from "react";
import TableComp from '../../components/sideComps/TableComp';
import ApprovalCard from "./components/Approvals.jsx"
import avatar from '../../assets/avatar.svg';
import axios from "axios";
import { useEffect, useState } from "react";
import TrashIcon from "./components/TrashIcon";
import { useNavigate } from 'react-router-dom';
import { systemRoles } from './data/RoleDetails.jsx';
import * as reqSend from '../../global/reqSender.jsx';


import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { Alert, Tab, Tabs } from "@mui/material";


export function ViewManagers(props) {
    const [data, setData] = useState(null);
    const [tabledata, settabledata] = useState(null);
    const [loading, setLoading] = useState(true);

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
        axios.get("https://spring-boot-companya.azurewebsites.net/api/manager/viewAllManagers")
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching manager data:", error);
            });
    }, []);


    
    const handleDeleteClick = (managerId) => {

        reqSend.defaultReq(
            "DELETE",
            `api/manager/deleteManager?id=${managerId}`,
            {},
            response => {
                if (response.status === 200 && response.data) {

                    // Re-fetch manager data after deletion
                    reqSend.defaultReq(
                        "GET",
                        "api/manager/viewAllManagers",
                        {},
                        response => {
                            if (response.status === 200 && response.data) {
                                setData(response.data);
                                setLoading(false);
                            } else {
                                console.error("Invalid response format:", response);
                            }
                        },
                        error => {
                            console.error("API request failed:", error);
                        }
                    );

                } else {
                    console.error("Invalid response format:", response);
                }
            },
            error => {
                console.error("API request failed:", error);
            }
        );
    }


    useEffect(() => {
        if (data != null) {
            settabledata({
                heading: ["Person", "Name", "Email", "Role", "Actions", ""],
                body: data.map((tablerow, index) => {
                    if (tablerow.isDeleted === 0) {
                        const roleLabel = systemRoles.find(role => role.role === tablerow.role)?.label || 'Unknown Role';

                        if (roleLabel !== "Unknown Role") {
                            return (
                                <tr key={index}>
                                    <td><img src={avatar} alt="Avatar" /></td>
                                    <td>{tablerow.firstName + " " + tablerow.lastName}</td>
                                    <td>{tablerow.email}</td>
                                    <td>{roleLabel}</td>
                                    <td><button onClick={() => updateManagerButtonClick(tablerow.id)} className="btn btn-dark">Update</button></td>
                                    <td><TrashIcon onClickHandler={() => handleDeleteClick(tablerow.id)} /></td>
                                </tr>
                            );
                        }
                        
                    } else {
                        return null;
                    }
                })
            });
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
                </div>

                {loading ? (
                    <LoadingSpinner />

                ) : (
                    tabledata ? <TableComp data={tabledata} /> : null
                )}

            </main>
        </>
    )
}



export function ApprovalSection(props) {
    const [approvalData, setApprovalData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState(0);

    const handleApproveClick = (id) => {
        console.log("Approving request with id:", id);
    };
    const handleRejectClick = (id) => {
        console.log("Approving request with id:", id);
    };
    useEffect(() => {
        axios.get("https://spring-boot-companya.azurewebsites.net/api/request/view")
            .then(response => {
                const sortedData = response.data.sort((a, b) => a.status - b.status);
                setApprovalData(sortedData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching approval data:", error);
            });
    }, [handleApproveClick]);

    useEffect(() => {
        axios.get("https://spring-boot-companya.azurewebsites.net/api/request/view")
            .then(response => {
                const sortedData = response.data.sort((a, b) => a.status - b.status);
                setApprovalData(sortedData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching approval data:", error);
            });
    }, [handleRejectClick]);


    const handleTabValueChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <main>
            <div style={{ top: ' 2px', left: '2px', bottom: '2px' }}>
                <h1>Requests</h1><br></br>

                {
                    isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="feedback-container">
                            <Tabs value={value} onChange={handleTabValueChange}>
                                <Tab label="New" />
                                <Tab label="Approved" />
                                <Tab label="Rejected" />
                            </Tabs>

                            {/* Render ApprovalCard components based on the selected tab */}
                            {value === 0 && (
                                <>
                                    {approvalData.filter(request => request.status === 0).length === 0 ? (
                                        <Alert severity="info">No new approval requests found.</Alert>
                                    ) : (
                                        approvalData.filter(request => request.status === 0).map((request, index) => (
                                            <ApprovalCard
                                                key={index}
                                                id={request.id}
                                                name={request.name}
                                                email={request.email}
                                                message={request.message}
                                                status={request.status}
                                                onApprove={() => handleApproveClick(request.id)}
                                            />
                                        ))
                                    )}
                                </>
                            )}
                            {value === 1 && (
                                <>
                                    {approvalData.filter(request => request.status === 1).length === 0 ? (
                                        <Alert severity="info">No approved requests found.</Alert>
                                    ) : (
                                        approvalData.filter(request => request.status === 1).map((request, index) => (
                                            <ApprovalCard
                                                key={index}
                                                id={request.id}
                                                name={request.name}
                                                email={request.email}
                                                message={request.message}
                                                status={request.status}
                                                onApprove={() => handleApproveClick(request.id)}
                                            />
                                        ))
                                    )}
                                </>
                            )}
                            {value === 2 && (
                                <>
                                    {approvalData.filter(request => request.status === 2).length === 0 ? (
                                        <Alert severity="info">No rejected approval requests found.</Alert>
                                    ) : (
                                        approvalData.filter(request => request.status === 2).map((request, index) => (
                                            <ApprovalCard
                                                key={index}
                                                id={request.id}
                                                name={request.name}
                                                email={request.email}
                                                message={request.message}
                                                status={request.status}
                                                onApprove={() => handleApproveClick(request.id)}
                                            />
                                        ))
                                    )}
                                </>
                            )}
                        </div>

                    )
                }
            </div>
        </main>
    );
}
