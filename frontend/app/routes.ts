import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    route("game", "routes/game.tsx"),
    route("status", "routes/status.tsx"),
    route("restart", "routes/restart.tsx"),
  ]),
] satisfies RouteConfig;
