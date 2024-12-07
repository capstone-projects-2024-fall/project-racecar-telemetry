import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database";
import { db } from "@firebaseConfig";
// import theme from "@/app/theme";
// import SettingsIcon from "@mui/icons-material/Settings";
// import IconButton from "@mui/material/IconButton";
// import { Modal } from "@mui/material";
// import ComponentEditor from "@/components/ComponentEditor";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const DataGauge = ({ uniqueID }) => {
  const [metricValue, setMetricValue] = useState(0);
  // const [settingsVisible, setSettingsVisible] = useState(false);

  const storedConfig = JSON.parse(localStorage.getItem(`Gauge-${uniqueID}`));

  const initialConfig = {
    canID: storedConfig.canID || "CAN ID",
    dataChannel: storedConfig.dataChannel || "Data Channel",
    color: storedConfig.config?.Color || "Red", 
    min: storedConfig.config?.["Min Value"] || 0, 
    max: storedConfig.config?.["Max Value"] || 100, 
  }

  const [config, setConfig] = useState(initialConfig);

  // State for range calculations
  const [range, setRange] = useState([config.min, config.max]);

  useEffect(() => {
    const updatedStoredConfig = { ...initialConfig, ...storedConfig };
    localStorage.setItem(`Gauge-${uniqueID}`, JSON.stringify(updatedStoredConfig));
    // console.log("Color:", config.color);
    // console.log("Min:", config.min);
    // console.log("Max:", config.max);
  }, [uniqueID, initialConfig]);

  // Fetch live data from Firebase Realtime Database
  useEffect(() => {
    if (!config.canID || !config.dataChannel) return;

    // console.log(`Subscribing to Firebase path: data/${config.canID}`);
    const dataRef = ref(db, `data/${config.canID}`);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data[config.dataChannel] !== undefined) {
          setMetricValue(data[config.dataChannel]);
        }
      }
    });

    return () => unsubscribe();
  }, [config.canID, config.dataChannel]);

  // // Unit conversion functions
  // const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
  // const convertToMPH = (kmh) => kmh * 0.621371;

  // Determine displayed value based on unit
  const displayedValue = metricValue;

  return (
    <>
      {/* {settingsVisible && (
        <Modal
          open={settingsVisible}
          onClose={handleSettingsClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ComponentEditor
            config={{
              fields: [
                { label: "Color", type: "select", options: ["Red", "Green", "Blue"] },
                { label: "Min Value", type: "number" },
                { label: "Max Value", type: "number" },
              ],
            }}
            onSave={handleSave}
            onCancel={handleSettingsClose}
          />
        </Modal>
      )} */}

      <div
        style={{
          padding: 5,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
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
          {/* <IconButton onClick={handleSettingsClick}>
            <SettingsIcon style={{ color: theme.palette.primary.main }} />
          </IconButton> */}

          {`${config.canID} / ${config.dataChannel}`}
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "scale(0.85)", // Adjust scale for better fit
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
                    range: range,
                    tickcolor: "white",
                  },
                  bar: { color: config.color },
                  steps: [
                    {
                      range: [range[1] * 0.33, range[1] * 0.66],
                      color: "lightgray",
                    },
                    {
                      range: [range[1] * 0.66, range[1]],
                      color: "gray",
                    },
                  ],
                },
              },
            ]}
            layout={{
              autosize: true,
              responsive: true,
              margin: { t: 20, b: 20, l: 20, r: 20 },
              font: { color: "white" },
              paper_bgcolor: "rgba(0, 0, 0, 0)",
              plot_bgcolor: "rgba(0, 0, 0, 0)",
            }}
            config={{ responsive: true }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default DataGauge;