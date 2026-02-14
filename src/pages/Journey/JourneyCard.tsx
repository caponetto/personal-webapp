import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { HoverableCard } from "../../components/card";

type JourneyCardProps = Readonly<{
  title: string;
  icon: ReactNode;
  children: ReactNode;
}>;

export function JourneyCard(props: JourneyCardProps) {
  return (
    <HoverableCard>
      <CardHeader
        avatar={props.icon}
        title={<Typography sx={{ fontSize: "18px", fontWeight: 500 }}>{props.title}</Typography>}
      />
      <CardContent sx={{ pt: 0.5, pb: 1.25 }}>{props.children}</CardContent>
    </HoverableCard>
  );
}
