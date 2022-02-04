import MenuIcon from "@mui/icons-material/Menu";
import { AppBar as MaterialAppBar, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useMemo } from "react";
import { AnimatedMoonIcon } from "../components/AnimatedMoonIcon";
import { AnimatedSunIcon } from "../components/AnimatedSunIcon";
import { DRAWER_WIDTH, useApp } from "../context/AppContext";

export function AppBar() {
  const app = useApp();
  const xxs = useMediaQuery("(max-width:350px)");
  const colorModeIcon = useMemo(() => (app.isLight ? <AnimatedMoonIcon /> : <AnimatedSunIcon />), [app.isLight]);

  return (
    <MaterialAppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
      }}
    >
      <Toolbar>
        <IconButton
          id="open-drawer-button"
          onClick={() => app.setDrawerOpen(!app.drawerOpen)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="Open drawer"
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1, fontSize: xxs ? "16px" : "20px" }}
        >
          {app.data.fullName}
        </Typography>
        <Tooltip title={`Enable ${app.isLight ? "dark" : "light"} mode`} arrow>
          <IconButton
            id={`enable-${app.isLight ? "dark" : "light"}-mode-button`}
            onClick={app.toggleColorMode}
            color="inherit"
            aria-label={"Toggle color mode"}
          >
            {colorModeIcon}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </MaterialAppBar>
  );
}
