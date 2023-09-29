// assets
import { IconHome } from '@tabler/icons';

// constant
const icons = { IconHome };

//Rutas
import { PrivatesRoutes } from '../rutas/routes';

const inicio = {
  id: 'inicio',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Inicio',
      type: 'item',
      url: PrivatesRoutes.DASHBOARD,
      icon: icons.IconHome,
      breadcrumbs: false
    }
  ]
};

export default inicio;