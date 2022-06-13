import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import React, { ReactNode, Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import { HashRouter } from "react-router-dom";
import { Colors } from "./colors";
import { AppBar } from "./components/appbar";
import { AppDrawer } from "./components/drawer";
import { ScrollTop } from "./components/scrolltop";
import { CookieSnackbar } from "./components/snackbar";
import { AppContext } from "./context/AppContext";
import { AppContextProvider } from "./context/AppContextProvider";
import "./fonts";
import i18n from "./i18n";
import { RouteSwitch } from "./pages/routeswitch";

const BACK_TO_TOP_ANCHOR = "back-to-top-anchor";
const DRAWER_WIDTH = 300;
const DRAWER_ITEM_WIDTH = DRAWER_WIDTH - 16;

export function App() {
  return (
    <HashRouter>
      <I18nextProvider i18n={i18n}>
        <CssBaseline />
        <Suspense fallback={<LinearProgress color="inherit" sx={{ height: "2px" }} />}>
          <AppContainer>
            <AppBar drawerWidth={DRAWER_WIDTH} />
            <AppDrawer drawerWidth={DRAWER_WIDTH} drawerItemWidth={DRAWER_ITEM_WIDTH} />
            <CookieSnackbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Toolbar id={BACK_TO_TOP_ANCHOR} />
              <Suspense fallback={<LinearProgress sx={{ height: "2px" }} />}>
                <RouteSwitch />
              </Suspense>
            </Box>
            <ScrollTop anchor={BACK_TO_TOP_ANCHOR} />
          </AppContainer>
        </Suspense>
      </I18nextProvider>
    </HashRouter>
  );
}

function AppContainer(props: { children: ReactNode }) {
  const linearGradient = (startColor: string, endColor: string) =>
    `linear-gradient(90deg, ${startColor} 0%, ${endColor} 100%)`;

  return (
    <AppContextProvider>
      <AppContext.Consumer>
        {(app) => (
          <Box
            sx={{
              display: "flex",
              minHeight: "100vh",
              background:
                app.colorMode === "light"
                  ? linearGradient(Colors.LightGray, Colors.WhiteGray)
                  : linearGradient(Colors.BlueUniverse, Colors.DarkGray),
            }}
          >
            <CssBaseline />
            {props.children}
          </Box>
        )}
      </AppContext.Consumer>
    </AppContextProvider>
  );
}
