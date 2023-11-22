// RutasUrl.js
import { useSelector } from 'react-redux';
import { RolesUsuario } from './roles';
import { PrivatesRoutes } from '../rutas/routes';

export const DeterminarUsuarioRuta = () => {
  const userState = useSelector((state) => state.user);
    return userState.rol_usu === RolesUsuario.VENDEDOR ? PrivatesRoutes.VENDEDOR : PrivatesRoutes.PRIVATE;
};

export const DeterminarTipoUsuario = () => {
  const userState = useSelector((state) => state.user);
    return userState.rol_usu === RolesUsuario.VENDEDOR ? true : false;
};

export default DeterminarUsuarioRuta; 
