import { AddCircleOutlineOutlined, RemoveCircleOutlineOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { IconTextPlus, IconCheck } from '@tabler/icons';
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
import { apiUrlAggItemVent, apiUrlGetClient, apiUrlIniciarVent, getRequest } from 'services';
import axios from 'axios';

//Valores iniciales
const initialValues = {
  nom_pro: '',
  preven_pro: '',
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
  const { araiContextValue, setVentaIniciadaContext } = useAraiContext();
  const [ventaEstado, setVentaIniciada] = useState(false);
  const [confirmacionVenta, setConfirmacionVenta] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(initialValues);
  const [clienteLista, setCliente] = useState([]);
  const [tipoVentaSeleccionada, setTipoVentaSeleccionada] = useState('');
  const [tipoClienteSeleccionado, setTipoClienteSeleccionado] = useState('');

  //useEffect del carrito de compras donde se agregan varios productos.
  useEffect(() => {
    if (araiContextValue.action === 'venta') {
      setInitialFormValues((prevValues) => {
        // Verificar si el producto ya está en el carrito
        const productoExistente = prevValues.productosEnCarrito.find((producto) => producto.id_pro === araiContextValue.id_pro);
        // Si el producto no está en el carrito, entonces se lo agrega
        if (!productoExistente) {
          return {
            ...prevValues,
            nom_pro: araiContextValue.nom_pro,
            preven_pro: araiContextValue.preven_pro,
            productosEnCarrito: [...prevValues.productosEnCarrito, araiContextValue],
            tipo_ven: tipoVentaSeleccionada,
            id_per: tipoClienteSeleccionado
          };
        }
        // Si el producto ya está en el carrito, devuelve el estado actual sin cambios
        return prevValues;
      });
    }
  }, [araiContextValue, tipoVentaSeleccionada, tipoClienteSeleccionado]);

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
        setVentaIniciada(true);
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
        id_per: tipoClienteSeleccionado
      };
      await axios.post(apiUrlAggItemVent, data);
    } catch (error) {
      console.error('Error al agregar el ítem a la venta', error);
    }
  };

  //Incrementar y decrementar la cantidad del producto
  const incrementarCantidad = (producto) => {
    setInitialFormValues((prevValues) => {
      const nuevosProductosEnCarrito = prevValues.productosEnCarrito.map((p) => {
        if (p.nom_pro === producto.nom_pro && p.preven_pro === producto.preven_pro) {
          let nuevaCantidad = (p.cantidad || 0) + 1;
          if (nuevaCantidad > producto.existencia) {
            nuevaCantidad = producto.existencia;
          }
          return { ...p, cantidad: nuevaCantidad };
        } else {
          return p;
        }
      });
      return { ...prevValues, productosEnCarrito: nuevosProductosEnCarrito };
    });
  };

  const decrementarCantidad = (producto) => {
    setInitialFormValues((prevValues) => {
      const nuevosProductosEnCarrito = prevValues.productosEnCarrito.map((p) => {
        if (p.nom_pro === producto.nom_pro && p.preven_pro === producto.preven_pro) {
          let nuevaCantidad = (p.cantidad || 0) - 1;
          if (nuevaCantidad < 0) {
            nuevaCantidad = 0;
          }
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
    setInitialFormValues((prevValues) => {
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
  //Funcion para confirmar la venta
  const confirmarVenta = async (values) => {
    //mensaje para la alerta:
    let mensaje = '<p><h3>Detalles del carrito:</h3></p><ul style="text-align: center; margin: 10px 0;">';
    let total = 0;

    values.productosEnCarrito.forEach((producto) => {
      //Si la cantidad del producto pasada es igual a 0 no se muestra en el mensaje de confirmacion
      if (producto.cantidad > 0) {
        const subtotal = producto.preven_pro * producto.cantidad;
        total += subtotal;
        mensaje += `<li style="margin: 3px 0;text-align: left;">${producto.nom_pro} - Cantidad: <b>${producto.cantidad}</b> - <b>Subtotal: GS ${subtotal}</b></li>`;
      }
    });

    mensaje += `</ul><p><h3>Total a Pagar: GS ${total}</h3></p>`;

    // Mostrar el mensaje de confirmación con SweetAlert2
    const confirmacion = await Swal.fire({
      title: 'Confirmar Venta',
      html: mensaje, // Usa 'html' en lugar de 'text'
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      width: '670px'
    });

    // Almacenar el resultado de la confirmación en la variable externa
    setConfirmacionVenta(confirmacion.isConfirmed);
  };

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        enableReinitialize={true} // Permite reinicializar los valores
        onSubmit={async (values, { setSubmitting }) => {
          try {
            handleRealizarVenta(values);
            await confirmarVenta(values);
            if (confirmacionVenta) {
              if (ventaID) {
                for (const producto of values.productosEnCarrito) {
                  await addItemVenta(producto);
                }
              } else {
                await iniciarVenta(values);
              }
            }
          } catch (error) {
            console.error('Error al realizar la venta', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, handleChange, validateForm, setFieldTouched }) => (
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
                      console.log('Botón Iniciar Venta clickeado');
                      validateForm().then((errors) => {
                        console.log('Errores de validación:', errors);
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
                    disabled={isSubmitting || !ventaEstado || !ventaID}
                  >
                    Realizar venta
                  </Button>
                </Grid>
                <Grid item sx={{ width: '25%' }}>
                  <FormControl fullWidth variant="standard" size="small">
                    <InputLabel>Tipo de Venta...</InputLabel>
                    <Field
                      as={Select}
                      name="tipo_ven"
                      labelId="tipo_ven_label"
                      id="id_tipo_ven"
                      label="Tipo de Venta"
                      onChange={(e) => {
                        handleChange(e);
                        setTipoVentaSeleccionada(e.target.value);
                      }}
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
                <Grid item sx={{ width: '25%' }}>
                  <FormControl fullWidth variant="standard" size="small">
                    <InputLabel>Cliente...</InputLabel>
                    <Field
                      as={Select}
                      name="id_per"
                      labelId="id_cli_label"
                      id="id_cli_select"
                      label="Cliente"
                      onChange={(e) => {
                        handleChange(e);
                        setTipoClienteSeleccionado(e.target.value);
                      }}
                      disabled={ventaID}
                    >
                      {clienteLista.map((cliente) => (
                        <MenuItem key={cliente.id_per} value={cliente.id_per}>
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
                {/* <Typography variant="h6">Total: GS {total}</Typography> */}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InformacionVenta;
