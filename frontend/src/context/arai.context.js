import { createContext, useContext, useState } from 'react';

export const AraiContext = createContext();

export const AraiProvider = ({ children }) => {
  const [araiContextValue, setAraiContextValue] = useState({
    action: '' // Puedes inicializarlo con una cadena vacía o "editar" por defecto
  });
  const [dataupdatecontext, setDataUpdateContext] = useState(false);
  const [ventaIniciadaContext, setVentaIniciadaContext] = useState(false);
  return (
    <AraiContext.Provider
      value={{
        araiContextValue,
        setAraiContextValue,
        dataupdatecontext,
        setDataUpdateContext,
        ventaIniciadaContext,
        setVentaIniciadaContext
      }}
    >
      {children}
    </AraiContext.Provider>
  );
};

export const useAraiContext = () => {
  const context = useContext(AraiContext);
  if (context === undefined) {
    throw new Error('AraiContext must be used within a AraiProvider');
  }
  return context;
};
