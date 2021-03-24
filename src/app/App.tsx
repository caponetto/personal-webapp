import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
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
            <Switch>
              <Route exact path={routes.nav.root}>
                <Redirect to={routes.nav.about} />
              </Route>
              <Route exact path={routes.nav.about} component={AboutPage} />
              <Route exact path={routes.nav.journey} component={JourneyPage} />
              <Route exact path={routes.nav.text} component={TextPage} />
              <Route exact path={routes.nav.talk} component={TalkPage} />
              <Route exact path={routes.nav.code} component={CodePage} />
              <Route>
                <Redirect to={routes.nav.about} />
              </Route>
            </Switch>
          </Box>
        </Box>
      </AppContextProvider>
    </HashRouter>
  );
}
