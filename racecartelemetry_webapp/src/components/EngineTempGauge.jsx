import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { db } from "@firebaseConfig";  // Import Firebase config
import { ref, onValue } from "firebase/database";  // Firebase Realtime Database functions

const EngineTempGauge = ({ canID }) => {
  const [engineTemp, setEngineTemp] = useState(0);  // State to store the X value

  useEffect(() => {
    if (!canID) return;

    // Reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `CANdata/${canID}`);

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();
        setEngineTemp(canData.X);  // Use the 'X' value from the database for the gauge
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID]);

  return (
    <Plot
      data={[
        {
          type: "indicator",
          mode: "gauge+number",
          value: engineTemp,  // Dynamically set the gauge value to engineTemp (X value)
          gauge: {
            axis: { range: [0, 100] },
            bar: { color: "red" },
            steps: [
              { range: [0, 50], color: "lightgray" },
              { range: [50, 100], color: "gray" },
            ],
          },
        },
      ]}
      layout={{ width: 600, height: 400, title: "Engine Temperature" }}
    />
  );
};

export default EngineTempGauge;
