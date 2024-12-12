import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isApiRequestPending: false,
};

export const lockSlice = createSlice({
  name: "lockManager",
  initialState,
  reducers: {
    setLock: (state) => {
      state.isApiRequestPending = true;
    },
    clearLock: (state) => {
      state.isApiRequestPending = false;
    },
  },
});

export const { setLock, clearLock } = lockSlice.actions;

export default lockSlice.reducer;
