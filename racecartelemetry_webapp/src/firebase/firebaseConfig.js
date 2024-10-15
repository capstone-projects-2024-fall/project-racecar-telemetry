import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

let app;
let database;
let analytics;

if (typeof window !== "undefined") {
    const firebaseConfig = {
        apiKey: "AIzaSyBxEzUYz67esB6pM9DdDlFG_Z-aoqMXBT4",
        authDomain: "race-car-telemetry.firebaseapp.com",
        projectId: "race-car-telemetry",
        storageBucket: "race-car-telemetry.appspot.com",
        messagingSenderId: "819026721519",
        appId: "1:819026721519:web:3383f6afbdd27e633cb91a",
        measurementId: "G-9VZ794ZRFC"
    };
    

  app = initializeApp(firebaseConfig);
  database = getDatabase(app);

  if (window.location.hostname !== "localhost") {
    analytics = getAnalytics(app);
  }
}

export { app, database, analytics };


