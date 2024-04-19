import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginHandle from './pages/generalManagementSystem/login/LoginHandle.jsx';
import GeneralManagement from './pages/generalManagementSystem/Dashboard.jsx';
import InventoryManagement from './pages/inventoryManagementSystem/Dashboard.jsx';
import NotFound from './pages/generalManagementSystem/NotFound.jsx';
import LandingPage from './pages/generalManagementSystem/LandingPage.jsx';


function App() {

  return (
    <>
      <React.Fragment>
          <Routes>
            <Route path="/login/*" element={<LoginHandle />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<NotFound /> } />

            <Route path="/qualityassuarance-management/*" element={<GeneralManagement />} />
            <Route path="/inventory-management/*" element={<InventoryManagement />} />
            <Route path="/customerorder-management/*" element={<InventoryManagement />} />
            <Route path="/finantial-management/*" element={<InventoryManagement />} />
            <Route path="/humanResource-management/*" element={<InventoryManagement />} />
            <Route path="/logistic-management/*" element={<InventoryManagement />} />
            <Route path="/manufacturing-management/*" element={<InventoryManagement />} />
            <Route path="/sales-management/*" element={<InventoryManagement />} />
            <Route path="/trainingdevelopment-management/*" element={<InventoryManagement />} />
            <Route path="/general-management/*" element={<GeneralManagement />} />
          </Routes>
      </React.Fragment>
    </>
  )
}

export default App
