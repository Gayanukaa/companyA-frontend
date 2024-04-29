//import React from "react";
import CardComp from "../../../components/sideComps/CardComp";
import TableComp from '../../../components/sideComps/TableComp'
import avatar from '../../../assets/avatar.svg';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate } from 'react-router-dom';
import * as reqSend from '../../../global/reqSender';


export function DashboardView(props) {

    const [message, setMessage] = useState('');
  
    const handleClick = async () => {
        try {
          const result = reqSend.defaultReq(
            'GET',
            'api/tms/main-supervisor/take-manual-actions',
            null,
            (response) => {
              setMessage(response.data);
              localStorage.setItem('message', response.data);
            },
            (error) => {
              console.error('Error fetching message:', error);
            }
          );
        } catch (error) {
          console.error('Error fetching message:', error);
        }
      };
    
      useEffect(() => {
        // Load message from localStorage
        const storedMessage = localStorage.getItem('message');
        if (storedMessage) {
          setMessage(storedMessage);
          // Clear message from localStorage after 5 minutes
          const timer = setTimeout(() => {
            localStorage.removeItem('message');
            setMessage('');
          }, 300000); // 60000 milliseconds = 5 minutes
    
          // Clean up the timer to avoid memory leaks
          return () => clearTimeout(timer);
        }
      }, []);

    const dataList = [
        {
            image: avatar,
            altText: "Avatar 1",
            count: 56,
            name: "Main Supervisor"
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
                    <Link className="btn btn-primary mx-2" onClick={handleClick} >Take Actions Manually</Link>
                </div>
            </main>
            <main><div className="head-title">
                    <div className="left">
                    
                    
                        <h1 style={{ fontSize: '1rem' }}>{message}</h1>
                    </div>
                        
                    </div>
            </main>
        </>
    )
}

export function Prototype(props) {


    const { id } = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result =reqSend.defaultReq('GET', 'api/tms/prototypes', null, (response) => {
                setUsers(response.data);
            }, (error) => {
                console.error("Error loading prototypes:", error);
            });
        } catch (error) {
            console.error("Error loading prototypes:", error);
        }
    };

    const deleteUsers = async (id) => {
        try {
            reqSend.defaultReq('DELETE', `api/tms/prototype/${id}`, null, () => {
                loadUsers();
            }, (error) => {
                console.error("Error deleting prototype:", error);
            });
        } catch (error) {
            console.error("Error deleting prototype:", error);
        }
    };

    const tableData = {
        heading: ["", "ID", "Name", "Type", ""],
        body: users.map((user, index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.prototypeId}</td>
                <td>{user.prototypeName}</td>
                <td>{user.prototypeType}</td>
                <td>
                    <Link className="btn btn-outline-primary mx-2" to={`/trainingdevelopment-management/main-supervisor/prototypes/edit/${user.id}`}>Edit</Link>
                    <button className="btn btn-outline-danger mx-2" onClick={() => deleteUsers(user.id)}>Delete</button>
                    <Link className="btn btn-outline-warning" to={`/trainingdevelopment-management/main-supervisor/product-development/add-develop/${user.id}`}>Develop</Link>
                </td>
            </tr>
        )),
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Prototypes</h1>
                        <Link className="btn btn-primary mx-2" to={"add"}>Add</Link>
                    </div>
                    <TableComp data={tableData} />
                </div>
            </main>
        </>
    )
}

export function AddPrototype(props) {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        prototypeName: "",
        prototypeId: "",
        prototypeType: ""
    });

    const { prototypeName, prototypeId, prototypeType } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = { ...user, prototypeId: parseInt(prototypeId) }; // Type casting applied here
        try {
            await reqSend.defaultReq('POST', 'api/tms/prototype', userData, () => {
                navigate("/trainingdevelopment-management/main-supervisor/prototypes");
            }, (error) => {
                console.error("Error adding prototype:", error);
            });
        } catch (error) {
            console.error("Error adding prototype:", error);
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{  color: '#007bff' }}>
                    <h2 className="text-center m-4">Add Prototype</h2>
                    <form onSubmit={(e) => onSubmit(e)} action="" >
                        <div className="mb-3">
                            <label htmlFor="Name" className='form-label'>Prototype Name</label>
                            <input type={"text"} className='form-control' name='prototypeName' required placeholder='Enter prototype name' value={prototypeName} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Username" className='form-label'>Prototype ID</label>
                            <input type={"number"} className='form-control' name='prototypeId' required placeholder='Enter prototype id' value={prototypeId} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className='form-label'>Prototype Type</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="prototypeType" id="flexRadioDefault1" value="IC" required checked={prototypeType === "IC"} onChange={(e) => onInputChange(e)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    IC
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="prototypeType" id="flexRadioDefault2" required checked={prototypeType === "Sensor"} value="Sensor" onChange={(e) => onInputChange(e)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Sensor
                                </label>
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='btn btn-outline-primary'>Submit</button>
                            <Link type='submit' className='btn btn-outline-danger mx-2' to='/trainingdevelopment-management/main-supervisor/prototypes'>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function EditPrototype(props) {
    let navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState({
        prototypeName: "",
        prototypeId: "",
        prototypeType: ""
    });

    const { prototypeName, prototypeId, prototypeType } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = { ...user, prototypeId: parseInt(prototypeId) };
        try {
            reqSend.defaultReq('PUT', `api/tms/prototype/${id}`, userData, () => {
                navigate("/trainingdevelopment-management/main-supervisor/prototypes");
            }, (error) => {
                console.error("Error editing prototype:", error);
            });
        } catch (error) {
            console.error("Error editing prototype:", error);
        }
    };

    const loadUser = async () => {
        try {
            const result =reqSend.defaultReq('GET', `api/tms/prototype/${id}`, null, (response) => {
                setUser(response.data);
            }, (error) => {
                console.error("Error loading prototype:", error);
            });
        } catch (error) {
            console.error("Error loading prototype:", error);
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{  color: '#007bff' }}>
                    <h2 className="text-center m-4">Edit Prototype</h2>
                    <form onSubmit={(e) => onSubmit(e)} action="">
                        <div className="mb-3">
                            <label htmlFor="Name" className='form-label'>Prototype Name</label>
                            <input type={"text"} className='form-control' name='prototypeName' required placeholder='Enter prototype name' value={prototypeName} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Username" className='form-label'>Prototype ID</label>
                            <input type={"number"} className='form-control' name='prototypeId' required placeholder='Enter prototype id' value={prototypeId} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className='form-label'>Prototype Type</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="prototypeType" id="flexRadioDefault1" value="IC" required checked={prototypeType === "IC"} onChange={(e) => onInputChange(e)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    IC
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="prototypeType" id="flexRadioDefault2" required checked={prototypeType === "Sensor"} value="Sensor" onChange={(e) => onInputChange(e)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Sensor
                                </label>
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='btn btn-outline-primary'>Submit</button>
                            <Link type='submit' className='btn btn-outline-danger mx-2' to='/trainingdevelopment-management/main-supervisor/prototypes'>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}