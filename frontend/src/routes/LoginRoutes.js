import { lazy } from 'react';

// project imports
import MinimalLayout from 'layout/MinimalLayout';
//import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: (
      <MinimalLayout />
  ),
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: '/login',
      element: <AuthLogin />
    }
  ]
};

export default LoginRoutes;
