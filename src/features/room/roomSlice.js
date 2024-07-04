import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {
    id: null,
    players: {},
    status: null,
  },
};

export const roomSlice = createSlice({
  name: "roomManager",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      console.log("setRoom dispatched: ", action.payload);
      state.room = action.payload;
    },
    resetRoom: (state) => {
      state.room = initialState.room;
    },
  },
});

export const { setRoom, resetRoom } = roomSlice.actions;

export default roomSlice.reducer;
