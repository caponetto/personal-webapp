import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar as MuiAppBar, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import { useSchemaContext, useUiStateContext } from "../../context/AppContext";
import { OpenStateActions } from "../../context/OpenState";
import { tLiteral } from "../../i18n/literal";
import { SettingsDrawer } from "../settings";

type AppBarProps = Readonly<{
  drawerWidth: number;
}>;

export function AppBar(props: AppBarProps) {
  const { personal } = useSchemaContext();
  const { openState, openStateDispatch } = useUiStateContext();
  const isExtraSmall = useMediaQuery("(max-width:350px)");
  const { t } = useTranslation();

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${props.drawerWidth}px)` },
        ml: { md: `${props.drawerWidth}px` },
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.15)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 52, sm: 56 },
          px: { xs: 1.5, sm: 2 },
        }}
      >
        <IconButton
          data-testid="open-drawer-button"
          onClick={() => openStateDispatch({ type: OpenStateActions.DRAWER_TOGGLE })}
          size="large"
          edge="start"
          color="inherit"
          aria-label={t("literal:openDrawer")}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, textAlign: "left" }}>
          <Typography
            component="span"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.02em",
              fontSize: isExtraSmall ? "1rem" : "1.16rem",
              lineHeight: 1.15,
              fontFamily: '"Quicksand", "Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
            }}
          >
            {`${personal.firstName} ${personal.lastName}`}
          </Typography>
        </Box>
        <Tooltip title={tLiteral(t, "settings").toString()} arrow disableFocusListener disableTouchListener>
          <Box>
            <IconButton
              data-testid="open-settings-button"
              onClick={() => openStateDispatch({ type: OpenStateActions.SETTINGS_OPEN })}
              color="inherit"
              aria-label={t("literal:openSettings")}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Tooltip>
        {openState.settings && (
          <SettingsDrawer
            open={openState.settings}
            onClose={() => openStateDispatch({ type: OpenStateActions.SETTINGS_CLOSE })}
          />
        )}
      </Toolbar>
    </MuiAppBar>
  );
}
