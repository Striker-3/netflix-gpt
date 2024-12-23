import { useDispatch, useSelector } from "react-redux";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useCallback, useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const getPopularMovies = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  }, [dispatch]);

  useEffect(() => {
    if (!popularMovies) getPopularMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popularMovies, getPopularMovies]);
  return popularMovies;
};

export default usePopularMovies;
