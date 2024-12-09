import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@firebaseConfig";
import {
  fetchUnit,
  getCurrentConfig,
} from "@/services/CANConfigurationService";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// import SettingsIcon from "@mui/icons-material/Settings";
// import IconButton from "@mui/material/IconButton";
// import { Modal } from "@mui/material";
// import ComponentEditor from "@/components/ComponentEditor";
import theme from "@/app/theme";

const LinearGauge = ({ uniqueID }) => {
  const storedConfig = JSON.parse(
    localStorage.getItem(`Linear Gauge-${uniqueID}`)
  );

  // console.log(`Linear Gauge-${uniqueID}`);

  const initialConfig = {
    canID: storedConfig.canID || "CAN ID",
    dataChannel: storedConfig.dataChannel || "Data Channel",
    color: storedConfig.config?.Color || "Red",
    min: storedConfig.config?.["Min Value"] || 0,
    max: storedConfig.config?.["Max Value"] || 100,
  };

  const [config, setConfig] = useState(initialConfig);
  const [value, setValue] = useState(0);
  const [unit, setUnit] = useState("");
  // const [settingsVisible, setSettingsVisible] = useState(false);
  // Range of vals to display
  const [range, setRange] = useState([config.min, config.max]);

  useEffect(() => {
    const updatedStoredConfig = { ...initialConfig, ...storedConfig };
    localStorage.setItem(
      `Linear Gauge-${uniqueID}`,
      JSON.stringify(updatedStoredConfig)
    );
    // console.log("Linear Color:", config.color);
    // console.log("Linear Min:", config.min);
    // console.log("Linear Max:", config.max);
  }, [uniqueID, initialConfig]);

  useEffect(() => {
    const fetchAndSetUnit = async () => {
      try {
        const selectedConfig = await getCurrentConfig();
        console.log("selectedConfig:", selectedConfig);
        const fetchedUnit = await fetchUnit(
          selectedConfig,
          config.canID,
          config.dataChannel
        );
        setUnit(fetchedUnit || "Unknown");
        console.log(config.dataChannel, " unit: ", fetchedUnit);
      } catch (error) {
        console.error("Error Fetching Unit:", error);
        setUnit("Error");
      }
    };

    fetchAndSetUnit();
  }, []);

  // const handleSettingsClick = () => {
  //   setSettingsVisible((prevState) => !prevState);
  // };

  // const handleSettingsClose = () => {
  //   setSettingsVisible(false);
  // };

  // const handleSave = (formState) => {
  //   const updatedConfig = {
  //     canID: formState.canID || config.canID,
  //     dataChannel: formState.dataChannel || config.dataChannel,
  //     color: formState.Color || config.color,
  //     min: parseFloat(formState["Min Value"]) || config.min,
  //     max: parseFloat(formState["Max Value"]) || config.max,
  //   };
  //   console.log("Saving LinearGuage configuration:", updatedConfig);
  //   setConfig(updatedConfig);
  //   setRange([updatedConfig.min, updatedConfig.max]);
  //   setSettingsVisible(false);
  // };

  useEffect(() => {
    if (!config.canID || !config.dataChannel) return;

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
            onCancel={handleSettingsClose}
            onSave={handleSave}
          />
        </Modal>
      )} */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: `0px solid ${theme.palette.primary.main}`,
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            height: "0rem",
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
          data={[
            {
              type: "indicator",
              mode: "gauge+number",
              value: value,
              number: {
                suffix: ` ${unit}`, // Append the unit to the number display
                font: { color: "white" },
              },
              gauge: {
                shape: "bullet",
                axis: {
                  visible: true,
                  range: range,
                },
                bar: { color: config.color },
              },
              domain: { x: [0.15, 0.85], y: [0.2, 0.8] },
            },
          ]}
          layout={{
            autosize: true,
            responsive: true,
            margin: { t: 70, b: 10, l: 20, r: 20 },
            paper_bgcolor: "rgba(20, 20, 20, 0.9)",
            plot_bgcolor: "rgba(20, 20, 20, 0.9)",
            title: {
              text: `${config.dataChannel}`,
              font: { size: 24, color: theme.palette.primary.main },
            },
          }}
          config={{
            responsive: true,
            displayModeBar: false,
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  );
};

export default LinearGauge;
