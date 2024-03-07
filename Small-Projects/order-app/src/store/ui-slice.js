import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  cartIsVisible: false,
  notificaition: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialValue,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
