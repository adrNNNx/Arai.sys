import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { AiOutlineArrowRight, AiOutlineUser } from 'react-icons/ai';
import { RxLockClosed } from 'react-icons/rx';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrlAuth } from '../services/Apirest';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from 'store/customizacionUser';
import DeterminarUsuarioRuta from 'guards/RutasUrl';
import { PrivatesRoutes } from 'rutas';


export const LoginForm = () => {
  const [estadoerror, setEstadoError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlRol = DeterminarUsuarioRuta();
  const userState = useSelector((state) => state.user);

//Navegacion una vez se actualice el usuario en redux
  useEffect(() => {
    if (userState.nom_usu) {
      navigate(urlRol + PrivatesRoutes.DASHBOARD);
    }
  }, [userState]);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      nom_usu: '',
      contr_usu: ''
    },

    validationSchema: Yup.object({
      nom_usu: Yup.string('Ingrese su Nombre de Usuario').required('Este campo es Obligatorio'),
      contr_usu: Yup.string('Ingrese su Contraseña').required('Este campo es Obligatorio')
    }),
    onSubmit: (data) => {
      axios({
        method: 'post',
        url: apiUrlAuth,
        data: {
          nom_usu: data.nom_usu,
          contr_usu: data.contr_usu
        },
        withCredentials: true,
        credentials: 'include',
      })
        .then((response) => {
          if (response.data.status === 'ok') {
            dispatch(createUser(response.data.user))
            console.log(response);
          }

        })
        .catch((error) => {
          console.log(error);
          setEstadoError(true);
        });
    }
  });

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AiOutlineUser />
            </InputAdornment>
          )
        }}
        margin="normal"
        type="text"
        fullWidth
        label="Usuario"
        name="nom_usu"
        autoComplete="off"
        autoFocus
        placeholder="Ingrese su Usuario"
        onChange={handleChange}
        value={values.nom_usu}
        /* el tocuhed es para cuando apenas se carga la pagina y registre un cambio no salga error enseguida */
        error={touched.nom_usu && Boolean(errors.nom_usu)}
        helperText={touched.nom_usu && errors.nom_usu}
      />
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RxLockClosed />
            </InputAdornment>
          )
        }}
        margin="normal"
        fullWidth
        name="contr_usu"
        label="Contraseña"
        type="password"
        placeholder="Ingrese su contraseña"
        onChange={handleChange}
        value={values.contr_usu}
        error={touched.contr_usu && Boolean(errors.contr_usu)}
        helperText={touched.contr_usu && errors.contr_usu}
      />
      <AnimateButton>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2
          }}
          endIcon={<AiOutlineArrowRight />}
        >
          Ingresar
        </Button>
      </AnimateButton>
      {estadoerror && (
        <Alert variant="outlined" severity="error">
          Error - Usuario o contraseña inválidos
        </Alert>
      )}
    </Box>
  );
};
