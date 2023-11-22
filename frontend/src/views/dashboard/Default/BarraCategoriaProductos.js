import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import DatosGraficos from './datos-grafico/datos-grafico-barra';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const BarrasCategoriaProductos = ({ isLoading }) => {
  const opcionesGrafico = DatosGraficos();

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Existencia total de productos:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">{opcionesGrafico.totalStock}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart options={opcionesGrafico.options} series={opcionesGrafico.series} type="bar" height={480} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

BarrasCategoriaProductos.propTypes = {
  isLoading: PropTypes.bool
};

export default BarrasCategoriaProductos;
