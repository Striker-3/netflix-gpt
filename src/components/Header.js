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
import lang from "../utils/languageConstants";
const Header = () => {
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const language = useSelector((store) => store.lang.lang);
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
  return showGptSearch ? (
    <div className="flex justify-between pr-8 ">
      <div>
        <img className="w-48 mx-6 my-3 z-40" src={NETFLIX_LOGO} alt="Logo" />
      </div>
      <div>
        <select
          className="mr-5 p-2 bg-gray-800 text-white rounded-lg"
          onChange={handleLangChange}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>
        <button
          className="text-white bg-purple-500 p-4 mt-8 "
          onClick={handleBack}
        >
          Back to Home
        </button>
      </div>
    </div>
  ) : (
    <div>
      <img className="w-48 mx-6 my-3 z-40" src={NETFLIX_LOGO} alt="Logo" />
    </div>
  );
};

export default Header;
