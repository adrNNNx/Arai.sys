import { AddCircleOutlineOutlined, RemoveCircleOutlineOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { IconTextPlus, IconCheck } from '@tabler/icons';
import {
  Button,
  Divider,
  FormControl,
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
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { apiUrlAggItemVent, apiUrlGetClient, apiUrlIniciarVent, getRequest } from 'services';
import axios from 'axios';

//Valores iniciales
const initialValues = {
  nom_pro: '',
  preven_pro: '',
  total: 0,
  id_per: '',
  productosEnCarrito: []
};

const TiposDeVenta = ['boleta', 'ticket'];

//Valores Obligatorios
const validationSchema = Yup.object({
  cantidad_venta: Yup.number().required('La cantidad del producto es requerida')
});

const InformacionVenta = () => {
  const [ventaID, setVentaID] = useState();
  const { araiContextValue, setVentaIniciadaContext } = useAraiContext();
  const [ventaEstado, setVentaIniciada] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(initialValues);
  const [clienteLista, setCliente] = useState([]);

  //useEffect del carrito de compras donde se agregan varios productos.
  useEffect(() => {
    if (araiContextValue.action === 'venta') {
      setInitialFormValues((prevValues) => ({
        ...prevValues,
        nom_pro: araiContextValue.nom_pro,
        preven_pro: araiContextValue.preven_pro,
        productosEnCarrito: [...prevValues.productosEnCarrito, araiContextValue]
      }));
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
        const response = await axios.post(apiUrlIniciarVent, values);
        setVentaID(response.data.id_ven);
        setVentaIniciada(true);
        //este es para el datagrid entonces si le da a iniciar podra agregar los productos al carrito
        setVentaIniciadaContext(true);
      }
    } catch (error) {
      console.error('Error al iniciar la venta', error);
    }
  };

  const addItemVenta = async (values) => {
    try {
      await axios.post(apiUrlAggItemVent, { ...values, id_ven: ventaID });
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
      // Llama a addItemVenta después de actualizar la cantidad
      addItemVenta({ ...prevValues, productosEnCarrito: nuevosProductosEnCarrito });
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
          // Llama a addItemVenta después de actualizar la cantidad
          addItemVenta({ ...prevValues, productosEnCarrito: nuevosProductosEnCarrito });
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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (ventaID) {
            addItemVenta(values, resetForm);
          } else {
            iniciarVenta(values, resetForm);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
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
                    onClick={() => iniciarVenta(values)}
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
                    disabled={isSubmitting || !ventaEstado}
                  >
                    Realizar venta
                  </Button>
                </Grid>
                <Grid item sx={{ width: '25%' }}>
                  <FormControl fullWidth variant="standard" size="small">
                    <InputLabel>Tipo de Venta...</InputLabel>
                    <Field as={Select} name="tipo_ven" labelId="tipo_ven_label" id="id_tipo_ven" label="Tipo de Venta" defaultValue="">
                      {TiposDeVenta.map((venta_tipo, index) => (
                        <MenuItem key={index} value={venta_tipo}>
                          {venta_tipo}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item sx={{ width: '25%' }}>
                  <FormControl fullWidth variant="standard" size="small">
                    <InputLabel>Cliente...</InputLabel>
                    <Field as={Select} name="id_per" labelId="id_cli_label" id="id_cli_select" label="Cliente" defaultValue="">
                      {clienteLista.map((cliente) => (
                        <MenuItem key={cliente.id_per} value={cliente.id_per}>
                          {cliente.nom_per}
                        </MenuItem>
                      ))}
                    </Field>
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
