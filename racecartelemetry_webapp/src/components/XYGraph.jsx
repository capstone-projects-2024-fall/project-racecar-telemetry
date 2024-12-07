import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database";
import { db } from "@firebaseConfig";
import theme from "@/app/theme";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { Modal } from "@mui/material";
import ComponentEditor from "@/components/ComponentEditor";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const XYGraph = ({
  canID,
  xChannel,
  yChannel,
  xMin,
  xMax,
  yMin,
  yMax,
  color,
}) => {
  const [lateral, setLat] = useState([]);
  const [longitudinal, setLong] = useState([]);

  const [settingsVisible, setSettingsVisible] = useState(false);

  const [lineColor, setLineColor] = useState(color);

  const [xDataName, setXDataName] = useState(xChannel);
  const [yDataName, setYDataName] = useState(yChannel);
  const [xRange, setXRange] = useState([xMin, xMax]);
  const [yRange, setYRange] = useState([yMin, yMax]);

  // These are the config options for TimeSeries Graphs
  const config = {
    fields: [
      
      {
        label: "X Axis Max Value",
        type: "number",
      },
      {
        label: "Y Axis Data Name",
        type: "text",
      },
      {
        label: "Y Axis Min Value",
        type: "number",
      },
      {
        label: "Y Axis Max Value",
        type: "number",
      },
      {
        label: "Color",
        type: "select",
        options: ["Blue", "Red", "Green"],
      },
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
    setXDataName(data["X Axis Data Name"]);
    setYDataName(data["Y Axis Data Name"]);
    setXRange([data["X Axis Min Value"], data["X Axis Max Value"]]);
    setYRange([data["Y Axis Min Value"], data["Y Axis Max Value"]]);

    setLineColor(data["Color"]);
    setSettingsVisible(false);
  };

  useEffect(() => {
    if (!canID) return;

    const dataRef = ref(db, `data/${canID}`);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();

        if (
          canData[yChannel] !== undefined &&
          canData[xChannel] !== undefined
        ) {
          setLat((prev) => [...prev, canData[yChannel]]);
          setLong((prev) => [...prev, canData[xChannel]]);
          // setUnit(canData[unit])
        }
      }
    });

    return () => unsubscribe();
  }, [canID, xChannel, yChannel]);

  const data = [
    {
      x: longitudinal,
      y: lateral,
      type: "scatter",
      mode: "markers",
      marker: { color: lineColor },
    },
  ];

  const layout = {
    title: {
      text: `${xDataName} x ${yDataName}`,
      font: {
        size: 24,
        color: theme.palette.primary.main,
      },
    },
    xaxis: {
      title: {
        text: xDataName,
        font: { color: "white" },
      },
      tickfont: { color: "white" },
      zeroline: true,
      zerolinecolor: "rgba(255, 255, 255, 0.5)",
      zerolinewidth: 2,
      gridcolor: "rgba(255, 255, 255, 0.1)",
      gridwidth: 1,
      range: xRange,
    },
    yaxis: {
      title: {
        text: yDataName,
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
      range: yRange,
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
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            alignItems: "left",
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
          style={{ width: "100%", height: "400px", margin: "0", padding: "0" }}
        />
      </div>
    </>
  );
};

export default XYGraph;
