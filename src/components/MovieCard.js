import React from "react";
import { MOVIE_POSTER_URL } from "../utils/constants";

const MovieCard = ({ poster }) => {
  if (!poster) return null;
  return (
    <div className="w-48 mr-4">
      <img src={MOVIE_POSTER_URL + poster} alt="movie poster" />
    </div>
  );
};

export default MovieCard;
