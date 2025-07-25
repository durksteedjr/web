import { serve } from "@hono/node-server";
import { auth } from "@tools/better-auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";

import { adminRoute } from "./routes/adminRoute";
import { publicRoute } from "./routes/publicRoute";
import { userRoute } from "./routes/userRoute";

export const api = new Hono()
  .use(
    "*",
    cors({
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "OPTIONS", "POST"],
      credentials: true,
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      origin: "http://localhost:3000",
    }),
  )
  .use("*", logger())
  .use("*", trimTrailingSlash())
  .route("/public", publicRoute)
  .on(["GET", "POST"], "/auth/*", (context) => {
    return auth.handler(context.req.raw);
  })
  .route("/admin", adminRoute)
  .route("/user", userRoute);

serve({
  fetch: api.fetch,
  port: 3000,
});
