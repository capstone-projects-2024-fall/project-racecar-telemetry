import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { green, red } from "@mui/material/colors";
import dbConnectionStatus from "../hooks/dbConnectionStatus"; 

const Navbar = () => {
  const isConnected = dbConnectionStatus();

  return (
    <AppBar position="static" sx={{ marginBottom: 5 }}>
      <Toolbar sx={{ background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" }}>
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
          <Button sx={{ color: "white" }}>Dashboard</Button>
        </Link>

        <Link href="/ComponentEditor" passHref>
          <Button sx={{ color: "white" }}>Component Editor</Button>
        </Link>


        <Link href="/CANInput" passHref>
          <Button sx={{ color: "white" }}>CAN Input</Button>
        </Link>

        {/* Uncomment when adding the logout functionality
        <Button sx={{ color: "white", border: 2 }} onClick={handleLogout}>
          Logout
        </Button>
        */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
