import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcEXp6xv_W5ryuVKcx_wHjI3wwLi1RqXQ",
  authDomain: "sm-db-4e740.firebaseapp.com",
  projectId: "sm-db-4e740",
  storageBucket: "sm-db-4e740.firebasestorage.app", 
  messagingSenderId: "591434534155",
  appId: "1:591434534155:web:f90b30595c8a2fa1f9260e",
  measurementId: "G-2EZRMYYB49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

