import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { green, red } from "@mui/material/colors";
<<<<<<< HEAD
import useTelemetryConnectionStatus from "@hooks/useTelemetryConnectionStatus";
import { ThemeProvider} from "@mui/material";
=======
import dbConnectionStatus from "@hooks/dbConnectionStatus"; 
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
>>>>>>> 4561e7a (used DataDisplay in component that reads live data so that it reads live data)
import theme from "@app/theme";

const Navbar = () => {

  const isConnected = useTelemetryConnectionStatus();
  // console.log(isConnected);


  return (
<<<<<<< HEAD
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" sx={{  }}>
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
          </Box>
=======
  <ThemeProvider theme={theme}>
    <AppBar position="sticky" sx={{ marginBottom: 5 }}>
      <Toolbar sx={{ background: "linear-gradient(45deg, #A32036 40%, #010000fa 60%)",
        backdropFilter: "blur(50px)",         
        WebkitBackdropFilter: "blur(50px)",
       }}>
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
              fontSize: "0.8rem"
            }}
          >
            {isConnected === null
              ? "Checking connection..."
              : isConnected
              ? "Database Connected"
              : "Database Disconnected"}
          </Typography>
        </Box>
>>>>>>> 4561e7a (used DataDisplay in component that reads live data so that it reads live data)

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
          

<<<<<<< HEAD
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
        </Toolbar>
      </AppBar>
=======
        <Link href="/ComponentEditor" passHref>
          <Button sx={{ color: "white" }}>Component Editor</Button>
        </Link>

        <Link href="/CANDataAssignment" passHref>
          <Button sx={{ color: "white" }}>Data Assignment</Button>
        </Link>

    
        {/* Uncomment when adding the logout functionality
        <Button sx={{ color: "white", border: 2 }} onClick={handleLogout}>
          Logout
        </Button>
        */}
      </Toolbar>
    </AppBar>
>>>>>>> 4561e7a (used DataDisplay in component that reads live data so that it reads live data)
    </ThemeProvider>
  );
};

export default Navbar;
