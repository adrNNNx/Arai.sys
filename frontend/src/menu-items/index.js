

import inicio from './inicio';
import productos from './productos';
import proveedor from './proveedor';
import clientes from './clientes';
import cotizacion from './cotizacion';
import ventas from './ventas';


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [inicio, productos, proveedor, clientes, ventas, cotizacion]
};

const menuVentas = {
  items: [inicio, clientes, ventas, cotizacion]
};
export default { menuItems, menuVentas };
