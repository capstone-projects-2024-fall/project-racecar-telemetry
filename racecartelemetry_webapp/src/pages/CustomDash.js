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

export default function CustomDash() {
  const componentsList = [
    { id: "engineTempGauge", label: "Engine Temperature Gauge", component: <EngineTempGauge canID={"001"} /> },
    { id: "timeSeriesGraph", label: "Time Series Graph", component: <TimeSeriesGraph canID={"001"} /> },
    { id: "ggDiagram", label: "GG Diagram", component: <GGDiagram canID={"001"} /> },
    { id: "canDataLiveReading", label: "CAN Data Live Reading", component: <CANDataLiveReading canID={"001"} /> },
  ];

  const [layout, setLayout] = useState(componentsList);
  const [visibleComponents, setVisibleComponents] = useState(
    componentsList.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  );

  const handleCheckboxChange = (id) => {
    setVisibleComponents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
    <div>
      {/* Dropdown with checkboxes */}
      <div style={{ marginBottom: "1rem", color: "grey"}}>
        <label style={{ fontSize: "18px", fontWeight: "bold" }}>Select Components:</label>
        <div>
          {componentsList.map((item) => (
            <label key={item.id} style={{ display: "block", fontSize: "16px" }}>
              <input
                type="checkbox"
                checked={visibleComponents[item.id]}
                onChange={() => handleCheckboxChange(item.id)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      {/* Drag and Drop Context */}
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
              flexWrap: "wrap",
              gap: "1rem",
              padding: "1rem",
              justifyContent: "flex-start",
            }}
          >
            {layout.map(
              (item) =>
                visibleComponents[item.id] && (
                  <SortableItem key={item.id} id={item.id}>
                    {item.component}
                  </SortableItem>
                )
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

// SortableItem component with Drag Handle (inside CustomDash.js)
function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "1rem",
    backgroundColor: "transparent",
    border: "1px solid #9e9e9e",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    width: "32%",
    boxSizing: "border-box",
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
