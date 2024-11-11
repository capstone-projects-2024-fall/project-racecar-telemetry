import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database functions
import { db } from "@firebaseConfig"; // Firebase config file

const DataWidget = ({ canID, valueToDisplay, title, unit, multiplier, startByte, length }) => {
  const [number, setNumber] = useState(0);

  const parseCAN =  (data) => {
    const bytes = data.split(' ');
    let dataString; 
    for (let i = startByte; i < (startByte+length); i++)
    {
      dataString += bytes[i];
    }
    let translatedData = parseInt(hexString, 16);
    translatedData /= multiplier;
    return translatedData;
  }

  useEffect(() => {
    if (!canID) return; // If no canID is provided, do nothing

    // Create a reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `CANdata/${canID}`);

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setNumber(parseCAN(data.Data));
        // Append new data points to history arrays
        // if (valueToDisplay === "X") {
        //   setNumber(data.X);
        // } else if (valueToDisplay === "Y") {
        //   setNumber(data.Y);
        // } else if (valueToDisplay === "Z") {
        //   setNumber(data.Z);
        // }
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID, valueToDisplay]); // Re-run effect when canID or yAxis changes

  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        backgroundColor: "primary.main",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        padding: 1,
      }}
    >
      <Typography sx={{ fontSize: "0.75rem", lineHeight: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {number}
        {unit}
      </Typography>
    </Box>
  );
};

export default DataWidget;
