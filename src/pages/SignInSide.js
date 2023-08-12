import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import logo_pan from '../assets/images/logo panaderia-color.png';
import logo_arai from '../assets/images/AraySys.png'
import { LoginForm } from '../componentes/LoginForm';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Arai.sys
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export function SignInSide() {


  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url("${logo_pan}")`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            mt={10}
            mb={3}
            fontWeight={"bolder"}
            fontFamily={"roboto"}
          >
            Iniciar sesión
          </Typography>
          <Typography component="h1" variant="h6" fontFamily={"roboto"}>
            Bienvenido de vuelta!
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color={"#9EA5AD"}
            fontFamily={"roboto"}
            fontStyle={"normal"}
          >
            Ingrese sus credenciales para poder acceder al sistema.
          </Typography>

          {/* Acá empieza el formulario  */}
          <LoginForm />
          {/* Logo y Copyright */}
          <Grid container></Grid>
          <Copyright sx={{ mt: 5 }} />
          <Avatar
            src={logo_arai}
            sx={{ width: 100, height: 100 }}
            variant="square"
          />
        </Box>
      </Grid>
    </Grid>
  );
}