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
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// The Tooltip content for each parameter
const parameterInfo = {
  dataName: "Name of the data to be displayed in the Time Series Graph.",
  unit: "Unit of measurement for the data.",
  verticalMin: "Minimum value for the Y-axis in the graph.",
  verticalMax: "Maximum value for the Y-axis in the graph.",
  timeRange: "Time range to be shown on the X-axis.",
  color: "Color for the graph lines or markers.",
  min: "Minimum value for the Linear Gauge.",
  max: "Maximum value for the Linear Gauge.",
  currentValue: "Current value to display on the Linear Gauge.",
  range: "Range of values for the Data Gauge.",
  displayedValue: "Value displayed on the Data Gauge.",
  primaryUnit: "Primary unit for the Data Gauge.",
  secondaryUnit: "Secondary unit for the Data Gauge.",
  isSecondaryUnit: "Flag to toggle between primary and secondary units.",
};

const componentsList = [
  {
    id: "DataGauge",
    label: "Data Gauge",
    parameters: [
      { name: "range", type: "number" },
      { name: "displayedValue", type: "number" },
      { name: "color", type: "string" },
      { name: "primaryUnit", type: "string" },
      { name: "secondaryUnit", type: "string" },
      { name: "isSecondaryUnit", type: "boolean" },
    ],
  },
  {
    id: "LinearGauge",
    label: "Linear Gauge",
    parameters: [
      { name: "min", type: "number" },
      { name: "max", type: "number" },
      { name: "currentValue", type: "number" },
      { name: "color", type: "string" },
    ],
  },
  {
    id: "TimeSeriesGraph",
    label: "Time Series Graph",
    parameters: [
      { name: "dataName", type: "string" },
      { name: "unit", type: "string" },
      { name: "verticalMin", type: "number" },
      { name: "verticalMax", type: "number" },
      { name: "timeRange", type: "string" },
      { name: "color", type: "string" },
    ],
  },
  {
    id: "GGDiagram",
    label: "GG Diagram",
    parameters: [
      { name: "data", type: "string" },
      { name: "unit", type: "string" },
      { name: "colorScheme", type: "string" },
    ],
  },
];

export default function CustomDash() {
  const [open, setOpen] = useState(false);
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

  const handleOpen = (component, index) => {
    setSelectedComponent({ ...component, index }); // Pass selected component and row index
    setParams({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const updatedRows = [...rows];
    updatedRows[selectedComponent.index][selectedComponent.index] = selectedComponent;
    setRowComponents(updatedRows); // Store updated components for that row
    setOpen(false);
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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div
          className="custom-dash"
          style={{
            display: "flex",
            flexDirection: "column", // Stack rows vertically
            gap: "1rem", // Adds space between rows
          }}
        >
          {rows.map((row, rowIndex) => (
            <SortableContext key={rowIndex} items={row.filter((item) => item !== null)} strategy={verticalListSortingStrategy}>
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
                    <Button variant="contained" size="small" onClick={() => handleOpen(componentsList[index], index)}>
                      +
                    </Button>
                  </div>
                ))}
              </div>
            </SortableContext>
          ))}
        </div>
      </DndContext>

      {/* Modal for configuring component */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Configure {selectedComponent?.label}</DialogTitle>
        <DialogContent>
          {selectedComponent?.parameters.map((param) => (
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
      </Dialog>
    </div>
  );
}
