import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    disconnected: false,
    reason: null,
  },
};

export const disconnect = createSlice({
  name: "disconnectNotifier",
  initialState,
  reducers: {
    setDisconnectInfo: (state, action) => {
      state.info = action.payload;
    },
    clearDisconnectInfo: (state) => {
      state.info = initialState;
    },
  },
});

export const { setDisconnectInfo, clearDisconnectInfo } = disconnect.actions;

export default disconnect.reducer;
