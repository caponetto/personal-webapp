import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import Grid from "@mui/material/Grid";
import { SxProps, Theme } from "@mui/system";
import { useTranslation } from "react-i18next";
import { tLiteral } from "../../i18n/literal";
import { SocialButton } from "../button";

export interface SocialUrls {
  github: string;
  linkedin: string;
  x: string;
}

type SocialBarProps = Readonly<{
  sx?: SxProps<Theme>;
  urls: SocialUrls;
}>;

const SOCIAL_ICON_MAP = {
  github: <GitHubIcon />,
  x: <XIcon />,
  linkedin: <LinkedInIcon />,
};

const SOCIAL_URL_KEY_MAP = {
  github: "github",
  x: "x",
  linkedin: "linkedin",
} as const;

const SOCIAL_ITEMS = [
  { key: "github", labelKey: "github" },
  { key: "x", labelKey: "x" },
  { key: "linkedin", labelKey: "linkedin" },
] as const;

export function SocialBar(props: SocialBarProps) {
  const { t } = useTranslation();

  return (
    <Grid container sx={props.sx}>
      {SOCIAL_ITEMS.map((item) => (
        <Grid size="grow" key={`social-${item.key}`}>
          <SocialButton
            label={tLiteral(t, item.labelKey)}
            icon={SOCIAL_ICON_MAP[item.key]}
            url={props.urls[SOCIAL_URL_KEY_MAP[item.key]]}
          />
        </Grid>
      ))}
    </Grid>
  );
}
