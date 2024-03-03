// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from  'firebase/firestore';
import {getStorage} from 'firebase/storage'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS9s5ganOHeyZjm1WGexrjp4BN6W2M9WI",
  authDomain: "social-media-project-980be.firebaseapp.com",
  projectId: "social-media-project-980be",
  storageBucket: "social-media-project-980be.appspot.com",
  messagingSenderId: "678938642680",
  appId: "1:678938642680:web:3864348870cc4de5d2930d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app)
