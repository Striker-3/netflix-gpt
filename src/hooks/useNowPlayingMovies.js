import { useCallback, useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { MOVIE_API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (state) => state.movies.nowPlayingMovies
  );
  const getNowPlayingMovies = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  }, [dispatch]);

  useEffect(() => {
    if (!nowPlayingMovies) getNowPlayingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPlayingMovies, getNowPlayingMovies]);
  return nowPlayingMovies;
};

export default useNowPlayingMovies;
