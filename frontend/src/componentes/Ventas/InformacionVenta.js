import { AddCircleOutlineOutlined, RemoveCircleOutlineOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { IconTextPlus, IconCheck, IconSquareX } from '@tabler/icons';
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import { useAraiContext } from 'context/arai.context';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';

//Imports del formulario
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { apiUrlAggItemVent, apiUrlCancelarVent, apiUrlGetClient, apiUrlIniciarVent, getRequest } from 'services';
import axios from 'axios';
import TicketBoletaPDF from 'componentes/FuncionPDF/ticket-boletaPDF';

//Valores iniciales
const initialValues = {
  total: 0,
  id_per: '',
  tipo_ven: '',
  productosEnCarrito: []
};

const TiposDeVenta = ['Boleta', 'Ticket'];

//Valores Obligatorios
const validationSchema = Yup.object().shape({
  tipo_ven: Yup.string().required('Seleccione un tipo de venta...'),
  id_per: Yup.number().required('Seleccione un cliente...')
});

const InformacionVenta = () => {
  const [ventaID, setVentaID] = useState();
  const { araiContextValue, setAraiContextValue, setDataUpdateContext, setVentaIniciadaContext } = useAraiContext();
  const [clienteLista, setCliente] = useState([]);
  const [campoClienteDesactivado, setCampoClienteDesactivado] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [total, setTotal] = useState(0);

  //useEffect del carrito de compras donde se agregan varios productos.
  useEffect(() => {
    if (araiContextValue.action === 'venta') {
      setFormValues((prevValues) => {
        const productoExistente = prevValues.productosEnCarrito.find((producto) => producto.id_pro === araiContextValue.id_pro);
        if (!productoExistente) {
          return {
            ...prevValues,
            productosEnCarrito: [...prevValues.productosEnCarrito, araiContextValue]
          };
        }
        return prevValues;
      });
    }
  }, [araiContextValue]);

  //Para cargar los clientes en mi field de Select
  useEffect(() => {
    // Llama a la función getCategorias de api.js
    const fetchData = async () => {
      try {
        const response = await getRequest(apiUrlGetClient);
        setCliente(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const iniciarVenta = async (values) => {
    try {
      if (!ventaID) {
        // Obtén los valores adicionales que deseas pasar
        const data = {
          tipo_ven: values.tipo_ven,
          fec_ven: new Date()
        };

        const response = await axios.post(apiUrlIniciarVent, data);
        setVentaID(response.data.id_ven);
        setVentaIniciadaContext(true);
      }
    } catch (error) {
      console.error('Error al iniciar la venta', error);
    }
  };

  const addItemVenta = async (values) => {
    try {
      const data = {
        ...values,
        id_ven: ventaID,
        id_per: formValues.id_per // Utilizando formValues.id_per en lugar de tipoClienteSeleccionado
      };
      await axios.post(apiUrlAggItemVent, data);
    } catch (error) {
      console.error('Error al agregar el ítem a la venta', error);
    }
  };

  const cancelarVenta = async (id_vent_cancelar) => {
    try {
      const data = { id_venta: id_vent_cancelar };
      await axios.post(apiUrlCancelarVent, data);
    } catch (error) {
      console.error('Error al cancelar la venta', error);
    }
  };

  //Incrementar y decrementar la cantidad del producto
  const incrementarCantidad = (producto) => {
    setFormValues((prevValues) => {
      const nuevosProductosEnCarrito = prevValues.productosEnCarrito.map((p) => {
        if (p.nom_pro === producto.nom_pro && p.preven_pro === producto.preven_pro) {
          let nuevaCantidad = (p.cantidad || 0) + 1;
          if (nuevaCantidad > producto.existencia) {
            nuevaCantidad = producto.existencia;
          }
          const nuevoSubtotal = nuevaCantidad * producto.preven_pro;
          setTotal((prevTotal) => prevTotal + (nuevoSubtotal - (p.cantidad * producto.preven_pro || 0)));
          return { ...p, cantidad: nuevaCantidad };
        } else {
          return p;
        }
      });
      return { ...prevValues, productosEnCarrito: nuevosProductosEnCarrito };
    });
  };

  const decrementarCantidad = (producto) => {
    setFormValues((prevValues) => {
      const nuevosProductosEnCarrito = prevValues.productosEnCarrito.map((p) => {
        if (p.nom_pro === producto.nom_pro && p.preven_pro === producto.preven_pro) {
          let nuevaCantidad = (p.cantidad || 0) - 1;
          if (nuevaCantidad < 0) {
            nuevaCantidad = 0;
          }
          const nuevoSubtotal = nuevaCantidad * producto.preven_pro;
          setTotal((prevTotal) => prevTotal + (nuevoSubtotal - (p.cantidad * producto.preven_pro || 0)));
          return { ...p, cantidad: nuevaCantidad };
        } else {
          return p;
        }
      });
      return { ...prevValues, productosEnCarrito: nuevosProductosEnCarrito };
    });
  };
  //Elimina los items del carrito
  const eliminarItem = (producto) => {
    setFormValues((prevValues) => {
      const nuevosProductosEnCarrito = prevValues.productosEnCarrito.filter((p) => {
        return !(p.nom_pro === producto.nom_pro && p.preven_pro === producto.preven_pro);
      });

      return { ...prevValues, productosEnCarrito: nuevosProductosEnCarrito };
    });
  };

  //Funcion que verifica si se envia datos en el carrito antes de realizar la venta
  const handleRealizarVenta = async (values) => {
    if (values.productosEnCarrito.length === 0) {
      Swal.fire({
        position: 'bottom',
        toast: true,
        title: '<strong>Error al realizar venta</strong>',
        text: 'No existe productos en el carrito',
        icon: 'error',
        showConfirmButton: false,
        showClass: {
          popup: 'animate__animated animate__fadeInLeft animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp animate__faster'
        },
        timer: 3000
      });
      return;
    }
  };

  const handleTipoVentaChange = (e) => {
    const tipoVenta = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      tipo_ven: tipoVenta,
      id_per: tipoVenta === 'Ticket' ? 30 : ''
    }));
    setCampoClienteDesactivado(tipoVenta === 'Ticket');
  };

  const handleClienteChange = (e) => {
    const clienteId = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      id_per: clienteId
    }));
  };

  //Funcion para confirmar la venta
  const confirmarVenta = async (values, resetForm) => {
    // mensaje para la alerta:
    let mensaje = '<p><h3>Detalles del carrito:</h3></p><ul style="text-align: center; margin: 10px 0;">';
    let total = 0;

    values.productosEnCarrito.forEach((producto) => {
      // Si la cantidad del producto pasada es igual a 0 no se muestra en el mensaje de confirmación
      if (producto.cantidad > 0) {
        const subtotal = producto.preven_pro * producto.cantidad;
        total += subtotal;
        mensaje += `<li style="margin: 3px 0;text-align: left;">${producto.nom_pro} - Cantidad: <b>${producto.cantidad}</b> - <b>Subtotal: GS ${subtotal}</b></li>`;
      }
    });

    mensaje += `</ul><p><h3>Total a Pagar: GS ${total}</h3></p>`;

    // Mostrar el mensaje de confirmación con SweetAlert2
    const result = await Swal.fire({
      title: 'Confirmar Venta',
      html: mensaje,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      width: '670px'
    });

    // Verificar si se hizo clic en el botón de confirmación
    if (result.isConfirmed) {
      // Realizar acciones de confirmación aquí
      console.log('La venta ha sido confirmada');
      // Aquí puedes realizar acciones adicionales, como enviar datos al servidor o realizar otras operaciones
      if (ventaID) {
        for (const producto of values.productosEnCarrito) {
          await addItemVenta(producto);
        }
      } else {
        await iniciarVenta(values);
      }
      TicketBoletaPDF(ventaID);
      //Limpiamos los valores del form una vez la venta fue concretada:
      setVentaID('');
      setTotal(0);
      setFormValues(initialValues);
      setAraiContextValue('');
      setDataUpdateContext(true);
      setVentaIniciadaContext(false);
      resetForm();
    } else {
      // Realizar acciones si se canceló la confirmación
      console.log('La venta ha sido cancelada');
    }
  };

  return (
    <div>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        enableReinitialize={true} // Permite reinicializar los valores
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            handleRealizarVenta(values);
            await confirmarVenta(values, resetForm);
          } catch (error) {
            console.error('Error al realizar la venta', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, validateForm, setFieldTouched, setValues, resetForm }) => (
          <Form>
            <Grid container direction="column" sx={{ alignItems: 'flex-start', mb: 2 }}>
              <Grid item>
                <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                  Información de la Venta
                </Typography>
              </Grid>
              <Grid container direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item>
                  <Button
                    startIcon={<IconTextPlus />}
                    type="button"
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      validateForm().then((errors) => {
                        if (Object.keys(errors).length === 0) {
                          iniciarVenta(values);
                        } else {
                          setFieldTouched('tipo_ven', true, false); // Marca el campo como tocado para mostrar el error
                          setFieldTouched('id_per', true, false);
                        }
                      });
                    }}
                    disabled={isSubmitting || ventaID}
                  >
                    Iniciar Venta
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    startIcon={<IconCheck />}
                    size="small"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || !ventaID || values.productosEnCarrito.length === 0}
                  >
                    Realizar venta
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    startIcon={<IconSquareX />}
                    type="button"
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => {
                      cancelarVenta(ventaID);
                      setTotal(0);
                      setVentaID('');
                      resetForm();
                      setValues(initialValues);
                      setFormValues(initialValues);
                      setAraiContextValue('');
                      setVentaIniciadaContext(false);
                    }}
                    disabled={isSubmitting || !ventaID || values.productosEnCarrito.length === 0}
                  >
                    Cancelar Venta
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={2} sx={{ mt: 0.5, alignItems: 'center' }}>
                <Grid item sx={{ width: '30%' }}>
                  <FormControl fullWidth variant="standard" size="small">
                    <InputLabel>Tipo de Venta...</InputLabel>
                    <Field
                      as={Select}
                      name="tipo_ven"
                      labelId="tipo_ven_label"
                      id="id_tipo_ven"
                      label="Tipo de Venta"
                      onChange={handleTipoVentaChange}
                      disabled={ventaID}
                    >
                      {TiposDeVenta.map((venta_tipo, index) => (
                        <MenuItem key={index} value={venta_tipo}>
                          {venta_tipo}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="tipo_ven">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </FormControl>
                </Grid>
                <Grid item sx={{ width: '30%' }}>
                  <FormControl fullWidth variant="standard" size="small">
                    <InputLabel>Cliente...</InputLabel>
                    <Field
                      as={Select}
                      name="id_per"
                      labelId="id_cli_label"
                      id="id_cli_select"
                      label="Cliente"
                      onChange={handleClienteChange}
                      disabled={ventaID || campoClienteDesactivado}
                    >
                      {clienteLista.map((cliente) => (
                        <MenuItem
                          key={cliente.id_per}
                          value={cliente.id_per}
                          disabled={cliente.id_per === 30 && formValues.tipo_ven !== 'Ticket'}
                        >
                          {cliente.nom_per}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="id_per">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2}>
              <Grid item sx={{ height: '100%', width: '100%' }}>
                <List>
                  {values.productosEnCarrito
                    .filter(
                      (producto, index, self) =>
                        index === self.findIndex((p) => p.nom_pro === producto.nom_pro && p.preven_pro === producto.preven_pro)
                    )
                    .map((producto, index) => (
                      <div key={index}>
                        <ListItem alignItems="center" disablePadding>
                          <ListItem disablePadding>
                            <ListItemText primary={`${producto.nom_pro} - GS ${producto.preven_pro} - ${producto.categoria} `} />
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon sx={{ marginRight: 1 }}>
                              <IconButton onClick={() => decrementarCantidad(producto)}>
                                <RemoveCircleOutlineOutlined color="secondary" />
                              </IconButton>
                            </ListItemIcon>
                            <ListItemText> Cantidad: {producto.cantidad || 0}</ListItemText>
                            <ListItemIcon sx={{ marginRight: 1 }}>
                              <IconButton onClick={() => incrementarCantidad(producto)}>
                                <AddCircleOutlineOutlined color="primary" />
                              </IconButton>
                            </ListItemIcon>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemText>
                              <span style={{ fontWeight: 'bold' }}>Subtotal: GS {producto.cantidad * producto.preven_pro || 0}</span>
                            </ListItemText>
                            <ListItemIcon>
                              <IconButton onClick={() => eliminarItem(producto)}>
                                <DeleteOutlineOutlined color="error" />
                              </IconButton>
                            </ListItemIcon>
                          </ListItem>
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                </List>
                <Typography variant="h4" color="green">
                  Total: GS {total}
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InformacionVenta;
