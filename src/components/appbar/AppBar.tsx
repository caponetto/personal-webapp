import MenuIcon from "@mui/icons-material/Menu";
import { AppBar as MaterialAppBar, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { Fonts } from "../../fonts";
import { AnimatedMoonIcon, AnimatedSunIcon } from "../icon";

interface AppBarProps {
  drawerWidth: number;
}

export function AppBar(props: AppBarProps) {
  const app = useApp();
  const xxs = useMediaQuery("(max-width:350px)");
  const colorModeIcon = useMemo(() => (app.isLight ? <AnimatedMoonIcon /> : <AnimatedSunIcon />), [app.isLight]);

  return (
    <MaterialAppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${props.drawerWidth}px)` },
        ml: { md: `${props.drawerWidth}px` },
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
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: xxs ? "16px" : "20px",
            fontFamily: Fonts.QUICKSAND,
          }}
        >
          {app.data.personal.fullName}
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
