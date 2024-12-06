import { signOut } from "firebase/auth";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { USER_LOGO } from "../utils/constants";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from "./MainContainer.js";
import SecondaryContainer from "./SecondaryContainer.js";

const Browse = () => {
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
  return (
    <div>
      <div className="flex justify-between">
        <Header />
        <div className="flex mt-8">
          <img className="w-12 mr-2" src={USER_LOGO} alt="icon-Netflix" />
          <p className="mr-6 p-4 cursor-pointer" onClick={handleSignOut}>
            (Sign Out)
          </p>
        </div>
      </div>
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
