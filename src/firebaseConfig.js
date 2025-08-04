// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBiBQbUlIENX9HlRwJoV0fzZi0hMEiKaP8",
  authDomain: "library-28061.firebaseapp.com",
  databaseURL: "https://library-28061-default-rtdb.firebaseio.com",
  projectId: "library-28061",
  storageBucket: "library-28061.firebasestorage.app",
  messagingSenderId: "1065400499558",
  appId: "1:1065400499558:web:851a8b14a9cd6f4ab11ca7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };