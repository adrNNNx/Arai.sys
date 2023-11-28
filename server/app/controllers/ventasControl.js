const database = require("../../database");

// Iniciar Proceso de Venta
async function iniciarVenta(req, res) {
  // Aquí puedes crear una nueva orden de venta en la base de datos
  // Por ejemplo:
  const newOrder = await database.item_ord_ven.create();
  res.send(newOrder);
}

// Agregar Producto al Carrito
async function agregarAlCarrito(req, res) {
  // Aquí puedes agregar productos seleccionados a la orden
  // Por ejemplo:
  const { prod_id_pro, cant_item } = req.body;
  const orderItem = await database.item_ord_ven.create({ prod_id_pro, cant_item });
  res.send(orderItem);
}

// Confirmar Venta
async function confirmarVenta(req, res) {
  // Aquí puedes procesar los productos en la orden y calcular el precio total
  // Por ejemplo:
  const { id_compra } = req.body;
  const order = await database.item_ord_ven.findById(id_compra);
  const total = order.items.reduce((sum, item) => sum + item.preven_pro * item.cant_item, 0);
  res.send({ total });
}

// Registrar Venta en Inventario
async function registrarEnInventario(req, res) {
  // Aquí puedes actualizar el inventario basándose en los productos vendidos
  // Por ejemplo:
  const { id_compra } = req.body;
  const order = await database.item_ord_ven.findById(id_compra);
  order.items.forEach(async (item) => {
    const product = await database.prod.findById(item.prod_id_pro);
    product.existencia -= item.cant_item;
    await product.save();
  });
  res.send({ message: 'Inventario actualizado' });
}

// Comprobar Datos del Cliente
async function comprobarDatosCliente(req, res) {
  // Aquí puedes verificar los datos del cliente seleccionado
  // Por ejemplo:
  const { cli_id_cli } = req.body;
  const client = await database.cli.findById(cli_id_cli);
  res.send(client);
}

// Emitir Ticket en PDF
async function emitirTicketPDF(req, res) {
  // Aquí puedes generar un ticket en PDF con los detalles de la venta
  // Por ejemplo:
  const { id_ven } = req.body;
  const sale = await database.venta.findById(id_ven);
  const pdf = await generarPDF(sale);
  res.send(pdf);
}

// Actualizar Base de Datos con Venta Realizada
async function actualizarVenta(req, res) {
  // Aquí puedes actualizar la base de datos con los detalles de la venta
  // Por ejemplo:
  const { id_ven, id_compra } = req.body;
  const sale = await database.venta.findById(id_ven);
  const order = await database.item_ord_ven.findById(id_compra);
  sale.items = order.items;
  await sale.save();
  res.send(sale);
}
async function cambioDeDivisa(req, res) {
    // Aquí puedes calcular el equivalente en la moneda local usando apiDolarPy
    // Por ejemplo:
    const { amount, currency } = req.body;
    const exchangeRate = await apiDolarPy.getExchangeRate(currency);
    const localAmount = amount * exchangeRate;
    res.send({ localAmount });
  }
module.exports = {
  iniciarVenta,
  agregarAlCarrito,
  confirmarVenta,
  registrarEnInventario,
  comprobarDatosCliente,
  emitirTicketPDF,
  actualizarVenta,
  cambioDeDivisa
};
