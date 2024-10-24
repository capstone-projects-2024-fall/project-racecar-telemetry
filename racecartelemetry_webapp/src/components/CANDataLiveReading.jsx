import { useEffect, useState } from 'react';
import { db } from '@firebaseConfig';  // Firebase config file
import { ref, onValue } from "firebase/database";  // Firebase Realtime Database functions
import DataDisplay from '@components/DataDisplay';

const DataDisplay = ({ canID }) => {
  const [canData, setCanData] = useState(null);

  useEffect(() => {
    if (!canID) return;

    // Reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `CANdata/${canID}`);

    // If your data is nested under unique keys (e.g., timestamps), fetch the last entry
    const dataQuery = query(dataRef, limitToLast(1));

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataQuery, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val();
        const latestData = Object.values(dataObj)[0];  // Get the latest data entry

        setCanData(latestData);
      } else {
        setCanData(null);
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID]);

  // Prepare the data for rendering
  const telemetryData = canData
    ? [
        { label: "Longitude", value: canData.X || 'N/A' },
        { label: "Latitude", value: canData.Y || 'N/A' },
        { label: "Vertical", value: canData.Z || 'N/A' },
        { label: "Timestamp", value: canData.Time || 'N/A' },
        { label: "Temperature", value: canData.Temp || 'N/A' },
      ]
    : [];

  return (
    <div>
      <h2>Live CAN Data for CAN ID: {canID}</h2>
      {canData ? (
        <DataDisplay data={telemetryData} />  
      ) : (
        <p>No data available for CAN ID: {canID}</p>
      )}
    </div>
  );
};

export default DataDisplay;
