"use client";
import { useState } from "react";
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import NavBar from "@components/Navbar";
import DataDisplay from "@components/DataDisplay";
import TimeSeriesGraph from "@components/TimeSeriesGraph";
import TestData from "@components/testData";
import CANDataLiveReading from "@components/CANDataLiveReading";
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import theme from "@app/theme";
import { useEffect } from "react";
import EngineTempGauge from "@components/EngineTempGauge";

export default function Home() {
  const telemetryData = [
    { label: "Speed (mph)", value: 120 },
    { label: "Engine Temperature (°F)", value: 200 },
    { label: "RPM", value: 6500 },
    { label: "Battery Voltage (V)", value: 12.5 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col justify-center">
        <NavBar/>
        {/* <DataDisplay data={telemetryData} /> 
        {/* <TimeSeriesGraph /> */}
        {/* <TestData/> */}
        <EngineTempGauge canID={'001'}/>
        <CANDataLiveReading canID={'001'}/> 
      </div>
    </ThemeProvider>
  );
}
