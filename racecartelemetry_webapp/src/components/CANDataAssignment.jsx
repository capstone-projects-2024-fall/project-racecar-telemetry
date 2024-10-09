import React, { useState } from "react";
import { CANInput } from "./CANInput";
import { Button, Box, Typography, Grid } from "@mui/material";

const CANDataAssignment = () => {
  const [rows, setRows] = useState([
    {
      DataChannel: "",
      CanID: "",
      MessageLength: "",
      OffsetBytes: "",
      Adder: "",
      Multiplier: "",
      Unit: "",
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        DataChannel: "",
        CanID: "",
        MessageLength: "",
        OffsetBytes: "",
        Adder: "",
        Multiplier: "",
        Unit: "",
      },
    ]);
  };

  const handleRowChange = (index, updatedRow) => {
    const updatedRows = rows.map((row, i) => (i === index ? updatedRow : row));
    setRows(updatedRows);
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", rows);
  };

  const handleCancel = () => {
    setRows([
      {
        DataChannel: "",
        CanID: "",
        MessageLength: "",
        OffsetBytes: "",
        Adder: "",
        Multiplier: "",
        Unit: "",
      },
    ]);
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

      {rows.map((row, index) => (
        <Grid item xs={12} key={index}>
          <CANInput
            index={index}
            row={row}
            onRowChange={(updatedRow) => handleRowChange(index, updatedRow)}
          />
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

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
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
