import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database functions
import { db } from "@firebaseConfig"; // Firebase config file
import theme from "@/app/theme";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { Modal } from "@mui/material";
import ComponentEditor from "@/components/ComponentEditor";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const TimeSeriesGraph = ({ canID, channel, yMin, yMax, color }) => {
  const [unit, setUnit] = useState("(UNIT)");
  const [timestamps, setTimestamps] = useState([]);
  const [valsToPlot, setValsToPlot] = useState([]);

  // State to determine whether or not the settings modal is visible
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [dataName, setDataName] = useState(channel);

  const [lineColor, setLineColor] = useState(color);
  const [verticalMin, setVerticalMin] = useState(yMin);
  const [verticalMax, setVerticalMax] = useState(yMax);

  // These are the config options for TimeSeries Graphs
  const config = {
    fields: [
      
      {
        label: "Color",
        type: "select",
        options: ["Blue", "Red", "Green"],
      },
      {
        label: "Y Axis Min Value",
        type: "number",
      },
      { label: "Y Axis Max Value", type: "number" },
    ],
  };

  const handleSettingsClick = () => {
    setSettingsVisible((prevState) => !prevState);
  };

  const handleSettingsClose = () => {
    setSettingsVisible(false);
  };

  const handleSave = (data) => {
    // Set the new settings
    setDataName(data["Data Name"]);
    setLineColor(data["Color"]);
    setVerticalMin(data["Y Axis Min Value"]);
    setVerticalMax(data["Y Axis Max Value"]);
    setSettingsVisible(false);
  };

  useEffect(() => {
    if (!canID) return; // If no canID is provided, do nothing

    // Create a reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `data/${canID}`);

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();

        // Append new data points to history arrays
        if (canData[channel] !== undefined && canData.timestamp !== undefined) {
          setTimestamps((prev) => [...prev, canData.timestamp / 1000]); // Add new time data
          setValsToPlot((prev) => [...prev, canData[channel]]);
          // setUnit(canData[unit])
        }
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID, channel]); // Re-run effect when canID or channel changes

  const data = [
    {
      x: timestamps,
      y: valsToPlot,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: lineColor, size: 6 },
      line: { width: 2 },
    },
  ];

  const layout = {
    title: {
      text: dataName,
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
      range: [verticalMin, verticalMax],
    },
    paper_bgcolor: "rgba(20, 20, 20, 0.9)",
    plot_bgcolor: "rgba(20, 20, 20, 0.9)",
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
            config={config}
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
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            alignItems: "left",
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            height: "1.5rem",
          }}
        >
          <IconButton onClick={handleSettingsClick}>
            <SettingsIcon
              style={{
                color: theme.palette.primary.main,
              }}
            />
          </IconButton>
        </div>

        <Plot
          data={data}
          layout={layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "400px", margin: "0", padding: "0" }}
        />
      </div>
    </>
  );
};

export default TimeSeriesGraph;
