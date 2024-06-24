import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCounter: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setCounter } = counterSlice.actions;

export default counterSlice.reducer;
