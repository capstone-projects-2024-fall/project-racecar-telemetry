import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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

// The Tooltip content for each parameter
const parameterInfo = {
  canID: "Identifier for the CAN bus data.",
  metricKey: "The specific from the db ex: temp.",
  title: "Title displayed for the component.",
  maxPrimaryRange: "Maximum range for the primary unit.",
  maxSecondaryRange: "Maximum range for the secondary unit.",
  primaryUnit: "Primary unit of measurement (e.g., c, f).",
  secondaryUnit: "Secondary unit for conversions (e.g., c, f).",
  yAxis: "The axis to be used for the time series graph.",
  valueToShow: "The value to be displayed on the linear gauge.",
  unit: "Unit of measurement for the time series graph or linear gauge.",
};

const componentsList = [
  {
    id: "DataGauge",
    label: "Data Gauge",
    parameters: [
      { name: "canID", type: "string" },
      { name: "metricKey", type: "string" },
      { name: "title", type: "string" },
      { name: "maxPrimaryRange", type: "number" },
      { name: "maxSecondaryRange", type: "number" },
      { name: "primaryUnit", type: "string" },
      { name: "secondaryUnit", type: "string" },
    ],
  },
  {
    id: "LinearGauge",
    label: "Linear Gauge",
    parameters: [
      { name: "canID", type: "string" },
      { name: "valueToShow", type: "string" },
      { name: "title", type: "string" },
    ],
  },
  {
    id: "TimeSeriesGraph",
    label: "Time Series Graph",
    parameters: [
      { name: "canID", type: "string" },
      { name: "yAxis", type: "string" },
      { name: "title", type: "string" },
      { name: "unit", type: "string" },
    ],
  },
  {
    id: "GGDiagram",
    label: "GG Diagram",
    parameters: [
      { name: "canID", type: "string" },
      { name: "title", type: "string" },
    ],
  },
];

export default function CustomDash() {
  const [open, setOpen] = useState(false);
  const [modalStep, setModalStep] = useState("selectComponent"); // "selectComponent" or "inputParameters"
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [params, setParams] = useState({});
  const [rows, setRows] = useState([]);
  const [numComponents, setNumComponents] = useState(""); // For the prompt input
  const [rowComponents, setRowComponents] = useState([]); // Store components for each row
  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddRow = () => {
    const num = parseInt(numComponents);
    if (isNaN(num) || num <= 0) return; // Validate the number of components
    setRows((prevRows) => [
      ...prevRows,
      Array(num).fill(null), // Add an array of empty placeholders
    ]);
    setNumComponents(""); // Reset input after adding row
  };

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
    setModalStep("inputParameters"); // Go to the input parameters step
    setParams({}); // Reset previous parameters
  };

  const handleClose = () => {
    setOpen(false);
    setModalStep("selectComponent"); // Reset modal step to select component
  };

  const handleSave = () => {
    const updatedRows = [...rows];

    // Ensure the row exists and has an array to hold components
    if (!updatedRows[selectedComponent.index]) {
      updatedRows[selectedComponent.index] = []; // Initialize the row if it's undefined
    }

    // Now, set the component at the correct position within the row
    updatedRows[selectedComponent.index][selectedComponent.componentIndex] =
      selectedComponent;

    setRowComponents(updatedRows); // Store updated components for that row
    setOpen(false);
    setModalStep("selectComponent"); // Reset modal step to select component
  };

  const handleChange = (event, paramName) => {
    setParams({ ...params, [paramName]: event.target.value });
  };

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
      <div style={{ marginBottom: "1rem", color: "orange" }}>
        <TextField
          variant="filled"
          label="Num. of Components"
          type="number"
          value={numComponents}
          onChange={(e) => setNumComponents(e.target.value)}
          style={{ marginRight: "1rem" }}
          sx={{ color: "blue" }}
        />
        <Button variant="outlined" onClick={handleAddRow}>
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
                  <div
                    key={index}
                    style={{
                      flex: `1 0 ${Math.max(100 / row.length, 25)}%`, // Ensures a minimum width of 25% for each component
                      height: "400px", // Fix height issue
                      border: "2px dotted #ccc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton onClick={() => setOpen(true)}>
                      <AddCircleIcon sx={{ color: "blue" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </SortableContext>
          ))}
        </div>
      </DndContext>

      {/* Modal for configuring component */}
      <Dialog open={open} onClose={handleClose}>
        {modalStep === "selectComponent" && (
          <>
            <DialogTitle>Select Component</DialogTitle>
            <DialogContent>
              {componentsList.map((component) => (
                <Button
                  key={component.id}
                  variant="contained"
                  onClick={() => handleSelectComponent(component)}
                  style={{ margin: "10px" }}
                >
                  {component.label}
                </Button>
              ))}
            </DialogContent>
          </>
        )}

        {modalStep === "inputParameters" && selectedComponent && (
          <>
            <DialogTitle>Configure {selectedComponent.label}</DialogTitle>
            <DialogContent>
              {selectedComponent.parameters.map((param) => (
                <div key={param.name} style={{ marginBottom: "10px" }}>
                  <FormControl fullWidth>
                    <TextField
                      label={param.name}
                      type={param.type === "number" ? "number" : "text"}
                      value={params[param.name] || ""}
                      onChange={(e) => handleChange(e, param.name)}
                      variant="outlined"
                      fullWidth
                      required
                    />
                    <Tooltip title={parameterInfo[param.name]} placement="top">
                      <IconButton
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "10px",
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </FormControl>
                </div>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
