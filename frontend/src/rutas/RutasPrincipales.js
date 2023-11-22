import { Navigate, Route } from 'react-router';
import { PrivatesRoutes, PublicRoutes } from './routes';
import { lazy } from 'react';

//project import
import Loadable from 'ui-component/Loadable';
import { RoutesWithNotFound } from 'utils';
import { AuthGuard, RolesUsuario } from 'guards';
//import RolGuard from 'guards/rol.guard';
import { useSelector } from 'react-redux';

//Rutas
const Login = Loadable(lazy(() => import('views/pages/authentication/vista-formularios/Login')));
const RutasPriv = Loadable(lazy(() => import('./RutasPrivadas')));
const RutasVendedor = Loadable(lazy(() => import('./RutasVendedor')));
const Register = Loadable(lazy(() => import('views/pages/authentication/vista-formularios/Register')));
/* const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const ClientesVista = Loadable(lazy(() => import('views/clientes/client_vista')));
const CotizacionesVista = Loadable(lazy(() => import('views/cotizaciones/cotiz_vista')));
const VentasVista = Loadable(lazy(() => import('views/ventas/venta_vista'))); */

function RutasPrincipales() {
  console.log('Renderizando componente principal...');
  const userState = useSelector((state) => state.user);
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivatesRoutes.PRIVATE} />} />
      <Route path={PublicRoutes.LOGIN} element={<Login />} />
      <Route path={PublicRoutes.REGISTER} element={<Register />} />
      <Route element={<AuthGuard />}>
        <Route path={`${PrivatesRoutes.PRIVATE}/*`} element={userState.rol_usu === RolesUsuario.ADMIN ? <RutasPriv /> : <Login />} />
      </Route>
      <Route path={`${PrivatesRoutes.VENDEDOR}/*`} element={userState.rol_usu === RolesUsuario.VENDEDOR ? <RutasVendedor /> : <Login />} />
      {/*       <Route element={<RolGuard rol={RolesUsuario.VENDEDOR} />}>
        {console.log('Ejecutando RutasVendedor...')}
      </Route> */}
    </RoutesWithNotFound>
  );
}

export default RutasPrincipales;
