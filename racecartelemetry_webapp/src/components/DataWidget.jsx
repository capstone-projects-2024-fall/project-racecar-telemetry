import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database functions
import { db } from "@firebaseConfig"; // Firebase config file
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { Modal } from "@mui/material";
import ComponentEditor from "@/components/ComponentEditor";
import theme from "@/app/theme";

const DataWidget = ({ canID, valueToDisplay, title, unit }) => {
  const [number, setNumber] = useState(0);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [dataName, setDataName] = useState(title);
  const [color, setColor] = useState(`${theme.palette.primary.main}`);
  const [unitShown, setUnitShown] = useState(unit);

  const handleSettingsClick = () => {
    setSettingsVisible((prevState) => !prevState);
  };

  const handleSettingsClose = () => {
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
      { label: "Unit", type: "select", options: ["C", "F", "V", "%"] },
    ],
  };

  const handleSave = (data) => {
    setDataName(data["Data Name"]);
    setColor(data["Color"]);
    setSettingsVisible(false);
    setUnitShown(data["Unit"]);
  };

  useEffect(() => {
    if (!canID) return; // If no canID is provided, do nothing

    // Create a reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `data/${canID}`);

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // // Append new data points to history arrays
        // if (valueToDisplay === "X") {
        //   setNumber(data.X);
        // } else if (valueToDisplay === "Y") {
        //   setNumber(data.Y);
        // } else if (valueToDisplay === "Z") {
        //   setNumber(data.Z);
        // }

        if (valueToDisplay === "Battery")
          setNumber(data.Battery); // todo
        else if (valueToDisplay === "Throttle")
          setNumber(data.Throttle);
        else if (valueToDisplay === "Timestamp")
          setNumber(data.timestamp);
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID, valueToDisplay]); // Re-run effect when canID or yAxis changes

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
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: color,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            alignItems: "left",
            height: "1.5rem",
          }}
        >
          <IconButton onClick={handleSettingsClick}>
            <SettingsIcon
              style={{
                color: "white",
              }}
            />
          </IconButton>
        </div>
        <Typography sx={{ fontSize: "0.75rem", lineHeight: 1 }}>
          {dataName}
        </Typography>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {number}
          {unitShown}
        </Typography>
      </Box>
    </>
  );
};

export default DataWidget;
