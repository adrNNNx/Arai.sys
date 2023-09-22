import { Navigate, Route} from 'react-router';
import { PrivatesRoutes, PublicRoutes } from './routes';
import { lazy } from 'react';

//project import
import Loadable from 'ui-component/Loadable';
import { RoutesWithNotFound } from 'utils';
import { AuthGuard } from 'guards';



//Rutas
//const Dashboard = Loadable(lazy(() => import('views/dashboard/Default')));
//const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const Login = Loadable(lazy(() => import('views/pages/authentication/vista-formularios/Login')));
const RutasPriv = Loadable(lazy(() => import('./RutasPrivadas')));
const Register = Loadable(lazy(() => import('views/pages/authentication/vista-formularios/Register')));

function RutasPrincipales() {
  return (

    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivatesRoutes.PRIVATE} />} />
      <Route path={PublicRoutes.LOGIN} element={<Login />} />
      <Route path={PublicRoutes.REGISTER} element={<Register />} />
      <Route element={<AuthGuard />}>
        <Route path={`${PrivatesRoutes.PRIVATE}/*`} element={<RutasPriv />} />
      </Route>
    </RoutesWithNotFound>
  );
}

export default RutasPrincipales;
