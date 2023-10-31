// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV_hbR339Wwqv2XLsFVmsJiNMsdtUMG50",
  authDomain: "workout-tracker-e5479.firebaseapp.com",
  projectId: "workout-tracker-e5479",
  storageBucket: "workout-tracker-e5479.appspot.com",
  messagingSenderId: "442632712724",
  appId: "1:442632712724:web:bb6e9d26447ae1e610ad01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(app);
const authInformation = getAuth(app);

const db = getFirestore(app);

export { googleProvider, authInformation, db };

// firebase login
// firebase init
// firebase deploy
