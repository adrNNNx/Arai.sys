import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo_pan from '../Imagenes_iconos/logo panaderia-color.png';
import logo_arai from '../Imagenes_iconos/AraySys.png'
import { red } from '@mui/material/colors';
import { AiOutlineArrowRight,AiOutlineUser } from "react-icons/ai";
import { RxLockClosed } from "react-icons/rx";
import InputAdornment from '@mui/material/InputAdornment';
import TextFieldPrueba from './Textfield';

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

const theme = createTheme({
  palette: {
    primary: {
      main: red[900],
    },
    secondary: {
      main: '#DE2828',
    },
  },
});

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      usuario: data.get('usuario'),
      contraseña: data.get('contraseña'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
              variant="h2"
              mt={10}
              mb={3}
              fontWeight={"bolder"}
              fontFamily={"inter"}
            >
              Iniciar sesión
            </Typography>
            <Typography component="h1" variant="h6" fontFamily={"inter"}>
              Bienvenido de vuelta!
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              color={"#9EA5AD"}
              fontFamily={"inter"}
              fontStyle={"normal"}
            >
              Ingrese sus credenciales para poder acceder al sistema
            </Typography>

            {/* Acá empieza el formulario  */}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiOutlineUser />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                required
                fullWidth
                id="id_usuario"
                label="Usuario"
                name="usuario"
                autoComplete="usuario"
                autoFocus
              />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RxLockClosed />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                required
                fullWidth
                name="contraseña"
                label="Contraseña"
                type="password"
                id="id_contraseña"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                endIcon={<AiOutlineArrowRight />}
              >
                Ingresar
              </Button>

                {/* Logo y Copyright */}

              <Grid container></Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
            <Avatar
              src={logo_arai}
              sx={{ width: 100, height: 100 }}
              variant="square"
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}