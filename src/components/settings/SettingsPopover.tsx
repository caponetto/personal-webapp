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
import React, { ChangeEvent, useCallback, useMemo } from "react";
import { ColorMode, useApp } from "../../context/AppContext";

interface SettingsPopoverProps {
  anchor: HTMLButtonElement | null;
  open: boolean;
  onClose: () => void;
}

export function SettingsPopover(props: SettingsPopoverProps) {
  const app = useApp();

  const onThemeChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      app.setColorMode((event.target as HTMLInputElement).value as ColorMode);
    },
    [app]
  );

  const onLanguageChanged = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    // Nothing to do for now.
  }, []);

  const smallRadioButton = useMemo(
    () => (
      <Radio
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 16,
          },
        }}
        size="small"
      />
    ),
    []
  );

  return (
    <Popover
      id={"settings-popover"}
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
                <Typography variant="overline">Theme</Typography>
              </FormLabel>
              <RadioGroup
                aria-labelledby="theme-form"
                value={app.colorMode}
                onChange={onThemeChanged}
                name="theme-group"
              >
                <FormControlLabel value="light" control={smallRadioButton} label="Light" />
                <FormControlLabel value="dark" control={smallRadioButton} label="Dark" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel id="language-form" focused={false}>
                <Typography variant="overline">Language</Typography>
              </FormLabel>
              <RadioGroup
                aria-labelledby="language-form"
                value={"english"}
                onChange={onLanguageChanged}
                name="language-group"
              >
                <FormControlLabel value="english" control={smallRadioButton} label="English" />
              </RadioGroup>
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
