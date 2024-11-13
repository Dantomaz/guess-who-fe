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
    clearDisconnected: (state) => {
      state.info.disconnected = initialState.disconnected;
    },
  },
});

export const { setDisconnectInfo, clearDisconnected } = disconnect.actions;

export default disconnect.reducer;
