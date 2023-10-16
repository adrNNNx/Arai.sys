import ProductosForm from 'componentes/Productos/productosForm';
import TablaProductos from 'componentes/Productos/tablaProductos';

import { AraiProvider } from 'context/arai.context';


const ProductosVista = () => {
  return (
    <AraiProvider>
      <ProductosForm />
      <TablaProductos />
    </AraiProvider>
  )
}

export default ProductosVista