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
const ClientesVista = Loadable(lazy(() => import('views/clientes/client_vista')));
const CotizacionesVista = Loadable(lazy(() => import('views/cotizaciones/cotiz_vista')));
const VentasVista = Loadable(lazy(() => import('views/ventas/venta_vista')));

function RutasVendedor() {
  console.log('Ejecutando RutasVendedor...');
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivatesRoutes.DASHBOARD} />} />
      <Route path="/" element={<MainLayout />}>
        <Route path={PrivatesRoutes.DASHBOARD} element={<DashboardDefault />} />
        <Route path={PrivatesRoutes.CLIENT} element={<ClientesVista />} />
        <Route path={PrivatesRoutes.COTIZ} element={<CotizacionesVista />} />
        <Route path={PrivatesRoutes.VENT} element={<VentasVista />} />
      </Route>
    </RoutesWithNotFound>
  );
}

export default RutasVendedor;
