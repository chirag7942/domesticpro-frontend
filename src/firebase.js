// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIz1ON8KWNvm2KxwjxgdJ2XaEy__LxWYY",
  authDomain: "domestic-pro.firebaseapp.com",
  projectId: "domestic-pro",
  storageBucket: "domestic-pro.firebasestorage.app",
  messagingSenderId: "72867470720",
  appId: "1:72867470720:web:8b3609eff5d149421ab565",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
