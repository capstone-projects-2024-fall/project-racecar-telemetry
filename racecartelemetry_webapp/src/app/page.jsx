"use client";
import { useState } from "react";
import React from "react";
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
import NavBar from "@components/NavBar";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "@app/theme";
import DataWidgetList from "@components/DataWidgetList";
import CustomDash from "@pages/CustomDash"; // Import CustomDash

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "0.3rem",
    backgroundColor: "transparent",
    border: "1px solid #9e9e9e",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    width: "20%",
    height: "250px",
    boxSizing: "border-box",
    overflow: "hidden",
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
          padding: "0.2rem",
          border: "1px solid #737373",
          borderRadius: 10,
          marginBottom: "0.1rem",
          fontSize: "0.8rem",
        }}
      >
        Drag Handle
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

export default function Home() {
  const [layout, setLayout] = useState([]);

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0.5,
        }}
      >
        {/* Data Widgets */}
        <DataWidgetList />

        {/* Draggable Row of Components */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={layout.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                gap: "1rem",
                width: "100%",
                marginBottom: 2,
                justifyContent: "center",
              }}
            >
              {layout.map((item) => (
                <SortableItem key={item.id} id={item.id}>
                  {item.component}
                </SortableItem>
              ))}
            </Box>
          </SortableContext>
        </DndContext>

        {/* Custom Dash Section */}
      </Box>
        <CustomDash /> {/* Add CustomDash here */}
    </ThemeProvider>
  );
}
