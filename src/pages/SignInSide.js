import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import logo_pan from '../assets/img/logo panaderia-color.png';
import logo_arai from '../assets/img/AraySys.png'
import { AiOutlineArrowRight,AiOutlineUser } from "react-icons/ai";
import { RxLockClosed } from "react-icons/rx";
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import axios from 'axios';
import { apiUrl,apiUrlAuth,apiUrlSoloData } from '../services/Apirest';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

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

export function DatUsuarios(usrData) {
  console.log(usrData)
  return (usrData);
}

export function SignInSide() {

  const [usrdatos, setUsrDatos] = useState({});
  const navigate = useNavigate();
  const { handleSubmit, handleChange, values, errors, touched } =
  useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup
      .string("Ingrese su Nombre de Usuario")
      .required("Este campo es Obligatorio"),
      password: Yup
      .string("Ingrese su Contraseña")
      .required("Este campo es Obligatorio"),
    }),

    onSubmit: (data) => {
      axios({
        method: 'post',
        url: apiUrlAuth,
        data: {
          username: data.username,
          password: data.password
        }
      })
      .then((response) => {
        console.log(response)
        DatUsuarios(usrdatos);
        alert('Usuario Logeado');
        localStorage.setItem("token",true);
        navigate("/home");
      }, )  
      .catch( (error) => {
        console.log(error);
        alert('Usuario Inconrrecto');
      });
    },
  });

  

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
            variant="h2"
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

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineUser />
                  </InputAdornment>
                ),
              }}
              margin="normal"
              type="text"
              fullWidth
              label="Usuario"
              name="username"
              autoComplete="off"
              autoFocus
              placeholder="Ingrese su Usuario"
              onChange={handleChange}
              value={values.username}
              /* el tocuhed es para cuando apenas se carga la pagina y registre un cambio no salga error enseguida */
              error= {touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}


              /*  aca envio los datos que escribe el usuario a una funcion e, para controlar los datos escritos */
              /* onChange={(e) => setDatos({ ...datos, username: e.target.value })} */
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
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              placeholder="Ingrese su contraseña"
              onChange={handleChange}
              value={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              /*  aca envio los datos que escribe el usuario a una funcion e, para controlar los datos escritos */
    /*           onChange={(e) => setDatos({ ...datos, password: e.target.value })} */
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
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
  );
}