import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { TFunction } from "i18next";
import { ColorMode } from "../../colors";

type SettingsModeToggleProps = Readonly<{
  colorMode: ColorMode;
  onChange: (mode: ColorMode) => void;
  t: TFunction;
}>;

const toggleGroupSx = {
  mt: 0.5,
  "& .MuiToggleButtonGroup-grouped": {
    textTransform: "none",
    py: 1,
    gap: 0.75,
  },
};

export function SettingsModeToggle(props: SettingsModeToggleProps) {
  return (
    <ToggleButtonGroup
      exclusive
      fullWidth
      aria-label={props.t("literal:theme").toString()}
      value={props.colorMode}
      onChange={(_, selectedMode: ColorMode | null) => {
        if (selectedMode) {
          props.onChange(selectedMode);
        }
      }}
      sx={toggleGroupSx}
    >
      <ToggleButton data-testid="theme-toggle-light" value="light" aria-label={props.t("literal:light").toString()}>
        <LightModeOutlinedIcon fontSize="small" />
        {props.t("literal:light").toString()}
      </ToggleButton>
      <ToggleButton data-testid="theme-toggle-dark" value="dark" aria-label={props.t("literal:dark").toString()}>
        <DarkModeOutlinedIcon fontSize="small" />
        {props.t("literal:dark").toString()}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
