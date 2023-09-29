// material-ui
//import { Typography } from '@mui/material';

// project imports
//import MainCard from 'ui-component/cards/MainCard';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { apiUrlGetCat, apiUrlCreaCat, apiUrlUpdateCat } from '../../services/Apirest';
import Swal from 'sweetalert2';
import {
  Button,
  TextField,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  FormHelperText
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//Validaciones al formulario

const validationSchema = Yup.object({
  nom_cat: Yup.string().required('El nombre de la categoría es requerido'),
  desc_cat: Yup.string().required('La descripción de la categoría es requerida')
});

function CategoriasView() {
  const [id_cat, setId_cat] = useState(); // ID de la categoría
  const [editar, setEditar] = useState(false);
  const [categoriasList, setCategorias] = useState([]);

  const limpiarCampos = () => {
    setId_cat('');
    setEditar(false);
  };

  const editarCategoria = (val) => {
    setEditar(true);
    setId_cat(val.id_cat);
  };

  const getCategorias = () => {
    Axios.get(apiUrlGetCat).then((response) => {
      setCategorias(response.data);
    });
  };

  useEffect(() => {
    getCategorias();
  }, []);

  const addCategoria = (values) => {
    Axios.post(apiUrlCreaCat, {
      nom_cat: values.nom_cat,
      desc_cat: values.desc_cat
    })
      .then(() => {
        getCategorias();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Registro exitoso!!!</strong>',
          html: `<i>La categoría <strong>${values.nom_cat}</strong> fue registrada con éxito!!!</i>`,
          icon: 'success',
          timer: 3000
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

  const updateCategoria = (values) => {
    Axios.put(apiUrlUpdateCat, {
      id_cat: id_cat,
      nom_cat: values.nom_cat,
      desc_cat: values.desc_cat
    })
      .then(() => {
        getCategorias();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Actualización exitosa!!!</strong>',
          html: `<i>La categoría <strong>${values.nom_cat}</strong> fue actualizada con éxito!!!</i>`,
          icon: 'success',
          timer: 3000
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
      confirmButtonText: 'Sí, ¡eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id_cat}`)
          .then(() => {
            getCategorias();
            limpiarCampos();
            Swal.fire({
              icon: 'success',
              title: `${val.nom_cat} fue eliminada.`,
              showConfirmButton: false,
              timer: 2000
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

  return (
    <div style={{ padding: '20px' }}>
      <Formik
        initialValues={{ nom_cat: '', desc_cat: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (editar) {
            updateCategoria(values);
          } else {
            addCategoria(values);
          }
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Paper style={{ padding: '20px', marginBottom: '20px' }}>
              <h3>{editar ? 'Actualizar Categoría' : 'Añadir Categoría'}</h3>
              <Field as={TextField} name="nom_cat" label="Nombre de la Categoría" fullWidth margin="normal" />
              <Field as={TextField} name="desc_cat" label="Descripción de la Categoría" fullWidth margin="normal" />
              <ErrorMessage name="desc_cat" component="div" />
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre de Categoría</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriasList.map((categoria) => (
              <TableRow key={categoria.id_cat}>
                <TableCell>{categoria.nom_cat}</TableCell>
                <TableCell>{categoria.desc_cat}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editarCategoria(categoria)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteCategoria(categoria)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CategoriasView;
