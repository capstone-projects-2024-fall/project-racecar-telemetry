import React from "react";
import { TextField, Grid } from "@mui/material";

export const CANInput = ({ index, row, onRowChange }) => {
  const handleInputChange = (field, value) => {
    const updatedRow = { ...row, [field]: value };
    onRowChange(updatedRow);
  };

  return (
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      <Grid item xs={1.6}>
        <TextField
          label="Data channel"
          variant="outlined"
          fullWidth
          onChange={(e) => handleInputChange("DataChannel", e.target.value)}
          value={row.DataChannel}
        />
      </Grid>
      <Grid item xs={1.6}>
        <TextField
          label="CANID"
          variant="outlined"
          fullWidth
          onChange={(e) => handleInputChange("CanID", e.target.value)}
          value={row.CanID}
        />
      </Grid>
      <Grid item xs={1.6}>
        <TextField
          label="Message Length"
          variant="outlined"
          fullWidth
          onChange={(e) => handleInputChange("MessageLength", e.target.value)}
          value={row.MessageLength}
        />
      </Grid>
      <Grid item xs={1.6}>
        <TextField
          label="Offset Bytes"
          variant="outlined"
          fullWidth
          onChange={(e) => handleInputChange("OffsetBytes", e.target.value)}
          value={row.OffsetBytes}
        />
      </Grid>
      <Grid item xs={1.6}>
        <TextField
          label="Adder"
          variant="outlined"
          fullWidth
          onChange={(e) => handleInputChange("Adder", e.target.value)}
          value={row.Adder}
        />
      </Grid>
      <Grid item xs={1.6}>
        <TextField
          label="Multiplier"
          variant="outlined"
          fullWidth
          onChange={(e) => handleInputChange("Multiplier", e.target.value)}
          value={row.Multiplier}
        />
      </Grid>
      <Grid item xs={1.6}>
        <TextField
          label="Unit"
          variant="outlined"
          fullWidth
          onChange={(e) => handleInputChange("Unit", e.target.value)}
          value={row.Unit}
        />
      </Grid>
    </Grid>
  );
};

export default CANInput;
