import { db } from "@tools/drizzle";
import { createFactory } from "hono/factory";

const factory = createFactory<{
  Variables: {
    db: null | typeof db;
  };
}>();

export const middlewareDb = factory.createMiddleware(async (context, next) => {
  context.set("db", db);
  await next();
});
