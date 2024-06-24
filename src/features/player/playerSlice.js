import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player: {
    id: null,
    name: null,
    host: false,
  },
};

export const playerSlice = createSlice({
  name: "playerManager",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    updatePlayer: (state, action) => {
      updatePlayerInfo(state, action.payload);
    },
  },
});

const updatePlayerInfo = (state, player) => {
  if (!player) {
    return;
  }
  state.player.host = player.host;
};

export const { setPlayer, updatePlayer } = playerSlice.actions;

export default playerSlice.reducer;
