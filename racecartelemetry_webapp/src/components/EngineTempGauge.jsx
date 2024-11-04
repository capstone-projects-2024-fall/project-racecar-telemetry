import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'; 
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { db } from "@firebaseConfig";
import { ref, onValue } from "firebase/database";
import theme from "@/app/theme";

const EngineTempGauge = ({ canID }) => {
  const [engineTemp, setEngineTemp] = useState(0);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  useEffect(() => {
    if (!canID) return;

    const dataRef = ref(db, `CANdata/${canID}`);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();
        setEngineTemp(canData.Temp);
      }
    });

    return () => unsubscribe();
  }, [canID]);

  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
  const displayedTemp = isFahrenheit ? convertToFahrenheit(engineTemp) : engineTemp;

  const toggleTemperatureUnit = () => setIsFahrenheit(!isFahrenheit);

  return (
    <div style={{ padding: 3, width: "100%", height: "100%", maxWidth: "100%", margin: '0 auto' }}>
      <div style={{ textAlign: "center", color:"grey"}}>
        <button onClick={toggleTemperatureUnit} style={{ fontSize: "16px" }}>
          Show in {isFahrenheit ? "Celsius" : "Fahrenheit"}
        </button>
      </div>

      <Plot
        data={[
          {
            type: "indicator",
            mode: "gauge+number",
            value: displayedTemp,
            gauge: {
              axis: {
                range: isFahrenheit ? [0, 700] : [0, 550],
                tickcolor: "white"
              },
              bar: { color: `${theme.palette.primary.main}` },
              steps: [
                { range: isFahrenheit ? [233, 466] : [183, 366], color: "lightgray" },
                { range: isFahrenheit ? [466, 700] : [366, 550], color: "gray" },
              ],
            },
          },
        ]}
        layout={{
          autosize: true,
          responsive: true,
          margin: { t: 30, b: 30, l: 30, r: 30 }, // Adds padding within the plot to avoid overflow
          title: {
            text: `Engine Temperature (${isFahrenheit ? "F" : "C"})`,
            font: { color: "white" }
          },
          font: { color: "white" },
          paper_bgcolor: "rgba(0, 0, 0, 0)",
          plot_bgcolor: "rgba(0, 0, 0, 0)"
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "100%" }} // Makes the plot take full space of the container
      />
    </div>
  );
};

export default EngineTempGauge;
