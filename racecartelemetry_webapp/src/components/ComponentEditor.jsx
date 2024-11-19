import React, { useState } from "react";
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

const ComponentEditor = ({ config, onSave, onCancel }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false })); // Clear error when input changes
  };

  const handleSubmit = () => {
    const newErrors = {};
    config.fields.forEach((field) => {
      if (!formState[field.label]) {
        newErrors[field.label] = "This field is required.";
      }
    });

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
