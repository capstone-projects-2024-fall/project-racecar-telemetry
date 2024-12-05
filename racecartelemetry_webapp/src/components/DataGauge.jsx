import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { db } from "@firebaseConfig";
import { ref, onValue } from "firebase/database";
import theme from "@/app/theme";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { Modal } from "@mui/material";
import ComponentEditor from "@/components/ComponentEditor";

const DataGauge = ({ canID, channel, min, max, color }) => {
  const [unit, setUnit] = useState("(UNIT)");

  // This is called metricValue instead of Value because need to figure out unit conversions
  const [metricValue, setMetricValue] = useState(0);
  const [isSecondaryUnit, setIsSecondaryUnit] = useState(false);

  // State to determine whether or not the settings modal is visible
  const [settingsVisible, setSettingsVisible] = useState(false);

  // Range of vals to display
  const [range, setRange] = useState([min, max]);

  // OriginalRange is the range in the primary unit
  const [originalRange, setOriginalRange] = useState([min, max]);

  const [dataName, setDataName] = useState(channel);
  const [barColor, setBarColor] = useState(color);

  // These are the config options for DataGauge Graphs
  const config = {
    fields: [
      
      {
        label: "Color",
        type: "select",
        options: ["Blue", "Red", "Green"],
      },
      {
        label: "Min Value (C)",
        type: "number",
      },
      { label: "Max Value (C)", type: "number" },
    ],
  };

  const handleSettingsClick = () => {
    setSettingsVisible((prevState) => !prevState);
  };

  const handleSettingsClose = () => {
    setSettingsVisible(false);
  };

  const handleSave = (data) => {
    // We want to keep a copy of the Celsius range, so we can go back to it when switching between F and C
    const newRange = [data["Min Value (C)"], data["Max Value (C)"]];
    setOriginalRange(newRange);
    setRange(newRange);
    setDataName(data["Data Name"]);
    setBarColor(data["Color"]);
    setSettingsVisible(false);
  };

  // Whenever the range gets updated, check if we're doing it in celsius or fahrenheit
  useEffect(() => {
    const [min, max] = originalRange;

    if (isSecondaryUnit) {
      setRange([convertToFahrenheit(min), convertToFahrenheit(max)]);
    } else {
      setRange([min, max]);
    }
  }, [isSecondaryUnit, originalRange]);

  useEffect(() => {
    if (!canID || !channel) return;

    const dataRef = ref(db, `data/${canID}`);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();
        if (canData[channel] !== undefined) {
          // TODO: GRAB UNIT FROM FIRESTORE
          // setUnit(canData[unit])
          setMetricValue(canData[channel]);
        }
      }
    });

    return () => unsubscribe();
  }, [canID, channel]);

  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
  const convertToMPH = (kmh) => kmh * 0.621371;
  const convertToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

  const displayedValue =
    channel === "Temp" && isSecondaryUnit
      ? convertToFahrenheit(metricValue)
      : channel === "Speed" && isSecondaryUnit
      ? convertToMPH(metricValue)
      : metricValue;

  // const toggleUnit = () =>
  //   setIsSecondaryUnit((isSecondaryUnit) => !isSecondaryUnit);

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
            alignItems: "s",
          }}
        >
          <IconButton onClick={handleSettingsClick}>
            <SettingsIcon
              style={{
                color: theme.palette.primary.main,
              }}
            />
          </IconButton>
          {dataName} {unit}
          {/* TODO: FIGURE OUT HOW WE ARE GOING TO DO UNIT CONVERSION */}
          {/* ({isSecondaryUnit ? secondaryUnit : primaryUnit}) */}
        </div>
        {/* {secondaryUnit && (
          <button
            onClick={toggleUnit}
            style={{
              fontSize: "0.85rem",
              color: "grey",
              marginBottom: "0.3rem",
            }}
          >
            Show in {isSecondaryUnit ? primaryUnit : secondaryUnit}
          </button>
        )} */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "scale(0.85)",
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
                  bar: { color: barColor },
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
