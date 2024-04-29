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

export function Course(props) {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const result = reqSend.defaultReq('GET', 'api/tms/courses', null, (response) => {
                setCourses(response.data);
            }, (error) => {
                console.error('Error loading courses:', error);
            });
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    };

    const deleteCourses = async (id) => {
        try {
            reqSend.defaultReq('DELETE', `api/tms/course/${id}`, null, () => {
                loadCourses();
            }, (error) => {
                console.error('Error deleting course:', error);
            });
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const tableData = {
        heading: ["", "ID", "Course Name", "Instructor", "Cost (LKR)", "Duration (Months)","",""],
        body: courses.map((course, index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{course.courseId}</td>
                <td>{course.courseName}</td>
                <td>{course.instructor}</td>
                <td>{course.cost}</td>
                <td>{course.duration}</td>
                <td>
                    <button className="btn btn-danger mx-2" onClick={() => deleteCourses(course.id)}>Delete</button>
                </td>
                <td>
                    <Link className="btn btn-outline-primary mx-2" to={`edit/${course.id}`}>Edit</Link>
                </td>
            </tr>
        )),
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Courses</h1>
                        <Link className="btn btn-primary mx-2" to={"add"}>Add</Link>
                    </div>
                    <TableComp data={tableData} />
                </div>
            </main>
        </>
    )
}

export function AddCourse(props){
    let navigate = useNavigate();

    const [user, setUser] = useState({
        "courseId": "",
        "courseName": "",
        "link": "",
        "instructor": "",
        "details": "",
        "cost":"",
        "duration":"",
    });

    const { courseId, courseName, link, instructor, details,cost,duration } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { ...user, courseId: parseInt(courseId),duration: parseInt(duration),cost: parseFloat(cost) };
            reqSend.defaultReq('POST', 'api/tms/course', userData, () => {
                navigate("/trainingdevelopment-management/manager/courses");
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
                <h2 className="text-center m-4">Add Course Details</h2>
                <form onSubmit={(e)=>onSubmit(e)} action="">
                <div className="mb-3">
                    <label htmlFor="Name" className='form-label'>Course ID</label>
                    <input type={"number"} className='form-control'name='courseId' required placeholder='Enter course ID'value={courseId} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Course Name</label>
                    <input type={"text"} className='form-control'name='courseName' required placeholder='Enter course name' value={courseName} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Instructor</label>
                    <input type={"text"} className='form-control'name='instructor' required placeholder='Enter Instructor' value={instructor} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Details</label>
                    <input type={"text"} className='form-control'name='details' required placeholder='Enter details' value={details} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Link to Learn</label>
                    <input type={"url"} className='form-control'name='link' required placeholder='Enter link' value={link} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Cost (LKR)</label>
                    <input type={"text"} className='form-control'name='cost' required placeholder='Enter cost' value={cost} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Duration (Months)</label>
                    <input type={"number"} className='form-control'name='duration' required placeholder='Enter duration' value={duration} onChange={(e)=>onInputChange(e)}/>
                </div>
                
                <div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link type='submit' className='btn btn-outline-danger mx-2'to='/trainingdevelopment-management/manager/courses' >Cancel</Link>
                </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export function EditCourse(props){
    let navigate=useNavigate();
    const {id}=useParams();

    const [user, setUser] = useState({
        "courseId": "",
        "courseName": "",
        "link": "",
        "instructor": "",
        "details": "",
        "cost":"",
        "duration":"",
            
    });

    const { courseId, courseName, link, instructor, details,cost,duration } = user;


        const onInputChange=(e)=>{
            setUser({...user,[e.target.name]:e.target.value})
        }

        useEffect(()=>{
            loadUser();
        },[])
        
        // const onSubmit=async(e)=>{
        //     e.preventDefault()
        //     const userData = { ...user, courseId: parseInt(courseId) };
        //     await axios.put(`http://localhost:8090/course/${id}`,userData)
        //     navigate("/")
        // }

        // const loadUser =async()=>{
        //     const result=await axios.get(`http://localhost:8090/courses/${id}`)
        //     setUser(result.data)
        // }

        const loadUser = async () => {
            try {
                const result =  reqSend.defaultReq('GET', `api/tms/course/${id}`, null, (response) => {
                    setUser(response.data);
                }, (error) => {
                    console.error('Error loading courses:', error);
                });
            } catch (error) {
                console.error('Error loading courses:', error);
            }
        };

        const onSubmit = async (e) => {
            e.preventDefault();
            try {
                const userData = { ...user, courseId: parseInt(courseId),duration: parseInt(duration),cost: parseFloat(cost) };
                reqSend.defaultReq('PUT', `api/tms/course/${id}`, userData, () => {
                    navigate("/trainingdevelopment-management/manager/courses");
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
                <h2 className="text-center m-4">Edit Course Details</h2>
                <form onSubmit={(e)=>onSubmit(e)} action="">
                <div className="mb-3">
                    <label htmlFor="Name" className='form-label'>Course ID</label>
                    <input type={"number"} className='form-control'name='courseId' required placeholder='Enter course ID'value={courseId} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Course Name</label>
                    <input type={"text"} className='form-control'name='courseName'required  placeholder='Enter course name' value={courseName} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Instructor</label>
                    <input type={"text"} className='form-control'name='instructor'required  placeholder='Enter Instructor' value={instructor} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Details</label>
                    <input type={"text"} className='form-control'name='details' required placeholder='Enter details' value={details} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Link to Learn</label>
                    <input type={"url"} className='form-control'name='link' required placeholder='Enter link' value={link} onChange={(e)=>onInputChange(e)}/>
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Cost</label>
                    <input type={"text"} className='form-control'name='cost' required placeholder='Enter link' value={cost} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Duration</label>
                    <input type={"text"} className='form-control'name='duration' required placeholder='Enter link' value={duration} onChange={(e)=>onInputChange(e)}/>
                </div> */}

                <div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link type='submit' className='btn btn-outline-danger mx-2'to='/trainingdevelopment-management/manager/courses' >Cancel</Link>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export function Ose(props) {
    const [oses, setOses] = useState([]);

    useEffect(() => {
        loadOses();
    }, []);

    const loadOses = async () => {
        try {
            const result =reqSend.defaultReq('GET', 'api/tms/overseas', null, (response) => {
                setOses(response.data);
            }, (error) => {
                console.error('Error loading overseas experiences:', error);
            });
        } catch (error) {
            console.error('Error loading overseas experiences:', error);
        }
    };

    const deleteOses = async (id) => {
        try {
            reqSend.defaultReq('DELETE', `api/tms/overseas/${id}`, null, () => {
                loadOses();
            }, (error) => {
                console.error('Error deleting overseas experience:', error);
            });
        } catch (error) {
            console.error('Error deleting overseas experience:', error);
        }
    };

    const tableData = {
        heading: ["", "ID", "Company Name", "Country", "Cost (LKR)", "Duration (Months)","",""],
        body: oses.map((ose, index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{ose.oseId}</td>
                <td>{ose.companyName}</td>
                <td>{ose.country}</td>
                <td>{ose.cost}</td>
                <td>{ose.duration}</td>
                <td>
                    <button className="btn btn-danger mx-2" onClick={() => deleteOses(ose.id)}>Delete</button>
                </td>
                <td>
                    <Link className="btn btn-outline-primary mx-2" to={`edit/${ose.id}`}>Edit</Link>
                </td>
            </tr>
        )),
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Overseas Experience</h1>
                        <Link className="btn btn-primary mx-2" to={"add"}>Add</Link>
                    </div>
                    <TableComp data={tableData} />
                </div>
            </main>
        </>
    )
}

export function AddOse(props){
    let navigate = useNavigate();

    const [user, setUser] = useState({
        "oseId": "",
        "companyName": "",
        "country": "",
        "details": "",
        "cost":"",
        "duration":"",
    });

    const { oseId, companyName, country, details,cost,duration } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { ...user, oseId: parseInt(oseId),duration: parseInt(duration),cost: parseFloat(cost) };
            reqSend.defaultReq('POST', 'api/tms/overseas', userData, () => {
                navigate("/trainingdevelopment-management/manager/over-seas");
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
                <h2 className="text-center m-4">Add Overseas Experience Details</h2>
                <form onSubmit={(e)=>onSubmit(e)} action="">
                <div className="mb-3">
                    <label htmlFor="Name" className='form-label'>Ose ID</label>
                    <input type={"number"} className='form-control'name='oseId' required placeholder='Enter ose ID'value={oseId} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Company Name</label>
                    <input type={"text"} className='form-control'name='companyName' required placeholder='Enter company name' value={companyName} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Country</label>
                    <input type={"text"} className='form-control'name='country' required placeholder='Enter Country' value={country} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Details</label>
                    <input type={"text"} className='form-control'name='details' required placeholder='Enter details' value={details} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Cost (LKR)</label>
                    <input type={"text"} className='form-control'name='cost' required placeholder='Enter cost' value={cost} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Duration (Months)</label>
                    <input type={"number"} className='form-control'name='duration' required placeholder='Enter duration' value={duration} onChange={(e)=>onInputChange(e)}/>
                </div>
                
                <div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link type='submit' className='btn btn-outline-danger mx-2'to='/trainingdevelopment-management/manager/over-seas' >Cancel</Link>
                </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export function EditOse(props){
    let navigate=useNavigate();
    const {id}=useParams();

    const [user, setUser] = useState({
        "duration": "",
        "cost": "",
        "companyName": "",
        "country": "",
        "oseId": "",
        "details": "",
            
    });

    const { duration, cost, companyName, country, oseId ,details} = user;


        const onInputChange=(e)=>{
            setUser({...user,[e.target.name]:e.target.value})
        }

        useEffect(()=>{
            loadUser();
        },[])
        
        // const onSubmit=async(e)=>{
        //     e.preventDefault()
        //     const userData = { ...user, courseId: parseInt(courseId) };
        //     await axios.put(`http://localhost:8082/course/${id}`,userData)
        //     navigate("/")
        // }

        // const loadUser =async()=>{
        //     const result=await axios.get(`http://localhost:8082/courses/${id}`)
        //     setUser(result.data)
        // }

        const loadUser = async () => {
            try {
                const result =reqSend.defaultReq('GET', `api/tms/overseas/${id}`, null, (response) => {
                    setUser(response.data);
                }, (error) => {
                    console.error('Error loading courses:', error);
                });
            } catch (error) {
                console.error('Error loading courses:', error);
            }
        };

        const onSubmit = async (e) => {
            e.preventDefault();
            try {
                const userData = { ...user, oseId: parseInt(oseId),duration: parseInt(duration),cost: parseFloat(cost) };
                reqSend.defaultReq('PUT', `api/tms/overseas/${id}`, userData, () => {
                    navigate("/trainingdevelopment-management/manager/over-seas");
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
            <h2 className="text-center m-4">Edit Overseas Experience Details</h2>
                <form onSubmit={(e)=>onSubmit(e)} action="">
                <div className="mb-3">
                    <label htmlFor="Name" className='form-label'>OSE ID</label>
                    <input type={"number"} className='form-control'name='oseId' required placeholder='Enter course ID'value={oseId} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Company Name</label>
                    <input type={"text"} className='form-control'name='companyName'required placeholder='Enter course name' value={companyName} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Country</label>
                    <input type={"text"} className='form-control'name='country'required placeholder='Enter Instructor' value={country} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Details</label>
                    <input type={"text"} className='form-control'name='details' required placeholder='Enter details' value={details} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Duration (Months)</label>
                    <input type={"number"} className='form-control'name='duration'required placeholder='Enter Duration' value={duration} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className='form-label'>Costc(LKR)</label>
                    <input type={"text"} className='form-control'name='cost' required placeholder='Enter cost' value={cost} onChange={(e)=>onInputChange(e)}/>
                </div>
                <div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link type='submit' className='btn btn-outline-danger mx-2'to='/trainingdevelopment-management/manager/over-seas' >Cancel</Link>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}