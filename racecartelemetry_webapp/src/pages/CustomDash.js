import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

export default function CustomDash() {
  const componentsList = [
    {
      id: "engineTempGauge",
      label: "Engine Temperature Gauge",
      component: <div>Engine Temperature Gauge</div>, // Placeholder component
    },
    {
      id: "xAccelGauge",
      label: "X Accel Gauge",
      component: <div>X Accel Gauge</div>, // Placeholder component
    },
    {
      id: "timeSeriesGraph",
      label: "Time Series Graph",
      component: <div>Time Series Graph</div>, // Placeholder component
    },
    {
      id: "ggDiagram",
      label: "GG Diagram",
      component: <div>GG Diagram</div>, // Placeholder component
    },
    {
      id: "canDataLiveReading",
      label: "CAN Data Live Reading",
      component: <div>CAN Data Live Reading</div>, // Placeholder component
    },
  ];

  const [rows, setRows] = useState([]);
  const [numComponents, setNumComponents] = useState(""); // For the prompt input

  const handleAddRow = () => {
    const num = parseInt(numComponents);
    if (isNaN(num) || num <= 0) return; // Validate the number of components
    setRows((prevRows) => [
      ...prevRows,
      Array(num).fill(null), // Add an array of empty placeholders
    ]);
    setNumComponents(""); // Reset input after adding row
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setRows((rows) => {
        const oldIndex = rows.findIndex((row) => row === active.id);
        const newIndex = rows.findIndex((row) => row === over.id);

        return arrayMove(rows, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      {/* Input for adding rows */}
      <div style={{ marginBottom: "1rem" }}>
        <TextField
          label="Number of Components"
          type="number"
          value={numComponents}
          onChange={(e) => setNumComponents(e.target.value)}
          variant="outlined"
          style={{ marginRight: "1rem" }}
        />
        <Button variant="contained" onClick={handleAddRow}>
          Add Row
        </Button>
      </div>

      {/* Drag and Drop Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div
          className="custom-dash"
          style={{
            display: "flex",
            flexDirection: "column", // Stack rows vertically
            gap: "1rem", // Adds space between rows
          }}
        >
          {rows.map((row, rowIndex) => (
            <SortableContext
              key={rowIndex}
              items={row.filter((item) => item !== null)}
              strategy={verticalListSortingStrategy}
            >
              <div
                className="row"
                style={{
                  display: "flex",
                  gap: "1rem", // Adds space between components in a row
                  flexWrap: "nowrap", // Prevent wrapping
                  width: "100%", // Ensure the row takes full width
                  marginBottom: "1rem", // Adds space between rows
                }}
              >
                {row.map((_, index) => (
                  <SortableItem key={index} id={`row-${rowIndex}-box-${index}`}>
                    <div
                      style={{
                        flex: `1 0 ${100 / row.length}%`, // Flexible width based on the number of components
                        height: "100%",
                        border: "2px dotted #ccc",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button variant="contained" size="small">
                        +
                      </Button>
                    </div>
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

// SortableItem component with Drag Handle
function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "1rem",
    backgroundColor: "transparent",
    border: "1px solid #9e9e9e",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    width: "30%", // Set a fixed width for the sortable item
    height: "500px", // Set a fixed height to contain the components
    boxSizing: "border-box",
    overflow: "hidden", // Prevents overflow if component exceeds height
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        {...listeners}
        style={{
          cursor: "grab",
          backgroundColor: "transparent",
          textAlign: "center",
          color: "grey",
          padding: "0.5rem",
          border: "1px solid #737373",
          borderRadius: 10,
          marginBottom: "0.5rem",
        }}
      >
        Drag Handle
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
