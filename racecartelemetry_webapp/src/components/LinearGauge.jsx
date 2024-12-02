import React, { use } from "react";
import theme from "@/app/theme";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database functions
import { db } from "@firebaseConfig"; // Firebase config file
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { Modal } from "@mui/material";
import ComponentEditor from "@/components/ComponentEditor";

const LinearGauge = ({ canID, valueToShow, title }) => {
  const [value, setValue] = useState();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [dataName, setDataName] = useState(title);
  const [color, setColor] = useState(`${theme.palette.primary.main}`);
  // Range of vals to display
  const [range, setRange] = useState([0, 100]);

  const handleSettingsClick = () => {
    setSettingsVisible((prevState) => !prevState);
  };

  const handleSettingsClose = () => {
    setSettingsVisible(false);
  };

  const handleSave = (data) => {
    setDataName(data["Data Name"]);
    setColor(data["Color"]);
    setRange([data["Min Value"], data["Max Value"]]);
    setSettingsVisible(false);
  };

  // These are the config options for LinearGauge Graphs

  const config = {
    fields: [
      {
        label: "Data Name",
        type: "text",
      },
      {
        label: "Color",
        type: "select",
        options: ["Blue", "Red", "Green"],
      },
      {
        label: "Min Value",
        type: "number",
      },
      { label: "Max Value", type: "number" },
    ],
  };

  useEffect(() => {
    if (!canID) return; // If no canID is provided, do nothing

    // Create a reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `data/${canID}`);

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("CAN data:", data);

        if (valueToShow === "steering") {
          setValue(data.Steering); // What is the throttle going to be under in the Db?
        }
        else if (valueToShow === "pack")
          setValue(data.Pedal); // What is the throttle going to be under in the Db?
        else if (valueToShow === "throttle")
          setValue(data.Throttle);
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID, valueToShow]); // Re-run effect when canID or yAxis changes

  var data = [
    {
      type: "indicator",
      value: value,
      gauge: {
        shape: "bullet",
        axis: {
          visible: true,
          range: range,
        },
        bar: { color: color },
      },
      domain: { x: [0.15, 0.75], y: [0.25, 0.65] },
      number: {
        font: { color: "white", size: 25 },
      },
    },
  ];

  var layout = {
    width: 300,
    height: 200,
    margin: { t: 20, b: 10, l: 20, r: 0 },
    paper_bgcolor: "rgba(20, 20, 20, 0.9)",
    plot_bgcolor: "rgba(20, 20, 20, 0.9)",
    title: {
      text: dataName,
      font: { size: 18, color: theme.palette.primary.main },
      x: 0.5,
      xanchor: "center",
      y: 0.7,
      yanchor: "top",
    },
    template: {
      data: {
        indicator: [
          {
            mode: "number+delta+gauge",
            delta: { reference: 90 },
          },
        ],
      },
    },
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
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
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  );
};

export default LinearGauge;
