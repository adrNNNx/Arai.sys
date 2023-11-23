// BuscadorProductos.js
import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import { apiUrlGetProdu } from 'services';


const BuscadorProductos = ({ onAgregarAlCarrito }) => {
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([]);

  const buscarProductos = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${apiUrlGetProdu}?search=${busqueda}`);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al buscar productos', error);
    }
  };

  return (
    <div>
      <form onSubmit={buscarProductos}>
        <TextField
          label="Buscar Productos"
          variant="outlined"
          fullWidth
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Buscar
        </Button>
      </form>
      <List>
        {productos.map((producto) => (
          <ListItem key={producto.id} button>
            <ListItemText primary={producto.nombre} secondary={`Precio: ${producto.precio}`} />
            <Button variant="contained" onClick={() => onAgregarAlCarrito(producto)}>
              Agregar
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BuscadorProductos;
