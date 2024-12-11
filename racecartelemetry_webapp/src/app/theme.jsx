import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#1F2020", // Set your desired background color here
      paper: "white", 
    },
    primary: {
      main: '#A32036',
<<<<<<< HEAD

=======
>>>>>>> 4561e7a (used DataDisplay in component that reads live data so that it reads live data)
    },
    secondary: {
      main: '#1F2020',
      dark: '#18181a',
      gray: '#3C3C3C',
    },
    error: {
      main: red.A400,
    },
    typography: {
      allVariants: {
        color: '#000000', // Default for all text
      },
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#000000', // Set menu item text color explicitly
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: '#0c0c0c', // Set select text color explicitly
        },
      },
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:focus-visible": {
            outline: "none",
          },
        },
      },
    },
  },
});

export default theme;
