// assets
import { IconReceipt2 } from '@tabler/icons';
import { PrivatesRoutes } from '../rutas/routes';


// constant
const icons = { IconReceipt2};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const ventas = {
  id: 'ventas',
  type: 'group',
  children: [
    {
      id: 'ventas',
      title: 'Ventas',
      type: 'item',
      url: PrivatesRoutes.VENT,
      icon: icons.IconReceipt2,
      breadcrumbs: false
    },
  ]
};

export default ventas;