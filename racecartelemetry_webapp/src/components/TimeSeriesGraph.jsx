import React from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const TimeSeriesGraph = () => {
  const data = [
    {
      x: ["2024-01-01", "2024-02-01", "2024-03-01", "2024-04-01"],
      y: [10, 15, 13, 17],
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "blue" },
    },
  ];

  return <Plot data={data} />;
};

export default TimeSeriesGraph;
