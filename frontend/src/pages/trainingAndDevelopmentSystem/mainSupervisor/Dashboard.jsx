import '../../../styles/dashboard.css';
import '../../../styles/style.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import avatar from '../../../assets/avatar.svg';
import { SideNavigation, TopBar } from '../../../components/sideComps/dashBoardComps';
import {
    dashboardAdminData,
} from './data/DashBoardData';

import { AddDevelop, AddProducts, AddPrototype, DashboardView, EditPrototype, ProductDevelopment, Products, Prototype, SendToQA } from './SideBarPages';
import NotFound from '../../generalManagementSystem/NotFound';




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
                        <Route path="/prototypes" element={<Prototype />} />
                        <Route path="/prototypes/add" element={<AddPrototype />} />
                        <Route path="/prototypes/edit/:id" element={<EditPrototype />} />
                        <Route path="/product-development" element={<ProductDevelopment />} />
                        <Route path="/product-development/send-to-qa" element={<SendToQA />} />
                        <Route path="/product-development/add-develop/:id" element={<AddDevelop />} />
                        <Route path="/product-development/add-product/:id" element={<AddProducts />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/*" element={<NotFound />}  />
                    </Routes>
                </section>
                
            </div>

        </>
    )
}