import { PATHS } from "@/constants/path";
import { AnimationRoutes, Route, ZMPRouter } from "zmp-ui";
import GalaxyPage from "./pages/galaxy";
import MainPage from "./pages/main";
const routes = [
  { path: PATHS.GALAXY, element: <GalaxyPage /> },
  { path: PATHS.MAIN, element: <MainPage /> },
  {}
];

export default function AppRouter() {
  return (
    <ZMPRouter>
      <AnimationRoutes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </AnimationRoutes>
    </ZMPRouter>
  );
}
