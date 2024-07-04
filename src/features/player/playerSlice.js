import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player: {
    id: null,
    nickname: null,
    host: false,
  },
};

export const playerSlice = createSlice({
  name: "playerManager",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      console.log("setPlayer dispatched: ", action.payload);
      state.player = action.payload;
    },
  },
});

export const { setPlayer } = playerSlice.actions;

export default playerSlice.reducer;
