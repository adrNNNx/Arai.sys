import ProductosForm from "componentes/Productos/productosForm;"
import { AraiProvider } from "context/arai.context";
const ProductosVista = () => (
  <AraiProvider>
    <ProductosForm />
  
  </AraiProvider>
);

export default ProductosVista