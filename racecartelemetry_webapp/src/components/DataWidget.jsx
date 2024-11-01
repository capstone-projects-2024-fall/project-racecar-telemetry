import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const DataWidget = ({ canID, valueToDisplay }) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prevNumber) => prevNumber + 1); // Update logic here
    }, 1000); // Adjust the update interval

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

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
        {valueToDisplay}
      </Typography>
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {number}
      </Typography>
    </Box>
  );
};

export default DataWidget;
