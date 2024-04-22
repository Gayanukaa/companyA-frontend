import '../../styles/dashboard.css';
import '../../styles/style.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import { SideNavigation, TopBar } from '../../components/sideComps/dashBoardComps';
import {
    dashboardAdminData,
} from './data/DashBoardData';

import { ViewManagers, DashboardView } from './SideBarPages';
import ModalForm from './components/ModalForm'
import AddManager from './components/AddManager';



export default function Dashboard() {

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


        const switchMode = document.getElementById('switch-mode');
        const wrapper = document.getElementById('dashboardWrapper');


        switchMode.addEventListener('change', function () {
            if (this.checked) {
                wrapper.classList.add('dark');
            } else {
                wrapper.classList.remove('dark');
            }
        })
    }

    useEffect(() => {
        addJs()
    }, [])




    return (
        <>
            <div id="dashboardWrapper">

                <SideNavigation data={dashboardAdminData} />

                <section id="content" style={{height: '100vh'}}>
                    <TopBar avatar={avatar} />

                    <Routes>
                        <Route path="/dashboard" element={<DashboardView />} />
                        <Route path="/view-managers" element={<ViewManagers />} />
                        <Route path="/update-managers" element={<ModalForm />} />
                        <Route path="/add-managers" element={<AddManager />} />
                    </Routes>
                </section>
                
            </div>

        </>
    )
}