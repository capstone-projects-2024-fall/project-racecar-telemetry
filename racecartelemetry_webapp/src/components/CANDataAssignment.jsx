import React, { useState, useEffect } from "react";
import { 
  Button, 
  Box, 
  Typography, 
  Grid, 
  IconButton, 
  Alert,
  Snackbar 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; 
import { CANInput } from "@/components/CANInput";
import { saveCANData, fetchCANData, deleteConfigRow } from '@services/CANConfigurationService';

const CANDataAssignment = ({ selectedConfig, setIsEditing }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Fetches existing data for the selected configuration
  useEffect(() => {
    const loadExistingData = async () => {
      if (!selectedConfig) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchCANData(selectedConfig);
        // Transform data from object to array, adding a unique id to each row
        const rowsArray = Object.entries(data || {}).map(([canId, rowData], index) => ({
          id: index, // You might want to use a more robust unique ID generator
          CanID: canId,
          ...rowData,
        }));
        setRows(rowsArray);
      } catch (error) {
        console.error("Failed to load existing data:", error);
        setError(`Failed to load existing data: ${error.message}`);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    loadExistingData();
  }, [selectedConfig]);

  // Adds a new empty row; user enters their own CanID
  const handleAddRow = () => {
    setRows(prevRows => ([
      ...prevRows,
      {
        id: Date.now(), // Use a unique identifier
        CanID: "",
        NumOfSignals: "",
        Signals: [], // Ensure Signals is initialized
      }
    ]));
  };
  

  // Updates a specific row by id
  const handleRowChange = (id, updatedRow) => {
    setRows(prevRows =>
      prevRows.map(row => (row.id === id ? { ...row, ...updatedRow } : row))
    );
  };

  // Deletes a specific row by id
  const handleDeleteRow = async (id) => {
    if (rows.length <= 1) {
      showNotification("Cannot delete the last row", "warning");
      return;
    }

    try {
      const rowToDelete = rows.find(row => row.id === id);
      const updatedRows = rows.filter(row => row.id !== id);
      setRows(updatedRows);

      // Update Firestore to delete this specific row
      if (rowToDelete && rowToDelete.CanID) {
        await deleteConfigRow(selectedConfig, rowToDelete.CanID);
      }
      showNotification("Row deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete row:", error);
      showNotification("Failed to delete row", "error");
    }
  };

  // Shows notifications for success or error messages
  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  // Saves all rows to Firestore
  const handleSubmit = async () => {
    // Validate that all CANIDs are provided
    if (rows.some((row) => !row.CanID)) {
      showNotification("Please provide a CANID for each row", "warning");
      return;
    }
  
    try {
      // Transform rows into the desired structure
      const dataToSave = {};
  
      rows.forEach((row) => {
        const { CanID, NumOfSignals, Signals } = row;
  
        // Prepare the DataChannels for the current CANID
        const dataChannels = {};
        Signals.forEach((signal) => {
          const { DataChannel, startBit, bitLength, adder, multiplier, unit } = signal;
          dataChannels[DataChannel] = { startBit, bitLength, adder, multiplier, unit };
        });
  
        // Save the structure for the CANID
        dataToSave[CanID] = {
          NumOfSignals: NumOfSignals,
          DataChannels: dataChannels,
        };
      });
  
      // Call saveCANData with the transformed data
      await saveCANData(selectedConfig, dataToSave);
  
      showNotification("Data saved successfully");
      setTimeout(() => setIsEditing(false), 1500);
    } catch (error) {
      console.error("Failed to save data:", error);
      showNotification(`Failed to save data: ${error.message}`, "error");
    }
  };
  

  if (!selectedConfig) {
    return (
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <Typography>Please select a configuration to edit</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <Typography>Loading configuration data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1300,
        padding: 3,
        borderRadius: 2,
        backgroundColor: "#f0f0f0",
        boxShadow: 3,
        margin: "auto",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          marginBottom: 2,
          fontWeight: "bold",
          textAlign: "center",
          color: "#333",
        }}
      >
        Configuration: {selectedConfig}
      </Typography>

      {/* Render each row */}
      {rows.map((row, index) => (
        <Grid container spacing={2} alignItems="center" key={row.id} sx={{ marginBottom: 2 }}>
          <Grid item xs={11}>
            <CANInput
              index={index}
              row={row}
              onRowChange={(updatedRow) => handleRowChange(row.id, updatedRow)}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => handleDeleteRow(row.id)}
              color="error"
              sx={{ mt: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRow}
            sx={{ height: 50 }}
          >
            Add Row
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsEditing(false)}
            sx={{ height: 50 }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ height: 50 }}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert 
          onClose={() => setNotification({ ...notification, open: false })} 
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CANDataAssignment;
