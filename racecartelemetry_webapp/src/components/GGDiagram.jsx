import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database functions
import { db } from "@firebaseConfig"; // Firebase config file

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const GGDiagram = ({ canID, title }) => {
  const [lateral, setLat] = useState([]); // Array to store timestamp history
  const [longitudinal, setLong] = useState([]); // Array to store axis data history

  useEffect(() => {
    if (!canID) return; // If no canID is provided, do nothing

    // Create a reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `CANdata/${canID}`);

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("CAN data:", data);

        // Append new data points to history arrays
        setLat((prev) => [...prev, data.Y]); // Add new time data
        setLong((prev) => [...prev, data.X]);
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID]); // Re-run effect when canID changes

  const data = [
    {
      x: lateral,
      y: longitudinal,
      type: "scatter",
      mode: "markers",
      marker: { color: "blue" },
    },
  ];


  const layout = {
    title: {
      text: title,
      font: {
        size: 24,
        color: "white",
      },
    },
    xaxis: {
      title: {
        text: "Lateral Acceleration [G]",
        font: { color: "white" },
      },
      tickfont: { color: "white" },
      zeroline: true,
      zerolinecolor: "white",
      zerolinewidth: 5,
    },
    yaxis: {
      title: {
        text: "Longitudinal Acceleration [G]",
        font: { color: "white" },
        standoff: 15,
      },
      tickfont: { color: "white" },
      automargin: true,
      zeroline: true,
      zerolinecolor: "white",
      zerolinewidth: 5,
    },
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    margin: { l: 50, r: 50, t: 50, b: 50 },
  };

  return (
    <>
      <Plot data={data} layout={layout} />
    </>
  );
};

export default GGDiagram;
