import React, { use } from "react";
import theme from "@/app/theme";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database functions
import { db } from "@firebaseConfig"; // Firebase config file
const LinearGauge = ({ canID, valueToShow, title, multiplier, startByte, length }) => {
  const [value, setValue] = useState();

  const parseCAN =  (data) => {
    const bytes = data.split(' ');
    let dataString; 
    for (let i = startByte; i < (startByte+length); i++)
    {
      dataString += bytes[i];
    }
    let translatedData = parseInt(hexString, 16);
    translatedData /= multiplier;
    return translatedData;
  }


  useEffect(() => {
    if (!canID) return; // If no canID is provided, do nothing

    // Create a reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `CANdata/${canID}`);

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const translatedData = parseCAN(data.Data);
        console.log("CAN data:", data);
        console.log("Translated data:", translatedData);

        setValue(translatedData);
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID, valueToShow]); // Re-run effect when canID or yAxis changes

  var data = [
    {
      type: "indicator",
      value: value,
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
      text: title,
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
