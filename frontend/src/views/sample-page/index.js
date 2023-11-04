// material-ui
//import { Typography } from '@mui/material';
import DataGridProductos from 'componentes/Productos/datagridProductos';
import ProductosForm from 'componentes/Productos/productosForm';
import { AraiProvider } from 'context/arai.context';

// project imports
//import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <AraiProvider>
    <ProductosForm />
    <DataGridProductos />
  </AraiProvider>
);

export default SamplePage;
