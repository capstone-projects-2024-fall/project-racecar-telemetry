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
import EngineTempGauge from "@components/EngineTempGauge";
import TimeSeriesGraph from "@components/TimeSeriesGraph";
import GGDiagram from "@components/GGDiagram";
import CANDataLiveReading from "@components/CANDataLiveReading";

// Main CustomDash component
export default function CustomDash() {
  const [layout, setLayout] = useState([
    { id: "engineTempGauge", component: <EngineTempGauge canID={"001"} /> },
    { id: "timeSeriesGraph", component: <TimeSeriesGraph canID={"001"} /> },
    { id: "ggDiagram", component: <GGDiagram canID={"001"} /> },
    { id: "canDataLiveReading", component: <CANDataLiveReading canID={"001"} /> },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLayout((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={layout.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="custom-dash"
          style={{
            display: "flex",
            flexWrap: "wrap", // Allows wrapping to the next row
            gap: "1rem", // Adjusts space between items
            padding: "1rem",
            justifyContent: "flex-start", // Aligns items to the start of the row
          }}
        >
          {layout.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              {item.component}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

// SortableItem component with Drag Handle (inside CustomDash.js)
function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "0.2rem",
    backgroundColor: "transparent",
    border: "1px solid #9e9e9e",
    borderRadius: 10,
    marginBottom: "0rem",
    display: "flex",
    flexDirection: "column",
    width: "32%",
    boxSizing: "border-box",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* Drag Handle */}
      <div
        {...listeners}
        style={{
          cursor: "grab",
          backgroundColor: "transparent",
          textAlign: "center",
          color: "grey",
          padding: "0.5rem", // Added padding for better visibility
          border: "1px solid #737373",
          borderRadius: 10,
          marginBottom: "0.5rem", // Space between handle and content
        }}
      >
        Drag Handle
      </div>
      {/* Main Component Content */}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
