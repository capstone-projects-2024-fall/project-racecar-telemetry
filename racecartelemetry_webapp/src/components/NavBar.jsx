import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { green, red } from "@mui/material/colors";
import telemetryConnectionStatus from "@hooks/telemetryConnectionStatus";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "@app/theme";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { fetchConfigs, updateCurrentConfig } from "@services/CANConfigurationService";

const Navbar = () => {
  const [configs, setConfigs] = useState([]);
  const [currentConfig, setCurrentConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const isConnected = telemetryConnectionStatus();
  console.log(isConnected);

  useEffect(() => {
    const fetchAllConfigs = async () => {
      try {
        const data = await fetchConfigs();
        console.log("Raw configurations:", data);

        const filteredConfigs = data.filter((config) => config.id !== "currentConfig");
        console.log("Filtered configurations:", filteredConfigs);

        setConfigs(filteredConfigs);

        const currentConfigData = data.find((config) => config.id === "currentConfig");
        if (currentConfigData && currentConfigData.current) {
          setCurrentConfig(currentConfigData.current);
          console.log("Fetched current configuration:", currentConfigData.current);
        } else {
          setCurrentConfig(null);
          console.log("No current configuration set");
        }
      } catch (error) {
        console.error("Failed to fetch configurations:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchAllConfigs();
  }, []);

  const handleConfigChange = async (configName) => {
    try {
      setCurrentConfig(configName);

      await updateCurrentConfig(configName);
    } catch (error) {
      console.error("Failed to update current configuration:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" sx={{ marginBottom: 5 }}>
        <Toolbar
          sx={{
            background: "linear-gradient(45deg, #A32036 40%, #010000fa 60%)",
            backdropFilter: "blur(50px)",
            WebkitBackdropFilter: "blur(50px)",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Temple Formula Racing
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isConnected ? green[500] : red[500],
                backgroundColor: "white",
                padding: "2px 8px",
                borderRadius: "4px",
                display: "inline-block",
                marginTop: "4px",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
            >
              {isConnected === null
                ? "Checking connection..."
                : isConnected
                  ? "Telemetry Connected"
                  : "Telemetry Disconnected"}
            </Typography>
            <Select
              value={currentConfig || ""}
              onChange={(e) => handleConfigChange(e.target.value)}
              displayEmpty
              sx={{
                marginLeft: "8px",
                backgroundColor: "white",
                borderRadius: "4px",
                padding: "0 8px",
                fontSize: "0.9rem",
                color: "black",
                fontWeight: "500",
                minWidth: "120px",
                height: "32px",
              }}
              disabled={loading}
              renderValue={(selected) => {
                if (!selected) return "No configuration selected"; // Placeholder when no config is selected
                const selectedConfig = configs.find((config) => config.id === selected);
                return selectedConfig ? selectedConfig.id : "No configuration selected";
              }}
            >
              {configs.map((config) => (
                <MenuItem key={config.id} value={config.id}>
                  {config.id}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Link href="/">
            <Button
              sx={{
                color: "white",
                transition:
                  "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.2) translateX(-10px)",
                  color: "#e61b3d",
                },
              }}
            >
              Dashboard
            </Button>
          </Link>
          {/* 
        <Link href="/ComponentEditor" >
          <Button  sx={{
             color: "white",
             transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
             "&:hover":{
                 transform: "scale(1.1)",
                 color: "#e61b3d",
             },
              }}>
                Component Editor
              </Button>
        </Link> */}

          <Link href="/CANConfiguration">
            <Button
              sx={{
                color: "white",
                transition:
                  "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                  color: "#e61b3d",
                },
              }}
            >
              CAN Configuration
            </Button>
          </Link>

          <Link href="/CustomDash">
            <Button
              sx={{
                color: "white",
                transition:
                  "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                  color: "#e61b3d",
                },
              }}
            >
              Custom Dash
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
