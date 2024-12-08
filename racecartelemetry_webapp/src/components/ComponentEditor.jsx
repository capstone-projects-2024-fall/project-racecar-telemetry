import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Grid,
} from "@mui/material";

const componentConfigs = {
  Gauge: {
    fields: [
      { label: "Color", type: "select", options: ["Blue", "Red", "Green"] },
      { label: "Min Value", type: "number" },
      { label: "Max Value", type: "number" },
    ],
  },
  "Linear Gauge": {
    fields: [
      { label: "Color", type: "select", options: ["Blue", "Red", "Green"] },
      { label: "Min Value", type: "number" },
      { label: "Max Value", type: "number" },
    ],
  },
  "Time Series Graph": {
    fields: [
      { label: "Color", type: "select", options: ["Blue", "Red", "Green"] },
      { label: "Y Axis Min Value", type: "number" },
      { label: "Y Axis Max Value", type: "number" },
    ],
  },
  "XY Graph": {
    fields: [
      { label: "Color", type: "select", options: ["Blue", "Red", "Green"] },
      { label: "X Axis Min Value", type: "number" },
      { label: "X Axis Max Value", type: "number" },
      { label: "Y Axis Min Value", type: "number" },
      { label: "Y Axis Max Value", type: "number" },
    ],
  },
};

