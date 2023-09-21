import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({
  reducer: reducer,
  // Puedes agregar aquí más configuraciones según tus necesidades
});

//const persister = 'Free';

export { store };
