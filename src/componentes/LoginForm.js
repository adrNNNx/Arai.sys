import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { AiOutlineArrowRight,AiOutlineUser } from "react-icons/ai";
import { RxLockClosed } from "react-icons/rx";
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import axios from 'axios';
import { apiUrl,apiUrlAuth,apiUrlSoloData } from '../services/Apirest';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useSnackbar } from "notistack";

export const LoginForm = () => {
  const [usrdatos, setUsrDatos] = useState([]);
  const [estadoerror, setEstadoError] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string("Ingrese su Nombre de Usuario").required(
        "Este campo es Obligatorio"
      ),
      password: Yup.string("Ingrese su Contraseña").required(
        "Este campo es Obligatorio"
      ),
    }),
    onSubmit: (data) => {
        axios({
          method: "post",
          url: apiUrlAuth,
          data: {
            username: data.username,
            password: data.password,
          },
        })
          .then((response) => {
            console.log(response);
            alert("Usuario Logeado");
            localStorage.setItem("token", true);
            navigate("/home");
          })
          .catch((error) => {
            console.log(error);
            setEstadoError(true)
          });
    },
  });

  return (
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
        error={touched.username && Boolean(errors.username)}
        helperText={touched.username && errors.username}
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
      {estadoerror && (
        <Alert variant="outlined" severity="error"  >
          Usuario/Contraseña Incorrecto - Inténtelo de nuevo
        </Alert>
      )}
    </Box>
  );
}
