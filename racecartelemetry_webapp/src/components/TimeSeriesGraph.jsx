import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database functions
import { db } from "@firebaseConfig"; // Firebase config file

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const TimeSeriesGraph = ({ canID, yAxis, title }) => {
  const [canData, setCanData] = useState(null); // State to store CAN data

  useEffect(() => {
    if (!canID) return; // If no canID is provided, do nothing

    // Create a reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `CANdata/${canID}`); // Use dynamic canID to reference the correct node

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setCanData(snapshot.val()); // Update the state with real-time data
      } else {
        setCanData(null); // Handle case when no data exists
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID]); // Re-run effect when canID changes

  let axisToPlot;
  if (canData && yAxis == "X") {
    axisToPlot = canData.X;
  } else if (canData && yAxis == "Y") {
    axisToPlot = canData.Y;
  } else if (canData && yAxis == "Z") {
    axisToPlot = canData.Z;
  }

  const data = [
    {
      x: canData ? canData.timestamp : 0,
      y: axisToPlot,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "blue" },
    },
  ];

  const layout = {
    title: {
      text: title, // Chart title
      font: {
        size: 24,
      },
    },
    xaxis: {
      title: {
        text: "Timestamp (ms)", // X-axis label
      },
    },
    yaxis: {
      title: {
        text: "MPH", // Y-axis label
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
