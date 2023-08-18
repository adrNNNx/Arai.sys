import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  //Checkbox,
  //Divider,
  FormControl,
  //FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  //TextField,
  Typography
  //useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
//import useScriptRef from 'hooks/useScriptRef';
//import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { apiUrlReg } from 'services/Apirest';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Cosas sacadas del OnSubmit { setErrors, setStatus, setSubmitting }
// ===========================|| FIREBASE - REGISTER ||=========================== //

const RegistroUsuario = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  //const scriptedRef = useScriptRef();
  //const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  // const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [estadoerror, setEstadoError] = useState(false);

  // const googleHandler = async () => {
  //   console.error('Register');
  // };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          nom_usu: '',
          contr_usu: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          nom_usu: Yup.string().max(255).required('El Nombre del Usuario es Obligatorio'),
          contr_usu: Yup.string().max(255).required('La contraseña es obligatoria')
        })}
        //Envio de datos al backend
        onSubmit={async (values) => {
          axios({
            method: 'post',
            url: apiUrlReg,
            data: {
              nom_usu: values.nom_usu,
              contr_usu: values.contr_usu
            },
            maxRedirects: 0, //Evitar redirecciones automaticas
            validateStatus: function (status) {
              return status >= 200 && status < 300; // Acá se considera exitoso si este entre el rango de 200 y 299
            }
          })
            .then((response) => {
              if (response.data.status === 'ok') {
                navigate(response.data.redirect);
              }
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response.data.message);
                setEstadoError(true);
              }
            });

          /*            try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }  */
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.nom_usu && errors.nom_usu)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-nom_usu-register">Nombre de Usuario</InputLabel>
              <OutlinedInput
                id="outlined-adornment-nom_usu-register"
                type="text"
                value={values.nom_usu}
                name="nom_usu"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.nom_usu && errors.nom_usu && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.nom_usu}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.contr_usu && errors.contr_usu)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.contr_usu}
                name="contr_usu"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.contr_usu && errors.contr_usu && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.contr_usu}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between"></Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2, mb: 2,  }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Registrar
                </Button>
              </AnimateButton>
              {estadoerror && (
                <Box sx={{mt:2}}>
                  <Alert variant="outlined" severity="error">
                    Este usuario ya existe - Inténtelo de nuevo
                  </Alert>
                </Box>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegistroUsuario;
