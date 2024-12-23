import { useDispatch, useSelector } from "react-redux";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { useCallback, useEffect } from "react";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);
  const getTopRatedMovies = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  }, [dispatch]);

  useEffect(() => {
    if (!topRatedMovies) getTopRatedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topRatedMovies, getTopRatedMovies]);
  return topRatedMovies;
};

export default useTopRatedMovies;
