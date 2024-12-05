import React, { useState } from "react";
import { Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, Grid } from "@mui/material";

const componentConfigs = {
  Gauge: {
    fields: [
      { label: "Color", type: "select", options: ["Blue", "Red", "Green"] },
      { label: "Min Value (C)", type: "number" },
      { label: "Max Value (C)", type: "number" },
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
};

const ComponentEditor = ({ open, onSave, onCancel }) => {
  const [componentType, setComponentType] = useState("");
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});

  const handleTypeChange = (type) => {
    setComponentType(type);
    setFormState({}); // Reset form state when type changes
    setErrors({}); // Clear errors
  };

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false })); // Clear error when input changes
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!componentType) {
      newErrors.componentType = "Please select a component type.";
    }

    const configFields = componentConfigs[componentType]?.fields || [];
    configFields.forEach((field) => {
      if (!formState[field.label]) {
        newErrors[field.label] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({ type: componentType, config: formState });
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

        {/* Dynamic Fields */}
        {componentType &&
          componentConfigs[componentType].fields.map((field, index) => (
            <FormControl
              key={index}
              fullWidth
              margin="normal"
              error={!!errors[field.label]}
            >
              {field.type === "select" ? (
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
                    <Typography color="error">{errors[field.label]}</Typography>
                  )}
                </>
              ) : (
                <TextField
                  type={field.type}
                  label={field.label}
                  value={formState[field.label] || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                  fullWidth
                  error={!!errors[field.label]}
                  helperText={errors[field.label]}
                />
              )}
            </FormControl>
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
