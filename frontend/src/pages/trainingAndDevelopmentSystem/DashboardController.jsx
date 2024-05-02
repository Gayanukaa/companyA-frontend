import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainSupervisor from './mainSupervisor/Dashboard';
import UnitSupervisor from './unitSupervisor/Dashboard';
import TrainingEmployee from './trainingEmployee/Dashboard';
import TrainingManager from './manager/Dashboard';
import NotFound from '../generalManagementSystem/NotFound';
import RequireAuth from '../../config/RequireAuth';



function DashboardController() {

    return (
        <>
            <Routes>
                <Route element={<RequireAuth allowedRole='training_development_manager' />}>
                    <Route path="/manager/*" element={<TrainingManager />} />
                </Route>

                <Route element={<RequireAuth allowedRole='main_supervisor' />}>
                    <Route path="/main-supervisor/*" element={<MainSupervisor />} />
                </Route>

                <Route element={<RequireAuth allowedRole='unit_supervisor' />}>
                    <Route path="/unit-supervisor/*" element={<UnitSupervisor />} />
                </Route>

                <Route element={<RequireAuth allowedRole='training_employee' />}>
                    <Route path="/training-employee/*" element={<TrainingEmployee />} />
                </Route>

                <Route path="/*" element={<NotFound />} />
            </Routes>
        </>
    )
}



export default DashboardController;