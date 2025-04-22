import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4f46e5", // Indigo
    },
    secondary: {
      main: "#f50057", // Pink
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
