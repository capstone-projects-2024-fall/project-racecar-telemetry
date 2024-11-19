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
} from "@mui/material";

const ComponentEditor = ({ config, onSave, onCancel }) => {
  const [formState, setFormState] = useState({});

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
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
            </>
          )}

          {/* Render TextField for Text or Number Input */}
          {(field.type === "text" || field.type === "number") && (
            <TextField
              type={field.type}
              value={formState[field.label] || ""}
              onChange={(e) => handleChange(field.label, e.target.value)}
              label={field.label}
              fullWidth
            />
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
