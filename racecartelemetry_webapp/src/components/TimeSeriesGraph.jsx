import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database";
import { db } from "@firebaseConfig";
import theme from "@/app/theme";
import IconButton from "@mui/material/IconButton";
import { Modal } from "@mui/material";
import ComponentEditor from "@/components/ComponentEditor";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const TimeSeriesGraph = () => {
  const [unit, setUnit] = useState("(UNIT)");
  const [timestamps, setTimestamps] = useState([]);
  const [valsToPlot, setValsToPlot] = useState([]);

  // Config for time series visualization
  const [config, setConfig] = useState({
    canID: "CAN ID",
    dataChannel: "Data Channel",
    color: "Blue",
    yMin: 0,
    yMax: 0,
    title: "Time Series Data",
  });

  // State to determine whether or not the settings modal is visible
  const [settingsVisible, setSettingsVisible] = useState(false);

  const handleSettingsClick = () => {
    setSettingsVisible((prevState) => !prevState);
  };

  const handleSettingsClose = () => {
    setSettingsVisible(false);
  };

  const handleSave = (formState) => {
    const updatedConfig = {
      canID: formState.canID || config.canID,
      dataChannel: formState.dataChannel || config.dataChannel,
      color: formState.Color || config.color,
      yMin: parseFloat(formState["Y Axis Min Value"]) || config.yMin,
      yMax: parseFloat(formState["Y Axis Max Value"]) || config.yMax,
      title: formState["Title"] || config.title,
    };
    console.log("Saving timeseries configuration:", updatedConfig);
    setConfig(updatedConfig);
    setSettingsVisible(false);
  };

  useEffect(() => {
    if (!config.canID || !config.dataChannel) return;

    const dataRef = ref(db, `data/${config.canID}`);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data[config.dataChannel] !== undefined && data.timestamp !== undefined) {
          setTimestamps((prev) => [...prev, data.timestamp / 1000]); // Convert timestamp to seconds
          setValsToPlot((prev) => [...prev, data[config.dataChannel]]);
        }
      }
    });

    return () => unsubscribe();
  }, [config.canID, config.dataChannel]);

  const data = [
    {
      x: timestamps,
      y: valsToPlot,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: config.color, size: 6 },
      line: { width: 2 },
    },
  ];

  const layout = {
    title: {
      text: config.title || "Time Series Data",
      font: {
        size: 24,
        color: theme.palette.primary.main,
      },
    },
    xaxis: {
      title: {
        text: "Timestamp (s)",
        font: { color: "white" },
      },
      tickfont: { color: "white" },
      zeroline: true,
      zerolinecolor: "rgba(255, 255, 255, 0.5)",
      zerolinewidth: 2,
      gridcolor: "rgba(255, 255, 255, 0.1)",
      gridwidth: 1,
    },
    yaxis: {
      title: {
        text: unit,
        font: { color: "white" },
        standoff: 15,
      },
      tickfont: { color: "white" },
      automargin: true,
      zeroline: true,
      zerolinecolor: "rgba(255, 255, 255, 0.5)",
      zerolinewidth: 2,
      gridcolor: "rgba(255, 255, 255, 0.1)",
      gridwidth: 1,
      range: [config.yMin, config.yMax],
    },
    paper_bgcolor: "rgba(20, 20, 20, 0.9)",
    plot_bgcolor: "rgba(20, 20, 20, 0.9)",
    autosize: true,
    responsive: true, // Enable responsiveness
  };

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
                { label: "Y Axis Min Value", type: "number" },
                { label: "Y Axis Max Value", type: "number" },
              ],
            }}
            onCancel={handleSettingsClose}
            onSave={handleSave}
          />
        </Modal>
      )}

      <div
        style={{
          width: "100%",
          padding: "0",
          borderRadius: "12px",
          border: `2px solid ${theme.palette.primary.main}`,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(30, 30, 30, 0.9)",
          margin: "0",
          height: "100%", // Allow the container to scale
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            height: "1.5rem",
          }}
        >
          <IconButton onClick={handleSettingsClick}>
            {/* <SettingsIcon
              style={{
                color: theme.palette.primary.main,
              }}
            /> */}
          </IconButton>
        </div>

        <Plot
          data={data}
          layout={layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  );
};

export default TimeSeriesGraph;
