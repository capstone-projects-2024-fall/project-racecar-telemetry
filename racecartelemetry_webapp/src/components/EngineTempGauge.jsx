import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'; 
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { db } from "@firebaseConfig";
import { ref, onValue } from "firebase/database";
import theme from "@/app/theme";

const DataGauge = ({ canID, metricKey, title, maxPrimaryRange = 550, maxSecondaryRange = 700, primaryUnit = "C", secondaryUnit = "F" }) => {
  const [metricValue, setMetricValue] = useState(0);
  const [isSecondaryUnit, setIsSecondaryUnit] = useState(false); // Tracks which unit to display

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

  // Conversion functions for temperature and speed
  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
  const convertToMPH = (kmh) => kmh * 0.621371;

  // Determine the displayed value based on the selected unit
  const displayedValue =
    metricKey === "Temp" && isSecondaryUnit
      ? convertToFahrenheit(metricValue)
      : metricKey === "Speed" && isSecondaryUnit
      ? convertToMPH(metricValue)
      : metricValue;

  // Toggle the unit based on metric type
  const toggleUnit = () => setIsSecondaryUnit(!isSecondaryUnit);

  return (
    <div style={{ padding: 3, width: "100%", height: "100%", maxWidth: "100%", margin: '0 auto' }}>
      <div style={{ textAlign: "center", color: "grey" }}>
        {(metricKey === "Temp" || metricKey === "Speed") && (
          <button onClick={toggleUnit} style={{ fontSize: "16px" }}>
            Show in {isSecondaryUnit ? primaryUnit : secondaryUnit}
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
                range: isSecondaryUnit ? [0, maxSecondaryRange] : [0, maxPrimaryRange],
                tickcolor: "white"
              },
              bar: { color: `${theme.palette.primary.main}` },
              steps: [
                { range: isSecondaryUnit ? [maxSecondaryRange * 0.33, maxSecondaryRange * 0.66] : [maxPrimaryRange * 0.33, maxPrimaryRange * 0.66], color: "lightgray" },
                { range: isSecondaryUnit ? [maxSecondaryRange * 0.66, maxSecondaryRange] : [maxPrimaryRange * 0.66, maxPrimaryRange], color: "gray" },
              ],
            },
          },
        ]}
        layout={{
          autosize: true,
          responsive: true,
          margin: { t: 30, b: 30, l: 30, r: 30 },
          title: {
            text: `${title} (${isSecondaryUnit ? secondaryUnit : primaryUnit})`,
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
