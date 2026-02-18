import Card, { CardProps } from "@mui/material/Card";
import { SxProps, Theme } from "@mui/system";
import { ReactNode } from "react";

type HoverableCardProps = Readonly<{
  children: ReactNode;
  sx?: SxProps<Theme>;
}> &
  Omit<CardProps, "children" | "sx">;

export function HoverableCard(props: HoverableCardProps) {
  const { children, sx, ...cardProps } = props;

  return (
    <Card
      {...cardProps}
      elevation={2}
      sx={[
        {
          border: "1px solid",
          borderColor: "divider",
          transition: "border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease",
          "&:focus-within": {
            boxShadow: 6,
            borderColor: "action.active",
            transform: "translateY(-1px)",
          },
          "@media (hover: hover) and (pointer: fine)": {
            "&:hover": {
              boxShadow: 6,
              borderColor: "action.active",
              transform: "translateY(-1px)",
            },
          },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "success.main",
            outlineOffset: 2,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Card>
  );
}
