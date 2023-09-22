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

const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
//const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
//const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

function RutasPrivadas() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivatesRoutes.DASHBOARD} />} />
      <Route path={PrivatesRoutes.DEFAULT} element={<MainLayout />}>
        <Route path={PrivatesRoutes.DASHBOARD} element={<DashboardDefault />} />
        <Route path="/utils">
          <Route path="util-typography" element={<UtilsTypography />} />
          <Route path="util-color" element={<UtilsColor />} />
          <Route path="util-shadow" element={<UtilsShadow />} />
        </Route>
        <Route path='sample-page' element= {<SamplePage />} />
      </Route>
    </RoutesWithNotFound>
  );
}

export default RutasPrivadas;
