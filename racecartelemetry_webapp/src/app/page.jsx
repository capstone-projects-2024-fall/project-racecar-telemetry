"use client";
import { useState } from "react";
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import NavBar from "../components/Navbar";
import DataDisplay from "../components/DataDisplay";

export default function Home() {
  const telemetryData = [
    { label: "Speed (mph)", value: 120 },
    { label: "Engine Temperature (°F)", value: 200 },
    { label: "RPM", value: 6500 },
    { label: "Battery Voltage (V)", value: 12.5 },
  ];
  return (
    <div className="flex flex-col justify-center">
      <NavBar />
      <DataDisplay data={telemetryData} />
      homepage add stuff
    </div>
  );
}
