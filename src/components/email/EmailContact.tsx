import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { obfuscateEmailAddress } from "../../utils/emailFormatting";

const COPIED_FEEDBACK_MS = 1200;

type EmailContactProps = Readonly<{
  email: string;
}>;

export function EmailContact(props: EmailContactProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const obfuscatedEmail = obfuscateEmailAddress(props.email);

  const copyEmail = async () => {
    if (!navigator.clipboard) {
      return;
    }
    await navigator.clipboard.writeText(props.email);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
  };

  return (
    <Stack spacing={0.3}>
      <Typography variant="caption" sx={{ color: "text.secondary", letterSpacing: "0.04em" }}>
        {t("literal:email")}
      </Typography>
      <Stack direction="row" spacing={0.25} alignItems="center" sx={{ width: "fit-content" }}>
        <Typography sx={{ fontWeight: 600 }}>{obfuscatedEmail}</Typography>
        <Tooltip title={copied ? t("literal:copied") : t("literal:copyEmail")} arrow>
          <IconButton
            aria-label={t("literal:copyEmail")}
            size="small"
            onClick={() => void copyEmail()}
            sx={{
              color: copied ? "secondary.main" : "text.secondary",
              transition: "color 180ms ease",
              ml: 0.25,
            }}
          >
            <ContentCopyOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
