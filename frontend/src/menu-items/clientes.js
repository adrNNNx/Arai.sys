// assets
import { IconUser } from '@tabler/icons';
import { PrivatesRoutes } from '../rutas/routes';



// constant
const icons = { IconUser };
// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //



const clientes = {
  id: 'clientes',
  type: 'group',
  children: [
    {
      id: 'cliente',
      title: 'Clientes',
      type: 'item',
      url: PrivatesRoutes.CLIENT,
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
};

export default clientes;