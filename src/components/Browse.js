import { signOut } from "firebase/auth";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { MOVIE_API_OPTIONS, USER_LOGO } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const Browse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
    console.log(json.results);
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return (
    <div className="flex justify-between">
      <Header />
      <div className="flex mt-8">
        <img className="w-12 mr-2" src={USER_LOGO} alt="icon-Netflix" />
        <p className="mr-6 p-4 cursor-pointer" onClick={handleSignOut}>
          (Sign Out)
        </p>
      </div>
    </div>
  );
};

export default Browse;
