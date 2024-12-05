import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Grid,
  FormHelperText,
} from "@mui/material";
import { getCurrentConfig, fetchDataChannelsGroupedByCanID  } from "@/services/CANConfigurationService";

const ComponentEditor = ({ config, onSave, onCancel }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});
  const [groupedDataChannels, setGroupedDataChannels] = useState({});
  const [selectedCanID, setSelectedCanID] = useState("");

  useEffect(() => {
    const loadDataChannels = async () => {
      try {
        const currentConfig = await getCurrentConfig();
        console.log("Current Config:", currentConfig);

        if (currentConfig) {
          const groupedChannels = await fetchDataChannelsGroupedByCanID(currentConfig);
          console.log("Grouped Data Channels:", groupedChannels);
          setGroupedDataChannels(groupedChannels);
        }
      } catch (error) {
        console.error("Error loading data channels:", error);
      }
    };

    loadDataChannels();
  }, []);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false })); // Clear error when input changes
  };

  const handleCanIDChange = (canID) => {
    setSelectedCanID(canID);
    setFormState((prev) => ({ ...prev, canID })); // Save CAN ID in formState
    setFormState((prev) => ({ ...prev, dataChannel: "" })); // Clear the selected data channel when CAN ID changes
  };


  const handleSubmit = () => {
    const newErrors = {};
    config.fields.forEach((field) => {
      if (!formState[field.label]) {
        newErrors[field.label] = "This field is required.";
      }
    });
    
    if (!formState.dataChannel) {
      newErrors.dataChannel = "Please select a data channel.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(errors);
      return;
    }

    console.log("Form Data:", formState);
    onSave(formState);
  };

  return (
    <Box
      sx={{
        width: 400,
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
        Component Editor
      </Typography>

      {/* CAN ID Selector */}
      <FormControl
        fullWidth
        margin="normal"
        sx={{ marginBottom: 2 }}
        error={!!errors.canID}
      >
        <InputLabel>CAN ID</InputLabel>
        <Select
          value={selectedCanID}
          onChange={(e) => handleCanIDChange(e.target.value)}
        >
          {Object.keys(groupedDataChannels).map((canID) => (
            <MenuItem key={canID} value={canID}>
              {canID}
            </MenuItem>
          ))}
        </Select>
        {errors.canID && <FormHelperText>{errors.canID}</FormHelperText>}
      </FormControl>

      {/* Data Channel Selector */}
      <FormControl
        fullWidth
        margin="normal"
        sx={{ marginBottom: 2 }}
        error={!!errors.dataChannel}
        disabled={!selectedCanID} // Disable if no CAN ID is selected
      >
        <InputLabel>Data Channel</InputLabel>
        <Select
          value={formState.dataChannel || ""}
          onChange={(e) => handleChange("dataChannel", e.target.value)}
        >
          {(groupedDataChannels[selectedCanID] || []).map((channel, idx) => (
            <MenuItem key={idx} value={channel}>
              {channel}
            </MenuItem>
          ))}
        </Select>
        {errors.dataChannel && (
          <FormHelperText>{errors.dataChannel}</FormHelperText>
        )}
      </FormControl>


      {config.fields.map((field, index) => (
        <FormControl
          key={index}
          fullWidth
          margin="normal"
          sx={{ marginBottom: 2 }}
          error={!!errors[field.label]} // Highlight field if there's an error
        >
          {/* Render Select Input */}
          {field.type === "select" && (
            <>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={formState[field.label] || ""}
                onChange={(e) => handleChange(field.label, e.target.value)}
              >
                {field.options.map((option, idx) => (
                  <MenuItem key={idx} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {errors[field.label] && (
                <FormHelperText>{errors[field.label]}</FormHelperText>
              )}
            </>
          )}

          {/* Render TextField for Text or Number Input */}
          {(field.type === "text" || field.type === "number") && (
            <>
              <TextField
                type={field.type}
                value={formState[field.label] || ""}
                onChange={(e) => handleChange(field.label, e.target.value)}
                label={field.label}
                fullWidth
                error={!!errors[field.label]} // Highlight TextField if there's an error
                helperText={errors[field.label]} // Show error message below the input
              />
            </>
          )}
        </FormControl>
      ))}

      {/* Buttons for Cancel and Save */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onCancel}
            fullWidth
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComponentEditor;
