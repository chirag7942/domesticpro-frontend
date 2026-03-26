import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIz1ON8KWNvm2KxwjxgdJ2XaEy__LxWYY",
  authDomain: "domestic-pro.firebaseapp.com",
  projectId: "domestic-pro",
  storageBucket: "domestic-pro.firebasestorage.app",
  messagingSenderId: "72867470720",
  appId: "1:72867470720:web:8b3609eff5d149421ab565",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
