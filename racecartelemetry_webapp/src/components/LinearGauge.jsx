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

const LinearGauge = () => {

  // Config for gauge visualization
  const [config, setConfig] = useState({
    canID: "CAN ID",
    dataChannel: "Data Channel",
    color: "Blue",
    min: 0,
    max: 100,
  });

  const [value, setValue] = useState(0);
  const [unit, setUnit] = useState("(UNIT)");

  const [settingsVisible, setSettingsVisible] = useState(false);
  // Range of vals to display
  const [range, setRange] = useState([config.min, config.max]);


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
      min: parseFloat(formState["Min Value"]) || config.min,
      max: parseFloat(formState["Max Value"]) || config.max,
    };
    console.log("Saving LinearGuage configuration:", updatedConfig);
    setConfig(updatedConfig);
    setRange([updatedConfig.min, updatedConfig.max]);
    setSettingsVisible(false);
  };
  useEffect(() => {
    if (!config.canID || !config.dataChannel) return;

    console.log(`Subscribing to Firebase path: data/${config.canID}`);
    const dataRef = ref(db, `data/${config.canID}`);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data[config.dataChannel] !== undefined) {
          setValue(data[config.dataChannel]);
        }
      }
    });

    return () => unsubscribe();
  }, [config.canID, config.dataChannel]);

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
        bar: { color: config.color },
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
      text: `${config.dataChannel} ${unit}`,
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
          config={{
            fields: [
              { label: "Color", type: "select", options: ["Red", "Green", "Blue"] },
              { label: "Min Value", type: "number" },
              { label: "Max Value", type: "number" },
            ],
          }}
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
