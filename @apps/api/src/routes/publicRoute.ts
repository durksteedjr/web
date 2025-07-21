import { getDb } from "@tools/drizzle";
import { Hono } from "hono";

export const publicRoute = new Hono()
  .get("/status", (context) => context.json({ status: "ok" }, 200))
  .get("/travel", async (context) =>
    context.json(await getDb(context.env).query.travel.findMany()),
  );
