import { signOut } from "firebase/auth";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { USER_LOGO } from "../utils/constants";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from "./MainContainer.js";
import SecondaryContainer from "./SecondaryContainer.js";
import usePopularMovies from "../hooks/usePopularMovies.js";
import useTopRatedMovies from "../hooks/useTopRatedMovies.js";
import useUpcomingMovies from "../hooks/useUpcomingMovies.js";
import { useDispatch, useSelector } from "react-redux";
import { toggleGptSearch } from "../utils/gptSlice.js";
import GptSearchPage from "./GptSearchPage.js";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Movies into the store
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const handleGptSearch = () => {
    dispatch(toggleGptSearch());
  };

  return !showGptSearch ? (
    <div>
      <div className="relative">
        <div className="flex justify-between bg-gradient-to-b from-black h-20 absolute w-full z-50">
          <Header />
          <div className="flex mt-8">
            <button
              className="text-white  bg-purple-500 mr-8 px-4 rounded-lg"
              onClick={handleGptSearch}
            >
              GPT Search
            </button>
            <img className="w-12 mr-2" src={USER_LOGO} alt="icon-Netflix" />
            <p
              className="mr-6 p-4 cursor-pointer text-white"
              onClick={handleSignOut}
            >
              (Sign Out)
            </p>
          </div>
        </div>
        <MainContainer />
      </div>
      <div>
        <SecondaryContainer />
      </div>
    </div>
  ) : (
    <>
      <Header />
      <GptSearchPage />
    </>
  );
};

export default Browse;
