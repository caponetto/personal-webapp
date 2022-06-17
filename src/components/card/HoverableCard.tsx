import Card from "@mui/material/Card";
import { SxProps, Theme } from "@mui/system";
import { ReactNode, useState } from "react";

interface HoverableCardProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export function HoverableCard(props: HoverableCardProps) {
  const [isMouseOver, setMouseOver] = useState(false);

  return (
    <Card
      sx={{ ...props.sx }}
      elevation={isMouseOver ? 5 : 2}
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {props.children}
    </Card>
  );
}
