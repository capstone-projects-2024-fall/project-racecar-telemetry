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

const ComponentEditor = () => {
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [dropdown3, setDropdown3] = useState("");
  const [dropdown4, setDropdown4] = useState("");
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");

  const handleDropdown1Change = (event) => setDropdown1(event.target.value);
  const handleDropdown2Change = (event) => setDropdown2(event.target.value);
  const handleDropdown3Change = (event) => setDropdown3(event.target.value);
  const handleDropdown4Change = (event) => setDropdown4(event.target.value);
  const handleMaxChange = (event) => setMax(event.target.value);
  const handleMinChange = (event) => setMin(event.target.value);

  const handleSubmit = () => {
    console.log("Dropdown 1:", dropdown1);
    console.log("Dropdown 2:", dropdown2);
    console.log("Dropdown 3:", dropdown3);
    console.log("Dropdown 4:", dropdown4);
    console.log("Max:", max);
    console.log("Min", min);
  };

  const handleCancel = () => {
    setDropdown1("");
    setDropdown2("");
    setDropdown3("");
    setDropdown4("");
    setMax("");
    setMin("");
    console.log("Cancelled editing");
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

      {/* Dropdown 1 */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Data Channel</InputLabel>
        <Select value={dropdown1} onChange={handleDropdown1Change}>
          <MenuItem value="Data Channel 1">Data Channel 1</MenuItem>
          <MenuItem value="Data Channel 2">Data Channel 2</MenuItem>
          <MenuItem value="Data Channel 3">Data Channel 3</MenuItem>
        </Select>
      </FormControl>

      {/* Dropdown 2 */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Data Label</InputLabel>
        <Select value={dropdown2} onChange={handleDropdown2Change}>
          <MenuItem value="Data Label 1">Data Label 1</MenuItem>
          <MenuItem value="Data Label 2">Data Label 2</MenuItem>
          <MenuItem value="Data Label 3">Data Label 3</MenuItem>
        </Select>
      </FormControl>

      {/* Dropdown 3 */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Display</InputLabel>
        <Select value={dropdown3} onChange={handleDropdown3Change}>
          <MenuItem value="Linear">Linear</MenuItem>
          <MenuItem value="Radial">Radial</MenuItem>
          <MenuItem value="Bar Graph">Bar Graph</MenuItem>
        </Select>
      </FormControl>

      {/* Dropdown 4 */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Unit of measure</InputLabel>
        <Select value={dropdown4} onChange={handleDropdown4Change}>
          <MenuItem value="MPH">MPH</MenuItem>
          <MenuItem value="KPH">KPH</MenuItem>
        </Select>
      </FormControl>

      {/* Max input */}

      <TextField
        label="Max"
        variant="outlined"
        value={max}
        onChange={handleMaxChange}
        fullWidth
        margin="normal"
      />

      {/* Min input */}

      <TextField
        label="Min"
        variant="outlined"
        value={min}
        onChange={handleMinChange}
        fullWidth
        margin="normal"
      />

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

export default ComponentEditor;
