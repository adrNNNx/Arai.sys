import { createSlice } from '@reduxjs/toolkit';
import { ClearLocalStorage, PersitLocalStorage } from '../utils/localStorageUtilities';

export const EmptyUserState = {
  id: 0,
  name: '',
  password: ''
};



export const UserKey= 'user';

export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      PersitLocalStorage(UserKey, action.payload);
      return action.payload;
    },
    modifyUser: (state, action) => {
      const result = { ...state, ...action.payload };
      PersitLocalStorage(UserKey, result);
      return result;
    },
    resetUser: () => {
      ClearLocalStorage(UserKey);
      return EmptyUserState;
    }
  }
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
