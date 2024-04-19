import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRole }) => {
  
  let auth = {
    'role': localStorage.getItem('role'),
  };

  return (
    (auth.role && auth.role === allowedRole) 
    ? <Outlet /> 
    : (auth.role && auth.role !== allowedRole)
    ? <Navigate to='/unauthorized' />
    : <Navigate to='/' />
  );
};

export default RequireAuth;