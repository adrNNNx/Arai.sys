//MUI
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

//Rutas
import DeterminarUsuarioRuta from 'guards/RutasUrl';
import { PrivatesRoutes } from '../../rutas/routes';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const urlRol = DeterminarUsuarioRuta();

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ ml: 2 }}>
      <Link
        component={RouterLink}
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center', fontSize: '1.05em' }}
        color="inherit"
        to={urlRol + PrivatesRoutes.DASHBOARD}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography color="textPrimary" key={routeTo} sx={{ fontSize: '1.05em' }}>
            {name}
          </Typography>
        ) : (
          <Link underline="none" color="inherit" key={routeTo} sx={{ fontSize: '1.05em' }}>
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
