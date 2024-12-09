import React, { useState, useEffect } from "react";
import { Grid2, Typography, ThemeProvider, Button, Box, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Crop169Icon from "@mui/icons-material/Crop169";
import CropDinIcon from "@mui/icons-material/CropDin";
import LinearGauge from "@components/LinearGauge";
import TimeSeriesGraph from "@components/TimeSeriesGraph";
import DataGauge from "@components/DataGauge";
import XYGraph from "@components/XYGraph";
import ComponentEditor from "@components/ComponentEditor";
import { getCurrentConfig, fetchDataChannelsGroupedByCanID } from "@/services/CANConfigurationService";
import theme from "@theme";
import { v4 as uuidv4 } from "uuid";
import InstructionsModal from '@components/InstructionsModal';
import HelpButton from '@/components/HelpButton';

export default function CustomDash() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  const [rowHeights, setRowHeights] = useState([]); // Track heights for each row
  const [editorOpen, setEditorOpen] = useState(false); // Modal open state
  const [currentEdit, setCurrentEdit] = useState(null); // Track current row and placeholder
  const [groupedDataChannels, setGroupedDataChannels] = useState({}); // Store CAN data channels

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('DashboardVisited');
    if (!hasVisited) {
      setOpen(true); // Show modal on first visit
      sessionStorage.setItem('DashboardVisited', 'true');
    }
  }, []);

  const handleClose = () => setOpen(false);

  // Fetch CAN data channels on load
  useEffect(() => {
    const fetchCanDataChannels = async () => {
      try {
        const currentConfig = await getCurrentConfig(); // Fetch current config
        if (currentConfig) {
          const data = await fetchDataChannelsGroupedByCanID(currentConfig); // Fetch grouped channels
          setGroupedDataChannels(data);
        }
      } catch (err) {
        console.error("Failed to fetch CAN data:", err);
      }
    };

    fetchCanDataChannels();
  }, []);

  // Load dashboard state from localStorage
  useEffect(() => {
    const storedRows = JSON.parse(localStorage.getItem("dashboardRows") || "[]");
    const storedHeights = JSON.parse(localStorage.getItem("dashboardRowHeights") || "[]");
    setRows(storedRows);
    setRowHeights(storedHeights);
  }, []);

  // Save dashboard state to localStorage
  useEffect(() => {
    localStorage.setItem("dashboardRows", JSON.stringify(rows));
    localStorage.setItem("dashboardRowHeights", JSON.stringify(rowHeights));
  }, [rows, rowHeights]);

  const handleAddRow = () => {
    const input = prompt("Enter a number between 1 and 6 for placeholders:");
    const numPlaceholders = parseInt(input);

    if (isNaN(numPlaceholders) || numPlaceholders < 1 || numPlaceholders > 6) {
      setError("Invalid input. Please enter a number between 1 and 6.");
      return;
    }

    setError(""); // Clear any previous errors

    const newPlaceholders = Array(numPlaceholders)
      .fill(null)
      .map(() => ({ id: uuidv4(), type: null }));

    setRows([...rows, newPlaceholders]); // Add a new row
    setRowHeights([...rowHeights, 450]);
  };

  const adjustRowHeight = (rowIndex, increment) => {
    const updatedHeights = [...rowHeights];
    updatedHeights[rowIndex] = Math.max(
      250,
      Math.min(550, updatedHeights[rowIndex] + increment)
    ); // Clamp the height between 250 and 550
    setRowHeights(updatedHeights);
  };

  const handleOpenEditor = (rowIndex, placeholderIndex) => {
    setCurrentEdit({ rowIndex, placeholderIndex }); // Track the current placeholder being edited
    setEditorOpen(true); // Open the editor modal
  };

  const handleSaveComponent = (config) => {
    const { rowIndex, placeholderIndex } = currentEdit;

    const uniqueID = config.id || uuidv4();

    // Ensure the config has a unique ID
    const updatedConfig = {
      ...config,
      id: uniqueID,
    };

    // console.log("save component:", updatedConfig.id);

    const updatedRows = [...rows];
    updatedRows[rowIndex] = [...updatedRows[rowIndex]];
    updatedRows[rowIndex][placeholderIndex] = { ...updatedConfig };

    setRows(updatedRows);

    const graphTypePrefix = config.type;
    localStorage.setItem(`${graphTypePrefix}-${updatedConfig.id}`, JSON.stringify(updatedConfig));


    setEditorOpen(false); // Close the editor modal
    setCurrentEdit(null); // Reset current edit state
  };

  const handleRemovePlaceholder = (rowIndex, placeholderIndex) => {
    const updatedRows = [...rows];

    const placeholder = updatedRows[rowIndex][placeholderIndex];
    if (placeholder && placeholder.id) {
      const graphTypePrefix = placeholder.type;
      // console.log("placeholderType:", graphTypePrefix);
      localStorage.removeItem(`${graphTypePrefix}-${placeholder.id}`);
    }

    updatedRows[rowIndex].splice(placeholderIndex, 1); // Remove the placeholder box
    setRows(updatedRows);
  };

  const handleRemoveRow = (rowIndex) => {
    // Clone rows for modification
    const updatedRows = [...rows];
    const rowToRemove = updatedRows[rowIndex];
  
    // Remove localStorage entries for all placeholders in the row
    if (rowToRemove) {
      rowToRemove.forEach((placeholder) => {
        if (placeholder && placeholder.id && placeholder.type) {
          const graphTypePrefix = placeholder.type;
          localStorage.removeItem(`${graphTypePrefix}-${placeholder.id}`);
        }
      });
    }
  
    // Remove the row and update state
    updatedRows.splice(rowIndex, 1);
    setRows(updatedRows);
  
    // Update the heights
    const updatedHeights = [...rowHeights];
    updatedHeights.splice(rowIndex, 1);
    setRowHeights(updatedHeights);
  };

  const renderGraph = (config) => {
    if (!config.type) return null;

    // console.log("select: ", config.type)
    switch (config.type) {
      case "Gauge":
        return <DataGauge uniqueID={config.id} />;
      case "Linear Gauge":
        return <LinearGauge uniqueID={config.id} />;
      case "Time Series Graph":
        return <TimeSeriesGraph uniqueID={config.id} />;
      case "XY Graph":
        // console.log("xy graph selected");
        return <XYGraph uniqueID={config.id} />;
      default:
        return null;
    }
  };

  const modalContent = (
    <>
      {/* Welcome Text */}
      <Box textAlign="center" mb={4}>
        <Typography id="instructions-modal-title" variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Box
          sx={{
            width: '85%', // Consistent width for all breaks
            height: '2px',
            backgroundColor: '#ccc',
            margin: '16px auto',
          }}
        />
      </Box>

      {/* Steps in Centered Rows */}
      <Grid2 container direction="column" spacing={6} sx={{ px: 4, textAlign: 'center' }}>
        {/* Step 1 */}
        <Grid2 container spacing={4} justifyContent="center" alignItems="center">
          <Grid2 xs={12} md={5}>
            <Typography variant="h6" gutterBottom>
              Step 1: Selecting a Configuration to edit
            </Typography>
            <Typography variant="body2">
              Use the 'Configuration Manager' to choose or create a new configuration.
              <br />
              Select the configuration you want to edit
              <br />
              Create new configuration by typing in a name and pressing the 'Create' button
            </Typography>
          </Grid2>
          <Grid2 xs={12} md={5}>
            <Box
              component="img"
              src= ''
              alt="Select Configuration Image"
              sx={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: 2,
              }}
            />
          </Grid2>
        </Grid2>
        <Grid2 xs={12}>
          <Box
            sx={{
              width: '90%', // Consistent width
              height: '2px',
              backgroundColor: '#ccc',
              margin: '32px auto', // Consistent margin
            }}
          />
        </Grid2>

        {/* Step 2 */}
        <Grid2 container spacing={4} justifyContent="center" alignItems="center">
          <Grid2 xs={12} md={5} order={{ xs: 2, md: 1 }}>
            <Box
              component="img"
              src=""
              alt="Edit Data Image"
              sx={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: 2,
              }}
            />
          </Grid2>
          <Grid2 xs={12} md={5} order={{ xs: 1, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              Step 2: Editing Data Assignments
            </Typography>
            <Typography variant="body2">
              Assign your 'CAN Configuration' by editing the fields. 
              <br />
              Click the pencil icon to start editing
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 xs={12}>
          <Box
            sx={{
              width: '90%', // Consistent width
              height: '2px',
              backgroundColor: '#ccc',
              margin: '32px auto',
            }}
          />
        </Grid2>

        {/* Step 3 */}
        <Grid2 container spacing={4} justifyContent="center" alignItems="center">
          <Grid2 xs={12} md={5}>
            <Typography variant="h6" gutterBottom>
              Step 3: Saving your Configuration
            </Typography>
            <Typography variant="body2">
              Once you happy with your configuration, don't forget to save and head to the dashboard
            </Typography>
          </Grid2>
          <Grid2 xs={12} md={5}>
            <Box
              component="img"
              src="/images/save-configuration.png"
              alt="Save Configuration"
              sx={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: 2,
              }}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );

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
            {/* Controls on the left */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <Tooltip title="Add Placeholder" placement="right">
                <IconButton
                  color="primary"
                  onClick={() => {
                    const updatedRows = [...rows];
                    updatedRows[rowIndex].push({ id: uuidv4(), type: null });
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
              <Tooltip title="Remove Row" placement="right">
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveRow(rowIndex)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(40,40,40)",
                    },
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Increase Row Height" placement="right">
                <IconButton
                  color="primary"
                  onClick={() => adjustRowHeight(rowIndex, 50)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(40,40,40)",
                    },
                  }}
                >
                  <CropDinIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Decrease Row Height" placement="right">
                <IconButton
                  color="secondary"
                  onClick={() => adjustRowHeight(rowIndex, -50)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(40,40,40)",
                    },
                  }}
                >
                  <Crop169Icon />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Placeholders */}
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                gap: "10px",
                justifyContent: "space-between",
                height: `${rowHeights[rowIndex]}px`, // Dynamically set height
                width: "100%",
              }}
            >
              {row.map((placeholder, placeholderIndex) => (
                <Box
                  key={placeholder.id}
                  sx={{
                    flex: 1,
                    height: "100%", // Match row height
                    border: "2px dashed gray",
                    position: "relative",
                  }}
                >
                  {placeholder.type ? (
                    renderGraph(placeholder)
                  ) : (
                    // Render the add button for placeholders
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
                      onClick={() => handleOpenEditor(rowIndex, placeholderIndex)}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                  {/* Remove placeholder/component button */}
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

      <ThemeProvider theme={theme}>

      <InstructionsModal open={open} onClose={handleClose}>
        {modalContent}
      </InstructionsModal>

      {/* Help Button */}
      <HelpButton onClick={() => setOpen(true)} />

    </ThemeProvider>

      {/* Component Editor Modal */}
      {editorOpen && (
        <ComponentEditor
          open={editorOpen}
          groupedDataChannels={groupedDataChannels} // Pass CAN data
          onSave={(config) => handleSaveComponent({ type: config.type, ...config })}
          onCancel={() => setEditorOpen(false)}
        />
      )}
    </Box>
  );
}
