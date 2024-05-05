import '../../styles/dashboard.css';
import '../../styles/style.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import avatar from '../../assets/avatar.svg';
import { SideNavigation, TopBar } from '../../components/sideComps/dashBoardComps';

import { ViewManagers, ApprovalSection } from './SideBarPages';
import ModalForm from './components/ModalForm'
import AddManager from './components/AddManager';
import FeedBack from './components/FeedbackSection';
import DashboardView from './components/DashboardView';



export default function Dashboard() {
    const [notificationData, setNotificationData] = useState(null);


    const addJs = () => {
        const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

        allSideMenu.forEach(item => {
            const li = item.parentElement;

            item.addEventListener('click', function () {
                allSideMenu.forEach(i => {
                    i.parentElement.classList.remove('active');
                })
                li.classList.add('active');
            })
        });
        // TOGGLE SIDEBAR
        const menuBar = document.querySelector('#content nav .bx.bx-menu');
        const sidebar = document.getElementById('sidebar');
        menuBar.addEventListener('click', function () {
            sidebar.classList.toggle('hideSidebar');
        })
        // const switchMode = document.getElementById('switch-mode');
        // const wrapper = document.getElementById('dashboardWrapper');
        // switchMode.addEventListener('change', function () {
        //     if (this.checked) {
        //         wrapper.classList.add('dark');
        //     } else {
        //         wrapper.classList.remove('dark');
        //     }
        // })
    }
    useEffect(() => {
        addJs();
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://spring-boot-companya.azurewebsites.net/api/feedback/view");
    
                if (response.data) {
                    const unreadMessages = response.data.filter(message => message.isRead === 0);
                    setNotificationData(unreadMessages.length);
                }
            } catch (error) {
                console.error("Error fetching feedback data:", error);
            }
        };
    
        fetchData();
    }, []);
    



    const dashboardAdminData = [
        { name: "Dashboard", icon: <i className='bx bxs-dashboard' ></i>, active: true, to: 'dashboard' },
        { name: "View Managers", icon: <i class='bx bxs-group'></i>, active: false, to: 'view-managers' },
        { name: "Add Manager", icon: <i className='bx bxs-user-plus'></i>, active: false, to: 'add-managers' },
        { name: "Feedbacks", icon: <i className='bx bxs-comment-detail'></i>, active: false, to: 'view-feedback', notification: notificationData ? notificationData : null},
        { name: "Approvals", icon: <i className='bx bxs-file'></i>, active: false, to: 'approvals' },
    ]



    return (
        <>
            <div id="dashboardWrapper">
                <SideNavigation data={dashboardAdminData} />
                <section id="content" style={{ height: '100vh' }}>
                    <TopBar avatar={avatar} />
                    <Routes>
                        <Route path="/dashboard" element={<DashboardView />} />
                        <Route path="/view-managers" element={<ViewManagers />} />
                        <Route path="/update-managers" element={<ModalForm />} />
                        <Route path="/add-managers" element={<AddManager />} />
                        <Route path="/view-feedback" element={<FeedBack />} />
                        <Route path="/approvals" element={<ApprovalSection />} />
                    </Routes>
                </section>
            </div>
        </>
    )
}