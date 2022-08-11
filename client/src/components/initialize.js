// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSFfWJoPwCZBjZ1GfgSQdjKQGTSfuROok",
  authDomain: "chronos-2cda9.firebaseapp.com",
  projectId: "chronos-2cda9",
  storageBucket: "chronos-2cda9.appspot.com",
  messagingSenderId: "987574830352",
  appId: "1:987574830352:web:9c8ea5adf78f7f79f55195",
  measurementId: "G-E7TMGHPQ9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);