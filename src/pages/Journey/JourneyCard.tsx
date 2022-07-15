import LaunchIcon from "@mui/icons-material/Launch";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { HoverableCard } from "../../components/card";
import { routes } from "../../routes";

interface JourneyCardProps {
  title: string;
  icon: ReactNode;
  content: ReactNode;
}

export function JourneyCard(props: JourneyCardProps) {
  const { t } = useTranslation();
  return (
    <HoverableCard>
      <CardHeader avatar={props.icon} title={<Typography sx={{ fontSize: "18px" }}>{props.title}</Typography>} />
      <CardContent>{props.content}</CardContent>
      <CardActions sx={{ pt: 0, px: "16px" }}>
        <Box sx={{ width: 1 }}>
          <Link underline="none" rel="noreferrer" target="_blank" href={routes.urls.social.linkedin}>
            <Button
              id={`${props.title}-more-details-button`}
              sx={{ float: "right" }}
              size="small"
              endIcon={<LaunchIcon />}
              color="success"
            >
              {t("literal:moreDetails")}
            </Button>
          </Link>
        </Box>
      </CardActions>
    </HoverableCard>
  );
}
