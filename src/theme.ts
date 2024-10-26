import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    notice: {
      main: string;
    };
  }
  interface PaletteOptions {
    notice?: {
      main?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#3961f8",
      dark: "#133bd3",
      light: "#b8ddff",
    },
    secondary: {
      main: "#0091ff",
    },
    grey: {
      100: "#f5f5f5",
      200: "#efefef",
      300: "#e4e4e4",
      400: "#bcbcbc",
      500: "#8e8e8e",
      600: "#797979",
      700: "#656565",
      800: "#4d4d4d",
      900: "#222222",
    },
    success: {
      main: "#00d15e",
    },
    warning: {
      main: "#ff8138",
    },
    error: {
      main: "#ff3b30",
    },
    notice: {
      main: "#f7b500",
    },
  },
});

export default theme;
