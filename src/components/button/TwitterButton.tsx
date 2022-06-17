import TwitterIcon from "@mui/icons-material/Twitter";
import { useTranslation } from "react-i18next";
import { SocialButton } from "./SocialButton";

interface TwitterButtonProps {
  disableSpacing?: boolean;
  url: string;
}

export function TwitterButton(props: TwitterButtonProps) {
  const { t } = useTranslation();
  return (
    <SocialButton
      label={t("literal:twitter")}
      icon={<TwitterIcon />}
      disableSpacing={props.disableSpacing}
      url={props.url}
    />
  );
}
