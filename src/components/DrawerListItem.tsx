import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { ReactNode } from "react";

interface DrawerListItemProps {
  title: string;
  subtitle?: string;
  icon: ReactNode;
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
      sx={{ borderRadius: "16px 0px 0px 16px" }}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ fontWeight: props.selected ? "bold" : "light" }}
        primary={props.title}
        secondary={showSecondary ? props.subtitle : ""}
      />
    </ListItem>
  );
}
