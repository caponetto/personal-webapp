import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type SettingsSectionProps = Readonly<{
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
}>;

const sectionLabelSx = {
  fontSize: "0.76rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "text.secondary",
};

export function SettingsSection(props: SettingsSectionProps) {
  return (
    <FormControl sx={{ width: "100%" }}>
      <FormLabel id={props.id} focused={false}>
        <Stack direction="row" spacing={0.75} alignItems="center">
          {props.icon}
          <Typography variant="overline" sx={sectionLabelSx}>
            {props.label}
          </Typography>
        </Stack>
      </FormLabel>
      <Stack sx={{ mt: 1.25 }}>{props.children}</Stack>
    </FormControl>
  );
}
