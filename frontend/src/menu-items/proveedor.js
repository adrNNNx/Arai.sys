// assets
import { IconTruckDelivery } from '@tabler/icons';
import { PrivatesRoutes } from '../rutas/routes';


// constant
const icons = { IconTruckDelivery };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const proveedor = {
  id: 'proveedores',
  type: 'group',
  children: [
    {
      id: 'proveedor',
      title: 'Proveedores',
      type: 'item',
      url: PrivatesRoutes.PROVEEDORES,
      icon: icons.IconTruckDelivery,
      breadcrumbs: false
    },
  ]
};

export default proveedor;