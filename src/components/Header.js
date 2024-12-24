import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { NETFLIX_LOGO } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLang } from "../utils/langSlice";

const Header = () => {
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  // const language = useSelector((store) => store.lang.lang);
  const navigate = useNavigate();
  const handleLangChange = (e) => {
    dispatch(changeLang(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);
  const handleBack = () => {
    dispatch(toggleGptSearch());
  };
  return (
    <div className="flex  flex-col justify-between md:flex-row md:pr-8 bg-black   md:bg-opacity-5">
      <div className="flex items-center justify-center w-full  md:w-auto">
        <img
          className="w-32 md:w-48 mx-6 my-3 z-40"
          src={NETFLIX_LOGO}
          alt="Logo"
        />
        {showGptSearch && (
          <button
            className="text-white p-2 m-2 rounded-lg bg-purple-500 md:hidden"
            onClick={handleBack}
          >
            Back
          </button>
        )}
      </div>
      {showGptSearch && (
        <div className="flex items-center justify-center w-full md:w-auto">
          <select
            className="mr-5 p-2 bg-gray-800 text-white rounded-lg mb-4 md:mb-0"
            onChange={handleLangChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            className="hidden md:block md:bg-purple-500 md:rounded-lg text-white p-2 m-2 px-4"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
