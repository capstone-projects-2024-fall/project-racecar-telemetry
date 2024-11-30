import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Modal,
} from "@mui/material";
import { fetchCANData } from "@services/CANConfigurationService";
import theme from "@app/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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

const CANDataView = ({ selectedConfig, setIsEditing }) => {
  const [configData, setConfigData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCanId, setSelectedCanId] = useState(null);
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    const getConfigData = async () => {
      if (selectedConfig) {
        try {
          const data = await fetchCANData(selectedConfig);
          setConfigData(data);
          console.log(data);
        } catch (error) {
          console.error("Failed to fetch configuration data:", error);
        }
      }
    };

    getConfigData();
  }, [selectedConfig]);

  // Convert configData into an array with CanID and parsed DataChannels
  const configArray =
    configData && typeof configData === "object"
      ? Object.entries(configData).map(([canId, itemData]) => {
          const signals =
            itemData.DataChannels &&
            typeof itemData.DataChannels === "object"
              ? Object.entries(itemData.DataChannels).map(
                  ([key, signalData]) => ({
                    ...signalData,
                    id: key,
                  })
                )
              : [];
          return { canId, NumOfSignals: signals.length, signals };
        })
      : [];

  const handleViewClick = (canId, signalsData) => {
    setSelectedCanId(canId);
    setSignals(signalsData || []);
    setModalOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "90%",
          padding: 3,
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: 3,
          margin: "auto",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={() => setIsEditing(true)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <EditIcon />
        </IconButton>

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
          {selectedConfig || "No Configuration Selected"}
        </Typography>

        {configData ? (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ maxWidth: "fit-content" }}
          >
            {configArray.map((item) => (
              <Grid container item spacing={1} key={item.canId}>
                <Grid item xs="auto">
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      display: "inline-block",
                      backgroundColor: "secondary.gray",
                    }}
                  >
                    <Typography variant="body1" color="white">
                      <strong>CanID:</strong> {item.canId}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs="auto">
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      display: "inline-block",
                      backgroundColor: "secondary.gray",
                    }}
                  >
                    <Typography variant="body1" color="white">
                      <strong># of signals:</strong> {item.NumOfSignals}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs="auto">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ height: 55 }}
                    onClick={() => handleViewClick(item.canId, item.signals)}
                  >
                    <Typography variant="caption">View signal info</Typography>
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="white">
            Loading configuration data...
          </Typography>
        )}

        {/* Modal for viewing signals */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="view-signal-info-title"
          aria-describedby="view-signal-info-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="view-signal-info-title"
              variant="h6"
              component="h2"
              sx={{ mb: 3 }}
            >
              Signals for CanID: {selectedCanId}
            </Typography>
            {signals.length > 0 ? (
              signals.map((signal, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                    marginBottom: 1,
                    border: "1px solid #ccc",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">
                    <strong>Data Channel:</strong> {signal.id}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Start Bit:</strong> {signal.startBit}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Bit Length:</strong> {signal.bitLength}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Adder:</strong> {signal.adder}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Multiplier:</strong> {signal.multiplier}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Unit:</strong> {signal.unit}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2">
                No signals available for this CanID.
              </Typography>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setModalOpen(false)}
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default CANDataView;
