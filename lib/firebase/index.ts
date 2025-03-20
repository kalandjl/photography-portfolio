// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4ubhmhfONro57AdkWi1SZbUXJvGKB_mk",
  authDomain: "photography-portfolio-e32a8.firebaseapp.com",
  projectId: "photography-portfolio-e32a8",
  storageBucket: "photography-portfolio-e32a8.firebasestorage.app",
  messagingSenderId: "785098162624",
  appId: "1:785098162624:web:4bbff194c3c87491f38825",
  measurementId: "G-244L0B69C9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
