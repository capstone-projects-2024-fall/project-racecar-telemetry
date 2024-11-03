import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database";
import { db } from "@firebaseConfig";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const GGDiagram = ({ canID, title }) => {
  const [lateral, setLat] = useState([]); // Array to store lateral acceleration history
  const [longitudinal, setLong] = useState([]); // Array to store longitudinal acceleration history

  useEffect(() => {
    if (!canID) return;

    const dataRef = ref(db, `CANdata/${canID}`);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("CAN data:", data);

        setLat((prev) => [...prev, data.Y]);
        setLong((prev) => [...prev, data.X]);
      }
    });

    return () => unsubscribe();
  }, [canID]);

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
        fontSize: "18px",
        color: "white",
        fontWeight: "bold",
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
    margin: { l: 10, r: 10, t: 30, b: 10 },
    autosize: true, // Enable responsive sizing
    responsive: true,
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        padding: "0px",
        boxSizing: "border-box",
      }}
    >
      <Plot
        data={data}
        layout={layout}
        config={{ responsive: true }}
        style={{ width: "100%", height: "100%" }} // Fills container space
      />
    </div>
  );
};

export default GGDiagram;
