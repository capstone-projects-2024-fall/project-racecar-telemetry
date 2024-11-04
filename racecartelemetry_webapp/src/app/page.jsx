"use client";
import { useState, useEffect } from "react";
import React from "react";
import NavBar from "@components/NavBar";
import TimeSeriesGraph from "@components/TimeSeriesGraph";
import GGDiagram from "@components/GGDiagram";
import CANDataLiveReading from "@components/CANDataLiveReading";
import { ThemeProvider, CssBaseline, Box, Grid } from "@mui/material";
import theme from "@app/theme";
import DataGauge from "@components/DataGauge";
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
          <DataWidget canID={"001"} valueToDisplay={"X"} />
          <DataWidget canID={"001"} valueToDisplay={"Y"} />
          <DataWidget canID={"001"} valueToDisplay={"Z"} />
        </Box>

        <Box sx={{ width: "100%", marginBottom: 2 }}>
          <TimeSeriesGraph
            canID={"001"}
            yAxis={"X"}
            title={"Longitudinal Acceleration"}
          />
        </Box>

        <Box sx={{ width: "100%", marginBottom: 2 }}>
          <GGDiagram canID={"001"} title={"GG Diagram"} />
        </Box>

        <Box sx={{ width: "100%" }}>
        <DataGauge canID="001" metricKey="Temp" title="Engine Temperature" maxPrimaryRange={550} maxSecondaryRange={700} primaryUnit="C" secondaryUnit="F" />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
