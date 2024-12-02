import React, { useState, useEffect } from "react";
import { TextField, Grid, Button, Typography, Modal, Box, useTheme } from "@mui/material";
import Theme from "@theme";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

export const CANInput = ({ index, row, onRowChange }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [signals, setSignals] = useState([]);

  // Update signals array when the number of signals changes
  useEffect(() => {
    const numSignals = parseInt(row.NumOfSignals) || 0;
    setSignals((prev) =>
      Array.from({ length: numSignals }, (_, idx) => prev[idx] || {
        Index: idx + 1,
        DataChannel: "",
        startBit: "",
        bitLength: "",
        adder: "",
        multiplier: "",
        unit: "",
      })
    );
  }, [row.NumOfSignals]);

  const handleInputChange = (field, value) => {
    const updatedRow = { ...row, [field]: value };
    onRowChange(updatedRow);
  };

  const handleSignalChange = (signalIndex, field, value) => {
    const updatedSignals = signals.map((signal, idx) =>
      idx === signalIndex ? { ...signal, [field]: value } : signal
    );
    setSignals(updatedSignals);
  };

  const handleModalSubmit = () => {
    const updatedRow = { ...row, Signals: signals };
    onRowChange(updatedRow);
    setModalOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
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
            label="# of Signals"
            variant="outlined"
            fullWidth
            onChange={(e) => handleInputChange("NumOfSignals", e.target.value)}
            value={row.NumOfSignals}
          />
        </Grid>
        <Grid item xs={1.6}>
          <Button
            variant="contained"
            color="primary"
            sx={{ height: 50 }}
            onClick={() => setModalOpen(true)}
          >
            <Typography variant="caption">edit signal info</Typography>
          </Button>
        </Grid>
      </Grid>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="edit-signal-info-title"
        aria-describedby="edit-signal-info-description"
      >
        <Box sx={modalStyle}>
          <Typography id="edit-signal-info-title" variant="h6" component="h2">
            Edit Signal Info
          </Typography>
          {signals.map((signal, idx) => (
            <Grid container spacing={2} key={idx} sx={{ marginBottom: 2 }}>
              <Grid item xs={2}>
                <TextField
                  label="Data Channel"
                  variant="outlined"
                  fullWidth
                  value={signal.DataChannel}
                  onChange={(e) =>
                    handleSignalChange(idx, "DataChannel", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Start Bit"
                  variant="outlined"
                  fullWidth
                  value={signal.startBit}
                  onChange={(e) =>
                    handleSignalChange(idx, "startBit", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Bit Length"
                  variant="outlined"
                  fullWidth
                  value={signal.bitLength}
                  onChange={(e) =>
                    handleSignalChange(idx, "bitLength", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Adder"
                  variant="outlined"
                  fullWidth
                  value={signal.adder}
                  onChange={(e) =>
                    handleSignalChange(idx, "adder", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Multiplier"
                  variant="outlined"
                  fullWidth
                  value={signal.multiplier}
                  onChange={(e) =>
                    handleSignalChange(idx, "multiplier", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Unit"
                  variant="outlined"
                  fullWidth
                  value={signal.unit}
                  onChange={(e) =>
                    handleSignalChange(idx, "unit", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          ))}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleModalSubmit}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CANInput;
