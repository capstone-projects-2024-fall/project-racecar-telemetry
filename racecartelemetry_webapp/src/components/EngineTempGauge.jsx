import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { db } from "@firebaseConfig";  // Import Firebase config
import { ref, onValue } from "firebase/database";  // Firebase Realtime Database functions

const EngineTempGauge = ({ canID }) => {
  const [engineTemp, setEngineTemp] = useState(0);  // State to store the temperature in Celsius
  const [isFahrenheit, setIsFahrenheit] = useState(false);  // State to toggle between Celsius and Fahrenheit

  useEffect(() => {
    if (!canID) return;

    // Reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `CANdata/${canID}`);

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();
        setEngineTemp(canData.Temp);  // Assume the value from Firebase is in Celsius
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID]);

  // Function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  // Determine the displayed temperature based on the toggle state
  const displayedTemp = isFahrenheit ? convertToFahrenheit(engineTemp) : engineTemp;

  // Toggle between Celsius and Fahrenheit
  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  return (
    <div style={{ padding: 10, width: 600, margin: '0 auto' }}>
      {/* Container to center the button within the component */}
      <div style={{ textAlign: "center"}}>
        <button onClick={toggleTemperatureUnit} style={{ fontSize: "16px" }}>
          Show in {isFahrenheit ? "Celsius" : "Fahrenheit"}
        </button>
      </div>

      {/* Display the gauge with the selected temperature unit */}
      <Plot
        data={[
          {
            type: "indicator",
            mode: "gauge+number",
            value: displayedTemp,  // Dynamically set the gauge value based on the selected unit
            gauge: {
              axis: {
                range: isFahrenheit ? [32, 400] : [0, 250],  // Adjust range for Fahrenheit or Celsius
              },
              bar: { color: "red" },
              steps: [
                { range: isFahrenheit ? [32, 200] : [0, 100], color: "lightgray" },
                { range: isFahrenheit ? [200, 400] : [100, 250], color: "gray" },
              ],
            },
          },
        ]}
        layout={{
          width: 600,
          height: 400,
          title: `Engine Temperature (${isFahrenheit ? "F" : "C"})`,
        }}
      />
    </div>
  );
};

export default EngineTempGauge;
