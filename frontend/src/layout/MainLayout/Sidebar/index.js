import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Chip, Divider, Drawer, Stack, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import { drawerWidth } from 'store/constant';
import { IconLogout } from '@tabler/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ClearLocalStorage } from 'utils/localStorageUtilities';
import { UserKey } from '../../../store/customizacionUser';
import { resetUser } from 'redux/state/user';
import { PublicRoutes } from 'rutas';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Funcion para cerrar sesión borrando los cookies y el localstorage del navegador
  const handleLogout = async () => {
    document.cookie = 'jwt=; Path=/; Expires= Thu, 01 Jan 1970 00:00:01 GMT;';
    ClearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(PublicRoutes.LOGIN);
  };

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px'
          }}
        >
          <MenuList />
          <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
            <Button
              fullWidth
              onClick={handleLogout}
              sx={{
                pl: 4,
                mt: 1,
                mb: 1,
                justifyContent: 'flex-start',
                fontWeight: '300',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.light
                }
              }}
              color="inherit"
              startIcon={
                <Box sx={{ pr: '6px', display: 'flex', alignItems: 'center' }}>
                  <IconLogout stroke={1.5} size="1.3rem" />
                </Box>
              }
            >
              Cerrar Sesión
            </Button>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
            <Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px'
            }
          }
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;
