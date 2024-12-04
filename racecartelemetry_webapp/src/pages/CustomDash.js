import React, { useState } from "react";
import { Button, Box, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CustomDash() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  const handleAddRow = () => {
    const input = prompt("Enter a number between 1 and 6 for placeholders:");
    const numPlaceholders = parseInt(input);

    if (isNaN(numPlaceholders) || numPlaceholders < 1 || numPlaceholders > 6) {
      setError("Invalid input. Please enter a number between 1 and 6.");
      return;
    }

    setError(""); // Clear any previous errors
    setRows([...rows, Array(numPlaceholders).fill(null)]); // Add a new row
  };

  const handleAddPlaceholder = (rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].push(null);
    setRows(updatedRows);
  };

  const handleRemovePlaceholder = (rowIndex, placeholderIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].splice(placeholderIndex, 1);
    setRows(updatedRows);
  };

  const handleRemoveRow = (rowIndex) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    setRows(updatedRows);
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRow}
        sx={{ marginBottom: "20px" }}
      >
        Add Row
      </Button>
      {error && (
        <Box sx={{ color: "red", marginBottom: "10px" }}>{error}</Box>
      )}
      <Box>
        {rows.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", marginRight: "10px" }}>
              <Tooltip title="Add Placeholder">
                <IconButton
                  color="primary"
                  onClick={() => handleAddPlaceholder(rowIndex)}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove Row">
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveRow(rowIndex)}
                >
                  <RemoveIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              {row.map((_, placeholderIndex) => (
                <Box
                  key={placeholderIndex}
                  sx={{
                    flex: 1,
                    height: "450px",
                    border: "2px dashed gray",
                    position: "relative",
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: "red",
                    }}
                    onClick={() => handleRemovePlaceholder(rowIndex, placeholderIndex)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

