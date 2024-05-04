import XIcon from "@mui/icons-material/X";
import { useTranslation } from "react-i18next";
import { SocialButton } from "./SocialButton";

interface XButtonProps {
  disableSpacing?: boolean;
  url: string;
}

export function XButton(props: XButtonProps) {
  const { t } = useTranslation();
  return <SocialButton label={t("literal:x")} icon={<XIcon />} disableSpacing={props.disableSpacing} url={props.url} />;
}
