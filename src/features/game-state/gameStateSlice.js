import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameState: {
    status: null,
    cards: null,
    cardNrChosenByBlue: null,
    cardNrChosenByRed: null,
    votesBlue: null,
    votesRed: null,
    currentTurn: null,
    winner: null,
  },
};

export const gameStateSlice = createSlice({
  name: "gameStateManager",
  initialState,
  reducers: {
    setGameState: (state, action) => {
      console.log("setGameState dispatched: ", action.payload);
      state.gameState = action.payload;
      if (action.payload.cards) {
        // Convert Map to Array - array looks exactly like the map and order of the items is preserved, allowing the use of array .map() function
        // This is because Map keys are indices starting from 0, exactly like in the array
        state.gameState.cards = Object.values(action.payload.cards);
      }
    },
    resetGameState: (state) => {
      console.log("resetGameState dispatched: ", initialState.gameState);
      state.gameState = initialState.gameState;
    },
  },
});

export const { setGameState, resetGameState } = gameStateSlice.actions;

export default gameStateSlice.reducer;
