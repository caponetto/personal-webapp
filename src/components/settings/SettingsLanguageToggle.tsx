import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { TFunction } from "i18next";
import { SupportedLanguages } from "../../i18n";

type SettingsLanguageToggleProps = Readonly<{
  value: string | undefined;
  onChange: (language: SupportedLanguages) => void;
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

export function SettingsLanguageToggle(props: SettingsLanguageToggleProps) {
  return (
    <ToggleButtonGroup
      exclusive
      fullWidth
      aria-label={props.t("literal:language").toString()}
      value={props.value}
      onChange={(_, selectedLanguage: SupportedLanguages | null) => {
        if (selectedLanguage) {
          props.onChange(selectedLanguage);
        }
      }}
      sx={toggleGroupSx}
    >
      <ToggleButton data-testid="language-toggle-en" value={SupportedLanguages.English} aria-label="English">
        English
      </ToggleButton>
      <ToggleButton data-testid="language-toggle-pt" value={SupportedLanguages.Portuguese} aria-label="Português">
        Português
      </ToggleButton>
      <ToggleButton data-testid="language-toggle-es" value={SupportedLanguages.Spanish} aria-label="Español">
        Español
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
