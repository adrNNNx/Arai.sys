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
const CategoriaVista = Loadable(lazy(() => import('views/productos/categorias')));
const ProduVista = Loadable(lazy(() => import('views/productos/produ_vista')));
const ProveedoresVista = Loadable(lazy(() => import('views/proveedores/prov_vista')));
const ClientesVista = Loadable(lazy(() => import('views/clientes/client_vista')));
const CotizacionesVista = Loadable(lazy(() => import('views/cotizaciones/cotiz_vista')));
const VentasVista = Loadable(lazy(() => import('views/ventas/venta_vista')));

const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));


function RutasPrivadas() {
  console.log('Ejecutando RutasPrivadas...');
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivatesRoutes.DASHBOARD} />} />
      <Route path="/" element={<MainLayout />}>
        <Route path={PrivatesRoutes.DASHBOARD} element={<DashboardDefault />} />
        <Route path={PrivatesRoutes.CATEG} element={<CategoriaVista />} />
        <Route path={PrivatesRoutes.PROVEEDORES} element={<ProveedoresVista />} />
        <Route path={PrivatesRoutes.PROD_ALM} element={<ProduVista />} />
        <Route path={PrivatesRoutes.CLIENT} element={<ClientesVista />} />
        <Route path={PrivatesRoutes.COTIZ} element={<CotizacionesVista />} />
        <Route path={PrivatesRoutes.VENT} element={<VentasVista />} />

        <Route path="/utils/util-typography" element={<UtilsTypography />} />
        <Route path="/utils/util-color" element={<UtilsColor />} />
        <Route path="/utils/util-shadow" element={<UtilsShadow />} />
        <Route path="icons/tabler-icons" element={<UtilsTablerIcons />} />
        <Route path="/sample-page" element={<SamplePage />} />
        
      </Route>
    </RoutesWithNotFound>
  );
}

export default RutasPrivadas;
