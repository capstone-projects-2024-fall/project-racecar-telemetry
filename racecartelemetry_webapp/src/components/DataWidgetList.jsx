import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import DataWidget from "./DataWidget";
import { fetchCANData, getCurrentConfig } from "@services/CANConfigurationService";

const DataWidgetList = () => {
  const [currentConfig, setCurrentConfig] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const configName = await getCurrentConfig();
        setCurrentConfig(configName);
        console.log("Current Config:", configName);

        if (!configName) {
          throw new Error("No current configuration found.");
        }

        const fetchedData = await fetchCANData(configName);
        console.log("Fetched Data:", fetchedData);

        setConfigData(fetchedData);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchConfigData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  if (!configData || Object.keys(configData).length === 0) {
    return <Typography color="white">No configuration data available</Typography>;
  }

  // Check if any CAN ID has DataChannels
  const hasDataChannels = Object.values(configData).some(
    (canData) => canData.DataChannels && Object.keys(canData.DataChannels).length > 0
  );

  if (!hasDataChannels) {
    return <Typography color="white">No DataChannels available in any configuration</Typography>;
  }

  return (
    <Stack
      direction="row" // Sets the items to align horizontally
      spacing={2} // Adds space between items
      sx={{
        overflowX: "auto", // Enables horizontal scrolling for overflow
        padding: 2, // Adds padding around the stack
      }}
    >
      {Object.entries(configData).map(([canID, canData]) =>
        Object.entries(canData.DataChannels || {}).map(([channelKey, channelData]) => (
          <DataWidget
            key={`${canID}-${channelKey}`}
            canID={canID} // Pass the CAN ID
            valueToDisplay={channelKey} // Use the channel key (e.g., "Battery")
            title={channelKey} // Use the channel key as the title
            unit={channelData.unit || ""} // Pass the unit or default to an empty string
          />
        ))
      )}
    </Stack>
  );
};

export default DataWidgetList;
