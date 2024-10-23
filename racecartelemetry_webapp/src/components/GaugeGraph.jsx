import React from "react";
import Plot from "react-plotly.js";

const GaugeChart = () => {
  return (
    <Plot
      data={[
        {
          type: "indicator",
          mode: "gauge+number",
          value: 75,
          gauge: {
            axis: { range: [0, 100] },
            bar: { color: "red" },
            steps: [
              { range: [0, 50], color: "lightgray" },
              { range: [50, 100], color: "gray" },
            ],
          },
        },
      ]}
      layout={{ width: 600, height: 400, title: "Speed" }}
    />
  );
};

export default GaugeChart;
