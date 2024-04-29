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