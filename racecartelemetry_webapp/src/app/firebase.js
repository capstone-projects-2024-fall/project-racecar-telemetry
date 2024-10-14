// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxEzUYz67esB6pM9DdDlFG_Z-aoqMXBT4",
  authDomain: "race-car-telemetry.firebaseapp.com",
  projectId: "race-car-telemetry",
  storageBucket: "race-car-telemetry.appspot.com",
  messagingSenderId: "819026721519",
  appId: "1:819026721519:web:3383f6afbdd27e633cb91a",
  measurementId: "G-9VZ794ZRFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//export const auth = getAuth(app); for use with auth later
//export const db = getFirestore(app); firesore for later