import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/vista-formularios/Login')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/vista-formularios/Register')));
//const SignInSide = Loadable(lazy(() => import('views/pages/authentication/authentication3/SignInSide')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin3 />
    },
    {
      path: 'register',
      element: <AuthRegister3 />
    },
  ]
};

export default AuthenticationRoutes;
