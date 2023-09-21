import { createSlice } from '@reduxjs/toolkit';

export const EmptyUserState = {
  id: 0,
  name: '',
  password: ''
};

export const PersitLocalStorageUser = (userInfo) => {
  localStorage.setItem('user', JSON.stringify({ ...userInfo }));
};

export const ClearLocalStorageUser = () => {
  localStorage.removeItem('user');
};

export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      PersitLocalStorageUser(action.payload);
      return action.payload;
    },
    modifyUser: (state, action) => {
      const result = { ...state, ...action.payload };
      PersitLocalStorageUser(result);
      return result;
    },
    resetUser: () => {
      ClearLocalStorageUser();
      return EmptyUserState;
    }
  }
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
