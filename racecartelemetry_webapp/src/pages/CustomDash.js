import React, { useState } from "react";
import { Button, Box, IconButton, Tooltip, Slider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CustomDash() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  const [rowHeights, setRowHeights] = useState([]); // Track heights for each row

  const handleAddRow = () => {
    const input = prompt("Enter a number between 1 and 6 for placeholders:");
    const numPlaceholders = parseInt(input);

    if (isNaN(numPlaceholders) || numPlaceholders < 1 || numPlaceholders > 6) {
      setError("Invalid input. Please enter a number between 1 and 6.");
      return;
    }

    setError(""); // Clear any previous errors
    setRows([...rows, Array(numPlaceholders).fill(null)]); // Add a new row
    setRowHeights([...rowHeights, 450]); // Default height for new rows
  };

  const handleHeightChange = (rowIndex, newHeight) => {
    const updatedHeights = [...rowHeights];
    updatedHeights[rowIndex] = newHeight;
    setRowHeights(updatedHeights);
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
      {error && <Box sx={{ color: "red", marginBottom: "10px" }}>{error}</Box>}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginRight: "10px",
                alignItems: "center",
              }}
            >
              <Tooltip title="Add Placeholder">
                <IconButton
                  color="primary"
                  onClick={() => {
                    const updatedRows = [...rows];
                    updatedRows[rowIndex].push(null);
                    setRows(updatedRows);
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(40,40,40)",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove Row">
                <IconButton
                  color="secondary"
                  onClick={() => {
                    const updatedRows = rows.filter((_, index) => index !== rowIndex);
                    setRows(updatedRows);
                    const updatedHeights = rowHeights.filter((_, index) => index !== rowIndex);
                    setRowHeights(updatedHeights);
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(40,40,40)",
                    },
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              </Tooltip>
              <Slider
                orientation="vertical"
                value={rowHeights[rowIndex]}
                min={250}
                max={550}
                step={100}
                onChange={(_, newValue) => handleHeightChange(rowIndex, newValue)}
                sx={{
                  height: "150px",
                  color: "white",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "white",
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "gray",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                gap: "10px",
                justifyContent: "space-between",
                height: `${rowHeights[rowIndex]}px`, // Dynamically set height
              }}
            >
              {row.map((_, placeholderIndex) => (
                <Box
                  key={placeholderIndex}
                  sx={{
                    flex: 1,
                    height: "100%", // Match row height
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
                      "&:hover": {
                        backgroundColor: "rgb(40,40,40)",
                      },
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
                      "&:hover": {
                        backgroundColor: "rgb(40,40,40)",
                      },
                    }}
                    onClick={() => {
                      const updatedRows = [...rows];
                      updatedRows[rowIndex].splice(placeholderIndex, 1);
                      setRows(updatedRows);
                    }}
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
