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
      console.log('Funcion Agregar items iniciado.');
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

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        enableReinitialize={true} // Permite reinicializar los valores
        onSubmit={async (values, { setSubmitting }) => {
          console.log('onSubmit iniciado.');
          try {
            if (ventaID) {
              for (const producto of values.productosEnCarrito) {
                console.log('Agregar items iniciado.');
                await addItemVenta(producto);
              }
            } else {
              await iniciarVenta(values);
            }
          } catch (error) {
            console.error('Error al realizar la venta', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, handleChange, validateForm,setFieldTouched }) => (
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
                            <ListItemText> SubTotal: GS {producto.cantidad * producto.preven_pro || 0}</ListItemText>
                            <ListItemIcon>
                              <IconButton>
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
