import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GraficoLineaVentas from './datos-grafico/datos-graficos-linea';

const LineasVentasGrafico = () => {
    return (
        <>
            <MainCard>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <GraficoLineaVentas/>
                </Grid>
              </Grid>
            </MainCard>
        </>
      );
}

export default LineasVentasGrafico