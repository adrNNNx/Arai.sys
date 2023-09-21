import { createSlice } from '@reduxjs/toolkit';


export const EmptyUserState= {
  id: 0,
  name: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: EmptyUserState,
  reducers: {
    createUser: (state, action) => action.payload,
    modifyUser: (state, action) => {return { ...state, ...action.payload };},
    resetUser: () => EmptyUserState
  }
});

export const {createUser, modifyUser, resetUser } = userSlice.actions;
export default userSlice.reducer;