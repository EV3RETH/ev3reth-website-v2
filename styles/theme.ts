import { createTheme, responsiveFontSizes, SxProps, Theme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#607d8b',
    },
    error: {
      main: '#e57373',
    },
    warning: {
      main: '#ffb74d',
    },
    info: {
      main: '#64b5f6',
    },
    success: {
      main: '#81c784',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Quicksand',
  },
});

theme = responsiveFontSizes(theme);

export default theme;

export const blackBgSx: SxProps<Theme> = {
  backgroundColor: theme.palette.primary.main,
  typography: {
    color: theme.palette.background.paper,
  }
}
