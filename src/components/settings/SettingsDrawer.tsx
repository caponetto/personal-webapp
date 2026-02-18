import CloseIcon from "@mui/icons-material/Close";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useThemeModeContext } from "../../context/AppContext";
import { tLiteral } from "../../i18n/literal";
import { SettingsLanguageToggle } from "./SettingsLanguageToggle";
import { SettingsModeToggle } from "./SettingsModeToggle";
import { SettingsSection } from "./SettingsSection";

type SettingsDrawerProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

export function SettingsDrawer(props: SettingsDrawerProps) {
  const { colorMode, updateColorMode } = useThemeModeContext();
  const { t, i18n } = useTranslation();
  const sectionIconSx = { fontSize: "0.95rem", color: "text.secondary" };

  return (
    <SwipeableDrawer
      data-testid="settings-drawer"
      open={props.open}
      anchor="right"
      disableSwipeToOpen
      onOpen={() => undefined}
      onClose={props.onClose}
      ModalProps={{
        keepMounted: true,
        disableRestoreFocus: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: 300,
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" component="h2">
            {tLiteral(t, "settings")}
          </Typography>
          <IconButton
            data-testid="close-settings-button"
            onClick={props.onClose}
            size="small"
            color="inherit"
            aria-label={t("literal:closeSettings")}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ px: 2, py: 2, display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <SettingsSection
              id="theme-form"
              label={t("literal:theme")}
              icon={<PaletteOutlinedIcon sx={sectionIconSx} />}
            >
              <SettingsModeToggle colorMode={colorMode} onChange={updateColorMode} t={t} />
            </SettingsSection>
          </Box>
          <Box>
            <SettingsSection
              id="language-form"
              label={t("literal:language")}
              icon={<LanguageOutlinedIcon sx={sectionIconSx} />}
            >
              <SettingsLanguageToggle value={i18n.resolvedLanguage} onChange={i18n.changeLanguage} t={t} />
            </SettingsSection>
          </Box>
          <Box>
            <SettingsSection
              id="version-form"
              label={t("literal:version")}
              icon={<SellOutlinedIcon sx={sectionIconSx} />}
            >
              <Typography color="gray" variant="body2">
                {process.env["WEBPACK_REPLACE__version"]?.substring(0, 12)}
              </Typography>
            </SettingsSection>
          </Box>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
