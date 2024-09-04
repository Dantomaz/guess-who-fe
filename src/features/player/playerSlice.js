import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player: {
    id: null,
    nickname: null,
    host: false,
    team: null,
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
    resetPlayer: (state) => {
      state.player = initialState.player;
    },
  },
});

export const { setPlayer, resetPlayer } = playerSlice.actions;

export default playerSlice.reducer;
