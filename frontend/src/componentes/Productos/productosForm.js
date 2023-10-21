//React
import { useState, useEffect } from 'react';

//Importaciones de MUI y formularios
import { Button, TextField, Paper, FormHelperText, Grid, MenuItem, Select, InputLabel, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

//Importaciones del proyecto junto con apis
import { apiUrlCreaProdu, apiUrlUpdateProdu, apiUrlDeleteProdu } from '../../services/Apirest';
import { useAraiContext } from 'context/arai.context';
import { sendDeleteRequest, sendPostRequest, sendPutRequest } from 'services/ApiCRUD';
import { getCategorias } from 'services';

//Valores Iniciales del Formulario
const initialValues = {
  nom_pro: '',
  preven_pro: '',
  prec_pro: '',
  existencia: '',
  categoria_id_cat: ''
};

const validationSchema = Yup.object({
  preven_pro: Yup.number().required('El precio de venta es requerido'),
  //existencia: Yup.number().required('La cantidad del producto es requerida'),
  nom_pro: Yup.string().required('El nombre del producto es requerido'),
  prec_pro: Yup.number().required('El precio de compra es requerido'),
  categoria_id_cat: Yup.number().required('La categoría para el producto es requerida')
});

function ProductosForm() {
  const [id_pro, setId_pro] = useState('');
  const [editar, setEditar] = useState(false);

  const [categoriasLista, setCategorias] = useState([]);

  const { setAraiContextValue, araiContextValue, setDataUpdateContext } = useAraiContext();
  const [initialFormValues, setInitialFormValues] = useState(initialValues);

  // El useEffect para cuando el contexto cambie entonces los valores se actualizan de los useState (Funciona como editarProducto)
  //(El contexto es intercomunicacion entre componentes en este caso la tabla le pasa los datos al FORM)
  useEffect(() => {
    if (araiContextValue.action === 'editar') {
      setId_pro(araiContextValue.id_pro);
      setInitialFormValues({
        nom_pro: araiContextValue.nom_pro,
        preven_pro: araiContextValue.preven_pro,
        prec_pro: araiContextValue.prec_pro,
        existencia: araiContextValue.existencia,
        categoria_id_cat: araiContextValue.categoria_id_cat
      });
      setEditar(true);
    } else if (araiContextValue.action === 'eliminar') {
      deleteProducto(araiContextValue);
    }
  }, [araiContextValue]);

  //Para cargar las categorias en mi field de Select
  useEffect(() => {
    getCategorias()
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const limpiarCampos = () => {
    setId_pro('');
    setEditar(false);
    setInitialFormValues(initialValues);
    setAraiContextValue('');
  };

  const addProdu = (values, resetForm) => {
    const data = {
      nom_pro: values.nom_pro,
      preven_pro: values.preven_pro,
      prec_pro: values.prec_pro,
      existencia: values.existencia,
      categoria_id_cat: values.categoria_id_cat
    };

    sendPostRequest(apiUrlCreaProdu, data, `<i>El producto <strong>${values.nom_pro}</strong> fue registrado con éxito</i>`, () => {
      limpiarCampos();
      setDataUpdateContext(true);
      resetForm();
    });
  };

  const updateProducto = (values, resetForm) => {
    const data = {
      id_pro: id_pro,
      nom_pro: values.nom_pro,
      preven_pro: values.preven_pro,
      prec_pro: values.prec_pro,
      existencia: values.existencia,
      categoria_id_cat: values.categoria_id_cat
    };

    sendPutRequest(apiUrlUpdateProdu, data, `<i>El Producto <strong>${values.nom_pro}</strong> fue actualizado con éxito</i>`, () => {
      limpiarCampos();
      setDataUpdateContext(true);
      resetForm();
    });
  };

  const deleteProducto = (val) => {
    Swal.fire({
      title: '¿Confirmar eliminación?',
      html: `<i>¿Realmente desea eliminar el producto <strong>${val.nom_pro}</strong>?</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id_pro: val.id_pro
        };

        sendDeleteRequest(apiUrlDeleteProdu, data, `<i>El producto <strong>${val.nom_pro}</strong> fue eliminado.</i>`, () => {
          limpiarCampos();
          setDataUpdateContext(true);
        });
      }
    });
  };

  //Cuerpo del Formulario
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
            updateProducto(values, resetForm);
          } else {
            addProdu(values, resetForm);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Paper style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography sx={{ mt: 2 }} variant="h3" id="formTitle" component="div">
                {editar ? 'Actualizar Producto' : 'Añadir Producto'}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field as={TextField} name="nom_pro" label="Nombre del Producto *" fullWidth margin="normal" />
                  <ErrorMessage name="nom_pro">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="preven_pro"
                    label="Precio de Venta *"
                    fullWidth
                    margin="normal"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">GS</InputAdornment>
                    }}
                  />
                  <ErrorMessage name="preven_pro">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="prec_pro"
                    label="Precio de Compra *"
                    fullWidth
                    margin="normal"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">GS</InputAdornment>
                    }}
                  />
                  <ErrorMessage name="prec_pro">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="existencia"
                    label="Existencia *"
                    fullWidth
                    margin="normal"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <ErrorMessage name="existencia">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="categoria_label">Categoría *</InputLabel>
                  <Field
                    as={Select}
                    name="categoria_id_cat"
                    labelId="categoria_label"
                    id="categoria_select"
                    label="Categoría"
                    sx={{
                      width: '100%'
                    }}
                  >
                    {categoriasLista.map((categoria) => (
                      <MenuItem key={categoria.id_cat} value={categoria.id_cat}>
                        {categoria.nom_cat}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="categoria_id_cat">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
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
}

export default ProductosForm;
