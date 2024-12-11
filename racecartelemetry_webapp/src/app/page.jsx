"use client";
import { useState, useEffect } from "react";
import { Grid2, Typography, CssBaseline, Button, Box, IconButton, Tooltip, ThemeProvider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Crop169Icon from "@mui/icons-material/Crop169";
import CropDinIcon from "@mui/icons-material/CropDin";
import NavBar from "@components/NavBar";
import DataWidgetList from "@components/DataWidgetList";
import DataGauge from "@components/DataGauge";
import TimeSeriesGraph from "@components/TimeSeriesGraph";
<<<<<<< HEAD
import XYGraph from "@components/XYGraph";
import LinearGauge from "@components/LinearGauge";
import ComponentEditor from "@components/ComponentEditor";
import { getCurrentConfig, fetchDataChannelsGroupedByCanID, } from "@/services/CANConfigurationService";
import theme from "./theme";
import InstructionsModal from '@components/InstructionsModal';
import HelpButton from '@/components/HelpButton';

import { v4 as uuidv4 } from "uuid";
=======
import TestData from "@components/testData";
import CANDataLiveReading from "@components/CANDataLiveReading";
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import theme from "@app/theme";
>>>>>>> 4561e7a (used DataDisplay in component that reads live data so that it reads live data)

export default function Home() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  const [rowHeights, setRowHeights] = useState([]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [groupedDataChannels, setGroupedDataChannels] = useState({});

  // Default configuration for initial graphs
  const defaultGraphs = [
    { type: "Gauge", id: uuidv4() },
    { type: "Linear Gauge", id: uuidv4() },
    { type: "Linear Gauge", id: uuidv4() },
    { type: "Time Series Graph", id: uuidv4() },
    { type: "XY Graph", id: uuidv4() },
  ];
  const defaultRows = [
    [defaultGraphs[0], defaultGraphs[1], defaultGraphs[2]],
    [defaultGraphs[3], defaultGraphs[4]],
  ];

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('DashboardVisited');
    if (!hasVisited) {
      setOpen(true); // Show modal on first visit
      sessionStorage.setItem('DashboardVisited', 'true');
    }
  }, []);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchCanDataChannels = async () => {
      try {
        const currentConfig = await getCurrentConfig();
        if (currentConfig) {
          const data = await fetchDataChannelsGroupedByCanID(currentConfig);
          setGroupedDataChannels(data);
        }
      } catch (err) {
        console.error("Failed to fetch CAN data:", err);
      }
    };

    fetchCanDataChannels();
  }, []);

  useEffect(() => {
    const isInitialized = localStorage.getItem("dashboardInitialized");

    if (!isInitialized) {
      setRows(defaultRows);
      setRowHeights([450, 450]);

      // Save to local storage
      localStorage.setItem("dashboardRows", JSON.stringify(defaultRows));
      localStorage.setItem("dashboardRowHeights", JSON.stringify([450, 450]));
      localStorage.setItem("dashboardInitialized", "true");

      // Manually set each graph configuration in local storage
      localStorage.setItem(
        `Gauge-${defaultGraphs[0].id}`,
        JSON.stringify({
          canID: "200",
          dataChannel: "Battery",
          color: "Green",
          min: "0",
          max: "100",
          config: {
            canID: "200",
            dataChannel: "Battery",
            Color: "Green",
            "Min Value": "0",
            "Max Value": "100",
          },
          id: defaultGraphs[0].id,
        })
      );

      localStorage.setItem(
        `Linear Gauge-${defaultGraphs[1].id}`,
        JSON.stringify({
          canID: "200",
          dataChannel: "Throttle Position",
          color: "Blue",
          min: "0",
          max: "120",
          config: {
            canID: "200",
            dataChannel: "Throttle Position",
            Color: "Blue",
            "Min Value": "0",
            "Max Value": "120",
          },
          id: defaultGraphs[1].id,
        })
      );

      localStorage.setItem(
        `Linear Gauge-${defaultGraphs[2].id}`,
        JSON.stringify({
          canID: "200",
          dataChannel: "Brake Pressure",
          color: "Red",
          min: "0",
          max: "100",
          config: {
            canID: "200",
            dataChannel: "Brake Pressure",
            Color: "Red",
            "Min Value": "0",
            "Max Value": "100",
          },
          id: defaultGraphs[2].id,
        })
      );

      localStorage.setItem(
        `Time Series Graph-${defaultGraphs[3].id}`,
        JSON.stringify({
          canID: "200",
          dataChannel: "Throttle Position",
          color: "Orange",
          config: {
            canID: "200",
            dataChannel: "Throttle Position",
            Color: "Orange",
            "Y Axis Min Value": "0",
            "Y Axis Max Value": "100",
          },
          id: defaultGraphs[3].id,
        })
      );

      localStorage.setItem(
        `XY Graph-${defaultGraphs[4].id}`,
        JSON.stringify({
          xCanID: "200",
          xChannel: "Throttle Position",
          yCanID: "200",
          yChannel: "Brake Pressure",
          color: "Silver",
          xMin: "0",
          xMax: "100",
          yMin: "0",
          yMax: "100",
          type: "XY Graph",
          config: {
            xCanID: "200",
            xChannel: "Throttle Position",
            yCanID: "200",
            yChannel: "Brake Pressure",
            Color: "Silver",
            "X Axis Min Value": "0",
            "X Axis Max Value": "100",
            "Y Axis Min Value": "0",
            "Y Axis Max Value": "100",
          },
          id: defaultGraphs[4].id,
        })
      );
    } else {
      // Load existing state from local storage
      const storedRows = JSON.parse(localStorage.getItem("dashboardRows")) || [];
      const storedHeights = JSON.parse(localStorage.getItem("dashboardRowHeights")) || [];

      setRows(storedRows);
      setRowHeights(storedHeights);
    }
  }, []);


  useEffect(() => {
    if (rows.length > 0) {
      localStorage.setItem("dashboardRows", JSON.stringify(rows));
      localStorage.setItem("dashboardRowHeights", JSON.stringify(rowHeights));
    }
  }, [rows, rowHeights]);

  const handleAddRow = () => {
    const input = prompt("Enter a number between 1 and 6 for placeholders:");
    const numPlaceholders = parseInt(input);

    if (isNaN(numPlaceholders) || numPlaceholders < 1 || numPlaceholders > 6) {
      setError("Invalid input. Please enter a number between 1 and 6.");
      return;
    }

    setError("");

    const newPlaceholders = Array(numPlaceholders)
      .fill(null)
      .map(() => ({ id: uuidv4(), type: null }));

    setRows([...rows, newPlaceholders]);
    setRowHeights([...rowHeights, 450]);
  };

  const adjustRowHeight = (rowIndex, increment) => {
    const updatedHeights = [...rowHeights];
    updatedHeights[rowIndex] = Math.max(
      250,
      Math.min(550, updatedHeights[rowIndex] + increment)
    );
    setRowHeights(updatedHeights);
  };

  const handleOpenEditor = (rowIndex, placeholderIndex) => {
    setCurrentEdit({ rowIndex, placeholderIndex });
    setEditorOpen(true);
  };

  const handleSaveComponent = (config) => {
    const { rowIndex, placeholderIndex } = currentEdit;

    const uniqueID = config.id || uuidv4();

    const updatedConfig = {
      ...config,
      id: uniqueID,
    };

    const updatedRows = [...rows];
    updatedRows[rowIndex] = [...updatedRows[rowIndex]];
    updatedRows[rowIndex][placeholderIndex] = { ...updatedConfig };

    setRows(updatedRows);

    const graphTypePrefix = config.type;
    localStorage.setItem(
      `${graphTypePrefix}-${updatedConfig.id}`,
      JSON.stringify(updatedConfig)
    );

    setEditorOpen(false);
    setCurrentEdit(null);
  };

  const handleRemovePlaceholder = (rowIndex, placeholderIndex) => {
    const updatedRows = [...rows];

    const placeholder = updatedRows[rowIndex][placeholderIndex];
    if (placeholder && placeholder.id) {
      const graphTypePrefix = placeholder.type;
      localStorage.removeItem(`${graphTypePrefix}-${placeholder.id}`);
    }

    updatedRows[rowIndex].splice(placeholderIndex, 1);
    setRows(updatedRows);
  };

  const handleRemoveRow = (rowIndex) => {
    const updatedRows = [...rows];
    const rowToRemove = updatedRows[rowIndex];

    if (rowToRemove) {
      rowToRemove.forEach((placeholder) => {
        if (placeholder && placeholder.id && placeholder.type) {
          const graphTypePrefix = placeholder.type;
          localStorage.removeItem(`${graphTypePrefix}-${placeholder.id}`);
        }
      });
    }

    updatedRows.splice(rowIndex, 1);
    setRows(updatedRows);

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
        return <XYGraph uniqueID={config.id} />;
      default:
        return null;
    }
  };

  const modalContent = (
    <>
      {/* Header */}
      <Box textAlign="center" mb={1} sx={{ mt: 2 }}>
        <Typography
          id="instructions-modal-title"
          variant="h4"
          gutterBottom
          sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}
        >
          Dashboard: Quick Reference Guide
        </Typography>
      </Box>

      <Grid2
        container
        direction="column"
        spacing={6}
        sx={{
          px: 4,
          backgroundColor: '#121213',
          borderRadius: 2,
          padding: 4,
        }}
      >
        {/* Step 1 */}
        <Grid2 container spacing={3} justifyContent="center" alignItems="flex-start">
          <Grid2 xs={12} md={5}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'white', fontWeight: 'bold', textAlign: 'left' }}
            >
              Choose a configuration to be selected !!
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', textAlign: 'left' }}>
              Use the{' '}
              <Typography component="span" sx={{ color: '#1d9bf0' }}>
                selected configuration
              </Typography>{' '}
              to choose a created configuration that is used to decode the CAN Messages.
              <br />
              After you have selected a configuration, the telemetry device must be{' '}
              <Typography component="span" sx={{ color: '#FF5733' }}>
                reset!
              </Typography>{' '}
            </Typography>
          </Grid2>
          <Grid2 xs={12} md={5}>
            <Box
              component="img"
              src="/dashboard-select.png"
              alt="Select Configuration Image"
              sx={{
                width: '100%',
                maxWidth: '200px',
                height: 'auto',
                borderRadius: 2,
                border: '2px solid #444',
                display: 'block',
              }}
            />
          </Grid2>
        </Grid2>
        <Grid2 xs={12}>
          <Box
            sx={{
              width: '90%',
              height: '2px',
              backgroundColor: '#cccccc',
              margin: '10px auto',
            }}
          />
        </Grid2>

        {/* Step 2 */}
        <Grid2 container spacing={3} justifyContent="center" alignItems="flex-start">
          <Grid2 xs={12} md={5} order={{ xs: 2, md: 1 }}>
            <Box
              component="img"
              src="/dashboard-add-row.png"
              alt="Edit Data Image"
              sx={{
                width: '100%',
                maxWidth: '200px',
                height: 'auto',
                borderRadius: 2,
                border: '2px solid #444',
                display: 'block',
              }}
            />
          </Grid2>
          <Grid2 xs={12} md={5} order={{ xs: 1, md: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'white', fontWeight: 'bold', textAlign: 'left' }}
            >
              Optional: Adding More Rows
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', textAlign: 'left' }}>
              You can create new rows by clicking the{' '}
              <Typography component="span" sx={{ color: '#1d9bf0' }}>
                add row
              </Typography>{' '}
              button.
              <br />
              You can choose up to 6 graphs in 1 row.
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 xs={12}>
          <Box
            sx={{
              width: '90%',
              height: '2px',
              backgroundColor: '#cccccc',
              margin: '10px auto',
            }}
          />
        </Grid2>
      </Grid2>
      {/* Icon Descriptions Grid */}
      <Grid2
        container
        spacing={4}
        sx={{
          justifyContent: "center", // Centers the entire grid horizontally
          textAlign: "center", // Centers text within each column
          px: 4,
          backgroundColor: "#121213",
          borderRadius: 2,
          padding: 4,
        }}
      >
        {/* Row 1 */}
        <Grid2 container item xs={12} spacing={4} justifyContent="space-evenly" alignItems="center">
          {/* Column 1 */}
          <Grid2 item xs={12} sm={4} sx={{ maxWidth: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Box
                component="img"
                src="/add-graph.png"
                alt="Add Data Icon"
                sx={{
                  width: "50px",
                  height: "50px",
                  marginBottom: 1,
                  borderRadius: "50%",
                  border: "2px solid #444",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Add Graph
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Click to choose between 4 different graphs to display.
              </Typography>
            </Box>
          </Grid2>

          {/* Column 2 */}
          <Grid2 item xs={12} sm={4} sx={{ maxWidth: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Box
                component="img"
                src="/delete-graph.png"
                alt="Filter Data Icon"
                sx={{
                  width: "50px",
                  height: "50px",
                  marginBottom: 1,
                  borderRadius: "50%",
                  border: "2px solid #444",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Delete Graph
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Click the button on the top right of the graph to delete the graph.
              </Typography>
            </Box>
          </Grid2>

          {/* Column 3 */}
          <Grid2 item xs={12} sm={4} sx={{ maxWidth: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Box
                component="img"
                src="/add-placeholder.png"
                alt="Download Icon"
                sx={{
                  width: "50px",
                  height: "50px",
                  marginBottom: 1,
                  borderRadius: "50%",
                  border: "2px solid #444",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Add Graph Selector
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Click to add a new graph selector into the row.
              </Typography>
            </Box>
          </Grid2>
        </Grid2>

        {/* Row 2 */}
        <Grid2 container item xs={12} spacing={4} justifyContent="space-evenly" alignItems="center">
          {/* Column 1 */}
          <Grid2 item xs={12} sm={4} sx={{ maxWidth: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Box
                component="img"
                src="/delete-row.png"
                alt="Settings Icon"
                sx={{
                  width: "50px",
                  height: "50px",
                  marginBottom: 1,
                  borderRadius: "50%",
                  border: "2px solid #444",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Delete Row
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Click to remove the entire row.
              </Typography>
            </Box>
          </Grid2>

          {/* Column 2 */}
          <Grid2 item xs={12} sm={4} sx={{ maxWidth: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Box
                component="img"
                src="/increase-height.png"
                alt="Graph Icon"
                sx={{
                  width: "50px",
                  height: "50px",
                  marginBottom: 1,
                  borderRadius: "50%",
                  border: "2px solid #444",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Increase Height
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Click to increase the row of graph&apos;s height.
              </Typography>
            </Box>
          </Grid2>

          {/* Column 3 */}
          <Grid2 item xs={12} sm={4} sx={{ maxWidth: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Box
                component="img"
                src="/decrease-height.png"
                alt="Help Icon"
                sx={{
                  width: "50px",
                  height: "50px",
                  marginBottom: 1,
                  borderRadius: "50%",
                  border: "2px solid #444",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Decrease Height
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  textAlign: "center",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                }}
              >
                Click to decrease the row of graph&apos;s height.
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );


  return (
    <ThemeProvider theme={theme}>
<<<<<<< HEAD
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          backgroundColor: "#1F2020",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0.5,
          "&:focus": {
            outline: "none", // Remove focus outline
          },
          "&:focus-visible": {
            outline: "none", // Prevents focus rings for mouse users
          },
        }}
      >
        <DataWidgetList
          sx={{
            "&:focus": {
              outline: "none",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          backgroundColor: "#1F2020",
          minHeight: "100vh",
          padding: "20px",
          color: "white",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRow}
          sx={{ marginBottom: "10px" }}
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
                <Box
                  sx={{
                    backgroundColor: "#1F2020", // Shared grey background
                    borderRadius: "8px", // Optional: Add rounded corners
                    padding: "5px", // Add some spacing around the buttons
                    display: "flex",
                    flexDirection: "column", // Stack the buttons vertically
                    alignItems: "center",
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
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#1F2020", // Shared grey background
                    borderRadius: "8px", // Optional: Add rounded corners
                    padding: "5px", // Add some spacing around the buttons
                    display: "flex",
                    flexDirection: "column", // Stack the buttons vertically
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Remove Row" placement="right">
                    <IconButton
                      color="primary"
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
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#1F2020", // Shared grey background
                    borderRadius: "8px", // Optional: Add rounded corners
                    padding: "5px", // Add some spacing around the buttons
                    display: "flex",
                    flexDirection: "column", // Stack the buttons vertically
                    alignItems: "center",
                  }}
                >
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
                      color="primary"
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
                      border: "1px solid #A32036",
                      position: "relative",
                      borderRadius: "10px",
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
                        onClick={() =>
                          handleOpenEditor(rowIndex, placeholderIndex)
                        }
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
                      onClick={() =>
                        handleRemovePlaceholder(rowIndex, placeholderIndex)
                      }
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
            onSave={(config) =>
              handleSaveComponent({ type: config.type, ...config })
            }
            onCancel={() => setEditorOpen(false)}
          />
        )}
      </Box>
=======
      <div className="flex flex-col justify-center">
        <NavBar/>
        {/* <DataDisplay data={telemetryData} /> 
        {/* <TimeSeriesGraph /> */}
        {/* <TestData/> */}
        <CANDataLiveReading canID={'001'}/> 
      </div>
>>>>>>> 4561e7a (used DataDisplay in component that reads live data so that it reads live data)
    </ThemeProvider>
  );
}
