// assets
import { IconBuildingStore,IconBrandUnsplash } from '@tabler/icons';

// constant
const icons = { IconBuildingStore,IconBrandUnsplash };

//Rutas
import { PrivatesRoutes } from '../rutas/routes';

const productos = {
  id: 'productos',
  title: 'Productos',
  type: 'group',
  children: [
    {
      id: 'categoria',
      title: 'Categoria',
      type: 'item',
      url: PrivatesRoutes.CATEG,
      icon: icons.IconBuildingStore,
      breadcrumbs: false
    },
    {
        id: 'pro_alma',
        title: 'Productos en Almacén',
        type: 'item',
        url: PrivatesRoutes.PROD_ALM,
        icon: icons.IconBrandUnsplash,
        breadcrumbs: false
      }
  ]
};

export default productos;