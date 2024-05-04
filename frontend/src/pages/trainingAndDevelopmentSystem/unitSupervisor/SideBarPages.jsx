import CardComp from "../../../components/sideComps/CardComp";
import TableComp from '../../../components/sideComps/TableComp'
import avatar from '../../../assets/avatar.svg';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate ,useLocation} from 'react-router-dom';
import * as reqSend from '../../../global/reqSender';


export function DashboardView(props) {
    

    const dataList = [
        {
            image: avatar,
            altText: "Avatar 1",
            count: 58,
            name: "Unit Supervisor"
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

// update stage table is here
export function UpdateStages() {
    const { id } = useParams();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        reqSend.defaultReq('GET', 'api/tms/product-developments', null, handleLoadSuccess, handleLoadError);
    };

    const handleLoadSuccess = (response) => {
        const updatedUsers = response.data.map(user => {
            user.progress = calculateProgress(user);
            return user;
        });
        setUsers(updatedUsers);
    };

    const handleLoadError = (error) => {
        console.error("Error loading users:", error);
    };

    const calculateProgress = (user) => {
        let progress = 0;
        if (user.stageOne) progress += 30;
        if (user.stageTwo) progress += 40;
        if (user.stageThree) progress += 30;
        return progress;
    };

    const updateStage = async (userId, stage) => {
        const updatedUser = { ...users.find(user => user.id === userId) };
        updatedUser[stage] = true;
        updatedUser.progress = calculateProgress(updatedUser);
        reqSend.defaultReq('PUT', `api/tms/product-development/${userId}`, updatedUser, handleUpdateSuccess, handleUpdateError);
    };

    const handleUpdateSuccess = () => {
        loadUsers();
    };

    const handleUpdateError = (error) => {
        console.error("Error updating stage:", error);
    };

    // button only active ,if previos stage is complete
    const renderButton = (user, stage) => {
        if (user[stage]) {
            return <button className="btn btn-success-outline mx-2" disabled>Completed</button>;
        } else {
            const isCurrentStage = (stage === 'stageOne' && !user.stageOne) ||
                                   (stage === 'stageTwo' && user.stageOne && !user.stageTwo) ||
                                   (stage === 'stageThree' && user.stageTwo && !user.stageThree);
            return <button className={`btn btn-success mx-2 ${isCurrentStage ? '' : 'disabled'}`} 
                           onClick={() => isCurrentStage && updateStage(user.id, stage)}>Complete</button>;
        }
    };

    const tableData = {
        heading: ["", "Project Name", "Project Code", "Project Manager", "Stage 1", "Stage 2", "Stage 3", "Progress"],
        body: users.map((user, index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.projectName}</td>
                <td>{user.projectCode}</td>
                <td>{user.projectManager}</td>
                <td>{renderButton(user, 'stageOne')}</td>
                <td>{renderButton(user, 'stageTwo')}</td>
                <td>{renderButton(user, 'stageThree')}</td>
                <td>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${user.progress}%` }}>{user.progress}%</div>
                    </div>
                </td>
            </tr>
        )),
    };

    return (
        <>
            

            <main>
            <div className="head-title">
            <div className="left">
                <h1>Update Stages</h1>
            </div>
            <TableComp data={tableData} />
            </div>
            </main>
        </>

        
    )
}