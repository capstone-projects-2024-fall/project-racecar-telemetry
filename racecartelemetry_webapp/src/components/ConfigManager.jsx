//@components/ConfigManager

import React, { useState, useEffect } from "react"
import { Button, Select, MenuItem, TextField, Box, Typography, Grid, Alert } from "@mui/material"

const ConfigManager = ({ onConfigSelect }) => {
    const [configs, setConfigs] = useState([])
    const [selectedConfig, setSelectedConfig] = useState("")
    const [configData, setConfigData] = useState({ name: "", data: {} })
    const [errorMessage, setErrorMessage] = useState("")

    const fetchConfigs = async () => {
        try {
            const response = await fetch('/api/CANConfigurationAPI?collectionName=canConfigs', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const result = await response.json()
            console.log(result)
            setConfigs(result.data)
        } catch (error) {
            console.error("Error fetching configs:", error)
        }
    }

    useEffect(() => {
        fetchConfigs()
    }, [])

    const selectConfig = (configId) => {
        const selected = configs.find((config) => config.id === configId)
        setSelectedConfig(configId)
        setConfigData(selected || { id: "" })
        if (onConfigSelect) onConfigSelect(configId)
    }

    const createConfig = async () => {
        if (Array.isArray(configs) && configs.some((config) => config.name === configData.name)) {
            setErrorMessage("A config with this name already exists.")
            return;
        }

        if (!configData.name) {
            setErrorMessage("Config name is required.")
            return;
        }

        try {
            const response = await fetch('/api/CANConfigurationAPI', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    docId: configData.name,
                    collectionName: 'canConfigs'
                })
            })
            const result = await response.json()
            if (response.ok) {
                console.log("Config saved successfully:", result)

                fetchConfigs()

                if (onConfigSelect) {
                    onConfigSelect(configData)
                }
            } else {
                console.error("Error saving config:", result)
            }
        } catch (error) {
            console.error("Failed to save config:", error)
        }
    }

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
                    >
                        <MenuItem value="" disabled>
                            Select Config
                        </MenuItem>
                        {Array.isArray(configs) && configs.length > 0 ? (
                            configs.map((config) => (
                                <MenuItem key={config.id} value={config.id}>
                                    {config.id}
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
                        onClick={createConfig}
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
