import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { gptMovies, gptResults } = useSelector((store) => store.gpt);

  return (
    <div className="m-2 mt-6  p-4 bg-black text-white bg-opacity-80">
      <div className="mt-32">
        {gptMovies.map((movie, index) => (
          <MovieList key={index} title={movie} movies={gptResults[index]} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
