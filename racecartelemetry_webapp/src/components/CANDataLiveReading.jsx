import { useEffect, useState } from 'react';
import { db } from '@firebaseConfig';  // Firebase config file
import { ref, onValue } from "firebase/database";  // Firebase Realtime Database functions

const CANDataLiveReading = ({ canID }) => {  // Accept canID as a prop
  const [canData, setCanData] = useState(null);  // State to store CAN data

  useEffect(() => {
    if (!canID) return;  // If no canID is provided, do nothing

    // Create a reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `CANdata/${canID}`);  // Use dynamic canID to reference the correct node

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setCanData(snapshot.val());  // Update the state with real-time data
      } else {
        setCanData(null);  // Handle case when no data exists
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID]);  // Re-run effect when canID changes

  return (
    <div>
      <h2>Live CAN Data for CAN ID: {canID}</h2>
      {canData ? (
        <ul>
          <li>Longitude: {canData.X}</li>
          <li>Latitude: {canData.Y}</li>
          <li>Vertical: {canData.Z}</li>
          <li>Timestamp: {canData.Time}</li>
          <li>Temperature: {canData.Temp}</li>
        </ul>
      ) : (
        <p>No data available for CAN ID: {canID}</p>
      )}
    </div>
  );
};

export default CANDataLiveReading;
