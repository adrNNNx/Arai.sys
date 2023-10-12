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
      const id = action.payload;
      state.isOpen = [id];
    },
    setMenu: (state, action) => {
      state.opened = action.payload;
    },
    toggleMenu: (state) => {
      state.opened = !state.opened; // Cambia el estado de abierto/cerrado
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    }
  }
});

export const { menuOpen, setMenu, setFontFamily, setBorderRadius, toggleMenu } = customizationSlice.actions;

export default customizationSlice.reducer;
