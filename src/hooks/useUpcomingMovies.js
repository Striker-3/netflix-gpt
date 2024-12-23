import { useDispatch, useSelector } from "react-redux";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useCallback, useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((state) => state.movies.upcomingMovies);
  const getUpcomingMovies = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  }, [dispatch]);
  useEffect(() => {
    if (!upcomingMovies) {
      getUpcomingMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upcomingMovies, getUpcomingMovies]);
  return upcomingMovies;
};

export default useUpcomingMovies;
