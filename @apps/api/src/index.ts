import { Hono } from "hono";
import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";

import { publicRoute } from "./routes/publicRoute";

const api = new Hono()
  .use("*", cors({ origin: ["localhost"] }))
  .use("*", trimTrailingSlash())
  .route("/public", publicRoute);

export default api;
