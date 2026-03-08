import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#667eea",
      dark: "#764ba2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f093fb",
    },
    background: {
      default: "transparent",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a2e",
      secondary: "#555577",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: { fontWeight: 700, letterSpacing: "-0.5px" },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
          padding: "10px 28px",
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", fullWidth: true },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": { borderRadius: 8 },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
        },
      },
    },
  },
});

export default theme;
