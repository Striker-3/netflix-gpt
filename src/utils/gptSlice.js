import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovies: [],
    gptResults: [],
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMoviesAndResults: (state, action) => {
      const { gptMovies, gptResults } = action.payload;
      state.gptMovies = gptMovies;
      state.gptResults = gptResults;
    },
  },
});

export const { toggleGptSearch, addGptMoviesAndResults } = gptSlice.actions;
export default gptSlice.reducer;
