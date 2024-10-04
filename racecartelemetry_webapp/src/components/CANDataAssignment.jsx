import React, { useState } from "react";
import { CANInput } from "./CANInput";
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

const CANDataAssignment = () => {
  const [rows, setRows] = useState([1]);
  const handleSubmit = () => {};

  const handleCancel = () => {};

  const handleAddRow = () => {
    setRows([...rows, rows.length]);
  };

  return (
    <Box
      sx={{
        width: 1300,
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
        CAN Data Assignment
      </Typography>

      {rows.map((index) => (
        <Grid item xs={12} key={index}>
          <CANInput index={index} />
        </Grid>
      ))}

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRow}
          sx={{ marginTop: 2 }}
        >
          +
        </Button>
      </Grid>

      {/* Buttons: Submit and Cancel */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
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

export default CANDataAssignment;
