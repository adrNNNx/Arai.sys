import { useState, useEffect } from 'react';
import Axios from 'axios';
import { apiUrlCreaCat, apiUrlUpdateCat, apiUrlDeleteCat } from '../../services/Apirest';
import Swal from 'sweetalert2';
import { Button, TextField, Paper, FormHelperText, Typography } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAraiContext } from 'context/arai.context';
import 'animate.css';
import { sendPostRequest } from 'services';
//Valores iniciales del formulario
const initialValues = { nom_cat: '', desc_cat: '' };

//Validaciones al formulario
const validationSchema = Yup.object({
  nom_cat: Yup.string().required('El nombre de la categoría es requerido'),
  desc_cat: Yup.string().required('La descripción de la categoría es requerida')
});

function CategoriasForm() {
  const [id_cat, setId_cat] = useState(); // ID de la categoría
  const [editar, setEditar] = useState(false);
  const { setAraiContextValue, araiContextValue, setDataUpdateContext, dataupdatecontext } = useAraiContext();
  const [initialFormValues, setInitialFormValues] = useState(initialValues);

  // El useEffect para cuando el contexto cambie entonces los valores se actualizan de los useState (Funciona como editarCategoria)
  //(El contexto es intercomunicacion entre componentes en este caso la tabla le pasa los datos al FORM)
  useEffect(() => {
    if (araiContextValue.action === 'editar') {
      setId_cat(araiContextValue.id_cat);
      setInitialFormValues({ nom_cat: araiContextValue.nom_cat, desc_cat: araiContextValue.desc_cat });
      setEditar(true);
      console.log('valores del contexto desde cateogirasForm: ', araiContextValue.nom_cat, 'valor del usetate de editar: ', editar);
    } else if (araiContextValue.action === 'eliminar') {
      deleteCategoria(araiContextValue);
    }
  }, [araiContextValue]);

  //Funciones de Utilidad para el form
  const limpiarCampos = () => {
    setId_cat('');
    setEditar(false);
    setInitialFormValues(initialValues);
    setAraiContextValue('');
  };

  //Acá comienzan las funciones de CRUD para el formulario
  const addCategoria = (values, resetForm) => {
    const data = {
      nom_cat: values.nom_cat,
      desc_cat: values.desc_cat,
    };

    sendPostRequest(apiUrlCreaCat, data, `<i>La categoría <strong>${values.nom_cat}</strong> fue registrada con éxito</i>`, () => {
      limpiarCampos();
      setDataUpdateContext(true);
      resetForm();
    });
  };

  const updateCategoria = (values, resetForm) => {
    Axios.put(apiUrlUpdateCat, {
      id_cat: id_cat,
      nom_cat: values.nom_cat,
      desc_cat: values.desc_cat
    })
      .then(() => {
        limpiarCampos();
        setDataUpdateContext(true);
        resetForm();
        console.log('Desde update: ', dataupdatecontext);
        Swal.fire({
          position: 'bottom',
          toast: true,
          title: '<strong>Actualización exitosa</strong>',
          html: `<i>La categoría <strong>${values.nom_cat}</strong> fue actualizada con éxito</i>`,
          icon: 'success',
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeInLeft animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
          },
          timer: 2500
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:
            JSON.parse(JSON.stringify(error)).message === 'Network Error' ? 'Intente más tarde' : JSON.parse(JSON.stringify(error)).message
        });
      });
  };

  const deleteCategoria = (val) => {
    Swal.fire({
      title: '¿Confirmar eliminación?',
      html: `<i>¿Realmente desea eliminar la categoría <strong>${val.nom_cat}</strong>?</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(apiUrlDeleteCat, { id_cat: val.id_cat })
          .then(() => {
            limpiarCampos();
            setDataUpdateContext(true);
            console.log('Desde delete: ', dataupdatecontext);
            Swal.fire({
              position: 'bottom',
              toast: true,
              icon: 'success',
              title: `<i>La categoria <strong>${val.nom_cat}</strong> fue eliminada.</i>`,
              showConfirmButton: false,
              showClass: {
                popup: 'animate__animated animate__fadeInLeft animate__faster'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp animate__faster'
              },
              timer: 2500
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se logró eliminar la categoría.',
              footer:
                JSON.parse(JSON.stringify(error)).message === 'Network Error'
                  ? 'Intente más tarde'
                  : JSON.parse(JSON.stringify(error)).message
            });
          });
      }
    });
  };

  //Cuerpo del Formulario
  return (
    <div>
      <Formik
        initialValues={initialFormValues} //Valores iniciales predefinidos
        enableReinitialize={true} // Permite reinicializar los valores
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (editar) {
            updateCategoria(values, resetForm);
          } else {
            addCategoria(values, resetForm);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Paper style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography sx={{ mt: 2 }} variant="h3" id="formTitle" component="div">
                {editar ? 'Actualizar Categoría' : 'Añadir Categoría'}
              </Typography>
              <Field as={TextField} name="nom_cat" label="Nombre de Categoría *" fullWidth margin="normal" />
              <ErrorMessage name="nom_cat">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
              <Field as={TextField} name="desc_cat" label="Descripción de Categoría *" fullWidth margin="normal" />
              <ErrorMessage name="desc_cat">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
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
    </div>
  );
}

export default CategoriasForm;
