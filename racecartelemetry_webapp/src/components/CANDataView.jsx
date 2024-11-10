import React, { useState } from "react";
import { useEffect } from "react";
import { CANInput } from "./CANInput";
import { Button, Box, Typography, Grid, Paper, Grid2, IconButton } from "@mui/material";
import { saveCANData } from '@services/CANConfigurationService';
import { fetchCANData } from "@services/CANConfigurationService";
import theme from "@app/theme";
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CANDataView = ({selectedConfig, setIsEditing}) => {
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
                <Grid2 
                  container 
                  spacing={2} 
                  justifyContent="center" 
                  alignItems="center"
                  sx={{ maxWidth: "fit-content" }} // Ensures the grid wraps content tightly
                >
                  {configArray.map((item, index) => (
                    <Grid2 container item spacing={1} key={index}>
                      <Grid2 xs="auto">
                        <Paper
                         elevation={3} sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}
                         >
                          <Typography variant="body1" color="white">
                            <strong>Data Channel:</strong> {item.DataChannel}
                          </Typography>
                        </Paper>
                      </Grid2>
                      <Grid2 xs="auto">
                        <Paper elevation={3} sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}>
                          <Typography variant="body1" color="white">
                            <strong>CanID:</strong> {item.CanID}
                          </Typography>
                        </Paper>
                      </Grid2>
                      <Grid2 xs="auto">
                        <Paper elevation={3} sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}>
                          <Typography variant="body1" color="white">
                            <strong>Message Length:</strong> {item.MessageLength}
                          </Typography>
                        </Paper>
                      </Grid2>
                      <Grid2 xs="auto">
                        <Paper elevation={3} sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}>
                          <Typography variant="body1" color="white">
                            <strong>Offset Bytes:</strong> {item.OffsetBytes}
                          </Typography>
                        </Paper>
                      </Grid2>
                      <Grid2 xs="auto">
                        <Paper elevation={3} sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}>
                          <Typography variant="body1" color="white">
                            <strong>Adder:</strong> {item.Adder}
                          </Typography>
                        </Paper>
                      </Grid2>
                      <Grid2 xs="auto">
                        <Paper elevation={3} sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}>
                          <Typography variant="body1" color="white">
                            <strong>Multiplier:</strong> {item.Multiplier}
                          </Typography>
                        </Paper>
                      </Grid2>
                      <Grid2 xs="auto">
                        <Paper elevation={3} sx={{ padding: 2, display: 'inline-block', backgroundColor: 'secondary.gray' }}>
                          <Typography variant="body1" color="white">
                            <strong>Unit:</strong> {item.Unit}
                          </Typography>
                        </Paper>
                      </Grid2>
                    </Grid2>
                  ))}
                </Grid2>
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
