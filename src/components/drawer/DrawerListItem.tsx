import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { ReactNode } from "react";

interface DrawerListItemProps {
  width: number;
  title: string;
  subtitle?: string;
  icon: {
    normal: ReactNode;
    selected: ReactNode;
  };
  selected: boolean;
  onClick: () => void;
}

export function DrawerListItem(props: DrawerListItemProps) {
  const showSecondary = useMediaQuery("(min-height:580px)");

  return (
    <ListItem
      id={`${props.title}-item-button`}
      button
      key={`nav-${props.title}`}
      selected={props.selected}
      onClick={props.onClick}
      sx={{ p: "4px 16px", borderRadius: "0 66px 66px 0", width: `${props.width}px` }}
    >
      <ListItemIcon>{props.selected ? props.icon.selected : props.icon.normal}</ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ fontWeight: props.selected ? "bold" : "light" }}
        primary={props.title}
        secondary={showSecondary ? props.subtitle : ""}
      />
    </ListItem>
  );
}
