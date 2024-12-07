import { useDispatch } from "react-redux";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { addNowPlayingTrailers } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const videoTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      MOVIE_API_OPTIONS
    );

    const json = await data.json();
    const filterTrailer = json.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterTrailer.length ? filterTrailer[0] : json.results[0];

    dispatch(addNowPlayingTrailers(trailer));
  };

  useEffect(() => {
    videoTrailer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMovieTrailer;
