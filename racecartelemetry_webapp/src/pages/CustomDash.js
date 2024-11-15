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
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Dialog, DialogTitle, List, ListItem, ListItemText, TextField } from "@mui/material";

export default function CustomDash() {
  const [rows, setRows] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRowCount, setNewRowCount] = useState("");

  const componentsList = [
    { id: "engineTempGauge", label: "Engine Temperature Gauge" },
    { id: "xAccelGauge", label: "X Accel Gauge" },
    { id: "timeSeriesGraph", label: "Time Series Graph" },
    { id: "ggDiagram", label: "GG Diagram" },
    { id: "canDataLiveReading", label: "CAN Data Live Reading" },
  ];

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddRow = () => {
    const count = parseInt(newRowCount, 10);
    if (isNaN(count) || count <= 0) {
      alert("Please enter a valid number greater than 0 for components.");
      return;
    }
    // Add a new row with the specified number of blank boxes
    setRows((prevRows) => [
      ...prevRows,
      { id: `row-${prevRows.length + 1}`, items: Array(count).fill(null) },
    ]);
    setNewRowCount(""); // Clear input after adding row
  };

  const handleOpenModal = (boxIndex, rowIndex) => {
    setSelectedBox({ rowIndex, boxIndex });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBox(null);
  };

  const handleSelectComponent = (component) => {
    if (selectedBox) {
      const { rowIndex, boxIndex } = selectedBox;
      setRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[rowIndex].items[boxIndex] = component;
        return newRows;
      });
    }
    handleCloseModal();
  };

  const handleRemoveComponent = (rowIndex, boxIndex) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[rowIndex].items[boxIndex] = null;
      return newRows;
    });
  };

  const resetDashboard = () => {
    setRows([]);
  };

  return (
    <div>
      {/* Add Row */}
      <div style={{ marginBottom: "1rem"}}>
        <TextField
          label="Number of Components"
          variant="outlined"
          size="small"
          value={newRowCount}
          onChange={(e) => setNewRowCount(e.target.value)}
          style={{ marginRight: "1rem" }}
        />
        <Button variant="contained" onClick={handleAddRow}>
          + Add Row
        </Button>
      </div>

      {/* Reset Button */}
      {rows.length > 0 && (
        <Button variant="outlined" onClick={resetDashboard} style={{ marginBottom: "1rem" }}>
          Reset
        </Button>
      )}

      {/* Rows and Components */}
      <DndContext sensors={sensors} collisionDetection={closestCenter}>
        {rows.map((row, rowIndex) => (
          <SortableContext key={row.id} items={row.items.map((_, index) => `${rowIndex}-${index}`)}>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem",
                border: "1px dashed #ccc",
                marginBottom: "1rem",
              }}
            >
              {row.items.map((component, boxIndex) => (
                <SortableBox
                  key={`${rowIndex}-${boxIndex}`}
                  id={`${rowIndex}-${boxIndex}`}
                  component={component}
                  onAdd={() => handleOpenModal(boxIndex, rowIndex)}
                  onRemove={() => handleRemoveComponent(rowIndex, boxIndex)}
                />
              ))}
            </div>
          </SortableContext>
        ))}
      </DndContext>

      {/* Modal for Selecting Components */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Select a Component</DialogTitle>
        <List>
          {componentsList.map((component) => (
            <ListItem
              button
              key={component.id}
              onClick={() => handleSelectComponent(component)}
            >
              <ListItemText primary={component.label} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
}

function SortableBox({ id, component, onAdd, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "1rem",
    backgroundColor: component ? "#f5f5f5" : "#e0e0e0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    flex: 1,
    textAlign: "center",
    position: "relative",
    cursor: component ? "grab" : "pointer",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {component ? (
        <>
          <div>{component.label}</div>
          <Button size="small" onClick={onRemove}>
            Remove
          </Button>
        </>
      ) : (
        <div onClick={onAdd}>+</div>
      )}
    </div>
  );
}
