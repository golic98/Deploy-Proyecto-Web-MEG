// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPxGl1fv1FpOlzMiSlDH6HCNCFmHmxo3Y",
  authDomain: "proyecto-web-7f689.firebaseapp.com",
  projectId: "proyecto-web-7f689",
  storageBucket: "proyecto-web-7f689.firebasestorage.app",
  messagingSenderId: "61399805793",
  appId: "1:61399805793:web:a47b1e8c29feea83ac1f20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;