import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
//import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

import { useEffect } from 'react';
import { apiUrlGetProdu, getRequest } from 'services';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalProductosCard = ({ isLoading }) => {
  const [productosLista, setProductos] = useState([]);
  useEffect(() => {
    getRequest(apiUrlGetProdu)
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const totalProductos = productosLista.length; //Contando la cantidad de categorias existentes

  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container direction="row" justifyContent="flex-start">
                  <Grid item>
                      <Avatar
                        variant="rounded"
                        sx={{
                          ...theme.typography.commonAvatar,
                          ...theme.typography.largeAvatar,
                          backgroundColor: theme.palette.secondary[800],
                          color: '#FFFFFF',
                          mt: 1,
                          mr: 1
                        }}
                      >
                        <Inventory2OutlinedIcon />
                      </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1, mb: 0.75 }}>{totalProductos}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={8}>
                    <Grid container alignItems="center">
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1.25rem',
                            fontWeight: 500,
                            color: '#fff',
                            mr: 1
                          }}
                        >
                          Tipos de Productos Registrados
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalProductosCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalProductosCard;
