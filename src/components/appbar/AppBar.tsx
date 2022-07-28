import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar as MuiAppBar, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useApp } from "../../context/AppContext";
import { OpenStateActions } from "../../context/OpenState";
import { Fonts } from "../../fonts";
import { routes } from "../../routes";
import { SettingsPopover } from "../settings";

interface AppBarProps {
  drawerWidth: number;
}

export function AppBar(props: AppBarProps) {
  const app = useApp();
  const navigate = useNavigate();
  const isExtraSmall = useMediaQuery("(max-width:350px)");
  const { t } = useTranslation();
  const settingsButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${props.drawerWidth}px)` },
        ml: { md: `${props.drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          data-testid="open-drawer-button"
          onClick={() => app.openStateDispatch({ type: OpenStateActions.DRAWER_TOGGLE })}
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
          onClick={() => navigate(routes.nav.about)}
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: isExtraSmall ? "16px" : "20px",
            fontFamily: Fonts.QUICKSAND,
          }}
        >
          {`${app.schema.personal.firstName} ${app.schema.personal.lastName}`}
        </Typography>
        <Tooltip title={t("literal:settings").toString()} arrow>
          <Box>
            <IconButton
              ref={settingsButtonRef}
              id="settings-button"
              onClick={() => app.openStateDispatch({ type: OpenStateActions.SETTINGS_OPEN })}
              color="inherit"
              aria-label="Open settings"
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Tooltip>
        <SettingsPopover
          anchor={settingsButtonRef.current}
          open={app.openState.settings}
          onClose={() => app.openStateDispatch({ type: OpenStateActions.SETTINGS_CLOSE })}
        />
      </Toolbar>
    </MuiAppBar>
  );
}
