import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { apiUrlCreaPro, apiUrlUpdatePro, apiUrlDeletePro } from '../../services/Apirest';
import Swal from 'sweetalert2';
import { Button, TextField, Paper, FormHelperText } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  //id_pro: '', 
  existencia: '',
  nom_pro: '',
  prec_pro: '',
  fec_pro: '',
  categoria_id_cat: '',
  estado: ''
};

const validationSchema = Yup.object({
  preven_pro: Yup.number().required('El precio de venta es requerido'),
  existencia: Yup.number().required('La cantidad del producto es requerida'),
  nom_pro: Yup.string().required('El nombre del producto es requerido'),
  prec_pro: Yup.number().required('El precio es requerido'),
  fec_pro: Yup.date().required('La fecha es requerida'),
  categoria_id_cat: Yup.number().required('La categoría es requerida'),
  estado: Yup.string().required('El estado es requerido')
});

function ProductosForm() {
  const [id_pro, setId_pro] = useState('');
  const [editar, setEditar] = useState(false);
  const { setAraiContextValue, araiContextValue, setDataUpdateContext, dataupdatecontext } = useAraiContext();
  const [initialFormValues, setInitialFormValues] = useState(initialValues);

  useEffect(() => { if (araiContextValue.action === 'editar') {
    setId_cat(araiContextValue.id_cat);
    setInitialFormValues({ nom_cat: araiContextValue.nom_cat, desc_cat: araiContextValue.desc_cat });
    setEditar(true);
    console.log('valores del contexto desde cateogirasForm: ', araiContextValue.nom_cat, 'valor del usetate de editar: ', editar);
  } else if (araiContextValue.action === 'eliminar') {
    deleteCategoria(araiContextValue);
  }
}, [araiContextValue]);

  const limpiarCampos = () => {
    setId_pro('');
    setEditar(false);
    setInitialFormValues(initialValues);
    setAraiContextValue('');
    console.log('Limpieza de los campos valores actuales: ', id_pro, 'editar: ', editar, 'valores iniciales: ', initialFormValues);
  };

  const addProducto = (values) => {
    Axios.post(apiUrlCreaPro, {
      preven_pro: values.preven_pro,
      existencia: values.existencia,
      nom_pro: values.nom_pro,
      prec_pro: values.prec_pro,
      fec_pro: values.fec_pro,
      categoria_id_cat: values.categoria_id_cat,
      estado: values.estado
    })
      .then(() => {
        limpiarCampos();
        setDataUpdateContext(true);
        console.log('Desde categoria: ', dataupdatecontext);
        Swal.fire({
          position: 'bottom',
          toast: true,
          title: '<strong>Registro exitoso</strong>',
          html: `<i>El producto <strong>${values.nom_cat}</strong> fue registrada con éxito</i>`,
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
            title: 'Oops...ocurrio un error inesperado',
            text:
              JSON.parse(JSON.stringify(error)).message === 'Network Error' ? 'Intente más tarde' : JSON.parse(JSON.stringify(error)).message
          });
      });
  };

  const updateProducto = (values) => {
    Axios.put(apiUrlUpdatePro, {
      id_pro: id_pro,
      preven_pro: values.preven_pro,
      existencia: values.existencia,
      nom_pro: values.nom_pro,
      prec_pro: values.prec_pro,
      fec_pro: values.fec_pro,
      categoria_id_cat: values.categoria_id_cat,
      estado: values.estado
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
          html: `<i>El producto <strong>${values.nom_cat}</strong> fue actualizada con éxito</i>`,
          icon: 'success',
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeInLeft animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
          },
          timer: 2500,
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

  const deleteProducto = () => {
    Swal.fire({
      title: '¿Confirmar eliminación?',
      html: '<i>¿Realmente desea eliminar este producto?</i>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(apiUrlDeletePro, {
          data: { id_pro: id_pro } // Asegúrate de pasar el ID del producto que deseas eliminar
        })
          .then(() => {
            limpiarCampos();
            setDataUpdateContext(true);
            console.log('Desde delete: ', dataupdatecontext);
            Swal.fire({
              position: 'bottom',
              toast: true,
              icon: 'success',
              title: `El producto ${val.nom_cat} fue eliminado.`,
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
        initialValues={initialFormValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (editar) {
            updateProducto(values);
          } else {
            addProducto(values);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
         <Form>
         <Paper style={{ padding: '20px', marginBottom: '20px' }}>
           <h3>{editar ? 'Editar Producto' : 'Agregar Producto'}</h3>
           <Field as={TextField} name="preven_pro" label="Precio de Venta" fullWidth margin="normal" />
           <ErrorMessage name="preven_pro">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
       
           {/* Agrega los campos restantes aquí */}
           <Field as={TextField} name="existencia" label="Existencia" fullWidth margin="normal" />
           <ErrorMessage name="existencia">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
       
           <Field as={TextField} name="nom_pro" label="Nombre del Producto" fullWidth margin="normal" />
           <ErrorMessage name="nom_pro">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
       
           <Field as={TextField} name="prec_pro" label="Precio" fullWidth margin="normal" />
           <ErrorMessage name="prec_pro">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
       
           <Field as={TextField} name="fec_pro" label="Fecha" fullWidth margin="normal" />
           <ErrorMessage name="fec_pro">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
       
           <Field as={TextField} name="categoria_id_cat" label="Categoría" fullWidth margin="normal" />
           <ErrorMessage name="categoria_id_cat">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
       
           <Field as={TextField} name="estado" label="Estado" fullWidth margin="normal" />
           <ErrorMessage name="estado">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
       
           <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} style={{ marginTop: '20px' }}>
             {editar ? 'Actualizar' : 'Agregar'}
           </Button>
           {editar && (
             <Button variant="outlined" onClick={deleteProducto} style={{ marginTop: '20px', marginLeft: '20px' }}>
               Eliminar
             </Button>
           )}
         </Paper>
       </Form>
       
        )}
      </Formik>
    </div>
  );
}

export default ProductosForm;
