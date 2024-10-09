"use client";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import NavBar from "../components/Navbar";
import NumericalData from "../components/NumericalData";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <NavBar />
      <NumericalData />
      homepage add stuff
    </div>
  );
}
