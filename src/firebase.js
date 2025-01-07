// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5zjTCDTlPX3MJaABXNevZXaIXGoUNxiE",
  authDomain: "windsurfonlineno1.firebaseapp.com",
  projectId: "windsurfonlineno1",
  storageBucket: "windsurfonlineno1.firebasestorage.app",
  messagingSenderId: "446968811310",
  appId: "1:446968811310:web:3650d1f9384cd5739634bf",
  measurementId: "G-3783T9ENS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);