import React from 'react'
import { Navigate, Outlet } from 'react-router'
import config from '../../config.js';

export const ProtectedRoutes = ({
    canActivate,
    redirectPath= config.redirectPath
}) => {
  if(!canActivate){
    return <Navigate to = {redirectPath} replace />
  }  
  return <Outlet/>;
}
