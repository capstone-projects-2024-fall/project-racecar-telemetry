import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'; 
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { db } from "@firebaseConfig";
import { ref, onValue } from "firebase/database";
import theme from "@/app/theme";

const DataGauge = ({ canID, metricKey, title, maxCelsiusRange = 550, maxFahrenheitRange = 700 }) => {
  const [metricValue, setMetricValue] = useState(0);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  useEffect(() => {
    if (!canID || !metricKey) return;

    const dataRef = ref(db, `CANdata/${canID}`);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();
        if (canData[metricKey] !== undefined) {
          setMetricValue(canData[metricKey]);
        }
      }
    });

    return () => unsubscribe();
  }, [canID, metricKey]);

  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
  const displayedValue = isFahrenheit && metricKey === "Temp" ? convertToFahrenheit(metricValue) : metricValue;

  const toggleTemperatureUnit = () => setIsFahrenheit(!isFahrenheit);

  return (
    <div style={{ padding: 3, width: "100%", height: "100%", maxWidth: "100%", margin: '0 auto' }}>
      <div style={{ textAlign: "center", color: "grey" }}>
        {metricKey === "Temp" && (
          <button onClick={toggleTemperatureUnit} style={{ fontSize: "16px" }}>
            Show in {isFahrenheit ? "Celsius" : "Fahrenheit"}
          </button>
        )}
      </div>

      <Plot
        data={[
          {
            type: "indicator",
            mode: "gauge+number",
            value: displayedValue,
            gauge: {
              axis: {
                range: isFahrenheit ? [0, maxFahrenheitRange] : [0, maxCelsiusRange],
                tickcolor: "white"
              },
              bar: { color: `${theme.palette.primary.main}` },
              steps: [
                { range: isFahrenheit ? [233, 466] : [183, 366], color: "lightgray" },
                { range: isFahrenheit ? [466, maxFahrenheitRange] : [366, maxCelsiusRange], color: "gray" },
              ],
            },
          },
        ]}
        layout={{
          autosize: true,
          responsive: true,
          margin: { t: 30, b: 30, l: 30, r: 30 },
          title: {
            text: `${title} (${isFahrenheit && metricKey === "Temp" ? "F" : "C"})`,
            font: { color: "white" }
          },
          font: { color: "white" },
          paper_bgcolor: "rgba(0, 0, 0, 0)",
          plot_bgcolor: "rgba(0, 0, 0, 0)"
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default DataGauge;
