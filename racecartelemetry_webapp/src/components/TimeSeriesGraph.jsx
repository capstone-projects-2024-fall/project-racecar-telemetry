import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database functions
import { db } from "@firebaseConfig"; // Firebase config file

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const TimeSeriesGraph = ({ canID, yAxis, title }) => {
  const [timestamps, setTimestamps] = useState([]); // Array to store timestamp history
  const [axisToPlot, setAxisToPlot] = useState([]); // Array to store axis data history

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
        setTimestamps((prev) => [...prev, data.Time]); // Add new time data
        if (yAxis === "X") {
          setAxisToPlot((prev) => [...prev, data.X]);
        } else if (yAxis === "Y") {
          setAxisToPlot((prev) => [...prev, data.Y]);
        } else if (yAxis === "Z") {
          setAxisToPlot((prev) => [...prev, data.Z]);
        }
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID, yAxis]); // Re-run effect when canID or yAxis changes

  const data = [
    {
      x: timestamps,
      y: axisToPlot,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "blue" },
    },
  ];

  const layout = {
    title: {
      text: title,
      font: {
        size: 24,
      },
    },
    xaxis: {
      title: {
        text: "Timestamp (ms)",
      },
    },
    yaxis: {
      title: {
        text: "MPH",
      },
    },
  };

  return (
    <>
      <Plot data={data} layout={layout} />
    </>
  );
};

export default TimeSeriesGraph;
