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

export function AddUnitSupervisor(props) {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        uSupervisorId: "",
        uSupervisorEmail: "",
        uPassword: ""
    });

    const { uSupervisorId, uSupervisorEmail, uPassword } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { ...user, uSupervisorId: parseInt(uSupervisorId) };
            reqSend.defaultReq('POST', 'api/tms/unit-supervisor', userData, () => {
                navigate("/trainingdevelopment-management/manager/unit-supervisors");
            }, (error) => {
                console.error('Error adding unit supervisor:', error);
            });
        } catch (error) {
            console.error('Error adding unit supervisor:', error);
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{  color: '#007bff' }}>
                    <h2 className="text-center m-4">Add Unit Supervisor</h2>
                    <form onSubmit={(e) => onSubmit(e)} action="">
                        <div className="mb-3">
                            <label htmlFor="Name" className='form-label'>Supervisor Email</label>
                            <input type="text" className='form-control' name='uSupervisorEmail' required placeholder='Enter Supervisor Email' value={uSupervisorEmail} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Username" className='form-label'>Supervisor ID</label>
                            <input type="number" className='form-control' name='uSupervisorId' required placeholder='Enter Supervisor Id' value={uSupervisorId} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Username" className='form-label'>Password</label>
                            <input type="password" className='form-control' name='uPassword' required placeholder='Enter Password' value={uPassword} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div>
                            <button type='submit' className='btn btn-outline-primary'>Submit</button>
                            <Link type='submit' className='btn btn-outline-danger mx-2' to='/trainingdevelopment-management/manager/unit-supervisors'>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function AddMainSupervisor(props) {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        mSupervisorId: "",
        mSupervisorEmail: "",
        mPassword: ""
    });

    const { mSupervisorId, mSupervisorEmail, mPassword } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { ...user, mSupervisorId: parseInt(mSupervisorId) };
            reqSend.defaultReq('POST', 'api/tms/main-supervisor', userData, () => {
                navigate("/trainingdevelopment-management/manager/main-supervisors");
            }, (error) => {
                console.error('Error adding main supervisor:', error);
            });
        } catch (error) {
            console.error('Error adding main supervisor:', error);
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{  color: '#007bff' }}>
                    <h2 className="text-center m-4">Add Main Supervisor</h2>
                    <form onSubmit={(e) => onSubmit(e)} action="">
                        <div className="mb-3">
                            <label htmlFor="Name" className='form-label'>Supervisor Name</label>
                            <input type="text" className='form-control' name='mSupervisorEmail' required placeholder='Enter Supervisor Email' value={mSupervisorEmail} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Username" className='form-label'>Supervisor ID</label>
                            <input type="number" className='form-control' name='mSupervisorId' required placeholder='Enter Supervisor Id' value={mSupervisorId} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Username" className='form-label'>Password</label>
                            <input type="password" className='form-control' name='mPassword' required placeholder='Enter Password' value={mPassword} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div>
                            <button type='submit' className='btn btn-outline-primary'>Submit</button>
                            <Link type='submit' className='btn btn-outline-danger mx-2' to='/trainingdevelopment-management/manager/main-supervisors'>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}