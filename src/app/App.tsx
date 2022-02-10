import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import React, { lazy, Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../common/Routes";
import { CookieSnackbar } from "../components/CookieSnackbar";
import { AppContext } from "../context/AppContext";
import { AppContextProvider } from "../context/AppContextProvider";
import { AppBar } from "./AppBar";
import { AppDrawer } from "./AppDrawer";
import "./AppFonts";

const AboutPage = lazy(() => import("../pages/AboutPage"));
const JourneyPage = lazy(() => import("../pages/JourneyPage"));
const TextPage = lazy(() => import("../pages/TextPage"));
const TalkPage = lazy(() => import("../pages/TalkPage"));
const CodePage = lazy(() => import("../pages/CodePage"));

export function App() {
  return (
    <HashRouter>
      <AppContextProvider>
        <AppContext.Consumer>
          {(app) => (
            <Box
              sx={{
                display: "flex",
                minHeight: "100vh",
                background: app.isLight
                  ? "radial-gradient(ellipse at bottom, #ECEFF1 0%, #FFFFFF 100%)"
                  : "radial-gradient(ellipse at bottom, #1C2837 0%, #050608 100%)",
              }}
            >
              <CssBaseline />
              <AppBar />
              <AppDrawer />
              <CookieSnackbar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />
                <Suspense fallback={<LinearProgress sx={{ height: "2px" }} />}>
                  <Routes>
                    <Route path={routes.nav.root} element={<Navigate to={routes.nav.about} />} />
                    <Route path={routes.nav.about} element={<AboutPage />} />
                    <Route path={routes.nav.journey} element={<JourneyPage />} />
                    <Route path={routes.nav.text} element={<TextPage />} />
                    <Route path={routes.nav.talk} element={<TalkPage />} />
                    <Route path={routes.nav.code} element={<CodePage />} />
                    <Route path={routes.nav.any} element={<Navigate to={routes.nav.about} />} />
                  </Routes>
                </Suspense>
              </Box>
            </Box>
          )}
        </AppContext.Consumer>
      </AppContextProvider>
    </HashRouter>
  );
}
