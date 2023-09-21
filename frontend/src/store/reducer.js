import { combineReducers } from 'redux';



// reducer import
//import customizationReducer from './customizationReducer';
import customizacionReducer from './customizacionReducer';
import customizacionUser from './customizacionUser';
// ==============================|| COMBINE REDUCER ||============================== //




const reducer = combineReducers({
  customization: customizacionReducer,
  user: customizacionUser,
});

export default reducer; 


