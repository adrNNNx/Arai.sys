

import utilities from './utilities';
import inicio from './inicio';
import productos from './productos';
import proveedor from './proveedor';
import cliente from './clientes';
import cotizacion from './cotizacion';
import ventas from './ventas';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [inicio, productos, proveedor, cliente, ventas, cotizacion, utilities]
};

export default menuItems;
