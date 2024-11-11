import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { db } from "@firebaseConfig";
import { ref, onValue } from "firebase/database";
import theme from "@/app/theme";

const DataGauge = ({
  canID,
  metricKey,
  title,
  maxPrimaryRange = 550,
  maxSecondaryRange = 700,
  primaryUnit = "C",
  secondaryUnit,
  multiplier, 
  startByte,
  length
}) => {
  const [metricValue, setMetricValue] = useState(0);
  const [isSecondaryUnit, setIsSecondaryUnit] = useState(false);

  const parseCAN =  (data) => {
    const bytes = data.split(' ');
    let dataString; 
    for (let i = startByte; i < (startByte+length); i++)
    {
      dataString += bytes[i];
    }
    let translatedData = parseInt(hexString, 16);
    translatedData /= multiplier;
    return translatedData;
  }

  useEffect(() => {
    if (!canID || !metricKey) return;

    const dataRef = ref(db, `CANdata/${canID}`);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();
        const translatedData = parseCAN(canData.Data);
        // if (canData[metricKey] !== undefined) {
        //   setMetricValue(canData[metricKey]);
        // }
        setMetricValue(translatedData);
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
    <div
      style={{
        padding: 5,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: "1rem",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: "0.3rem",
        }}
      >
        {title} ({isSecondaryUnit ? secondaryUnit : primaryUnit})
      </div>
      {secondaryUnit && (
        <button
          onClick={toggleUnit}
          style={{
            fontSize: "0.85rem",
            color: "grey",
            marginBottom: "0.3rem",
          }}
        >
          Show in {isSecondaryUnit ? primaryUnit : secondaryUnit}
        </button>
      )}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "scale(0.85)", // Slightly smaller to fit more comfortably
          transformOrigin: "center",
        }}
      >
        <Plot
          data={[
            {
              type: "indicator",
              mode: "gauge+number",
              value: displayedValue,
              gauge: {
                axis: {
                  range: isSecondaryUnit
                    ? [0, maxSecondaryRange]
                    : [0, maxPrimaryRange],
                  tickcolor: "white",
                },
                bar: { color: `${theme.palette.primary.main}` },
                steps: [
                  {
                    range: isSecondaryUnit
                      ? [maxSecondaryRange * 0.33, maxSecondaryRange * 0.66]
                      : [maxPrimaryRange * 0.33, maxPrimaryRange * 0.66],
                    color: "lightgray",
                  },
                  {
                    range: isSecondaryUnit
                      ? [maxSecondaryRange * 0.66, maxSecondaryRange]
                      : [maxPrimaryRange * 0.66, maxPrimaryRange],
                    color: "gray",
                  },
                ],
              },
            },
          ]}
          layout={{
            autosize: true,
            responsive: true,
            margin: { t: 0, b: 0, l: 10, r: 10 }, // Tight margins
            font: { color: "white" },
            paper_bgcolor: "rgba(0, 0, 0, 0)",
            plot_bgcolor: "rgba(0, 0, 0, 0)",
          }}
          config={{ responsive: true }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default DataGauge;
