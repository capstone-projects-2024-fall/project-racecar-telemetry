import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#4b0c8a',
    },
    secondary: {
      main: '#37343b',
      dark: '#18181a',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
