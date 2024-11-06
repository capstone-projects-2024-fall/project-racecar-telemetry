import React from "react";
import theme from "@/app/theme";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import dynamic from "next/dynamic";

const LinearGauge = ({ value }) => {
  var data = [
    {
      type: "indicator",
      value: 120,
      gauge: {
        shape: "bullet",
        axis: {
          visible: false,
          range: [-200, 200],
        },
        bar: { color: theme.palette.primary.main },
      },
      domain: { x: [0.15, 0.75], y: [0.25, 0.65] }, // Adjusted y domain for more space for the title
      number: {
        font: { color: "white", size: 25 }, // Set the value color to white
      },
    },
  ];

  var layout = {
    width: 400, // Reduced width for smaller graph
    height: 250, // Reduced height for smaller graph
    margin: { t: 40, b: 10, l: 50, r: 10 }, // Increased top margin to make space for the title
    grid: { rows: 2, columns: 2, pattern: "independent" },
    paper_bgcolor: "rgba(20, 20, 20, 0.9)",
    plot_bgcolor: "rgba(20, 20, 20, 0.9)",
    title: {
      text: "Throttle Position", // Title placed above the graph
      font: { size: 18 },
      font: { color: "white" },

      x: 0.5, // Center the title
      xanchor: "center",
      y: 0.7, // Position the title at the top
      yanchor: "top",
    },
    template: {
      data: {
        indicator: [
          {
            mode: "number+delta+gauge",
            delta: { reference: 90 },
          },
        ],
      },
    },
  };

  return (
    <div style={{ border: `2px solid ${theme.palette.primary.main}` }}>
      <Plot data={data} layout={layout} useResizeHandler={true} style={{}} />
    </div>
  );
};

export default LinearGauge;
