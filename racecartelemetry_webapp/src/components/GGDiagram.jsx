import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue } from "firebase/database";
import { db } from "@firebaseConfig";
import theme from "@/app/theme";

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
      marker: { color: theme.palette.primary.main },
    },
  ];

  const layout = {
    title: {
      text: title,
      font: {
        size: 24,
        color: theme.palette.primary.main,
      },
    },
    xaxis: {
      title: {
        text: "Timestamp (s)",
        font: { color: "white" },
      },
      tickfont: { color: "white" },
      zeroline: true,
      zerolinecolor: "rgba(255, 255, 255, 0.5)",
      zerolinewidth: 2,
      gridcolor: "rgba(255, 255, 255, 0.1)",
      gridwidth: 1,
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
      zerolinecolor: "rgba(255, 255, 255, 0.5)",
      zerolinewidth: 2,
      gridcolor: "rgba(255, 255, 255, 0.1)",
      gridwidth: 1,
    },
    paper_bgcolor: "rgba(20, 20, 20, 0.9)",
    plot_bgcolor: "rgba(20, 20, 20, 0.9)",
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "0",
        borderRadius: "12px",
        border: `2px solid ${theme.palette.primary.main}`,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "rgba(30, 30, 30, 0.8)",
        margin: "0",
      }}
    >
      <Plot
        data={data}
        layout={layout}
        useResizeHandler={true}
        style={{ width: "100%", height: "400px", margin: "0", padding: "0" }}
      />
    </div>
  );
};

export default GGDiagram;
