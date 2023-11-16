import { ThemeProvider, createTheme } from "@mui/material";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const Providers = ({ children }) => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Providers;
