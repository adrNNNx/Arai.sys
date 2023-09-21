import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './state/user';



export default configureStore ({
  reducer: {
    user: userSliceReducer
  }
});
