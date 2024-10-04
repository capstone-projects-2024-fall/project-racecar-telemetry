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
      <div>
        <h1>Hey :)</h1>
      </div>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleClick}>
          Click to read data from esp
        </Button>
      </Stack>

      {rickRoll && (
        <div className="mt-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <ComponentEditor />
    </div>
  );
}
