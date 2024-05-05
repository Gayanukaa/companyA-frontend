import '../../styles/dashboard.css';
import '../../styles/style.css';
import './DashBoardView.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import { SideNavigation, TopBar } from '../../components/sideComps/dashBoardComps';
import {dashboardAdminData} from './data/DashBoardData';
import { UserProfile} from './SideBarPages';
import { ViewEmployee } from './EmployeeSalary.jsx';
import { OrderHistory } from './OrderHistory.jsx';
import AllEmployeeSalary from './TotalSalary.jsx';
import AllOrders from './AllOrders.jsx'
import AddOrUpdateEmployeeSalary from './AddUpdateSalary.jsx';
import ViewLoanDetails from './ViewLoanDetails.jsx';
import AddLoanForm from './CreateLoan.jsx';
import { FinanceOverview } from './FinanceOverview.jsx';


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
                        <Route path="/dashboard" element={<UserProfile />} />
                        <Route path="/view-salary-details" element={<ViewEmployee />}/>
                        <Route path="/view-all-salary-details" element={<AllEmployeeSalary />}/>
                        <Route path="/add-update-salary-details" element={< AddOrUpdateEmployeeSalary/>}/>
                        <Route path="/view-order-history" element={<OrderHistory />} />
                        <Route path="/view-all-order-details" element={<AllOrders />}/>
                        <Route path="/view-loan-details" element={<ViewLoanDetails />} />
                        <Route path="/create-loan" element={<AddLoanForm />} />
                        <Route path="/finance-overview" element={<FinanceOverview />} />

                    </Routes>
                </section>
                
            </div>

        </>
    )
}