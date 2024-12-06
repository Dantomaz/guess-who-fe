import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameState: {
    gameStatus: null,
    currentTurn: null,
    winner: null,
    totalNumberOfPlayersVotes: 0,
    cards: null,
    pickedCardNumber: null,
    pickedOpponentsCardNumber: null,
    playersVotes: null,
  },
};

export const gameStateSlice = createSlice({
  name: "gameStateManager",
  initialState,
  reducers: {
    setGameState: (state, action) => {
      console.log("setGameState dispatched: ", action.payload);
      state.gameState = action.payload;
    },
    resetGameState: (state) => {
      console.log("resetGameState dispatched: ", initialState.gameState);
      state.gameState = initialState.gameState;
    },
  },
});

export const { setGameState, resetGameState } = gameStateSlice.actions;

export default gameStateSlice.reducer;
