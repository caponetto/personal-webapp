import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar as MaterialAppBar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useRef } from "react";
import { useApp } from "../../context/AppContext";
import { Fonts } from "../../fonts";
import { SettingsPopover } from "../settings";

interface AppBarProps {
  drawerWidth: number;
}

export function AppBar(props: AppBarProps) {
  const app = useApp();
  const xxs = useMediaQuery("(max-width:350px)");
  const settingsButtonRef = useRef<HTMLButtonElement | null>(null);

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
        <Tooltip title={"Settings"} arrow>
          <IconButton
            ref={settingsButtonRef}
            id={"settings-button"}
            onClick={() => app.setSettingsOpen(true)}
            color="inherit"
            aria-label={"Open settings"}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <SettingsPopover
          anchor={settingsButtonRef.current}
          open={app.settingsOpen}
          onClose={() => app.setSettingsOpen(false)}
        />
      </Toolbar>
    </MaterialAppBar>
  );
}
