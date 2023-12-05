// material-ui
import { Button, Card, CardContent, Grid } from '@mui/material';

// project imports

import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { useNavigate } from 'react-router';
import { PrivatesRoutes } from 'rutas';
import DeterminarUsuarioRuta from 'guards/RutasUrl';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const CotizacionChaco = () => {
  const navigate = useNavigate();
  const urlRol = DeterminarUsuarioRuta();
  const handleButtonClick = () => {
   navigate(urlRol + PrivatesRoutes.COTIZ); // Establece el estado en true al hacer clic en el botón
  };
  return (
    <Card >
      <CardContent >
        <Grid container spacing={gridSpacing} >
          <Grid container alignItems="center" direction="rows" sx={{mb:2}}>
            <Grid item xs={12} >
              <iframe
                width="100%"
                height="100%"
                src="http://www.cambioschaco.com.py/widgets/cotizacion/?lang=es"
                frameBorder="0"
                title="Cotización Cambios Chaco"
              ></iframe>
            </Grid>
            <Grid item sx={{ p: 1.25, pt: 2, justifyContent: 'center' }}>
              <Button size="small" disableElevation onClick={handleButtonClick} >
                Calculadora de Cotización
                <ChevronRightOutlinedIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CotizacionChaco;
