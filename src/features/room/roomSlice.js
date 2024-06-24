import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {
    id: null,
    players: [],
    status: null
  }
};

export const roomSlice = createSlice({
  name: "roomManager",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.room = action.payload;
    },
  },
});

export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;
