// assets
import { IconCategory } from '@tabler/icons';
import { PrivatesRoutes } from '../rutas/routes';


// constant
const icons = { IconCategory };

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
      icon: icons.IconCategory,
      breadcrumbs: false
    },
  ]
};

export default proveedor;