import Header from "./Header";
import { useRef, useState } from "react";
import { formValidation } from "../utils/formValidation";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);

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
          console.log(user);
          navigate("/browse");
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
          navigate("/");
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
    <div className="relative">
      <Header />
      <div>
        <img
          className="opacity-80"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/IN-en-20241104-TRIFECTA-perspective_55263ea2-af7f-40ed-9cf0-7029a9b9baf4_large.jpg"
          alt="background"
        />
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
