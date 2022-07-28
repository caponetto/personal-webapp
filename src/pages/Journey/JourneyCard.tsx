import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLinkButton } from "../../components/button";
import { HoverableCard } from "../../components/card";

interface JourneyCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  moreDetailsUrl: string;
}

export function JourneyCard(props: JourneyCardProps) {
  const { t } = useTranslation();

  return (
    <HoverableCard>
      <CardHeader avatar={props.icon} title={<Typography sx={{ fontSize: "18px" }}>{props.title}</Typography>} />
      <CardContent>{props.children}</CardContent>
      <CardActions sx={{ pt: 0, px: "16px" }}>
        <Box sx={{ width: 1 }}>
          <ExternalLinkButton title={t("literal:moreDetails")} href={props.moreDetailsUrl} />
        </Box>
      </CardActions>
    </HoverableCard>
  );
}
