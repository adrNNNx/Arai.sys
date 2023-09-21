// project imports
import config from 'config';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true
};

const customizationSlice = createSlice({
  name: 'customization',
  initialState: initialState,
  reducers: {
    menuOpen: (state, action) => {
      state.isOpen = [action.payload];
    },
    setMenu: (state, action) => {
      const id = action.payload;
      state.isOpen = [id];
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    }
  }
});

export const {
  menuOpen,
  setMenu,
  setFontFamily,
  setBorderRadius
} = customizationSlice.actions;

export default customizationSlice.reducer;
