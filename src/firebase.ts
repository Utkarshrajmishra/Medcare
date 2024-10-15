// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEG3T4OCyTRwk9t1TzDozZXyqHCNUTO7I",
  authDomain: "wecare-77108.firebaseapp.com",
  projectId: "wecare-77108",
  storageBucket: "wecare-77108.appspot.com",
  messagingSenderId: "797250410755",
  appId: "1:797250410755:web:fe3fb6b8cc704117203136",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);
export const storageRef=getStorage(app);


