import { useEffect } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingTrailers } from "../utils/moviesSlice";

const VideoBackground = ({ movieId }) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector(
    (store) => store?.movies?.nowPlayingTrailers
  );
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
    console.log(trailer);
    dispatch(addNowPlayingTrailers(trailer));
  };

  useEffect(() => {
    videoTrailer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {trailerVideo && trailerVideo.key ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailerVideo.key}?si=5QOYzQl1XUQIXsuW`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      ) : (
        <p>Loading trailer...</p>
      )}
    </div>
  );
};

export default VideoBackground;
