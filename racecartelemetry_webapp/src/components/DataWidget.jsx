import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Modal } from "@mui/material";
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database functions
import SettingsIcon from "@mui/icons-material/Settings";
import ComponentEditor from "@/components/ComponentEditor";
import { db } from "@firebaseConfig"; // Firebase config file
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

  const handleSave = (data) => {
    setColor(data["Color"]);
    setSettingsVisible(false);
  };

  useEffect(() => {
    if (!canID || !valueToDisplay) return; // canID and valueTosDisplay must be present

    // reference to the 'CANdata/data/{canID}' node in realtime database
    const dataRef = ref(db, `data/${canID}`);

    // real-time listener using onValue
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data[valueToDisplay] !== undefined) {
          setNumber(data[valueToDisplay]); //fetch value based on valueToDisplay
        } else {
          console.warn(`Key "${valueToDisplay}" not found in Realtime Database for CAN ID ${canID}`);
          setNumber(0); // Default to 0 if key doesn't exist
        }
      }
    });

    // Clean up the listener when the component unmounts or `canID` changes
    return () => unsubscribe();
  }, [canID, valueToDisplay]);

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
                { label: "Color", type: "select", options: ["Blue", "Red", "Green"] },
              ],
            }}
            onCancel={handleSettingsClose}
            onSave={handleSave}
          />
        </Modal>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: color,
          color: "white",
          borderRadius: "16px",
          padding: "0.5rem",
          border: "1px solid",
          borderColor: "primary.light",
        }}
      >
        <IconButton
          onClick={handleSettingsClick}
          sx={{
            color: "white",
          }}
        >
          <SettingsIcon />
        </IconButton>

        <Box sx={{ textAlign: "left", ml: 1 }}>
          <Typography sx={{ fontSize: "0.75rem", lineHeight: 1 }}>
            {dataName}
          </Typography>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {number}
            {unitShown}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DataWidget;
