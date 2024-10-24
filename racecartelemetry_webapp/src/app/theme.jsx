import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#A32036',
    },
    secondary: {
      main: '#1F2020',
      dark: '#18181a',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
