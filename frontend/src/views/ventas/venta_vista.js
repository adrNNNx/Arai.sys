import React from 'react';
import VentasComponente from "componentes/Ventas/VentasComponente";
import { AraiProvider } from 'context/arai.context';

function VentasVista() {
  return (
    <AraiProvider>
      <VentasComponente />
    </AraiProvider>
  );
}

export default VentasVista;
