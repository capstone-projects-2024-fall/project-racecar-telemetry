import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database functions
import { db } from "@firebaseConfig"; // Firebase config file
import theme from "@/app/theme";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const TimeSeriesGraph = ({ canID, yAxis, title }) => {
  const [timestamps, setTimestamps] = useState([]);
  const [axisToPlot, setAxisToPlot] = useState([]);

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
      marker: { color: `${theme.palette.primary.main}` },
    },
  ];

  const layout = {
    title: {
      text: title,
      font: {
        fontSize: "18px", 
        color: "white", 
        fontWeight: "bold"
      },
    },
    xaxis: {
      title: {
        text: "Timestamp (ms)",
        font: { color: "white" },
      },
      tickfont: { color: "white" },
      zeroline: true,
      zerolinecolor: "white",
      zerolinewidth: 5,
    },
    yaxis: {
      title: {
        text: "G",
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
    margin: { l: 10, r: 10, t: 40, b: 10 },
  };

  return (
    <>
      <div
        style={{
          border: `2px solid ${theme.palette.primary.main}`,
          padding: "0px",
          borderRadius: "8px",
        }}
      >
        <Plot
          data={data}
          layout={layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  );
};

export default TimeSeriesGraph;
