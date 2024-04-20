import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequireAuth from "./config/RequireAuth.jsx";

import LoginHandle from './pages/generalManagementSystem/login/LoginHandle.jsx';

import CustomerOrder from './pages/customerOrderSystem/Dashboard.jsx';
import FinanticalManagement from './pages/financeSystem/Dashboard.jsx';
import GeneralManagement from './pages/generalManagementSystem/Dashboard.jsx';
import HumanResourceManagement from './pages/humanResourceSystem/Dashboard.jsx';
import InventoryManagement from './pages/inventoryManagementSystem/Dashboard.jsx';
import LogisticManagement from './pages/logisticsAndMaintenanceSystem/Dashboard.jsx';
import ManufacturingManagement from './pages/manufacturingSystem/Dashboard.jsx';
import QualityAssuranceManagement from './pages/qualityAssuaranceSystem/Dashboard.jsx';
import SalesManagement from './pages/salesSystem/Dashboard.jsx';
import TrainingDevelopmentManagement from './pages/trainingAndDevelopmentSystem/Dashboard.jsx';

import NotFound from './pages/generalManagementSystem/NotFound.jsx';
import LandingPage from './pages/generalManagementSystem/LandingPage.jsx';
import Unauthorized from './pages/generalManagementSystem/Unauthorized.jsx';



function App() {

  return (
    <>
      <React.Fragment>
        <Routes>
          <Route path="/login/*" element={<LoginHandle />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<RequireAuth allowedRole='quality_assurance_manager' />}>
            <Route path="/qualityassuarance-management/*" element={<QualityAssuranceManagement />} />
          </Route>

          <Route element={<RequireAuth allowedRole='inventory_manager' />}>
            <Route path="/inventory-management/*" element={<InventoryManagement />} />
          </Route>

          <Route element={<RequireAuth allowedRole='customer_order_manager' />}>
            <Route path="/customerorder-management/*" element={<CustomerOrder />} />
          </Route>

          <Route element={<RequireAuth allowedRole='financial_manager' />}>
            <Route path="/finantial-management/*" element={<FinanticalManagement />} />
          </Route>

          <Route element={<RequireAuth allowedRole='human_resource_manager' />}>
            <Route path="/humanResource-management/*" element={<HumanResourceManagement />} />
          </Route>

          <Route element={<RequireAuth allowedRole='logistic_manager' />}>
            <Route path="/logistic-management/*" element={<LogisticManagement />} />
          </Route>

          <Route element={<RequireAuth allowedRole='manufacturing_manager' />}>
            <Route path="/manufacturing-management/*" element={<ManufacturingManagement />} />
          </Route>

          <Route element={<RequireAuth allowedRole='sales_manager' />}>
            <Route path="/sales-management/*" element={<SalesManagement />} />
          </Route>

          <Route element={<RequireAuth allowedRole='training_development_manager' />}>
            <Route path="/trainingdevelopment-management/*" element={<TrainingDevelopmentManagement />} />
          </Route>

          <Route element={<RequireAuth allowedRole='general_manager' />}>
            <Route path="/general-management/*" element={<GeneralManagement />} />
          </Route>

        </Routes>
      </React.Fragment>
    </>
  )
}

export default App
