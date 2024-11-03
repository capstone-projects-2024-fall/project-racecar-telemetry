import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'; 
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { db } from "@firebaseConfig";
import { ref, onValue } from "firebase/database";
import theme from "@/app/theme";

const DataGauge = ({ canID, metricKey, title, maxPrimaryRange = 550, maxSecondaryRange = 700, primaryUnit = "C", secondaryUnit }) => {
  const [metricValue, setMetricValue] = useState(0);
  const [isSecondaryUnit, setIsSecondaryUnit] = useState(false);

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
  const convertToMPH = (kmh) => kmh * 0.621371;

  const displayedValue =
    metricKey === "Temp" && isSecondaryUnit
      ? convertToFahrenheit(metricValue)
      : metricKey === "Speed" && isSecondaryUnit
      ? convertToMPH(metricValue)
      : metricValue;

  const toggleUnit = () => setIsSecondaryUnit(!isSecondaryUnit);

  return (
    <div style={{ padding: 10, width: "100%", height: "100%", maxWidth: "100%", margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "0.5rem" }}>
        {secondaryUnit && (
          <button onClick={toggleUnit} style={{ fontSize: "14px", marginBottom: "0.3rem", color: "grey"}}>
            Show in {isSecondaryUnit ? primaryUnit : secondaryUnit}
          </button>
        )}
        <div style={{ fontSize: "18px", color: "white", fontWeight: "bold" }}>
          {title} ({isSecondaryUnit ? secondaryUnit : primaryUnit})
        </div>
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
          margin: { t: 0, b: 0, l: 20, r: 25 }, // Reduced margins to fit inside container
          font: { color: "white" },
          paper_bgcolor: "rgba(0, 0, 0, 0)",
          plot_bgcolor: "rgba(0, 0, 0, 0)"
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "250px", maxWidth: "100%" }} // Limit the height to fit inside the card
      />
    </div>
  );
};

export default DataGauge;
