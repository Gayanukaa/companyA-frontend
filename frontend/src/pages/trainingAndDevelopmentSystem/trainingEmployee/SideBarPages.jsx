//import React from "react";
import CardComp from "../../../components/sideComps/CardComp";
import TableComp from '../../../components/sideComps/TableComp'
import avatar from '../../../assets/avatar.svg';
import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import * as reqSend from '../../../global/reqSender';


export function DashboardView(props) {

    const dataList = [
        {
            image: avatar,
            altText: "Avatar 1",
            count: 62,
            name: "Trainee Employee"
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

// export function TrainingExample(props){
//     const { email } = useParams();
//     const [users, setUsers] = useState([]);
//     const [users1, setUsers1] = useState([]);
//     const [enrolledCourses, setEnrolledCourses] = useState([]);
//     const [completedCourses, setCompletedCourses] = useState([]);
//     const [loadingCompletedCourses, setLoadingCompletedCourses] = useState(true);
//     const [details, setDetails] = useState('');

//     useEffect(() => {
//         loadUsers();
//         loadUsers1();
//         loadEnrolledCourses();
//         loadCompletedCourses();
//     }, []);

//     // const loadUsers = async () => {
//     //     try {
//     //         const result = await axios.get("http://localhost:8090/api/tms/courses");
//     //         setUsers(result.data);
//     //     } catch (error) {
//     //         console.error('Error loading courses:', error);
//     //     }
//     // }
//     const loadUsers = async () => {
//         try {
//             const result = reqSend.defaultReq('GET', 'api/tms/courses', null, (response) => {
//                 setUsers(response.data);
//             }, (error) => {
//                 console.error("Error loading courses:", error);
//             });
//         } catch (error) {
//             console.error("Error loading courses:", error);
//         }
//     };



//     const loadUsers1 = async () => {
//         try {
//             const result =reqSend.defaultReq('GET', 'api/tms/overseas', null, (response) => {
//                 setUsers1(response.data);
//             }, (error) => {
//                 console.error("Error loading overseas experiences:", error);
//             });
//         } catch (error) {
//             console.error("Error loading overseas experiences:", error);
//         }
//     };

    

//     const loadEnrolledCourses = async () => {
//         try {
//             const result = reqSend.defaultReq('GET', `api/tms/trainingemployee@gmail.com/enrolledCourses`, null, (response) => {
//                 setEnrolledCourses(response.data);
//             }, (error) => {
//                 console.error("Error loading enrolled courses:", error);
//             });
//         } catch (error) {
//             console.error("Error loading enrolled courses:", error);
//         }
//     };

    

//     const loadCompletedCourses = async () => {
//         try {
//             const result = await reqSend.defaultReq('GET', `api/tms/trainingemployee@gmail.com/completedCourses`, null, (response) => {
//                 setCompletedCourses(response.data);
//                 setLoadingCompletedCourses(false);
//             }, (error) => {
//                 console.error("Error loading completed courses:", error);
//             });
//         } catch (error) {
//             console.error("Error loading completed courses:", error);
//         }
//     };

    
//     // once enroll button will disable
//     const enrollUser = async (courseId) => {
//         try {
//             await reqSend.defaultReq('PUT', `api/tms/trainingemployee@gmail.com/enroll/${courseId}`, null, (response) => {
//                 setEnrolledCourses([...enrolledCourses, courseId]);
//                 alert('Enrollment successful');
//             }, (error) => {
//                 console.error('Error enrolling user:', error);
//                 alert('Enrollment failed. Please try again.');
//             });
//         } catch (error) {
//             console.error('Error enrolling user:', error);
//             alert('Enrollment failed. Please try again.');
//         }
//     };

    
//     // once complete button will disable
//     const completeCourse = async (courseId) => {
//         try {
//             await reqSend.defaultReq('PUT', `api/tms/trainingemployee@gmail.com/complete/${courseId}`, null, (response) => {
//                 setCompletedCourses([...completedCourses, courseId]);
//                 alert('Course completed successfully');
//             }, (error) => {
//                 console.error('Error completing course:', error);
//                 alert('Failed to complete course. Please try again.');
//             });
//         } catch (error) {
//             console.error('Error completing course:', error);
//             alert('Failed to complete course. Please try again.');
//         }
//     };

    

//     const learn = async (courseId) => {
//         try {
//             const response = reqSend.defaultReq('GET', `api/tms/course/${courseId}/link`, null, (response) => {
//                 const link = response.data;
//                 window.location.href = link.link; // Redirect to the fetched link
//             }, (error) => {
//                 console.error('Error fetching course link:', error);
//                 alert('Failed to fetch course link. Please try again.');
//             });
//         } catch (error) {
//             console.error('Error fetching course link:', error);
//             alert('Failed to fetch course link. Please try again.');
//         }
//     };

//     const handleViewDetails = async (id) => {
//         try {
//             const response = reqSend.defaultReq('GET', `api/tms/course/${id}/details`, null, (response) => {
//                 const details = response.data;
//                 alert(details);
//             }, (error) => {
//                 console.error('Error fetching course details:', error);
//                 alert('Failed to fetch course details. Please try again.');
//             });
//         } catch (error) {
//             console.error('Error fetching course details:', error);
//             alert('Failed to fetch course details. Please try again.');
//         }
//     };

//     const handleViewDetails1 = async (id) => {
//         try {
//             const response = reqSend.defaultReq('GET', `api/tms/overseas/${id}/details`, null, (response) => {
//                 const details = response.data;
//                 alert(details);
//             }, (error) => {
//                 console.error('Error fetching course details:', error);
//                 alert('Failed to fetch course details. Please try again.');
//             });
//         } catch (error) {
//             console.error('Error fetching course details:', error);
//             alert('Failed to fetch course details. Please try again.');
//         }
//     };

//     const isCourseEnrolled = (courseId) => {
//         return enrolledCourses.includes(courseId);
//     }

//     const isCourseCompleted = (courseId) => {
//         return completedCourses.includes(courseId);
//     }

//     const tableData = {
//         heading: ["", "ID", "Course Name", "Instructor", "Duration (Months)","Cost (LKR)", "Actions"],
//         body: users.map((user, index) => (
//             <tr key={index}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{user.courseId}</td>
//                 <td>{user.courseName}</td>
//                 <td>{user.instructor}</td>
//                 <td>{user.duration}</td>
//                 <td>{user.cost}</td>
//                 <td>
//                     <button className="btn btn-outline-success mx-2"onClick={() => handleViewDetails(user.id)}>View</button>
//                     <button className="btn btn-outline-primary mx-2" onClick={() => enrollUser(user.courseId)} disabled={isCourseEnrolled(user.courseId)}>Enroll</button>
//                     <button className="btn btn-outline-danger mx-2" disabled={!isCourseEnrolled(user.courseId)} onClick={() => learn(user.courseId)}>Learn</button>
//                     <button className="btn btn-outline-warning" disabled={!isCourseEnrolled(user.courseId) || isCourseCompleted(user.courseId)} onClick={() => completeCourse(user.courseId)}>
//                         {loadingCompletedCourses ? 'Loading...' : isCourseCompleted(user.id) ? 'Completed' : 'Complete'}
//                     </button>
//                 </td>
//             </tr>
//         )),
//     };

//     const tableData1 = {
//         heading: ["", "ID", "Company Name", "Country", "Duration (Months)","Cost (LKR)", "Actions"],
//         body: users1.map((user, index) => (
//             <tr key={index}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{user.oseId}</td>
//                 <td>{user.companyName}</td>
//                 <td>{user.country}</td>
//                 <td>{user.duration}</td>
//                 <td>{user.cost}</td>
//                 <td>
//                     <button className="btn btn-outline-success mx-2"onClick={() => handleViewDetails1(user.id)}>View</button>
//                     <button className="btn btn-outline-primary mx-2" onClick={() => enrollUser(user.oseId)} disabled={isCourseEnrolled(user.oseId)}>Enroll</button>
                    
//                     <button className="btn btn-outline-warning" disabled={!isCourseEnrolled(user.oseId) || isCourseCompleted(user.oseId)} onClick={() => completeCourse(user.oseId)}>
//                         {loadingCompletedCourses ? 'Loading...' : isCourseCompleted(user.id) ? 'Completed' : 'Complete'}
//                     </button>
//                 </td>
//             </tr>
//         )),
//     };

//     return (
//         <>
//             <main>
//                 <div className="head-title">
//                     <div className="left">
//                         <h1 style={{ fontSize: '1.5rem' }}>Welcome, trainingemployee</h1>
//                     </div>
//                 </div>

//             </main>
            
            

//             <main>
//                 <div className="head-title">
//                     <div className="left">
//                         <h1>Courses</h1>
//                     </div>

//                     <TableComp data={tableData} />

//                 </div>

//             </main>

//             <main>
//                 <div className="head-title">
//                     <div className="left">
//                         <h1>Overseas Experience</h1>
//                     </div>

//                     <TableComp data={tableData1} />

//                 </div>

//             </main>
//         </>
//     );
// }

export function Training(props){
    return(
    <main>
                <div className="head-title">
                    <div className="left">
                        <h1 >
                            {/* <p style={{ textAlign: 'justify' }}>
                            Training is paramount for both personal and professional advancement, serving as a catalyst for skill development, performance enhancement, and adaptation to change. By investing in training, individuals gain the expertise and knowledge needed to excel in their roles, fostering higher levels of engagement, job satisfaction, and retention. Moreover, organizations benefit from a more skilled and innovative workforce, capable of navigating complexities, mitigating risks, and driving sustainable growth. Ultimately, training cultivates a culture of continuous learning, creativity, and resilience, empowering individuals and organizations to thrive in today's dynamic and competitive landscape.
                            </p> */}Training
                        </h1>
                        <div className="card" style={{ width: '100%' }}>
                        <div className="card-body">
                          <h5 className="card-title">Importance</h5>
                          <h6 className="card-subtitle mb-2 text-muted">Show Your Colours</h6>
                          <p className="card-text" style={{ textAlign: 'justify' }}>Welcome to our comprehensive employee development platform! Training is paramount for both personal and professional advancement, serving as a catalyst for skill development, performance enhancement, and adaptation to change. By investing in training, individuals gain the expertise and knowledge needed to excel in their roles, fostering higher levels of engagement, job satisfaction, and retention. Moreover, organizations benefit from a more skilled and innovative workforce, capable of navigating complexities, mitigating risks, and driving sustainable growth. Ultimately, training cultivates a culture of continuous learning, creativity, and resilience, empowering individuals and organizations to thrive in today's dynamic and competitive landscape.</p>
                          
                        </div>
                        </div>
                            <p></p>
                        <div className="card" style={{ width: '100%' }}>
                        <div className="card-body">
                          <h5 className="card-title">Proceed</h5>
                          <h6 className="card-subtitle mb-2 text-muted">Road to success</h6>
                          <p className="card-text" style={{ textAlign: 'justify' }}>At our organization, we prioritize the growth and advancement of our team members. Upon joining, employees have the opportunity to create personalized accounts using their email addresses and unique IDs. Once registered, they gain access to a wealth of resources aimed at enhancing their skills and experiences. Our platform allows employees to enroll in various courses and overseas experiences tailored to their career goals and interests. Upon enrollment, individuals receive confirmation emails, marking the beginning of their journey with us. We believe in the importance of commitment and accountability, hence completion of enrolled programs is mandatory. Throughout the learning process, progress is diligently monitored to ensure individuals stay on track with their development goals. Join us on this journey of growth and continuous learning as we strive to empower our employees for success in their professional endeavors.</p>
                          
                        </div>
                        </div>
                                 
                    </div>
                </div>

            </main>
    )
}

export function Login(props){

    let navigate=useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const { email, password } = loginData;

    const onInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            reqSend.defaultReq('POST', 'api/tms/get-tm/login', loginData, (response) => {
                if (response.status === 200) {
                    // Redirect user to home page or any other route after successful login
                    alert("Login successful");
                    console.log("Login successful");
                    navigate(`/trainingdevelopment-management/training-employee/training/${loginData.email}`);
                } 
            }, );
        } catch (error) {
            //setError("Invalid username or password");
            alert("Error");
        }
    };

    return (
        <>
            <div></div>
            <div className='container'>
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{  color: '#007bff' }}>
                        <h2 className="text-center m-4">Employee Login</h2>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label htmlFor="mSupervisorName" className='form-label'>Email</label>
                                <input type="email" className='form-control' name='email' required placeholder='Enter your email' value={email} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mPassword" className='form-label'>Password</label>
                                <input type="password" className='form-control' name='password' required placeholder='Enter your password' value={password} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            </div>
                            <div>
                                <button type='submit' className='btn btn-outline-primary'>Submit</button>
                                <Link className='btn btn-outline-danger mx-2' to='/trainingdevelopment-management/training-employee/dashboard'>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export function SignUP(props){
    let navigate=useNavigate();
    const [loginData, setLoginData] = useState({
        employeeId:"",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const { employeeId,email, password } = loginData;

    const onInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value ,});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { ...loginData, employeeId: parseInt(employeeId) };
            //console.log("Login data:", loginData);
            reqSend.defaultReq('POST', 'api/tms/get-tm/signup', userData, (response) => {
                if (response.status === 201) {
                    // Redirect user to home page or any other route after successful login
                    
                    alert("SignUp successful");
                    console.log("SignUp successful");
                    navigate(`/trainingdevelopment-management/training-employee/training/${loginData.email}`);
                }
            }, );
        } catch (error) {
            setError("Error during sign up");
            console.log("Error during sign up");
        }
    };

    return (
        <>
            <div></div>
            <div className='container'>
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{  color: '#007bff' }}>
                        <h2 className="text-center m-4">Employee Sign UP</h2>
                        <form onSubmit={onSubmit}>
                        <div className="mb-3">
                                <label htmlFor="mSupervisorName" className='form-label'>ID</label>
                                <input type="number" className='form-control' name='employeeId' required placeholder='Enter your id' value={employeeId} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mSupervisorName" className='form-label'>Email</label>
                                <input type="email" className='form-control' name='email' required placeholder='Enter your email' value={email} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mPassword" className='form-label'>Password</label>
                                <input type="password"  minLength="8" className='form-control' name='password' required placeholder='Enter your password' value={password} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            </div>
                            <div>
                                <button type='submit' className='btn btn-outline-primary'>Submit</button>
                                <Link className='btn btn-outline-danger mx-2' to='/trainingdevelopment-management/training-employee/dashboard'>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export function TrainingEnroll(props){
    const { email } = useParams();
    const [users, setUsers] = useState([]);
    const [users1, setUsers1] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [loadingCompletedCourses, setLoadingCompletedCourses] = useState(true);
    const [details, setDetails] = useState('');

    useEffect(() => {
        loadUsers();
        loadUsers1();
        loadEnrolledCourses();
        loadCompletedCourses();
    }, []);

    // const loadUsers = async () => {
    //     try {
    //         const result = await axios.get("http://localhost:8090/api/tms/courses");
    //         setUsers(result.data);
    //     } catch (error) {
    //         console.error('Error loading courses:', error);
    //     }
    // }
    const loadUsers = async () => {
        try {
            const result = reqSend.defaultReq('GET', 'api/tms/courses', null, (response) => {
                setUsers(response.data);
            }, (error) => {
                console.error("Error loading courses:", error);
            });
        } catch (error) {
            console.error("Error loading courses:", error);
        }
    };



    const loadUsers1 = async () => {
        try {
            const result =reqSend.defaultReq('GET', 'api/tms/overseas', null, (response) => {
                setUsers1(response.data);
            }, (error) => {
                console.error("Error loading overseas experiences:", error);
            });
        } catch (error) {
            console.error("Error loading overseas experiences:", error);
        }
    };

    

    const loadEnrolledCourses = async () => {
        try {
            const result = reqSend.defaultReq('GET', `api/tms/${email}/enrolledCourses`, null, (response) => {
                setEnrolledCourses(response.data);
            }, (error) => {
                console.error("Error loading enrolled courses:", error);
            });
        } catch (error) {
            console.error("Error loading enrolled courses:", error);
        }
    };

    

    const loadCompletedCourses = async () => {
        try {
            const result = await reqSend.defaultReq('GET', `api/tms/${email}/completedCourses`, null, (response) => {
                setCompletedCourses(response.data);
                setLoadingCompletedCourses(false);
            }, (error) => {
                console.error("Error loading completed courses:", error);
            });
        } catch (error) {
            console.error("Error loading completed courses:", error);
        }
    };

    
    // once enroll button will disable
    const enrollUser = async (courseId) => {
        try {
            await reqSend.defaultReq('PUT', `api/tms/${email}/enroll/${courseId}`, null, (response) => {
                setEnrolledCourses([...enrolledCourses, courseId]);
                alert('Enrollment successful');
            }, (error) => {
                console.error('Error enrolling user:', error);
                alert('Enrollment failed. Please try again.');
            });
        } catch (error) {
            console.error('Error enrolling user:', error);
            alert('Enrollment failed. Please try again.');
        }
    };

    
    // once complete button will disable
    const completeCourse = async (courseId) => {
        try {
            await reqSend.defaultReq('PUT', `api/tms/${email}/complete/${courseId}`, null, (response) => {
                setCompletedCourses([...completedCourses, courseId]);
                alert('Course completed successfully');
            }, (error) => {
                console.error('Error completing course:', error);
                alert('Failed to complete course. Please try again.');
            });
        } catch (error) {
            console.error('Error completing course:', error);
            alert('Failed to complete course. Please try again.');
        }
    };

    

    const learn = async (courseId) => {
        try {
            const response = reqSend.defaultReq('GET', `api/tms/course/${courseId}/link`, null, (response) => {
                const link = response.data;
                window.location.href = link.link; // Redirect to the fetched link
            }, (error) => {
                console.error('Error fetching course link:', error);
                alert('Failed to fetch course link. Please try again.');
            });
        } catch (error) {
            console.error('Error fetching course link:', error);
            alert('Failed to fetch course link. Please try again.');
        }
    };

    const handleViewDetails = async (id) => {
        try {
            const response = reqSend.defaultReq('GET', `api/tms/course/${id}/details`, null, (response) => {
                const details = response.data;
                alert(details);
            }, (error) => {
                console.error('Error fetching course details:', error);
                alert('Failed to fetch course details. Please try again.');
            });
        } catch (error) {
            console.error('Error fetching course details:', error);
            alert('Failed to fetch course details. Please try again.');
        }
    };

    const handleViewDetails1 = async (id) => {
        try {
            const response = reqSend.defaultReq('GET', `api/tms/overseas/${id}/details`, null, (response) => {
                const details = response.data;
                alert(details);
            }, (error) => {
                console.error('Error fetching course details:', error);
                alert('Failed to fetch course details. Please try again.');
            });
        } catch (error) {
            console.error('Error fetching course details:', error);
            alert('Failed to fetch course details. Please try again.');
        }
    };

    const isCourseEnrolled = (courseId) => {
        return enrolledCourses.includes(courseId);
    }

    const isCourseCompleted = (courseId) => {
        return completedCourses.includes(courseId);
    }

    const tableData = {
        heading: ["", "ID", "Course Name", "Instructor", "Duration (Months)","Cost (LKR)", "Actions"],
        body: users.map((user, index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.courseId}</td>
                <td>{user.courseName}</td>
                <td>{user.instructor}</td>
                <td>{user.duration}</td>
                <td>{user.cost}</td>
                <td>
                    <button className="btn btn-outline-success mx-2"onClick={() => handleViewDetails(user.id)}>View</button>
                    <button className="btn btn-outline-primary mx-2" onClick={() => enrollUser(user.courseId)} disabled={isCourseEnrolled(user.courseId)}>Enroll</button>
                    <button className="btn btn-outline-danger mx-2" disabled={!isCourseEnrolled(user.courseId)} onClick={() => learn(user.courseId)}>Learn</button>
                    <button className="btn btn-outline-warning" disabled={!isCourseEnrolled(user.courseId) || isCourseCompleted(user.courseId)} onClick={() => completeCourse(user.courseId)}>
                        {loadingCompletedCourses ? 'Loading...' : isCourseCompleted(user.id) ? 'Completed' : 'Complete'}
                    </button>
                </td>
            </tr>
        )),
    };

    const tableData1 = {
        heading: ["", "ID", "Company Name", "Country", "Duration (Months)","Cost (LKR)", "Actions"],
        body: users1.map((user, index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.oseId}</td>
                <td>{user.companyName}</td>
                <td>{user.country}</td>
                <td>{user.duration}</td>
                <td>{user.cost}</td>
                <td>
                    <button className="btn btn-outline-success mx-2"onClick={() => handleViewDetails1(user.id)}>View</button>
                    <button className="btn btn-outline-primary mx-2" onClick={() => enrollUser(user.oseId)} disabled={isCourseEnrolled(user.oseId)}>Enroll</button>
                    
                    <button className="btn btn-outline-warning" disabled={!isCourseEnrolled(user.oseId) || isCourseCompleted(user.oseId)} onClick={() => completeCourse(user.oseId)}>
                        {loadingCompletedCourses ? 'Loading...' : isCourseCompleted(user.id) ? 'Completed' : 'Complete'}
                    </button>
                </td>
            </tr>
        )),
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1 style={{ fontSize: '1.5rem' }}>Welcome, {email}</h1>
                    </div>
                </div>

            </main>
            
            

            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Courses</h1>
                    </div>

                    <TableComp data={tableData} />

                </div>

            </main>

            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Overseas Experience</h1>
                    </div>

                    <TableComp data={tableData1} />

                </div>

            </main>
        </>
    );
}