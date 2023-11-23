import { useEffect, useState } from 'react';
import { apiDolarPy, getRequest } from 'services';

// material-ui
import { Avatar, FormControl, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import DolarpyCard from 'componentes/Interfaz/Cards/DolarCard';
import Loader from 'ui-component/Loader';
import BanderParaguay from 'assets/images/icons/BanderaParaguayFull.svg';

const DolarPy = () => {
  const casasDeCambioMap = {
    bcp: 'Banco Central del Paraguay',
    bonanza: 'Bonanza',
    cambiosalberdi: 'Cambios Alberdi',
    cambioschaco: 'Cambios Chaco',
    eurocambios: 'Euro Cambios',
    gnbfusion: 'GNB Fusion',
    lamoneda: 'La Moneda',
    maxicambios: 'Maxi Cambios',
    mundialcambios: 'Mundial Cambios',
    mydcambios: 'MyD Cambios',
    vision: 'Visión'
  };
  const [casasDeCambioConst] = useState(Object.keys(casasDeCambioMap));
  const [dolarpyData, setDolarpy] = useState(null);
  const [horaUpdate, setHoraUpdate] = useState({});
  const [montoDolares, setMontoDolares] = useState(0);
  const [casasCambio, setCasaCambio] = useState('cambioschaco');
  const [isLoading, setIsLoading] = useState(true);

  // Cargamos los datos del dolar
  useEffect(() => {
    getRequest(apiDolarPy)
      .then((response) => {
        setDolarpy(response.data.dolarpy);
        setHoraUpdate(response.data.updated);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, []);

  function convertirDolaresAGuaranies(montoDolares, casaCambio) {
    if (isLoading) {
      return 'Cargando datos...';
    }

    const casa = dolarpyData[casaCambio];
    const montoVenta = montoDolares * casa.venta;
    return montoVenta.toLocaleString() + ' Gs';
  }

  const handleChangeCasaCambio = (event) => {
    setCasaCambio(event.target.value);
  };

  return dolarpyData ? (
    <Grid container spacing={gridSpacing} direction="row">
      <Grid item component={Paper} xs={12} sx={{ mt: 3, ml: 3 }}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Typography variant="h3">Calculadora de Conversión</Typography>
          </Grid>
          <Grid container direction="column" sx={{ p: 3, width: '50%' }}>
            <Grid item sx={{ width: '100%', maxWidth: '100%', mb: 2 }}>
              <FormControl fullWidth>
                <Typography>Casa de Cambio:</Typography>
                <Select labelId="casaCambio-label" id="casaCambio" value={casasCambio} onChange={handleChangeCasaCambio} sx={{ mb: 3 }}>
                  {casasDeCambioConst.map((casa) => (
                    <MenuItem key={casa} value={casa}>
                      {casasDeCambioMap[casa]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <Typography>Monto en Dolares:</Typography>
                <TextField type="number" id="montoDolares" value={montoDolares} onChange={(e) => setMontoDolares(e.target.value)} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container direction="row" xs={12} md={6} sx={{p:3}}>
            <Grid container direction="column" >
              <Typography variant="h4">Moneda:</Typography>
              <Avatar
                variant="rounded"
                sx={{
                  mt: 1,
                  width: 90,
                  height: 50
                }}
                src={BanderParaguay}
              />
            </Grid>
            <Grid container direction="column" >
              <Typography variant="h4">Monto:</Typography>
              <Typography variant="h2">{convertirDolaresAGuaranies(montoDolares, casasCambio)}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ p: 2 }}>
            <Typography sx={{ mt: 1 }}>
              {montoDolares}$ en {casasDeCambioMap[casasCambio]} es igual a {convertirDolaresAGuaranies(montoDolares, casasCambio)}
            </Typography>
            <Typography>Última Actualización: {horaUpdate.toString()}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={6} sm={6} xs={12}>
        <DolarpyCard nombreCasa="Cambios Chaco" compra={dolarpyData.cambioschaco.compra} venta={dolarpyData.cambioschaco.venta} />
      </Grid>

      <Grid item lg={4} md={6} sm={6} xs={12}>
        <DolarpyCard nombreCasa="Banco Central del Paraguay" compra={dolarpyData.bcp.compra} venta={dolarpyData.bcp.venta} />
      </Grid>
      <Grid item lg={4} md={6} sm={6} xs={12}>
        <DolarpyCard nombreCasa="Bonanza" compra={dolarpyData.bonanza.compra} venta={dolarpyData.bonanza.venta} />
      </Grid>
      <Grid item lg={4} md={6} sm={6} xs={12}>
        <DolarpyCard nombreCasa="MyD Cambios" compra={dolarpyData.mydcambios.compra} venta={dolarpyData.mydcambios.venta} />
      </Grid>
      <Grid item lg={4} md={6} sm={6} xs={12}>
        <DolarpyCard nombreCasa="La moneda" compra={dolarpyData.lamoneda.compra} venta={dolarpyData.lamoneda.venta} />
      </Grid>
      <Grid item lg={4} md={6} sm={6} xs={12}>
        <DolarpyCard nombreCasa="Maxicambios" compra={dolarpyData.maxicambios.compra} venta={dolarpyData.maxicambios.venta} />
      </Grid>
    </Grid>
  ) : (
    <Loader />
  );
};

export default DolarPy;
