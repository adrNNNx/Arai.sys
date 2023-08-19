import { createSlice } from '@reduxjs/toolkit';

export const UserEmptyState = {
  id: 0,
  name: '',
  password: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState: UserEmptyState,
  reducers: {
    createUser: (state, action) => {
      return action.payload;
    },
    modifyUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      return UserEmptyState;
    }
  }
});

export const {createUser,modifyUser,resetUser } = userSlice.actions;
export default userSlice.reducer;