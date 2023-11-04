import ClienteForm from 'componentes/Clientes/clientForm';
import TablaClientes from 'componentes/Clientes/clientTabla';
import { AraiProvider } from 'context/arai.context';

const ClienteVista = () => {
  return (
    <AraiProvider>
      <ClienteForm />
      <TablaClientes/>
    </AraiProvider>
  );
};

export default ClienteVista;
