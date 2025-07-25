import { Hono } from "hono";

import { middlewareDb } from "../middleware/middlewareDb";

export const publicRoute = new Hono()
  .use("*", middlewareDb)
  .get("/travel", async (context) =>
    context.json(await context.var.db?.query.travel.findMany(), 200),
  );
