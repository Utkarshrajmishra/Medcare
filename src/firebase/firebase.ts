// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG7TuTyqP9cNHvOTc-uggULMXexjGjyW0",
  authDomain: "medicare-8ff9b.firebaseapp.com",
  projectId: "medicare-8ff9b",
  storageBucket: "medicare-8ff9b.appspot.com",
  messagingSenderId: "1073478350215",
  appId: "1:1073478350215:web:77b88fd9845349638e8f22",
  measurementId: "G-7NP1YV5869",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
