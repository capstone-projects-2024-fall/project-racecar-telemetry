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
import TimeSeriesGraph from "@components/TimeSeriesGraph";
import GGDiagram from "@components/GGDiagram";
import LinearGauge from "@components/LinearGauge";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "@app/theme";
import DataGauge from "@components/DataGauge";
import DataWidget from "@components/DataWidget";

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
  const [layout, setLayout] = useState([
    {
      id: "engineTempGauge",
      component: (
        <DataGauge
          canID="210"
          metricKey="Temp"
          title="Engine Temperature"
          maxPrimaryRange={200}
          maxSecondaryRange={300}
          primaryUnit="C"
          secondaryUnit="F"
        />
      ),
    },
    {
      id: "batteryVoltage",
      component: (
        <DataGauge
          canID="200"
          metricKey="Battery"
          title="Battery Voltage"
          maxPrimaryRange={15}
          primaryUnit="V"
        />
      ),
    },
    {
      id: "steering",
      component: (
        <LinearGauge
          canID="100"
          valueToShow="steering"
          title="Steering Rack Position"
        />
      ),
    },
    {
      id: "pdeal",
      component: (
        <LinearGauge
          canID="100"
          valueToShow="pdeal"
          title="Pedal Position"
        />
      ),
    },
    {
      id: "throttlePosGauge",
      component: (
        <LinearGauge
          canID="200"
          valueToShow="Throttle"
          title="Throttle Position"
        />
      ),
    },
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        {/* Data Widgets */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 2,
            marginBottom: 2,
            flexWrap: "wrap",
          }}
        >
          <DataWidget
            canID={"200"}
            valueToDisplay={"Battery"}
            title="Battery Voltage"
            unit="V"
          />
          <DataWidget
            canID={"200"}
            valueToDisplay={"Throttle"}
            title="Throttle Position"
            unit="%"
          />
          <DataWidget
            canID={"200"}
            valueToDisplay={"Timestamp"}
            title="Timestamp"
            unit="s"
          />
        </Box>

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
                flexWrap: "nowrap", // Keeps items in a single row
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

        {/* Side-by-Side Graphs */}
        <Box
          sx={{ display: "flex", width: "100%", gap: "1rem", marginBottom: 2 }}
        >
          <Box sx={{ width: "50%" }}>
            <TimeSeriesGraph
              canID={"210"}
              yAxis={"X"}
              title={"Throttle Position"}
              unit={"%"}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <GGDiagram canID={"210"} title={"GG Diagram"} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
