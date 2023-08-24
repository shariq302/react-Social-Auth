// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider, getAuth,GithubAuthProvider,GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCABI2h7R4WaCEOYX3UhiQYo8ncqLbLSYg",
  authDomain: "socialauth-22fe5.firebaseapp.com",
  projectId: "socialauth-22fe5",
  storageBucket: "socialauth-22fe5.appspot.com",
  messagingSenderId: "752914579327",
  appId: "1:752914579327:web:0a7679fd9145ced5c3644a",
  measurementId: "G-35HXF3N042",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const githubProvider = new GithubAuthProvider();
