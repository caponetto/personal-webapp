import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AppBar } from "./AppBar";
import { AppDrawer } from "./AppDrawer";
import { routes } from "./Common/Routes";
import { AboutPage } from "./ContentPages/AboutPage";
import { CodePage } from "./ContentPages/CodePage";
import { TalkPage } from "./ContentPages/TalkPage";
import { TextPage } from "./ContentPages/TextPage";
import { AppContextProvider } from "./Context/AppContextProvider";

export function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
