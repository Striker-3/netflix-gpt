import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    movies && (
      <div className="-mt-24 relative">
        <h1 className="pb-3 text-lg md:text-2xl font-bold pl-10">{title}</h1>
        <div className="flex ml-10">
          <div className="flex mb-32 overflow-x-auto whitespace-nowrap">
            {movies.map((movie) => (
              <div className="flex-shrink-0">
                <MovieCard key={movie.id} poster={movie.poster_path} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieList;
