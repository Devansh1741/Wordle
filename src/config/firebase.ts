// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAqV8qgtPJzQkBqC-O41tUVRgr_eM-i3I",
  authDomain: "wordle-d3f93.firebaseapp.com",
  projectId: "wordle-d3f93",
  storageBucket: "wordle-d3f93.appspot.com",
  messagingSenderId: "837524523373",
  appId: "1:837524523373:web:b93f12feffd1ccc4747264"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);