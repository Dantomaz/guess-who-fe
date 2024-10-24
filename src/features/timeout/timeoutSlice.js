import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userTimedOut: false,
};

export const timeoutSlice = createSlice({
  name: "timeoutNotifier",
  initialState,
  reducers: {
    setUserTimedOut: (state, action) => {
      state.userTimedOut = !!action.payload;
    },
  },
});

export const { setUserTimedOut } = timeoutSlice.actions;

export default timeoutSlice.reducer;
