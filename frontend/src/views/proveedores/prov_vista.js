import ProveedorForm from "componentes/Proveedores/proveForm";
import TablaProveedores from "componentes/Proveedores/proveTabla";
import { AraiProvider } from "context/arai.context";


const ProveedorVista = () => {
  return (
    <AraiProvider>
      <ProveedorForm/>
      <TablaProveedores/>
    </AraiProvider>
  )
}

export default ProveedorVista;