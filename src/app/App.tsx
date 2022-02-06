import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../common/Routes";
import { AppContextProvider } from "../context/AppContextProvider";
import { AboutPage } from "../pages/AboutPage";
import { CodePage } from "../pages/CodePage";
import { JourneyPage } from "../pages/JourneyPage";
import { TalkPage } from "../pages/TalkPage";
import { TextPage } from "../pages/TextPage";
import { AppBar } from "./AppBar";
import { AppDrawer } from "./AppDrawer";

export function App() {
  return (
    <HashRouter>
      <AppContextProvider>
        <Box sx={{ display: "flex", height: "100%" }}>
          <CssBaseline />
          <AppBar />
          <AppDrawer />
          <Box component="main" sx={{ flexGrow: 1, p: "25px" }}>
            <Toolbar />
            <Routes>
              <Route path={routes.nav.root} element={<Navigate to={routes.nav.about} />} />
              <Route path={routes.nav.about} element={<AboutPage />} />
              <Route path={routes.nav.journey} element={<JourneyPage />} />
              <Route path={routes.nav.text} element={<TextPage />} />
              <Route path={routes.nav.talk} element={<TalkPage />} />
              <Route path={routes.nav.code} element={<CodePage />} />
              <Route path={routes.nav.any} element={<Navigate to={routes.nav.about} />} />
            </Routes>
          </Box>
        </Box>
      </AppContextProvider>
    </HashRouter>
  );
}
