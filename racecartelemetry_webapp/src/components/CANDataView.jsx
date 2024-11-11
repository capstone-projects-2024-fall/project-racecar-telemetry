import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Grid, Paper, IconButton } from "@mui/material";
import { fetchCANData } from "@services/CANConfigurationService";
import theme from "@app/theme";
import { ThemeProvider, CssBaseline } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CANDataView = ({ selectedConfig, setIsEditing }) => {
  const [configData, setConfigData] = useState(null);

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

  // Convert configData into an array with canId
  const configArray = configData && typeof configData === "object"
    ? Object.entries(configData).map(([canId, itemData]) => ({ canId, ...itemData }))
    : [];

  // Optionally, sort the configArray if needed
  // For example, to sort by canId numerically
  // configArray.sort((a, b) => parseInt(a.canId) - parseInt(b.canId));

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
                {/* CanID */}
                <Grid item xs="auto">
                  <Paper
                    elevation={3}
                    sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}
                  >
                    <Typography variant="body1" color="white">
                      <strong>CanID:</strong> {item.canId}
                    </Typography>
                  </Paper>
                </Grid>
                {/* Data Channel */}
                <Grid item xs="auto">
                  <Paper
                    elevation={3}
                    sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}
                  >
                    <Typography variant="body1" color="white">
                      <strong>Data Channel:</strong> {item.DataChannel}
                    </Typography>
                  </Paper>
                </Grid>
                {/* Message Length */}
                <Grid item xs="auto">
                  <Paper
                    elevation={3}
                    sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}
                  >
                    <Typography variant="body1" color="white">
                      <strong>Message Length:</strong> {item.MessageLength}
                    </Typography>
                  </Paper>
                </Grid>
                {/* Offset Bytes */}
                <Grid item xs="auto">
                  <Paper
                    elevation={3}
                    sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}
                  >
                    <Typography variant="body1" color="white">
                      <strong>Offset Bytes:</strong> {item.OffsetBytes}
                    </Typography>
                  </Paper>
                </Grid>
                {/* Adder */}
                <Grid item xs="auto">
                  <Paper
                    elevation={3}
                    sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}
                  >
                    <Typography variant="body1" color="white">
                      <strong>Adder:</strong> {item.Adder}
                    </Typography>
                  </Paper>
                </Grid>
                {/* Multiplier */}
                <Grid item xs="auto">
                  <Paper
                    elevation={3}
                    sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}
                  >
                    <Typography variant="body1" color="white">
                      <strong>Multiplier:</strong> {item.Multiplier}
                    </Typography>
                  </Paper>
                </Grid>
                {/* Unit */}
                <Grid item xs="auto">
                  <Paper
                    elevation={3}
                    sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}
                  >
                    <Typography variant="body1" color="white">
                      <strong>Unit:</strong> {item.Unit}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="white">
            Loading configuration data...
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CANDataView;
