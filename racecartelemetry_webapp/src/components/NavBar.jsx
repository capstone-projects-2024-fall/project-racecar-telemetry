import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";

const Navbar = () => {
  const handleLogout = () => {
    alert("You have been logged out!");
    // replacee
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#2c3e50", boxShadow: 99 }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            navbar
          </Typography>
        </Box>

        <Link href="/" passHref>
          <Button color="inherit">Dashboard</Button>
        </Link>
        <Link href="/profiles" passHref>
          <Button color="inherit">Profiles</Button>
        </Link>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
