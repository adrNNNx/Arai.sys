import { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
//import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
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
  Typography,
  //useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
//import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const RegistroUsuario = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  //const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  // const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

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
          usuario: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          usuario: Yup.string().max(255).required('El Nombre del Usuario es Obligatorio'),
          password: Yup.string().max(255).required('La contraseña es obligatoria')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
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
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.usuario && errors.usuario)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-usuario-register">Nombre de Usuario</InputLabel>
              <OutlinedInput
                id="outlined-adornment-usuario-register"
                type="text"
                value={values.usuario}
                name="usuario"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.usuario && errors.usuario && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.usuario}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
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
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
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

            <Grid container alignItems="center" justifyContent="space-between">
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Registrar
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegistroUsuario;
