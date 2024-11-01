"use client";
import { useState, useEffect } from "react";
import React from "react";
import NavBar from "@components/NavBar";
import TimeSeriesGraph from "@components/TimeSeriesGraph";
import GGDiagram from "@components/GGDiagram";
import CANDataLiveReading from "@components/CANDataLiveReading";
import { ThemeProvider, CssBaseline, Box, Grid } from "@mui/material";
import theme from "@app/theme";
import EngineTempGauge from "@components/EngineTempGauge";
import DataWidget from "@components/DataWidget";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 2,
            marginBottom: 2,
            flexWrap: "wrap",
          }}
        >
          <DataWidget canID={"001"} valueToDisplay={"Lateral Acceleration"} />
          <DataWidget
            canID={"001"}
            valueToDisplay={"Longitudinal Acceleration"}
          />
          <DataWidget canID={"001"} valueToDisplay={"Vertical Acceleration"} />
        </Box>

        <Box sx={{ width: "100%", maxWidth: 1200, marginBottom: 2 }}>
          <TimeSeriesGraph canID={"001"} yAxis={"X"} title={"Acceleration"} />
        </Box>

        <Box sx={{ width: "100%", maxWidth: 1200, marginBottom: 2 }}>
          <GGDiagram canID={"001"} title={"GG Diagram"} />
        </Box>

        <Box sx={{ width: "100%", maxWidth: 1200 }}>
          <EngineTempGauge canID={"001"} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
