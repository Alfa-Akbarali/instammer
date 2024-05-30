import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import the Firebase Storage module

const firebaseConfig = {
  apiKey: "AIzaSyDTizq5dQ6MCh_4ZtauvIZRJ6xBtCSM8dQ",
  authDomain: "myinstagram-b5a00.firebaseapp.com",
  projectId: "myinstagram-b5a00",
  storageBucket: "myinstagram-b5a00.appspot.com",
  messagingSenderId: "119932472249",
  appId: "1:119932472249:web:507e7e29d5d869e8650468",
  measurementId: "G-BVXTQ6VFZW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Add the Firebase Storage instance to your app

export { app, auth, db, storage }; // Export the Firebase Storage instance along with the others
