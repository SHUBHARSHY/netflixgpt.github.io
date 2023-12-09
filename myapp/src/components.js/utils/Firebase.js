// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIqr0iTvB1gySDF-nCD87JngAHxgA3lX8",
  authDomain: "netflixclone-580.firebaseapp.com",
  projectId: "netflixclone-580",
  storageBucket: "netflixclone-580.appspot.com",
  messagingSenderId: "790860995726",
  appId: "1:790860995726:web:8bbee37fea231d887dfddf",
  measurementId: "G-H5DW66TZR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);