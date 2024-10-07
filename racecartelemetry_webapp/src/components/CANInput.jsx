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

export const CANInput = ({ index }) => {
  const [DataChannel, setDataChannel] = useState("");
  const [CanID, setCanID] = useState("");
  const [MessageLength, setMessageLength] = useState("");
  const [OffsetBytes, setOffsetBytes] = useState("");
  const [adder, setAdder] = useState("");
  const [multiplier, setMultiplier] = useState("");
  const [unit, setUnit] = useState("");

  const handleDataChannelChange = (event) => setDataChannel(event.target.value);
  const handleCanIDChange = (event) => setCanID(event.target.value);
  const handleMessageLengthChange = (event) =>
    setMessageLength(event.target.value);
  const handleOffsetBytesChange = (event) => setOffsetBytes(event.target.value);
  const handleAdderChange = (event) => setAdder(event.target.value);
  const handleMultiplierChange = (event) => setMultiplier(event.target.value);
  const handleUnitChange = (event) => setUnit(event.target.value);

  return (
    <>
      <Grid container key={index} spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={1.6}>
          <TextField
            label="Data channel"
            variant="outlined"
            fullWidth
            onChange={handleDataChannelChange}
            value={DataChannel}
          />
        </Grid>
        <Grid item xs={1.6}>
          <TextField
            label="CANID"
            variant="outlined"
            fullWidth
            onChange={handleCanIDChange}
            value={CanID}
          />
        </Grid>
        <Grid item xs={1.6}>
          <TextField
            label="Message Length"
            variant="outlined"
            fullWidth
            onChange={handleMessageLengthChange}
            value={MessageLength}
          />
        </Grid>
        <Grid item xs={1.6}>
          <TextField
            label="Offset Bytes"
            variant="outlined"
            fullWidth
            onChange={handleOffsetBytesChange}
            value={OffsetBytes}
          />
        </Grid>
        <Grid item xs={1.6}>
          <TextField
            label="Adder"
            variant="outlined"
            fullWidth
            onChange={handleAdderChange}
            value={adder}
          />
        </Grid>
        <Grid item xs={1.6}>
          <TextField
            label="Multiplier"
            variant="outlined"
            fullWidth
            onChange={handleMultiplierChange}
            value={multiplier}
          />
        </Grid>
        <Grid item xs={1.6}>
          <TextField
            label="Unit"
            variant="outlined"
            fullWidth
            onChange={handleUnitChange}
            value={unit}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default CANInput;
