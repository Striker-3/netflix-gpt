// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlQMC0n_XaK0IIXd7xfyLKW8fXGAA2_zY",
  authDomain: "netflixgpt-c901d.firebaseapp.com",
  projectId: "netflixgpt-c901d",
  storageBucket: "netflixgpt-c901d.firebasestorage.app",
  messagingSenderId: "441237960851",
  appId: "1:441237960851:web:524ba3babcaeaf91957566",
  measurementId: "G-7TD2E1SV5M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
