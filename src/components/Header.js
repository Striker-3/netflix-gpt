import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { NETFLIX_LOGO } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const navigate = useNavigate();

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
        <button
          className="text-white bg-purple-500 p-4 mt-8"
          onClick={handleBack}
        >
          Back to home
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
