import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player: {
    id: null,
    nickname: null,
    host: false,
    team: null,
    connected: false,
  },
};

export const playerSlice = createSlice({
  name: "playerManager",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      console.log("setPlayer dispatched: ", action.payload);
      state.player = action.payload;
      localStorage.setItem("playerId", state.player.id);
    },
    resetPlayer: (state) => {
      console.log("resetPlayer dispatched: ");
      state.player = initialState.player;
      localStorage.removeItem("playerId");
    },
  },
});

export const { setPlayer, resetPlayer } = playerSlice.actions;

export default playerSlice.reducer;
