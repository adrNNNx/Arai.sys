// Carrito.js
import React from 'react';
import { List, ListItem, ListItemText, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Carrito = ({ carrito, onActualizarCantidad, onEliminarDelCarrito }) => {
  return (
    <List>
      {carrito.map((item, index) => (
        <ListItem key={item.producto.id} divider>
          <ListItemText
            primary={item.producto.nombre}
            secondary={`Precio: ${item.producto.precio} | Cantidad: ${item.cantidad}`}
          />
          <TextField
            label="Cantidad"
            type="number"
            value={item.cantidad}
            onChange={(e) => onActualizarCantidad(index, e.target.value)}
            style={{ width: '60px', marginRight: '10px' }}
          />
          <IconButton edge="end" aria-label="delete" onClick={() => onEliminarDelCarrito(index)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Carrito;
