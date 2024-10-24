import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { green, red } from "@mui/material/colors";
import dbConnectionStatus from "@hooks/dbConnectionStatus"; 
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import theme from "@app/theme";

const Navbar = () => {
  const isConnected = dbConnectionStatus();

  return (
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

        <Link href="/" passHref>
          <Button  sx={{ 
            color: "white",
            transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
            "&:hover":{
                transform: "scale(1.2) translateX(-10px)",
                color: "#e61b3d",
            },
            }}>
              Dashboard
            </Button>
        </Link>

        <Link href="/ComponentEditor" passHref>
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
        </Link>

        <Link href="/CANDataAssignment" passHref>
          <Button  sx={{
             color: "white",
             transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
            "&:hover":{
                transform: "scale(1.1)",
                color: "#e61b3d",
            },
             }}>
              Data Assignment
            </Button>
        </Link>

    
        {/* Uncomment when adding the logout functionality
        <Button sx={{ color: "white", border: 2 }} onClick={handleLogout}>
          Logout
        </Button>
        */}
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
