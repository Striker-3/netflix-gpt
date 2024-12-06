import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    nowPlayingTrailers: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addNowPlayingTrailers: (state, action) => {
      state.nowPlayingTrailers = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addNowPlayingTrailers } =
  moviesSlice.actions;
export default moviesSlice.reducer;
