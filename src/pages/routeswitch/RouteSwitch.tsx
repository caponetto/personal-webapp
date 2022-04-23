import React, { lazy, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../../routes";

const AboutPage = lazy(() => import("../AboutPage"));
const JourneyPage = lazy(() => import("../JourneyPage"));
const TextPage = lazy(() => import("../TextPage"));
const TalkPage = lazy(() => import("../TalkPage"));
const CodePage = lazy(() => import("../CodePage"));

export function RouteSwitch() {
  const navigateToAbout = useMemo(() => <Navigate to={routes.nav.about} replace />, []);

  return (
    <Routes>
      <Route path={routes.nav.root} element={navigateToAbout} />
      <Route path={routes.nav.about} element={<AboutPage />} />
      <Route path={routes.nav.journey} element={<JourneyPage />} />
      <Route path={routes.nav.text} element={<TextPage />} />
      <Route path={routes.nav.talk} element={<TalkPage />} />
      <Route path={routes.nav.code} element={<CodePage />} />
      <Route path={routes.nav.any} element={navigateToAbout} />
    </Routes>
  );
}
