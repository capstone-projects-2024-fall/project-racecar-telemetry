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

export default function Home() {
  

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col justify-center">
        <NavBar />
        {/* <DataDisplay data={telemetryData} /> 
        {/* <TimeSeriesGraph /> */}
        {/* <TestData/> */}
        <CANDataLiveReading canID={"001"} />
        <TimeSeriesGraph canID={"001"} yAxis={"X"} title={"Acceleration"} />
        <GGDiagram canID={"001"} title={"GG Diagram"} />

      </div>
    </ThemeProvider>
  );
}
