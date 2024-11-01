"use client";
import { useState } from "react";
import React from "react";
import NavBar from "@components/NavBar";
import TimeSeriesGraph from "@components/TimeSeriesGraph";
import GGDiagram from "@components/GGDiagram";
import CANDataLiveReading from "@components/CANDataLiveReading";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "@app/theme";
import { useEffect } from "react";
import EngineTempGauge from "@components/EngineTempGauge";
import DataWidget from "@components/DataWidget";
import Box from "@mui/material";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col justify-center">
        <NavBar />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <DataWidget canID={"001"} valueToDisplay={"Lateral Acceleration"} />
          <DataWidget
            canID={"001"}
            valueToDisplay={"Longitudal Acceleration"}
          />
          <DataWidget canID={"001"} valueToDisplay={"Vertical Acceleration"} />
        </div>
        <TimeSeriesGraph canID={"001"} yAxis={"X"} title={"Acceleration"} />
        <GGDiagram canID={"001"} title={"GG Diagram"} />
        <EngineTempGauge canID={"001"} />
      </div>
    </ThemeProvider>
  );
}
