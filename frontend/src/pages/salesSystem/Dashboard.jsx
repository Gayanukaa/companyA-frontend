import '../../styles/dashboard.css';
import '../../styles/style.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import { SideNavigation, TopBar } from '../../components/sideComps/dashBoardComps';
import {
    dashboardAdminData,
} from './data/DashBoardData';

import { DashboardView, ViewStocks } from './SideBarPages';
import ProductPage from "./ProductPage.jsx";
import ExistingProductsPage from "./ExistingProductsPage.jsx";




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
                        <Route path="/view-stocks" element={<ViewStocks />} />
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/existingproducts" element={<ExistingProductsPage />} />
                    </Routes>
                </section>

            </div>

        </>
    )
}
// import '../../styles/dashboard.css';
// import '../../styles/style.css';
//
// import { Route, Routes } from 'react-router-dom';
//
// import ProductPage from "./ProductPage.jsx";
// import ExistingProductsPage from "./ExistingProductsPage.jsx";
//
//
// export default function Dashboard() {
//
//  return (
//         <>
//             <Routes>
//
//                 <Route path="/dashboard" element={<ProductPage />} />
//                 <Route path="/existingproducts" element={<ExistingProductsPage />} />
//             </Routes>
//
//         </>
//     )
// }