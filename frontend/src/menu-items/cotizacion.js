// assets
import { IconBusinessplan } from '@tabler/icons';
import { PrivatesRoutes } from '../rutas/routes';


// constant
const icons = { IconBusinessplan };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const cotizacion = {
  id: 'cotizaciones',
  type: 'group',
  children: [
    {
      id: 'cotizacion',
      title: 'Cotizaciones',
      type: 'item',
      url: PrivatesRoutes.COTIZ,
      icon: icons.IconBusinessplan,
      breadcrumbs: false
    },
  ]
};

export default cotizacion;