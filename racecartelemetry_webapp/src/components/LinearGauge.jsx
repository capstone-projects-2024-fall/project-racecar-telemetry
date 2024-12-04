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

const LinearGauge = ({ canID, channel, min, max, color }) => {
  const [value, setValue] = useState();
  const [unit, setUnit] = useState("(UNIT)");

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [dataName, setDataName] = useState(channel);
  const [barColor, setColor] = useState(color);
  // Range of vals to display
  const [range, setRange] = useState([min, max]);

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
    if (!canID || !channel) return;

    const dataRef = ref(db, `data/${canID}`);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();
        if (canData[channel] !== undefined) {
          // TODO: GRAB UNIT FROM FIRESTORE
          // setUnit(canData[unit])
          setValue(canData[channel]);
        }
      }
    });

    return () => unsubscribe();
  }, [canID, channel]);

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
        bar: { color: barColor },
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
      text: `${dataName} ${unit}`,
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
