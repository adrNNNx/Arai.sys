

import CategoriasForm from 'componentes/Productos/categoriasForm';
import DataGridCategoria from 'componentes/Productos/datagridCategoria';
//import TablaCategoria from 'componentes/Productos/tablaCategoria';
//import { AraiProvider } from '../../context/arai.context';

import { AraiProvider } from 'context/arai.context';


const CategoriasView = () => (
  <AraiProvider>
    <CategoriasForm />
    <DataGridCategoria/>
  </AraiProvider>
);

export default CategoriasView;
