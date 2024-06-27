// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqBCdhTpOPiz5zlH-Px9qglnQW7UHjLwo",
  authDomain: "kullanici-47cab.firebaseapp.com",
  projectId: "kullanici-47cab",
  storageBucket: "kullanici-47cab.appspot.com",
  messagingSenderId: "885170016016",
  appId: "1:885170016016:web:592bff676daa27c54fdf95",
  measurementId: "G-7XV4DL014B"
};

// Firebase'i başlattım
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
