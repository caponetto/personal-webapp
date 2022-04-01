import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import React, { lazy, Suspense, useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { BLUE_UNIVERSE, DARK_GRAY, LIGHT_GRAY, WHITE_GRAY } from "./colors";
import { AppBar } from "./components/appbar";
import { AppDrawer } from "./components/drawer";
import { CookieSnackbar } from "./components/snackbar";
import { AppContext, DRAWER_ITEM_WIDTH, DRAWER_WIDTH } from "./context/AppContext";
import { AppContextProvider } from "./context/AppContextProvider";
import "./fonts";
import i18n from "./i18n";
import { routes } from "./routes";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const JourneyPage = lazy(() => import("./pages/JourneyPage"));
const TextPage = lazy(() => import("./pages/TextPage"));
const TalkPage = lazy(() => import("./pages/TalkPage"));
const CodePage = lazy(() => import("./pages/CodePage"));

export function App() {
  const navigateToAbout = useMemo(() => <Navigate to={routes.nav.about} replace />, []);

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
                    <Toolbar />
                    <Suspense fallback={<LinearProgress sx={{ height: "2px" }} />}>
                      <Routes>
                        <Route path={routes.nav.root} element={navigateToAbout} />
                        <Route path={routes.nav.about} element={<AboutPage />} />
                        <Route path={routes.nav.journey} element={<JourneyPage />} />
                        <Route path={routes.nav.text} element={<TextPage />} />
                        <Route path={routes.nav.talk} element={<TalkPage />} />
                        <Route path={routes.nav.code} element={<CodePage />} />
                        <Route path={routes.nav.any} element={navigateToAbout} />
                      </Routes>
                    </Suspense>
                  </Box>
                </Box>
              )}
            </AppContext.Consumer>
          </AppContextProvider>
        </Suspense>
      </I18nextProvider>
    </HashRouter>
  );
}
