import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBxEzUYz67esB6pM9DdDlFG_Z-aoqMXBT4",
  authDomain: "race-car-telemetry.firebaseapp.com",
  projectId: "race-car-telemetry",
  storageBucket: "race-car-telemetry.appspot.com",
  messagingSenderId: "819026721519",
  appId: "1:819026721519:web:3383f6afbdd27e633cb91a",
  measurementId: "G-9VZ794ZRFC",
  databaseURL: "https://race-car-telemetry-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

const dbFirestore = getFirestore(app)

// Optionally initialize Analytics for client-side usage only
let analytics;
if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
  analytics = getAnalytics(app);
}

export { app, db, dbFirestore, analytics };
