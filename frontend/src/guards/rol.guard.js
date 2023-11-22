import { useSelector } from 'react-redux';
import {  Outlet } from 'react-router';
import { PublicRoutes } from '../rutas/routes';
//import { PrivatesRoutes} from 'rutas';

const RolGuard = ({rol}) => {
  const userState = useSelector((state) => state.user);
  console.log('valor de redux user: ', userState.rol_usu, 'valor pasado de forma manual: ', rol);
  return userState.rol_usu === rol ? <Outlet/> : PublicRoutes.LOGIN;
};

export default RolGuard;
