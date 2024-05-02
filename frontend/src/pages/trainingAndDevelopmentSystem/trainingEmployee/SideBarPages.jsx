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

export function Training(props){
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
            const result = reqSend.defaultReq('GET', `api/tms/trainingemployee@gmail.com/enrolledCourses`, null, (response) => {
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
            const result = await reqSend.defaultReq('GET', `api/tms/trainingemployee@gmail.com/completedCourses`, null, (response) => {
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
            await reqSend.defaultReq('PUT', `api/tms/trainingemployee@gmail.com/enroll/${courseId}`, null, (response) => {
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
            await reqSend.defaultReq('PUT', `api/tms/trainingemployee@gmail.com/complete/${courseId}`, null, (response) => {
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
                        <h1 style={{ fontSize: '1.5rem' }}>Welcome, trainingemployee</h1>
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