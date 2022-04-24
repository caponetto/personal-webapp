import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import React, { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import { HashRouter } from "react-router-dom";
import { BLUE_UNIVERSE, DARK_GRAY, LIGHT_GRAY, WHITE_GRAY } from "./colors";
import { AppBar } from "./components/appbar";
import { AppDrawer } from "./components/drawer";
import { ScrollTop } from "./components/scrolltop";
import { CookieSnackbar } from "./components/snackbar";
import { AppContext, DRAWER_ITEM_WIDTH, DRAWER_WIDTH } from "./context/AppContext";
import { AppContextProvider } from "./context/AppContextProvider";
import "./fonts";
import i18n from "./i18n";
import { RouteSwitch } from "./pages/routeswitch";

export function App() {
  const backToTopAnchor = "back-to-top-anchor";
  return (
    <HashRouter>
      <I18nextProvider i18n={i18n}>
        <CssBaseline />
        <Suspense fallback={<LinearProgress color="inherit" sx={{ height: "2px" }} />}>
          <AppContextProvider>
            <AppContext.Consumer>
              {(app) => (
                <Box
                  sx={{
                    display: "flex",
                    minHeight: "100vh",
                    background:
                      app.colorMode === "light"
                        ? `linear-gradient(90deg, ${LIGHT_GRAY} 0%, ${WHITE_GRAY} 100%)`
                        : `linear-gradient(90deg, ${BLUE_UNIVERSE} 0%, ${DARK_GRAY} 100%)`,
                  }}
                >
                  <CssBaseline />
                  <AppBar drawerWidth={DRAWER_WIDTH} />
                  <AppDrawer drawerWidth={DRAWER_WIDTH} drawerItemWidth={DRAWER_ITEM_WIDTH} />
                  <CookieSnackbar />
                  <Box component="main" sx={{ flexGrow: 1 }}>
                    <Toolbar id={backToTopAnchor} />
                    <Suspense fallback={<LinearProgress sx={{ height: "2px" }} />}>
                      <RouteSwitch />
                    </Suspense>
                  </Box>
                  <ScrollTop anchor={backToTopAnchor} />
                </Box>
              )}
            </AppContext.Consumer>
          </AppContextProvider>
        </Suspense>
      </I18nextProvider>
    </HashRouter>
  );
}
