import { Hono } from "hono";

import { middleware } from "../middleware/middleware";

export const userRoute = new Hono()
  .use("*", middleware({ role: "user" }))
  .get("/profile", async (context) => {
    return context.json(
      {
        ...context.get("profile"),
        user: context.get("user"),
      },
      200,
    );
  });
