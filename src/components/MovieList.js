import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);
  return (
    movies && (
      <div className="-mt-24 relative ">
        <h1 className="pb-3 text-2xl font-bold pl-4">{title}</h1>
        <div className="flex overflow-x-auto  relative ml-10">
          <div className="flex mb-24 ">
            {movies.map((movie) => (
              <MovieCard key={movie.id} poster={movie.poster_path} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieList;
