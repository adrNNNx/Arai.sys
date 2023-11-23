// VentaPOS.js
import React, { useState } from 'react';
import BuscadorProductos from './BuscarProductos';
import Carrito from './Carrito';
import { Button } from '@mui/material';
import axios from 'axios';
import { apiUrlCrearVenta, apiUrlGenerarTicket } from '../../services/Apirest';

const VentasComponete = () => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existente = prevCarrito.find((item) => item.id_pro === producto.id_pro);
      if (existente) {
        return prevCarrito.map((item) =>
          item.id_pro === producto.id_pro
            ? { ...item, cant_item: item.cant_item + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cant_item: 1 }];
      }
    });
  };
  

  const eliminarDelCarrito = (productoId) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id_pro !== productoId));
  };
  

  const actualizarCantidad = (productoId, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id_pro === productoId ? { ...item, cant_item: Number(cantidad) } : item
      )
    );
  };
  
  

  const completarVenta = async () => {
    try {
      // Suponiendo que `clienteSeleccionado` y `tipoVenta` están definidos en el estado
      const venta = {
        cli_id_cli: clienteSeleccionado.id,
        tipo_ven: tipoVenta,
        total_ven: carrito.reduce((acc, item) => acc + item.cantidad * item.precio, 0),
        estado_vent: 'COMPLETADA', // o el estado inicial de la venta
        items: carrito.map(({ id_pro, cant_item }) => ({ prod_id_pro: id_pro, cant_item })),
      };
      
      const response = await axios.post(apiUrlCrearVenta, venta);
      
      if (response.data) {
        const ventaId = response.data.id_ven;
        const ticketResponse = await axios.get(`${apiUrlGenerarTicket}/${ventaId}`);
        
        // Procesa el ticketResponse si es necesario
        
        setCarrito([]); // Limpiar carrito después de la venta
      }
    } catch (error) {
      console.error('Error al completar la venta', error);
    }
  };
  

  return (
    <div>
      <BuscadorProductos onAgregarAlCarrito={agregarAlCarrito} />
      <Carrito 
        carrito={carrito} 
        onActualizarCantidad={actualizarCantidad} 
        onEliminarDelCarrito={eliminarDelCarrito} 
      />
      <Button variant="contained" color="primary" onClick={completarVenta}>
        Finalizar Venta
      </Button>
    </div>
  );
};

export default VentasComponete;
