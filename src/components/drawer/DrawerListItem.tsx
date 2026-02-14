import { ListItemButton } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactNode } from "react";

type DrawerListItemProps = Readonly<{
  testId: string;
  width: number;
  title: string;
  subtitle?: string;
  icon: {
    initial: ReactNode;
    selected: ReactNode;
  };
  selected: boolean;
  onClick: () => void;
}>;

export function DrawerListItem(props: DrawerListItemProps) {
  const showSecondary = useMediaQuery("(min-height:580px)");

  return (
    <ListItemButton
      data-testid={props.testId}
      key={`nav-${props.title}`}
      selected={props.selected}
      aria-current={props.selected ? "page" : undefined}
      onClick={props.onClick}
      sx={(theme) => ({
        position: "relative",
        p: "4px 16px",
        borderRadius: "0 66px 66px 0",
        width: `${props.width}px`,
        maxWidth: "100%",
        boxSizing: "border-box",
        borderLeft: "3px solid transparent",
        transition: "background-color 140ms ease, border-color 140ms ease",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 6,
          bottom: 6,
          width: 3,
          borderRadius: "0 8px 8px 0",
          backgroundColor: theme.palette.primary.main,
          transform: props.selected ? "scaleY(1)" : "scaleY(0.25)",
          transformOrigin: "center",
          opacity: props.selected ? 1 : 0,
          transition: "transform 180ms ease, opacity 180ms ease",
        },
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.09),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.primary.main, 0.18),
        },
        "&.Mui-selected:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.24),
        },
        "&.Mui-focusVisible": {
          outline: "2px solid",
          outlineColor: "success.main",
          outlineOffset: 1,
        },
      })}
    >
      <ListItemIcon>{props.selected ? props.icon.selected : props.icon.initial}</ListItemIcon>
      <ListItemText
        slotProps={{
          primary: {
            fontWeight: props.selected ? "bold" : "light",
          },
          secondary: {
            noWrap: true,
            sx: {
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          },
        }}
        primary={props.title}
        secondary={showSecondary ? props.subtitle : ""}
      />
    </ListItemButton>
  );
}
