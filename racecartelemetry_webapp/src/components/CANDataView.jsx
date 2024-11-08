import React, { useState } from "react";
import { useEffect } from "react";
import { CANInput } from "./CANInput";
import { Button, Box, Typography, Grid } from "@mui/material";
import { saveCANData } from '@services/CANConfigurationService';
import { fetchCANData } from "@services/CANConfigurationService";

const CANDataView = ({selectedConfig}) => {
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

      const configArray = configData && typeof configData === "object" 
      ? Object.values(configData) 
      : [];
    
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
            {selectedConfig || "No Configuration Selected"}
          </Typography>
            
          {configData ? (
            <Grid container spacing={2}>
              {configArray.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="body1">
                    Data Channel: {item.DataChannel}
                  </Typography>
                  <Typography variant="body1">
                    CanID: {item.CanID}
                  </Typography>
                  <Typography variant="body1">
                    Message Length: {item.MessageLength}
                  </Typography>
                  <Typography variant="body1">
                    Offset Bytes: {item.OffsetBytes}
                  </Typography>
                  <Typography variant="body1">
                    Adder: {item.Adder}
                  </Typography>
                  <Typography variant="body1">
                    Multiplier: {item.Multiplier}
                  </Typography>
                  <Typography variant="body1">
                    Unit: {item.Unit}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Loading configuration data...
            </Typography>
          )}
        </Box>
      );
};

export default CANDataView;
