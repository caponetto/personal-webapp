import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { AppBar as MaterialAppBar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useMemo } from "react";
import { DRAWER_WIDTH, FULL_NAME, useApp } from "./Context/AppContext";

export function AppBar() {
  const app = useApp();
  const colorModeIcon = useMemo(() => (app.isLight ? <NightsStayIcon /> : <Brightness7Icon />), [app.isLight]);

  return (
    <MaterialAppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { sm: `${DRAWER_WIDTH}px` },
      }}
    >
      <Toolbar>
        <IconButton
          onClick={() => app.setDrawerOpen(!app.drawerOpen)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="Open drawer"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}>
          {FULL_NAME}
        </Typography>
        <IconButton onClick={app.toggleColorMode} color="inherit">
          {colorModeIcon}
        </IconButton>
      </Toolbar>
    </MaterialAppBar>
  );
}
