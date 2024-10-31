import { useEffect, useState, useRef } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@firebaseConfig";

const dbConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(null);
  const previousDataRef = useRef(null);

  useEffect(() => {
    const connectedRef = ref(db, "CANdata/001");

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      const currentData = snapshot.val();

      console.log(currentData);

      if (currentData) {
        const currentDataString = JSON.stringify(currentData);

        if (previousDataRef.current === null){
          previousDataRef.current = currentDataString;
        }

        if (previousDataRef.current !== currentDataString) {
          // New data detected, set to connected
          setIsConnected(true);

          // Update the previous data with the new data
          previousDataRef.current = currentDataString;
        } else {
          // No new data, keep it disconnected
          setIsConnected(false);
        }
      } else {
        // No data present, keep as disconnected
        setIsConnected(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return isConnected;
  
};

export default dbConnectionStatus;
