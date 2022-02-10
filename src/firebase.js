// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCCTSC_zWS2KOqAJDiys1OC-wqSa8aVbBA",
  authDomain: "sugar-4e94c.firebaseapp.com",
  databaseURL: "https://sugar-4e94c-default-rtdb.firebaseio.com",
  projectId: "sugar-4e94c",
  storageBucket: "sugar-4e94c.appspot.com",
  messagingSenderId: "187458981557",
  appId: "1:187458981557:web:2cf55a88503d2a0dc7f8fc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
