import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/generalManagementSystem/login/Login.jsx';
import GeneralManagement from './pages/generalManagementSystem/Dashboard.jsx';
import InventoryManagement from './pages/inventoryManagementSystem/Dashboard.jsx';


function App() {

  return (
    <>
      <React.Fragment>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/general-management/*" element={<GeneralManagement />} />
            <Route path="/inventory-management/*" element={<InventoryManagement />} />
          </Routes>
      </React.Fragment>
    </>
  )
}

export default App
