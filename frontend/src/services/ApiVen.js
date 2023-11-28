import Axios from 'axios';

// URLs de la API
export const apiUrlIniciarVenta = 'http://localhost:4000/api/iniciar_venta';
export const apiUrlAgregarAlCarrito = 'http://localhost:4000/api/agregar_al_carrito';
export const apiUrlConfirmarVenta = 'http://localhost:4000/api/confirmar_venta';
export const apiUrlRegistrarEnInventario = 'http://localhost:4000/api/registrar_en_inventario';
export const apiUrlComprobarDatosCliente = 'http://localhost:4000/api/comprobar_datos_cliente';
export const apiUrlEmitirTicketPDF = 'http://localhost:4000/api/emitir_ticket_pdf';
export const apiUrlActualizarVenta = 'http://localhost:4000/api/actualizar_venta';

// Iniciar Proceso de Venta
export async function iniciarVenta() {
  const response = await Axios.post(apiUrlIniciarVenta);
  console.log(response.data);
}

// Agregar Producto al Carrito
export async function agregarAlCarrito(prod_id_pro, cant_item) {
  const response = await Axios.post(apiUrlAgregarAlCarrito, { prod_id_pro, cant_item });
  console.log(response.data);
}

// Confirmar Venta
export async function confirmarVenta(id_compra) {
  const response = await Axios.post(apiUrlConfirmarVenta, { id_compra });
  console.log(response.data);
}

// Registrar Venta en Inventario
export async function registrarEnInventario(id_compra) {
  const response = await Axios.post(apiUrlRegistrarEnInventario, { id_compra });
  console.log(response.data);
}

// Comprobar Datos del Cliente
export async function comprobarDatosCliente(cli_id_cli) {
  const response = await Axios.get(apiUrlComprobarDatosCliente, { params: { cli_id_cli } });
  console.log(response.data);
}

// Emitir Ticket en PDF
export async function emitirTicketPDF(id_ven) {
  const response = await Axios.get(apiUrlEmitirTicketPDF, { params: { id_ven } });
  console.log(response.data);
}

// Actualizar Base de Datos con Venta Realizada
export async function actualizarVenta(id_ven, id_compra) {
  const response = await Axios.put(apiUrlActualizarVenta, { id_ven, id_compra });
  console.log(response.data);
}
