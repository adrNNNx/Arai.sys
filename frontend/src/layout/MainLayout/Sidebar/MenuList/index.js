// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import DeterminarUsuarioRuta, { DeterminarTipoUsuario } from 'guards/RutasUrl';
import menus from 'menu-items';
const { menuItems, menuVentas } = menus;

import { useState, useEffect } from 'react';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const userRoute = DeterminarUsuarioRuta();
  const tipoUser = DeterminarTipoUsuario();
  const [menuLista, setMenulista] = useState([]);
  // Listas de vistas separadas para cada tipo de rol
  const idRutasParaRol = ['clientes', 'ventas', 'cotizaciones', 'inicio', 'productos', 'categoria', 'proveedores'];

  useEffect(() => {
    if (tipoUser) {
      setMenulista(menuVentas);
    } else {
      setMenulista(menuItems);
    }
  }, [tipoUser]);

  const navItems = menuLista.items
    ? menuLista.items.map((item) => {
        let itemCopy = { ...item };

        if (idRutasParaRol.includes(itemCopy.id)) {
          itemCopy.children = itemCopy.children.map((child) => {
            return { ...child, url: userRoute + child.url };
          });
        }

        switch (itemCopy.type) {
          case 'group':
            return <NavGroup key={itemCopy.id} item={itemCopy} />;
          default:
            return (
              <Typography key={itemCopy.id} variant="h6" color="error" align="center">
                Menu Items Error
              </Typography>
            );
        }
      })
    : [];
  return (
    <>
      {navItems}
    </>
  );
};

export default MenuList;
