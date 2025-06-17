import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailers";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(
    (store) => store?.movies?.nowPlayingTrailers
  );

  // Fetch the movie trailer
  useMovieTrailer(movieId);

  return (
    <div className="w-full px-4 py-2 bg-black rounded-lg shadow-lg">
      {/* Display YouTube iframe when trailer video is available */}
      {trailerVideo?.key ? (
        <div className="relative w-full pb-[56.25%] rounded-md overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&enablejsapi=1&controls=0&showinfo=0&rel=0&fs=0&iv_load_policy=3&mute=1&playlist=${trailerVideo.key}&loop=1&disablekb=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p className="text-white text-center text-lg py-6">
          Loading trailer...
        </p>
      )}
    </div>

    // <div className="relative w-full h-screen ">
    //   {/* Display YouTube iframe when trailer video is available */}
    //   {trailerVideo?.key ? (
    //     <iframe
    //       className="w-full h-full object-cover "
    //       src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&enablejsapi=1&controls=0&showinfo=0&rel=0&fs=0&iv_load_policy=3&mute=1&playlist=${trailerVideo.key}&loop=1&disablekb=1`}
    //       title="YouTube video player"
    //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //     ></iframe>
    //   ) : (
    //     <p className="text-white text-center">Loading trailer...</p>
    //   )}
    // </div>
  );
};

export default VideoBackground;
