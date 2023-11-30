import { Grid, Paper, Typography } from '@mui/material';
import DataGridVentas from './datagridVentas';
import { AraiProvider } from 'context/arai.context';
import InformacionVenta from './InformacionVenta';

function VentasComponente() {
  return (
    <AraiProvider>
      <Grid container direction="column" sx={{ p: 2, alignItems: 'flex-start', height:'100%' }} component={Paper}>
        <Grid item>
          <Typography sx={{ mt: 2, mb: 2 }} variant="h3" component="div">
            Registrar Venta
          </Typography>
        </Grid>
        <Grid container direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Grid item xs={6}>
            <DataGridVentas />
          </Grid>
          <Grid item xs={6}>
            <InformacionVenta />
          </Grid>
        </Grid>
      </Grid>
    </AraiProvider>
  );
}

export default VentasComponente;
