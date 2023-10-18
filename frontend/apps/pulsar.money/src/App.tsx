import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material";
import "inter-ui/inter.css";
import { CURRENT_THEME } from "./config";
import Dapp from "./components/DappProvider";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider";

const CSSVariables = styled.div`
  --font-family: "Inter";
  --color-primary: #b8bcbf;
  --color-secondary: #009db8;
  --color-third: #f4f9fd;
  --color-text-selected: white;
  --color-important: #d0f5fe;
  --fw-normal: 400;
  --fw-bold: 700;
  --color-error: #d32f2f;
`;

const theme = createTheme({
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "1rem",
          background: "#131516",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {},
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0.6875rem",
          border: "1px solid #1C1E21",
          background: "linear-gradient(138deg, rgba(51, 45, 45, 0.25) 0%, rgba(37, 34, 34, 0.15) 92.71%)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "10px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        outlined: {
          color: "white",
          border: "1px solid rgba(69, 155, 181, 0.5)",
          background: "rgba(69, 155, 181, 0.05)",
          borderRadius: "7px",
          textTransform: "none",
        },
        contained: {
          background: "#292C30",
          borderRadius: "3px",
          textTransform: "none",
          "&:hover": {
            background: "#131516",
          },
        },
      },
    },
  },
});

const queryClient = new QueryClient();
const App = () => {
  return (
    <CSSVariables>
      <MUIThemeProvider theme={theme}>
        <StyledThemeProvider theme={CURRENT_THEME}>
          <SnackbarProvider maxSnack={3} classes={{ containerRoot: "z-alert" }} style={{ zIndex: 20000 }}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <Router>
                <Dapp />
              </Router>
            </ThemeProvider>
            {/* <LightBubbles /> */}
          </SnackbarProvider>
        </StyledThemeProvider>
      </MUIThemeProvider>
    </CSSVariables>
  );
};

export default App;
