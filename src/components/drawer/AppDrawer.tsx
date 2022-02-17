import ForumIcon from "@mui/icons-material/Forum";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SourceIcon from "@mui/icons-material/Source";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import ViewTimelineOutlinedIcon from "@mui/icons-material/ViewTimelineOutlined";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { DrawerListItem } from ".";
import { useApp } from "../../context/AppContext";
import { routes } from "../../routes";
import { FaceBadge } from "../badge";
import { SocialBar } from "../social";

interface AppDrawerProps {
  drawerWidth: number;
  drawerItemWidth: number;
}

export function AppDrawer(props: AppDrawerProps) {
  const app = useApp();
  const location = useLocation();
  const denseList = useMediaQuery("(min-height:580px) and (max-height:600px)");

  const items = useMemo(
    () => (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", minHeight: "100%" }}>
        <FaceBadge
          name={app.data.personal.fullName}
          avatarRoute={routes.images.avatar}
          location={{
            name: app.data.personal.location.country,
            emojiIcon: app.data.personal.location.flag,
            url: app.data.personal.location.url,
          }}
          onClick={() => app.goTo(routes.nav.about)}
        />
        <List dense={denseList} sx={{ flexGrow: 1 }}>
          <DrawerListItem
            width={props.drawerItemWidth}
            title={"About"}
            subtitle={"Words about myself"}
            icon={{ normal: <InfoOutlinedIcon />, selected: <InfoIcon /> }}
            onClick={() => app.goTo(routes.nav.about)}
            selected={location.pathname === routes.nav.about}
          />
          <DrawerListItem
            width={props.drawerItemWidth}
            title={"Journey"}
            subtitle={"Education & Experience"}
            icon={{ normal: <ViewTimelineOutlinedIcon />, selected: <ViewTimelineIcon /> }}
            onClick={() => app.goTo(routes.nav.journey)}
            selected={location.pathname === routes.nav.journey}
          />
          <DrawerListItem
            width={props.drawerItemWidth}
            title={"Text"}
            subtitle={"Content that I've written"}
            icon={{ normal: <TextSnippetOutlinedIcon />, selected: <TextSnippetIcon /> }}
            onClick={() => app.goTo(routes.nav.text)}
            selected={location.pathname === routes.nav.text}
          />
          <DrawerListItem
            width={props.drawerItemWidth}
            title={"Talk"}
            subtitle={"Things that I've talked about"}
            icon={{ normal: <ForumOutlinedIcon />, selected: <ForumIcon /> }}
            onClick={() => app.goTo(routes.nav.talk)}
            selected={location.pathname === routes.nav.talk}
          />
          <DrawerListItem
            width={props.drawerItemWidth}
            title={"Code"}
            subtitle={"Lines worth highlighting"}
            icon={{ normal: <SourceOutlinedIcon />, selected: <SourceIcon /> }}
            onClick={() => app.goTo(routes.nav.code)}
            selected={location.pathname === routes.nav.code}
          />
        </List>
        <Box sx={{ width: 1, flexShrink: 0 }}>
          <SocialBar sx={{ width: "60%", mx: "auto", mb: "10px" }} urls={routes.urls.social} />
          <Typography variant="caption" component="div" align="center">
            {`© ${new Date().getFullYear()} ${app.data.personal.fullName}`}
          </Typography>
        </Box>
      </Box>
    ),
    [app, denseList, location.pathname, props.drawerItemWidth]
  );

  const muiPaperStyle = useMemo(
    () => ({
      "& .MuiDrawer-paper": { overflow: "overlay", boxShadow: 2, boxSizing: "border-box", width: props.drawerWidth },
    }),
    [props.drawerWidth]
  );

  return (
    <Box component="nav" sx={{ width: { md: props.drawerWidth }, height: "100%", flexShrink: { md: 0 } }}>
      <SwipeableDrawer
        id="temporary-drawer"
        disableSwipeToOpen
        variant="temporary"
        open={app.drawerOpen}
        onOpen={() => app.setDrawerOpen(true)}
        onClose={() => app.setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
          onBackdropClick: () => app.setDrawerOpen(false),
        }}
        sx={{
          display: { xs: "block", md: "none" },
          ...muiPaperStyle,
        }}
      >
        {items}
      </SwipeableDrawer>
      <Drawer
        id="permanent-drawer"
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          ...muiPaperStyle,
        }}
        open
      >
        {items}
      </Drawer>
    </Box>
  );
}