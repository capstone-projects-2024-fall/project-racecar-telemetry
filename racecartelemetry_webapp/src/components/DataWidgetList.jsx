import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import DataWidget from "./DataWidget";
import useTelemetryConnectionStatus from "@hooks/useTelemetryConnectionStatus";
import { fetchCANData, getCurrentConfig } from "@services/CANConfigurationService";
import ConfigWidget from "@components/ConfigWidget";

const DataWidgetList = () => {
  const [currentConfig, setCurrentConfig] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time in seconds
  const isConnected = useTelemetryConnectionStatus(); // Check connection status


  // Fetch configuration data
  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const configName = await getCurrentConfig();
        setCurrentConfig(configName);

        if (!configName) {
          throw new Error("No current configuration found.");
        }

        const fetchedData = await fetchCANData(configName);
        setConfigData(fetchedData);
        setLoading(false);
      } catch (err) {
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
      direction="row" 
      spacing={2}
      sx={{
        overflowX: "auto", 
        padding: 2, 
        width: "100%",
        alignItems: "center",
        justifyContent: "space-in-between",
      }}
    >
      <Box>
        <ConfigWidget title={"Selected configuration"} />
      </Box>

      <Box
      sx={{
        display: "flex", 
        gap: 2, 
        justifyContent: "center", 
        flexGrow: 1, 
      }}
      >
        {/*DataWidgets for DataChannels*/}
        {Object.entries(configData).map(([canID, canData]) =>
          Object.entries(canData.DataChannels || {}).map(([channelKey, channelData]) => (
            <DataWidget
              key={`${canID}-${channelKey}`}
              canID={canID} 
              valueToDisplay={channelKey} //channel key (e.g., "Battery")
              title={channelKey} //channel key as the title
              unit={channelData.unit || ""} 
            />
          ))
        )}
      </Box>

      <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end", // Ensure the elapsed time widget is on the far right
      }}
    >
      {/* Elapsed Time Widget */}
      
      <DataWidget
        canID="elapsedTime"
        valueToDisplay="Elapsed Time"
        title="Elapsed Time"
        unit="s"
        isElapsedTime={true}
        isConnected={isConnected}
      />
      </Box>
    </Stack>
  );
};

export default DataWidgetList;
