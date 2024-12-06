import Header from "./Header";
import { useRef, useState } from "react";
import { formValidation } from "../utils/formValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMG } from "../utils/constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleValidation = () => {
    const message = formValidation(email.current.value, password.current.value);
    setErrorMessage(message);
    // console.log(password);

    // if there is message that means , validation failed;
    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div className="relative h-screen overflow-hidden">
      <Header />
      <div>
        <img className="opacity-80" src={BACKGROUND_IMG} alt="background" />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Centered Form */}
        <div className="absolute inset-0 flex items-center justify-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-black p-8 rounded-lg shadow-lg flex flex-col items-center w-4/12  bg-opacity-70"
          >
            <h3 className="text-3xl font-bold mb-8 text-center text-white">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h3>
            {!isSignIn && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="p-3 mb-8 w-4/6   border rounded bg-black text-white"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="p-3 mb-8 w-4/6   border rounded bg-black text-white"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-3 mb-6 w-4/6 border rounded bg-black text-white "
            />
            <p className="text-red-500 mb-8">{errorMessage}</p>
            <button
              type="submit"
              className="w-4/6 p-2 bg-red-600 text-white rounded mb-8"
              onClick={handleValidation}
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
            <p
              className="text-white mb-12 cursor-pointer"
              onClick={toggleSignIn}
            >
              {isSignIn
                ? " New to Netflilx ? Sign Up Now."
                : "Already Registered ? Sign In Now."}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
