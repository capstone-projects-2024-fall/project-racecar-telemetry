import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebaseConfig"; // Adjust the path as needed

const dbConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const connectedRef = ref(db, ".info/connected");
    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  }, []);

  return isConnected;
};

export default dbConnectionStatus;
