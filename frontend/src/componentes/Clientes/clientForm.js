//React
import { useState, useEffect } from 'react';

//Importaciones de MUI y formularios
import { Button, TextField, Paper, FormHelperText, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";

//Importaciones del proyecto junto con apis
import { sendDeleteRequest, sendPostRequest, sendPutRequest } from 'services/ApiPro';
import { apiUrlCreaProv, apiUrlDeleteProv, apiUrlUpdateProv } from '../../services/Apirest';
import { useAraiContext } from 'context/arai.context';

//Valores iniciales del formulario
const initialValues = { nom_per: '', tel_per: '', dire_per: '', correo_per: '', ruc: '' };

//Validaciones formulario
const validationSchema = Yup.object({
  nom_per: Yup.string().required('El nombre del proveedor es requerido'),
  ruc: Yup.string().required('El RUC para el proveedor es requerido'),
  tel_per: Yup.string().required('El teléfono para el proveedor es requerido'),
  correo_per: Yup.string().email("Ingrese un email válido"),
});

const ProveedorForm = () => {
  const [id_per, setId_per] = useState(); // ID de la persona
  const [editar, setEditar] = useState(false);
  const { setAraiContextValue, araiContextValue, setDataUpdateContext} = useAraiContext();
  const [initialFormValues, setInitialFormValues] = useState(initialValues);
  // El useEffect para cuando el contexto cambie entonces los valores se actualizan de los useState (Funciona como editarPersona)
  //(El contexto es intercomunicacion entre componentes en este caso la tabla le pasa los datos al FORM)
  useEffect(() => {
    if (araiContextValue.action === 'editar') {
      setId_per(araiContextValue.id_per);
      setInitialFormValues({
        nom_per: araiContextValue.nom_per,
        tel_per: araiContextValue.tel_per,
        dire_per: araiContextValue.dire_per,
        correo_per: araiContextValue.correo_per,
        ruc: araiContextValue.ruc
      });
      setEditar(true);
    } else if (araiContextValue.action === 'eliminar') {
      deleteProveedor(araiContextValue);
    }
  }, [araiContextValue]);

  //Funcion de Limpieza
  const limpiarCampos = () => {
    setId_per('');
    setEditar(false);
    setInitialFormValues(initialValues);
    setAraiContextValue('');
  };

  //Acá comienzan las funciones de CRUD para el formulario
  const addProveedor = (values, resetForm) => {
    const data = {
      nom_per: values.nom_per,
      tel_per: values.tel_per,
      dire_per: values.dire_per,
      correo_per: values.correo_per,
      ruc: values.ruc
    };

    sendPostRequest(apiUrlCreaProv, data, `<i>El proveedor <strong>${values.nom_per}</strong> fue registrado con éxito</i>`, () => {
      limpiarCampos();
      setDataUpdateContext(true);
      resetForm(); 
    });
  };

  const updateProveedor = (values, resetForm) => {
    const data = {
      id_per: id_per,
      nom_per: values.nom_per,
      tel_per: values.tel_per,
      dire_per: values.dire_per,
      correo_per: values.correo_per,
      ruc: values.ruc
    };
  
    sendPutRequest(
      apiUrlUpdateProv,
      data,
      `<i>El Proveedor <strong>${values.nom_per}</strong> fue actualizado con éxito</i>`,
      () => {
        limpiarCampos();
        setDataUpdateContext(true);
        resetForm();
      }
    );
  };

  const deleteProveedor = (val) => {
    Swal.fire({
      title: '¿Confirmar eliminación?',
      html: `<i>¿Realmente desea eliminar al proveedor <strong>${val.nom_per}</strong>?</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id_per: val.id_per
        };
  
        sendDeleteRequest(
          apiUrlDeleteProv,
          data,
          `<i>El proveedor <strong>${val.nom_per}</strong> fue eliminado.</i>`,
          () => {
            limpiarCampos();
            setDataUpdateContext(true);
          }
        );
      }
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Formik
        initialValues={initialFormValues} //Valores iniciales predefinidos
        enableReinitialize={true} // Permite reinicializar los valores
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (editar) {
            updateProveedor(values, resetForm);
          } else {
            addProveedor(values, resetForm);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Paper style={{ padding: '20px', marginBottom: '20px' }}>
              <h3>{editar ? 'Actualizar Proveedor' : 'Añadir Proveedor'}</h3>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field as={TextField} name="nom_per" label="Nombre del Proveedor *" fullWidth margin="normal" />
                  <ErrorMessage name="nom_per">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field as={TextField} name="ruc" label="RUC *" fullWidth margin="normal" />
                  <ErrorMessage name="ruc">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field as={TextField} name="tel_per" label="Teléfono *" fullWidth margin="normal" />
                  <ErrorMessage name="tel_per">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field as={TextField} name="correo_per" label="Correo" fullWidth margin="normal" />
                  <ErrorMessage name="correo_per">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Field as={TextField} name="dire_per" label="Dirección" fullWidth margin="normal" />
                </Grid>
              </Grid>

              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} style={{ marginTop: '20px' }}>
                {editar ? 'Actualizar' : 'Agregar'}
              </Button>
              {editar && (
                <Button variant="outlined" onClick={limpiarCampos} style={{ marginTop: '20px', marginLeft: '20px' }}>
                  Cancelar
                </Button>
              )}
            </Paper>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ProveedorForm;
