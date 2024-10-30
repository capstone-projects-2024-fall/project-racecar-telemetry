// @components/CANConfiguration.js

import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ConfigManager from '@components/ConfigManager';
import CANDataAssignment from '@components/CANDataAssignment';  

const CANConfiguration = () => {
    console.log("here not loading")
    const [selectedConfig, setSelectedConfig] = useState("");  // Holds the selected config

    const selectConfig = (config) => {
        setSelectedConfig(config.id);  // Set the selected config
    };

    return (
        <Box sx={{ width: '100%', padding: 3, margin: 'auto', marginTop: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
                CAN Configuration Manager
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ConfigManager onConfigSelect={selectConfig} />
                </Grid>

                <Grid item xs={8}>
                    <CANDataAssignment selectedConfig={selectedConfig} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CANConfiguration;
