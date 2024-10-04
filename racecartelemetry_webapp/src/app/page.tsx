"use client";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ComponentEditor from "../components/ComponentEditor";

export default function Home() {
  const [rickRoll, setRickRoll] = useState(false);

  const handleClick = () => {
    setRickRoll(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      

      

      <ComponentEditor />
    </div>
  );
}
