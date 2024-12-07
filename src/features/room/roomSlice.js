import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {
    id: null,
    players: {},
    images: null,
  },
};

export const roomSlice = createSlice({
  name: "roomManager",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      console.log("setRoom dispatched:", action.payload);
      state.room = action.payload;
    },
    resetRoom: (state) => {
      state.room = initialState.room;
    },
    setPlayers: (state, action) => {
      console.log("setPlayers dispatched:", action.payload);
      state.room.players = action.payload;
    },
    setImages: (state, action) => {
      if (action.payload) {
        // Convert Map to Array - array looks exactly like the map and order of the items is preserved, allowing the use of array .map() function.
        // This is because Map keys are indices starting from 0, exactly like in the array.
        state.room.images = Object.values(action.payload);
      }
    },
  },
});

export const { setRoom, resetRoom, setPlayers, setImages } = roomSlice.actions;

export default roomSlice.reducer;
