import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database";
import { db } from "@firebaseConfig";
import theme from "@/app/theme";
import { fetchUnit, getCurrentConfig } from "@/services/CANConfigurationService";
// import SettingsIcon from "@mui/icons-material/Settings";
// import IconButton from "@mui/material/IconButton";
// import { Modal } from "@mui/material";
// import ComponentEditor from "@/components/ComponentEditor";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const XYGraph = ({ uniqueID }) => {
  const storedConfig = JSON.parse(localStorage.getItem(`XY Graph-${uniqueID}`));

  const initialConfig = {
    xCanID: storedConfig.xCanID || "CAN ID",
    xChannel: storedConfig.xChannel || "Data Channel",
    yCanID: storedConfig.yCanID || "CAN ID",
    yChannel: storedConfig.yChannel || "Data Channel",
    color: storedConfig.config?.Color || "Red",
    xMin: storedConfig.config?.["X Axis Min Value"] || 0,
    xMax: storedConfig.config?.["X Axis Max Value"] || 100,
    yMin: storedConfig.config?.["Y Axis Min Value"] || 0,
    yMax: storedConfig.config?.["Y Axis Max Value"] || 100,
  }

  const [config, setConfig] = useState(initialConfig);

  const [xUnit, setXUnit] = useState("");
  const [yUnit, setYUnit] = useState("");
  const [lateral, setLat] = useState([]);
  const [longitudinal, setLong] = useState([]);
  // const [settingsVisible, setSettingsVisible] = useState(false);
  const [lineColor, setLineColor] = useState(config.color);
  const [xDataName, setXDataName] = useState(config.xChannel);
  const [yDataName, setYDataName] = useState(config.yChannel);
  const [xRange, setXRange] = useState([config.xMin, config.xMax]);
  const [yRange, setYRange] = useState([config.yMin, config.yMax]);

  // const handleSettingsClick = () => {
  //   setSettingsVisible((prevState) => !prevState);
  // };

  // const handleSettingsClose = () => {
  //   setSettingsVisible(false);
  // };

  useEffect(() => {
    const updatedStoredConfig = { ...initialConfig, ...storedConfig };
    localStorage.setItem(`XY Graph-${uniqueID}`, JSON.stringify(updatedStoredConfig));
  }, [uniqueID, initialConfig]);

  useEffect(() => {
    const fetchAndSetUnit = async () => {
      try {
        const selectedConfig = await getCurrentConfig();

        const fetchedXUnit = await fetchUnit(selectedConfig, config.xCanID, config.xChannel);
        setXUnit(fetchedXUnit);

        const fetchedYUnit = await fetchUnit(selectedConfig, config.yCanID, config.yChannel);
        setYUnit(fetchedYUnit);

      } catch (error) {
        console.error("Error Fetching Unit:", error);
        setUnit("Error");
      }
    };

    fetchAndSetUnit();
  }, []); 

  useEffect(() => {

    if (!config.xCanID || !config.xChannel) return;

    const xRef = ref(db, `data/${config.xCanID}`);
    const unsubscribeX = onValue(xRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();
        if (canData[config.xChannel] !== undefined) {
          setLong((prev) => [...prev, canData[config.xChannel]]);
        }
      }
    });

    return () => unsubscribeX();
  }, [config.xCanID, config.xChannel]);


  // Fetch Y-Axis data
  useEffect(() => {
    if (!config.yCanID || !config.yChannel) return;

    const yRef = ref(db, `data/${config.yCanID}`);
    const unsubscribeY = onValue(yRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();
        if (canData[config.yChannel] !== undefined) {
          setLat((prev) => [...prev, canData[config.yChannel]]);
        }
      }
    });

    return () => unsubscribeY();
  }, [config.yCanID, config.yChannel]);

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
            config={config}
            onCancel={handleSettingsClose}
            onSave={handleSave}
          />
        </Modal>
      )} */}
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
          {/* <IconButton onClick={handleSettingsClick}>
            <SettingsIcon
              style={{
                color: theme.palette.primary.main,
              }}
            />
          </IconButton> */}
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
