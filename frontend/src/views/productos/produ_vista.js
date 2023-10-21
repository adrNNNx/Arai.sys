import DataGridProductos from 'componentes/Productos/datagridProductos';
import ProductosForm from 'componentes/Productos/productosForm';


import { AraiProvider } from 'context/arai.context';


const ProductosVista = () => {
  return (
    <AraiProvider>
      <ProductosForm />
      <DataGridProductos />
    </AraiProvider>
  )
}

export default ProductosVista