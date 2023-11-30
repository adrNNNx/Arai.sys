import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
//import config from 'config';
import { PrivatesRoutes } from '../../../rutas/routes';
import Logo from 'ui-component/Logo';
//import { MENU_OPEN } from 'store/actions';
import { menuOpen } from 'store/customizacionReducer';
import DeterminarUsuarioRuta from 'guards/RutasUrl';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  const urlRol = DeterminarUsuarioRuta();
  return (
    <ButtonBase disableRipple onClick={() => dispatch(menuOpen(defaultId)) /* dispatch({ type: MENU_OPEN, id: defaultId }) */  } component={Link} to={urlRol + PrivatesRoutes.DASHBOARD}>
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
