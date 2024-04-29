import CardComp from "../../../components/sideComps/CardComp";
import TableComp from '../../../components/sideComps/TableComp'
import avatar from '../../../assets/avatar.svg';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate } from 'react-router-dom';
import * as reqSend from '../../../global/reqSender';


export function DashboardView(props) {

    const dataList = [
        {
            image: avatar,
            altText: "Avatar 1",
            count: 5,
            name: "Manager"
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

export function MainSupervisors(props) {


    const { id } = useParams();
    const [mUsers, setmUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = reqSend.defaultReq('GET', 'api/tms/main-supervisor', null, (response) => {
                setmUsers(response.data);
            }, (error) => {
                console.error("Error loading main supervisors:", error);
            });
        } catch (error) {
            console.error("Error loading main supervisors:", error);
        }
    };

    const deleteUsers = async (id) => {
        try {
             reqSend.defaultReq('DELETE', `api/tms/main-supervisor/delete/${id}`, null, () => {
                loadUsers();
            }, (error) => {
                console.error("Error deleting main supervisor:", error);
            });
        } catch (error) {
            console.error("Error deleting main supervisor:", error);
        }
    };

    const handleGetPasswordClick = (password) => {
        window.confirm(password);
    };

    const tableData = {
        heading: ["", "ID", "Email", "Password", ""],
        body: mUsers.map((user, index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.mSupervisorId}</td>
                <td>{user.mSupervisorEmail}</td>
                <td>{'*'.repeat(user.mPassword.length)}</td>
                <td>
                    <Link className="btn btn-primary mx-2" onClick={() => handleGetPasswordClick(user.mPassword)}>View Password</Link>
                    <button className="btn btn-danger mx-2" onClick={() => deleteUsers(user.id)}>Delete</button>
                </td>
            </tr>
        )),
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Main Supervisors</h1>
                    <Link className="btn btn-primary mx-2" to={"add"}>Add</Link>
                </div>
                <TableComp data={tableData} />
            </div>
        </main>
    )
}

export function UnitSupervisors(props) {

    const { id } = useParams();
    const [mUsers, setmUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
             reqSend.defaultReq('GET', 'api/tms/unit-supervisor', null, (response) => {
                setmUsers(response.data);
            }, (error) => {
                console.error('Error loading users:', error);
            });
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const deleteUsers = async (id) => {
        try {
             reqSend.defaultReq('DELETE', `api/tms/unit-supervisor/delete/${id}`, null, 'User deleted successfully', 'Error deleting user', loadUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleGetPasswordClick = (password) => {
        window.confirm(password);
    };

    const tableData = {
        heading: ['', 'ID', 'Email', 'Password', ''],
        body: mUsers.map((user, index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.uSupervisorId}</td>
                <td>{user.uSupervisorEmail}</td>
                <td>{'*'.repeat(user.uPassword.length)}</td>
                <td>
                    <Link className="btn btn-primary mx-2" onClick={() => handleGetPasswordClick(user.uPassword)}>View Password</Link>
                    
                    <button className="btn btn-danger mx-2" onClick={() => deleteUsers(user.id)}>Delete</button>
                </td>
            </tr>
        )),
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Unit Supervisors</h1>
                    <Link className="btn btn-primary mx-2" to="add">Add</Link>
                </div>
                <TableComp data={tableData} />
            </div>
        </main>
    );
}