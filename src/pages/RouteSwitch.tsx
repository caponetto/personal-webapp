import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../routes";

const AboutPage = lazy(() => import("./About/AboutPage"));
const JourneyPage = lazy(() => import("./Journey/JourneyPage"));
const TextPage = lazy(() => import("./Text/TextPage"));
const TalkPage = lazy(() => import("./Talk/TalkPage"));
const CodePage = lazy(() => import("./Code/CodePage"));

export function RouteSwitch() {
  const navigateToAbout = <Navigate to={routes.nav.about} replace />;

  return (
    <Routes>
      <Route path={routes.nav.about} element={<AboutPage />} />
      <Route path={routes.nav.journey} element={<JourneyPage />} />
      <Route path={routes.nav.text} element={<TextPage />} />
      <Route path={routes.nav.talk} element={<TalkPage />} />
      <Route path={routes.nav.code} element={<CodePage />} />
      <Route path="*" element={navigateToAbout} />
    </Routes>
  );
}
