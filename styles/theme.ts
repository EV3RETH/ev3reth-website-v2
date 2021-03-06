import { createTheme, responsiveFontSizes, SxProps, Theme, alpha } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
      light: "#272727"
    },
    secondary: {
      main: '#84738c',
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
  backgroundColor: alpha(theme.palette.primary.main, 1),
  typography: {
    color: theme.palette.background.paper,
  }
}

export const whiteBgSx: SxProps<Theme> = {
  typography: {
    textShadow: "1px 2px 3px rgba(0,0,0,0.3)"
  }
}

export const maxDisplayWidth = 1536;

export const getGradientTextStyle = (gradient: string) => ({
  background: gradient,
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  WebkitBoxDecorationBreak: 'clone',
  MozBackgroundClip: 'text',
  MozTextFillColor: 'transparent',
  MozBoxDecorationBreak: 'clone',
})
