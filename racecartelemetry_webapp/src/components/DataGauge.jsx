import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database";
import { db } from "@firebaseConfig";
import { Modal, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ComponentEditor from "@/components/ComponentEditor";
import theme from "@/app/theme";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const DataGauge = () => {
  const [metricValue, setMetricValue] = useState(0);
  const [settingsVisible, setSettingsVisible] = useState(false);

  // Config for gauge visualization
  const [config, setConfig] = useState({
    canID: "CAN ID",
    dataChannel: "Data Channel",
    color: "Red",
    min: 0,
    max: 100,
  });

  // State for range calculations
  const [range, setRange] = useState([config.min, config.max]);
  const [originalRange, setOriginalRange] = useState([config.min, config.max]);

  // Handle opening and closing of settings modal
  const handleSettingsClick = () => {
    setSettingsVisible(true);
  };

  const handleSettingsClose = () => {
    setSettingsVisible(false);
  };

  const handleSave = (formState) => {
    const updatedConfig = {
      canID: formState.canID || config.canID,
      dataChannel: formState.dataChannel || config.dataChannel,
      color: formState.Color || config.color,
      min: parseFloat(formState["Min Value"]) || config.min,
      max: parseFloat(formState["Max Value"]) || config.max,
    };
    console.log("Saving configuration:", updatedConfig);
    setConfig(updatedConfig);
    setOriginalRange([updatedConfig.min, updatedConfig.max]);
    setRange([updatedConfig.min, updatedConfig.max]);
    setSettingsVisible(false);
  };

  // Fetch live data from Firebase Realtime Database
  useEffect(() => {
    if (!config.canID || !config.dataChannel) return;

    console.log(`Subscribing to Firebase path: data/${config.canID}`);
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

  // Unit conversion functions
  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
  const convertToMPH = (kmh) => kmh * 0.621371;

  // Determine displayed value based on unit
  const displayedValue = metricValue;

  return (
    <>
      {settingsVisible && (
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
      )}

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
          <IconButton onClick={handleSettingsClick}>
            <SettingsIcon style={{ color: theme.palette.primary.main }} />
          </IconButton>
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