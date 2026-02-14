import { lazy } from "react";
import Fade from "@mui/material/Fade";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router";
import { routes } from "../routes";

const AboutPage = lazy(() => import("./About/AboutPage"));
const JourneyPage = lazy(() => import("./Journey/JourneyPage"));
const TextPage = lazy(() => import("./Text/TextPage"));
const TalkPage = lazy(() => import("./Talk/TalkPage"));
const CodePage = lazy(() => import("./Code/CodePage"));

export function RouteSwitch() {
  const location = useLocation();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const navigateToAbout = <Navigate to={routes.nav.about} replace />;

  return (
    <Fade in={true} timeout={reduceMotion ? 0 : 150} key={location.pathname}>
      <div>
        <Routes location={location}>
          <Route path={routes.nav.about} element={<AboutPage />} />
          <Route path={routes.nav.journey} element={<JourneyPage />} />
          <Route path={routes.nav.text} element={<TextPage />} />
          <Route path={routes.nav.talk} element={<TalkPage />} />
          <Route path={routes.nav.code} element={<CodePage />} />
          <Route path="*" element={navigateToAbout} />
        </Routes>
      </div>
    </Fade>
  );
}
