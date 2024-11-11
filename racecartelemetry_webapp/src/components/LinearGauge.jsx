import React from "react";
import theme from "@/app/theme";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import dynamic from "next/dynamic";

const LinearGauge = ({ value }) => {
  var data = [
    {
      type: "indicator",
      value: 100,
      gauge: {
        shape: "bullet",
        axis: {
          visible: false,
          range: [-200, 200],
        },
        bar: { color: theme.palette.primary.main },
      },
      domain: { x: [0.15, 0.75], y: [0.25, 0.65] },
      number: {
        font: { color: "white", size: 25 },
      },
    },
  ];

  var layout = {
    width: 300,
    height: 200,
    margin: { t: 40, b: 10, l: 20, r: 0 },
    paper_bgcolor: "rgba(20, 20, 20, 0.9)",
    plot_bgcolor: "rgba(20, 20, 20, 0.9)",
    title: {
      text: "Throttle Position",
      font: { size: 18, color: theme.palette.primary.main },
      x: 0.5,
      xanchor: "center",
      y: 0.7,
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
    <div
      style={{
        display: "flex", // Use flexbox to make it responsive
        justifyContent: "center", // Center content horizontally
        alignItems: "center", // Center content vertically
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Plot
        data={data}
        layout={layout}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default LinearGauge;
