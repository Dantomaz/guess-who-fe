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
      if (action.payload.cards) {
        // Convert Map to Array - array looks exactly like the map and order of the items is preserved, allowing the use of array .map() function
        // This is because Map keys are indices starting from 0, exactly like in the array
        action.payload.cards = Object.values(action.payload.cards);
      }
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
