import DataGridProveedor from "componentes/Proveedores/datagridProve";
import ProveedorForm from "componentes/Proveedores/proveForm";
import { AraiProvider } from "context/arai.context";


const ProveedorVista = () => {
  return (
    <AraiProvider>
      <ProveedorForm/>
      <DataGridProveedor/>
    </AraiProvider>
  )
}

export default ProveedorVista;