import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { HoverableCard } from "../../components/card";
import { EmailContact } from "../../components/email";
import { SocialBar } from "../../components/social";
import { SocialUrls } from "../../components/social/SocialBar";

type AboutSummaryCardProps = Readonly<{
  email: string;
  urls: SocialUrls;
}>;

export function AboutSummaryCard(props: AboutSummaryCardProps) {
  const { t } = useTranslation();

  return (
    <HoverableCard sx={{ p: { xs: 2.25, sm: 2.5 } }}>
      <Stack spacing={2.25}>
        <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: "0.08em" }}>
          {t("literal:quickFacts")}
        </Typography>
        <Stack spacing={1.2}>
          <Stack spacing={0.3}>
            <Typography variant="caption" sx={{ color: "text.secondary", letterSpacing: "0.04em" }}>
              {t("literal:currentRole")}
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>{t("literal:principalSoftwareEngineer")}</Typography>
          </Stack>
          <Stack spacing={0.3}>
            <Typography variant="caption" sx={{ color: "text.secondary", letterSpacing: "0.04em" }}>
              {t("literal:codingSince")}
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>2007</Typography>
          </Stack>
          <Stack spacing={0.3}>
            <Typography variant="caption" sx={{ color: "text.secondary", letterSpacing: "0.04em" }}>
              {t("literal:focus")}
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>{t("about:fact.focusValue")}</Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack spacing={1}>
          <EmailContact email={props.email} />
          <Typography variant="caption" sx={{ color: "text.secondary", letterSpacing: "0.04em" }}>
            {t("literal:findMeOnline")}
          </Typography>
          <SocialBar sx={{ width: "150px", mx: { xs: "auto", md: 0 } }} urls={props.urls} />
        </Stack>
      </Stack>
    </HoverableCard>
  );
}
