import React from "react";
import { ZMPRouter } from "zmp-ui";
import { Route, Routes } from "react-router-dom";
import { PATHS } from "@/constants/path";
import GalaxyPage from "./pages/galaxy";
import MainPage from "./pages/main";

const routes = [
  { path: PATHS.GALAXY, element: <GalaxyPage /> },
  { path: PATHS.MAIN, element: <MainPage /> }
];

export default function AppRouter() {
  return (
    <ZMPRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </ZMPRouter>
  );
}
