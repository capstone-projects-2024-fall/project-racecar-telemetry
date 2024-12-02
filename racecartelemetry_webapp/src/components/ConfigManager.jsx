//@components/ConfigManager

import React, { useState, useEffect } from "react"
import { Button, Select, IconButton, MenuItem, TextField, Box, Typography, Grid, Alert } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchConfigs, createConfig } from '@services/CANConfigurationService';
import { deleteConfig } from "../services/CANConfigurationService"
const ConfigManager = ({ onConfigSelect }) => {
    const [configs, setConfigs] = useState([])
    const [selectedConfig, setSelectedConfig] = useState("")
    const [configData, setConfigData] = useState({ name: "", data: {} })
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const getConfigs = async () => {
            try {
                const data = await fetchConfigs();
                setConfigs(data);
            } catch (error) {
                console.error("Error fetching configs:", error);
            }
        };
        getConfigs();
    }, []);


    const selectConfig = (configId) => {
        const selected = configs.find((config) => config.id === configId)
        setSelectedConfig(configId)
        setConfigData(selected || { id: "" })
        if (onConfigSelect) onConfigSelect(configId)
    }

    const handleDeleteConfig = async (configId) => {
        try {
            await deleteConfig(configId)
            setConfigs(configs.filter(config => config.id !== configId))
        } catch (error) {
            console.error("Failed to delete config: ", error)
        }
    }

    const handleCreateConfig = async () => {
        if (Array.isArray(configs) && configs.some((config) => config.name === configData.name)) {
            setErrorMessage("A config with this name already exists.");
            return;
        }

        if (!configData.name) {
            setErrorMessage("Config name is required.");
            return;
        }

        try {
            const result = await createConfig(configData.name);
            console.log("Config saved successfully:", result);

            // Refresh configs after creating a new one
            const data = await fetchConfigs();
            setConfigs(data);

            if (onConfigSelect) {
                onConfigSelect(configData.name);
            }
        } catch (error) {
            console.error("Failed to save config:", error);
        }
    };

    const filteredConfigs = configs.filter((config) => config.id !== "currentConfig");

    return (
        <Box
            sx={{
                width: 800,
                padding: 3,
                borderRadius: 2,
                backgroundColor: "#f0f0f0",
                boxShadow: 3,
                margin: "auto",
                marginTop: 4
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    marginBottom: 2,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#333"
                }}
            >
                Configuration Manager
            </Typography>

            {errorMessage && (
                <Alert severity="error" onClose={() => setErrorMessage("")}>
                    {errorMessage}
                </Alert>
            )}

            <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                <Grid item xs={12}>
                    <Select
                        value={selectedConfig}
                        onChange={(e) => selectConfig(e.target.value)}
                        displayEmpty
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                        renderValue={(selected) => selected || "Select Config"}
                    >
                        <MenuItem value="" disabled>
                            Select Config
                        </MenuItem>
                        {Array.isArray(filteredConfigs) && filteredConfigs.length > 0 ? (
                            filteredConfigs.map((config) => (
                                <MenuItem key={config.id} value={config.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{config.id}</span>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation()
                                        console.log("Deleting config with ID:", config.id)
                                        handleDeleteConfig(config.id)
                                    }}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No Configs Available</MenuItem>
                        )}
                    </Select>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="New Config Name"
                        value={configData.name || ""}
                        onChange={(e) => setConfigData({ ...configData, name: e.target.value })}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateConfig}
                        sx={{ width: 150, height: 50 }}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>


        </Box>
    )
}

export default ConfigManager
