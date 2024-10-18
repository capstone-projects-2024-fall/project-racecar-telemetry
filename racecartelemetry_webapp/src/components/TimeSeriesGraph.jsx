import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const TimeSeriesGraph = () => {
  const [xValues, setXValues] = useState([
    "2024-01-01",
    "2024-02-01",
    "2024-03-01",
    "2024-04-01",
  ]);
  const [yValues, setYValues] = useState([10, 15, 13, 17]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    let interval;
    if (run) {
      interval = setInterval(() => {
        const timeStamp = Date.now();
        const val = Math.floor(Math.random() * 100) + 1;

        setXValues((prevXValues) => [...prevXValues, timeStamp]);
        setYValues((prevYValues) => [...prevYValues, val]);
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [run]);

  const data = [
    {
      x: xValues,
      y: yValues,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "blue" },
    },
  ];

  const layout = {
    title: {
      text: "Speed", // Chart title
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

  const handleClick = () => {
    setRun((prevRun) => !prevRun);
  };

  return (
    <>
      <button onClick={handleClick}>{run ? "Stop" : "Start"}</button>
      <Plot data={data} layout={layout} />
    </>
  );
};

export default TimeSeriesGraph;
