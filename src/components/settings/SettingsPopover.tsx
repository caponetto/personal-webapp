import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { ColorMode } from "../../colors";
import { useApp } from "../../context/AppContext";
import { useAppDispatch } from "../../context/AppContextDispatch";
import { SupportedLanguages } from "../../i18n";

interface SettingsPopoverProps {
  anchor: HTMLButtonElement | null;
  open: boolean;
  onClose: () => void;
}

export function SettingsPopover(props: SettingsPopoverProps) {
  const app = useApp();
  const appDispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const smallRadioButton = (
    <Radio
      sx={{
        "& .MuiSvgIcon-root": {
          fontSize: 16,
        },
      }}
      size="small"
    />
  );

  return (
    <Popover
      id="settings-popover"
      open={props.open}
      anchorEl={props.anchor}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ width: "180px", px: "8px", py: "12px", display: "flex" }}>
        <Box sx={{ flexGrow: 1, pl: "5px" }}>
          <Box>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel id="theme-form" focused={false}>
                <Typography variant="overline">{t("literal:theme")}</Typography>
              </FormLabel>
              <RadioGroup
                aria-labelledby="theme-form"
                value={app.colorMode}
                onChange={(event) => appDispatch.updateColorMode((event.target as HTMLInputElement).value as ColorMode)}
                name="theme-group"
              >
                <FormControlLabel value="light" control={smallRadioButton} label={t("literal:light").toString()} />
                <FormControlLabel value="dark" control={smallRadioButton} label={t("literal:dark").toString()} />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel id="language-form" focused={false}>
                <Typography variant="overline">{t("literal:language")}</Typography>
              </FormLabel>
              <RadioGroup
                aria-labelledby="language-form"
                value={i18n.resolvedLanguage}
                onChange={(event) => i18n.changeLanguage((event.target as HTMLInputElement).value)}
                name="language-group"
              >
                <FormControlLabel value={SupportedLanguages.English} control={smallRadioButton} label={"English"} />
                <FormControlLabel
                  value={SupportedLanguages.Portuguese}
                  control={smallRadioButton}
                  label={"Português"}
                />
                <FormControlLabel value={SupportedLanguages.Spanish} control={smallRadioButton} label={"Español"} />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel id="version-form" focused={false}>
                <Typography variant="overline">{t("literal:version")}</Typography>
              </FormLabel>
              <Typography color="gray" variant="body2">
                {process.env["WEBPACK_REPLACE__version"]?.substring(0, 12)}
              </Typography>
            </FormControl>
          </Box>
        </Box>
        <Box>
          <IconButton
            id="close-settings-button"
            onClick={props.onClose}
            size="small"
            color="inherit"
            aria-label="Close settings"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Popover>
  );
}
