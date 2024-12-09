import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Modal } from "@mui/material";
// import SettingsIcon from "@mui/icons-material/Settings";
import ComponentEditor from "@/components/ComponentEditor";
import theme from "@/app/theme";
import { ref, onValue } from "firebase/database";
import { db } from "@firebaseConfig"; // Firebase config file
import { settings } from "firebase/analytics";

const DataWidget = ({ canID, valueToDisplay, title, unit, isElapsedTime = false, isConnected }) => {
  const [number, setNumber] = useState(0);
  const [settingsVisible, setSettingsVisible] = useState();
  const [dataName, setDataName] = useState(title);
  const [color, setColor] = useState(`${theme.palette.primary.main}`);
  const [unitShown, setUnitShown] = useState(unit);

  const handleSettingsClick = () => {
    setSettingsVisible(true);
  };

  const handleSettingsClose = () => {
    setSettingsVisible(false);
  };

  const handleSave = (data) => {
    setColor(data["Color"]);
    setSettingsVisible(false);
  };

  useEffect(() => {
    if (isElapsedTime) {
      let timer;
      if (isConnected) {
        timer = setInterval(() => {
          setNumber((prev) => prev + 1); // Increment elapsed time in seconds
        }, 1000);
      } else {
        setNumber(0); // Reset elapsed time when disconnected
        clearInterval(timer);
      }

      return () => clearInterval(timer); // Clean up the timer
    }

    if (!canID || !valueToDisplay) return; // For non-elapsed-time widgets, ensure required props

    // Realtime Database reference for normal DataWidget
    const dataRef = ref(db, `data/${canID}`);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data[valueToDisplay] !== undefined) {
          setNumber(data[valueToDisplay]);
        } else {
          console.warn(`Key "${valueToDisplay}" not found for CAN ID ${canID}`);
          setNumber(0); // Default to 0 if the key is not found
        }
      }
    });

    return () => unsubscribe();
  }, [canID, valueToDisplay, isElapsedTime, isConnected]); // Update based on props and connection status

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
          <Box>
            <ComponentEditor
              config={{
                fields: [
                  { label: "Color", type: "select", options: ["Blue", "Red", "Green"] },
                ],
              }}
              onCancel={handleSettingsClose}
              onSave={handleSave}
            />
          </Box>
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
          outline: "none", // Remove focus outline
          "&:focus": {
            outline: "none",
          },
          "&:focus-visible": {
            outline: "none",
          },
          boxShadow: "none",
        }}
      >
        {/* <IconButton
          onClick={handleSettingsClick}
          sx={{
            color: "white",
          }}
        >
          <SettingsIcon />
        </IconButton> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            ml: 1,
          }}
        >

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
