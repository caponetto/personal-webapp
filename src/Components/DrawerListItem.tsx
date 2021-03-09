import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { ReactNode } from "react";

interface DrawerListItemProps {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  onClick: () => void;
  selected: boolean;
}

export function DrawerListItem(props: DrawerListItemProps) {
  return (
    <ListItem button key={`nav-${props.title}`} selected={props.selected} onClick={props.onClick}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.title} secondary={props.subtitle} />
    </ListItem>
  );
}
