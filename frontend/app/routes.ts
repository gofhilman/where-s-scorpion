import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    ...prefix("game", [
      index("routes/game.tsx"),
      route("status", "routes/status.tsx"),
      route("restart", "routes/restart.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
