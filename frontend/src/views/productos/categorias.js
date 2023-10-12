

import CategoriasForm from 'componentes/Productos/categoriasForm';
import TablaCategoria from 'componentes/Productos/tablaCategoria';
//import { AraiProvider } from '../../context/arai.context';

import { AraiProvider } from 'context/arai.context';


const CategoriasView = () => (
  <AraiProvider>
    <CategoriasForm />
    <TablaCategoria />
  </AraiProvider>
);

export default CategoriasView;
