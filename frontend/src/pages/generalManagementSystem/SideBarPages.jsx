import React from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';
import axios from "axios";
import { useEffect, useState } from "react";
import TrashIcon from "./components/TrashIcon";
import { useNavigate } from 'react-router-dom';





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
                    name: "Manager Details",
                    heading: ["Person", "Name", "e-mail", "Role", "edit", ""],
                    body: data.map((tablerow, index) => {

                        return (
                            <tr key={index}>
                                <td><img src={avatar} alt="Avatar" /></td>
                                <td>{tablerow.firstName + " " + tablerow.lastName}</td>
                                <td >{tablerow.email}</td>
                                <td>{tablerow.role}</td>
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


    // const dataList = [
    //     {
    //         image: avatar,
    //         altText: "Avatar 1",
    //         count: 5,
    //         name: "John Doe"
    //     },
    //     {
    //         image: avatar,
    //         altText: "Avatar 2",
    //         count: "Malitha Prabashana",
    //         name: "malith@fam.com"
    //     },
    //     {
    //         image: avatar,
    //         altText: "Avatar 3",
    //         count: 7,
    //         name: "Bob Johnson"

    //     },

    //     {
    //         image: avatar,
    //         altText: "Avatar 3",
    //         count: 7,
    //         name: "Bob Johnson"

    //     }
    // ];

    // const dataList1 = [
    //     {
    //         image: avatar,
    //         altText: "Avatar 1",
    //         count: 5,
    //         name: "John Doe"
    //     },
    //     {
    //         image: avatar,
    //         altText: "Avatar 2",
    //         count: "Malitha Prabashana",
    //         name: "malith@fam.com"
    //     },
    //     {
    //         image: avatar,
    //         altText: "Avatar 3",
    //         count: 7,
    //         name: "Bob Johnson"

    //     },

    //     {
    //         image: avatar,
    //         altText: "Avatar 3",
    //         count: 7,
    //         name: "Bob Johnson"

    //     }
    // ];

    return (
        <>
            <main>
                {/* <div className="head-title">
                    <div className="left">
                        <h1>Employee</h1>
                    </div>

                    <CardComp data={dataList} />

                    
                </div> */}
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