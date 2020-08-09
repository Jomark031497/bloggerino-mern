import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#781b14",
    },
    secondary: {
      main: "#D2B48C",
    },
    background: {
      default: "#ddd"
    },
  },
  typography: {
    fontFamily: `"Lato", "Helvetica", "Arial", sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);