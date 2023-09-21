import React from 'react';
import { lazy } from 'react';

//importaciones de proyecto
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// Rutas y elementos
import { PrivatesRoutes } from './routes';
import { RoutesWithNotFound } from 'utils';
import { Navigate, Route } from 'react-router';


const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

function RutasPrivadas() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivatesRoutes.PRIVATE} />} />
      <Route path={PrivatesRoutes.DASHBOARD} element={<MainLayout/>} />
      <Route path={PrivatesRoutes.DASHBOARD} element={<DashboardDefault/>} />
    </RoutesWithNotFound>
  );
}

export default RutasPrivadas;
