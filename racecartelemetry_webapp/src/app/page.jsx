"use client";
import { useState, useEffect } from "react";
import React from "react";
import NavBar from "@components/NavBar";
import TimeSeriesGraph from "@components/TimeSeriesGraph";
import GGDiagram from "@components/GGDiagram";
import CANDataLiveReading from "@components/CANDataLiveReading";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "@app/theme";
import DataGauge from "@components/DataGauge";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex flex-col justify-center">
        <NavBar />
        <CANDataLiveReading canID={"001"} />
        <TimeSeriesGraph canID={"001"} yAxis={"X"} title={"Acceleration"} />
        <GGDiagram canID={"001"} title={"GG Diagram"} />
        <DataGauge canID="001" metricKey="Temp" title="Engine Temperature" maxPrimaryRange={550} maxSecondaryRange={700} primaryUnit="C" secondaryUnit="F" />
        </div>
    </ThemeProvider>
  );
}
