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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { DrawerListItem } from ".";
import { useApp, useAppDispatch } from "../../context/AppContext";
import { OpenStateActions } from "../../context/OpenState";
import { routes } from "../../routes";
import { FaceBadge } from "../badge";
import { Copyright } from "../copyright";
import { SocialBar } from "../social";

interface AppDrawerProps {
  drawerWidth: number;
  drawerItemWidth: number;
}

export function AppDrawer(props: AppDrawerProps) {
  const app = useApp();
  const appDispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const denseList = useMediaQuery("(min-height:580px) and (max-height:600px)");

  const items = useMemo(
    () => (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", minHeight: "100%" }}>
        <FaceBadge
          name={`${app.schema.personal.firstName} ${app.schema.personal.lastName}`}
          avatarRoute={routes.images.avatar}
          location={{
            name: app.schema.personal.country.name,
            emojiIcon: app.schema.personal.country.emoji,
            url: app.schema.personal.country.url,
          }}
          onClick={() => appDispatch.goTo(routes.nav.about)}
        />
        <List dense={denseList} sx={{ flexGrow: 1 }}>
          <DrawerListItem
            width={props.drawerItemWidth}
            title={t("literal:about")}
            subtitle={t("drawer:about.subtitle")}
            icon={{ initial: <InfoOutlinedIcon />, selected: <InfoIcon /> }}
            onClick={() => appDispatch.goTo(routes.nav.about)}
            selected={location.pathname === routes.nav.about}
          />
          <DrawerListItem
            width={props.drawerItemWidth}
            title={t("literal:journey")}
            subtitle={t("drawer:journey.subtitle")}
            icon={{ initial: <ViewTimelineOutlinedIcon />, selected: <ViewTimelineIcon /> }}
            onClick={() => appDispatch.goTo(routes.nav.journey)}
            selected={location.pathname === routes.nav.journey}
          />
          <DrawerListItem
            width={props.drawerItemWidth}
            title={t("literal:text")}
            subtitle={t("drawer:text.subtitle")}
            icon={{ initial: <TextSnippetOutlinedIcon />, selected: <TextSnippetIcon /> }}
            onClick={() => appDispatch.goTo(routes.nav.text)}
            selected={location.pathname === routes.nav.text}
          />
          <DrawerListItem
            width={props.drawerItemWidth}
            title={t("literal:talk")}
            subtitle={t("drawer:talk.subtitle")}
            icon={{ initial: <ForumOutlinedIcon />, selected: <ForumIcon /> }}
            onClick={() => appDispatch.goTo(routes.nav.talk)}
            selected={location.pathname === routes.nav.talk}
          />
          <DrawerListItem
            width={props.drawerItemWidth}
            title={t("literal:code")}
            subtitle={t("drawer:code.subtitle")}
            icon={{ initial: <SourceOutlinedIcon />, selected: <SourceIcon /> }}
            onClick={() => appDispatch.goTo(routes.nav.code)}
            selected={location.pathname === routes.nav.code}
          />
        </List>
        <Box sx={{ width: 1, flexShrink: 0 }}>
          <SocialBar sx={{ width: "60%", mx: "auto", mb: "10px" }} urls={routes.urls.social} />
          <Copyright />
        </Box>
      </Box>
    ),
    [app.schema.personal, appDispatch, denseList, location.pathname, props.drawerItemWidth, t]
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
        data-testid="temporary-drawer"
        disableSwipeToOpen
        variant="temporary"
        open={app.openState.drawer}
        onOpen={() => appDispatch.openStateDispatch({ type: OpenStateActions.DRAWER_OPEN })}
        onClose={() => appDispatch.openStateDispatch({ type: OpenStateActions.DRAWER_CLOSE })}
        ModalProps={{
          keepMounted: true,
          onBackdropClick: () => appDispatch.openStateDispatch({ type: OpenStateActions.DRAWER_CLOSE }),
        }}
        sx={{
          display: { xs: "block", md: "none" },
          ...muiPaperStyle,
        }}
      >
        {items}
      </SwipeableDrawer>
      <Drawer
        data-testid="permanent-drawer"
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
