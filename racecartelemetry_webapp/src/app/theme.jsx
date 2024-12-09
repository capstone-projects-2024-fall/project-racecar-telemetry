import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1F2020", // Set your desired background color here
      paper: "#1F2020", 
    },
    primary: {
      main: '#A32036',

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
});

export default theme;