const ComponentEditor = ({ open, onSave, onCancel, groupedDataChannels }) => {
  const [componentType, setComponentType] = useState("");
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedCanID, setSelectedCanID] = useState("");
  const [dataChannels, setDataChannels] = useState([]);
  const [xDataChannels, setXDataChannels] = useState([]);
  const [yDataChannels, setYDataChannels] = useState([]);

  // When CAN ID changes, update Data Channel options
  useEffect(() => {
    if (selectedCanID) {
      setDataChannels(groupedDataChannels[selectedCanID] || []);
      setFormState((prev) => ({ ...prev, dataChannel: "" })); // Reset Data Channel selection
    }
  }, [selectedCanID, groupedDataChannels]);

  const handleTypeChange = (type) => {
    setComponentType(type);
    setFormState({}); // Reset form state when type changes
    setErrors({}); // Clear errors
  };

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false })); // Clear error when input changes
  };

  const handleCanIDChange = (axis, canID) => {
    if (axis === "general") {
      setSelectedCanID(canID);
      setFormState((prev) => ({ ...prev, canID: canID, dataChannel: "" }));
    } else if (axis === "x") {
      setFormState((prev) => ({ ...prev, xCanID: canID, xChannel: "" }));
      setXDataChannels(groupedDataChannels[canID] || []);
    } else if (axis === "y") {
      setFormState((prev) => ({ ...prev, yCanID: canID, yChannel: "" }));
      setYDataChannels(groupedDataChannels[canID] || []);
    }
  };

  const handleSubmit = () => {
    // console.log("handleSubmit triggered"); // Debugging log
  
    const newErrors = {};
    if (!componentType) {
      newErrors.componentType = "Please select a component type.";
    }
  
    if (componentType === "XY Graph") {
      // XY Graph-specific validation
      if (!formState.xCanID) newErrors.xCanID = "Please select the X-axis CAN ID.";
      if (!formState.xChannel) newErrors.xChannel = "Please select the X-axis data channel.";
      if (!formState.yCanID) newErrors.yCanID = "Please select the Y-axis CAN ID.";
      if (!formState.yChannel) newErrors.yChannel = "Please select the Y-axis data channel.";
    } else {
      // General validation for other graph types
      if (!formState.canID) newErrors.canID = "Please select a CAN ID.";
      if (!formState.dataChannel) newErrors.dataChannel = "Please select a data channel.";
    }
  
    const configFields = componentConfigs[componentType]?.fields || [];
    configFields.forEach((field) => {
      if (!formState[field.label]) {
        newErrors[field.label] = `${field.label} is required.`;
      }
    });
  
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors:", newErrors); // Debugging log
      setErrors(newErrors);
      return;
    }
  
    // console.log("Form Data:", formState); // Debugging log
    const saveData = {
      type: componentType,
      config: formState,
    };
  
    if (componentType === "XY Graph") {
      saveData.xCanID = formState.xCanID;
      saveData.xChannel = formState.xChannel;
      saveData.yCanID = formState.yCanID;
      saveData.yChannel = formState.yChannel;
    } else {
      saveData.canID = selectedCanID;
      saveData.dataChannel = formState.dataChannel;
    }
  
    // console.log("Save Data:", saveData); // Debugging log
    onSave(saveData); // Call the save handler
  };
  

  return (
    <Modal open={open} onClose={onCancel} aria-labelledby="component-editor-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography id="component-editor-modal" variant="h6" gutterBottom>
          Component Editor
        </Typography>

        {/* Component Type Selector */}
        <FormControl fullWidth margin="normal" error={!!errors.componentType}>
          <InputLabel>Component Type</InputLabel>
          <Select
            value={componentType}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            {Object.keys(componentConfigs).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          {errors.componentType && (
            <Typography color="error">{errors.componentType}</Typography>
          )}
        </FormControl>

        {/* General CAN ID and Data Channel Fields */}
        {componentType && componentType !== "XY Graph" && (
          <>
            <FormControl fullWidth margin="normal" error={!!errors.canID}>
              <InputLabel>CAN ID</InputLabel>
              <Select
                value={selectedCanID || ""}
                onChange={(e) => handleCanIDChange("general", e.target.value)}
              >
                {Object.keys(groupedDataChannels || {}).map((canID) => (
                  <MenuItem key={canID} value={canID}>
                    {canID}
                  </MenuItem>
                ))}
              </Select>
              {errors.canID && <Typography color="error">{errors.canID}</Typography>}
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.dataChannel} disabled={!selectedCanID}>
              <InputLabel>Data Channel</InputLabel>
              <Select
                value={formState.dataChannel || ""}
                onChange={(e) => handleChange("dataChannel", e.target.value)}
              >
                {dataChannels.map((channel, idx) => (
                  <MenuItem key={idx} value={channel}>
                    {channel}
                  </MenuItem>
                ))}
              </Select>
              {errors.dataChannel && <Typography color="error">{errors.dataChannel}</Typography>}
            </FormControl>
          </>
        )}

        {/* XY Graph Specific Fields */}
        {componentType === "XY Graph" && (
          <>
            <FormControl fullWidth margin="normal" error={!!errors.xCanID}>
              <InputLabel>X-Axis CAN ID</InputLabel>
              <Select
                value={formState.xCanID || ""}
                onChange={(e) => handleCanIDChange("x", e.target.value)}
              >
                {Object.keys(groupedDataChannels || {}).map((canID) => (
                  <MenuItem key={canID} value={canID}>
                    {canID}
                  </MenuItem>
                ))}
              </Select>
              {errors.xCanID && <Typography color="error">{errors.xCanID}</Typography>}
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.xChannel}>
              <InputLabel>X-Axis Data Channel</InputLabel>
              <Select
                value={formState.xChannel || ""}
                onChange={(e) => handleChange("xChannel", e.target.value)}
              >
                {xDataChannels.map((channel, idx) => (
                  <MenuItem key={idx} value={channel}>
                    {channel}
                  </MenuItem>
                ))}
              </Select>
              {errors.xChannel && <Typography color="error">{errors.xChannel}</Typography>}
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.yCanID}>
              <InputLabel>Y-Axis CAN ID</InputLabel>
              <Select
                value={formState.yCanID || ""}
                onChange={(e) => handleCanIDChange("y", e.target.value)}
              >
                {Object.keys(groupedDataChannels || {}).map((canID) => (
                  <MenuItem key={canID} value={canID}>
                    {canID}
                  </MenuItem>
                ))}
              </Select>
              {errors.yCanID && <Typography color="error">{errors.yCanID}</Typography>}
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.yChannel}>
              <InputLabel>Y-Axis Data Channel</InputLabel>
              <Select
                value={formState.yChannel || ""}
                onChange={(e) => handleChange("yChannel", e.target.value)}
              >
                {yDataChannels.map((channel, idx) => (
                  <MenuItem key={idx} value={channel}>
                    {channel}
                  </MenuItem>
                ))}
              </Select>
              {errors.yChannel && <Typography color="error">{errors.yChannel}</Typography>}
            </FormControl>
          </>
        )}

        {/* Dynamic Fields */}
        {componentType &&
          componentConfigs[componentType]?.fields.map((field, index) => (
            <TextField
              key={index}
              type={field.type}
              label={field.label}
              value={formState[field.label] || ""}
              onChange={(e) => handleChange(field.label, e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors[field.label]}
              helperText={errors[field.label]}
            />
          ))}

        {/* Action Buttons */}
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
    </Modal>
  );
};

export default ComponentEditor;
