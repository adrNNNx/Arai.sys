import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

import { useEffect } from 'react';
import { apiUrlGetCat, getRequest } from 'services';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
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
    background: theme.palette.primary[800],
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
    background: theme.palette.primary[800],
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

const TotalCategoriaCard = ({ isLoading }) => {
  const [categoriasLista, setCategorias] = useState([]);
  useEffect(() => {
    getRequest(apiUrlGetCat)
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const totalCategorias = categoriasLista.length; //Contando la cantidad de categorias existentes

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
                          backgroundColor: theme.palette.primary[800],
                          color: '#FFFFFF',
                          mt: 1,
                          mr: 1
                        }}
                      >
                        <WidgetsOutlinedIcon />
                      </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1, mb: 0.75 }}>{totalCategorias}</Typography>
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
                          Total de categorias existentes
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

TotalCategoriaCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalCategoriaCard;
