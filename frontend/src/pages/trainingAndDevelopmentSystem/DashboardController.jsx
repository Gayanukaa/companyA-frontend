import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainSupervisor from './mainSupervisor/Dashboard';
import UnitSupervisor from './unitSupervisor/Dashboard';
import TrainingEmployee from './trainingEmployee/Dashboard';
import TrainingManager from './manager/Dashboard';
import NotFound from '../generalManagementSystem/NotFound';



function DashboardController() {

    return (
        <>
            <Routes>
                <Route path="/manager/*" element={<TrainingManager />} />
                <Route path="/main-supervisor/*" element={<MainSupervisor />} />
                <Route path="/unit-supervisor/*" element={<UnitSupervisor />} />
                <Route path="/training-employee/*" element={<TrainingEmployee />} />
                <Route path="/*" element={<NotFound />}  />
            </Routes>
        </>
    )
}



export default DashboardController;