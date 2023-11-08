import ClienteForm from 'componentes/Clientes/clientForm';
import DataGridCliente from 'componentes/Clientes/datagridClient';
import { AraiProvider } from 'context/arai.context';

const ClienteVista = () => {
  return (
    <AraiProvider>
      <ClienteForm />
      <DataGridCliente/>
    </AraiProvider>
  );
};

export default ClienteVista;
