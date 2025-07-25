import { auth } from "@tools/better-auth";
import type { Role } from "@tools/drizzle";
import { db, eq, profile as dbProfile } from "@tools/drizzle";
import { createFactory } from "hono/factory";
import { HTTPException } from "hono/http-exception";

interface MiddlewareProps {
  role?: Role;
}

const factory = createFactory<{
  Variables: {
    db: null | typeof db;
    profile: null | typeof dbProfile.$inferSelect;
    session: null | typeof auth.$Infer.Session.session;
    user: null | typeof auth.$Infer.Session.user;
  };
}>();

export const middleware = ({ role }: MiddlewareProps = {}) =>
  factory.createMiddleware(async (context, next) => {
    context.set("db", db);

    const session = await auth.api.getSession({
      headers: context.req.raw.headers,
    });
    if (!session) {
      context.set("profile", null);
      context.set("session", null);
      context.set("user", null);
      throw new HTTPException(401);
    }

    context.set("session", session.session);
    context.set("user", session.user);

    const profile = await db.query.profile.findFirst({
      where: eq(dbProfile.userId, session.user.id),
    });
    if (!profile) {
      context.set("profile", null);
      throw new HTTPException(401);
    }

    context.set("profile", profile);

    switch (role) {
      case "admin":
        if (profile.role !== "admin") throw new HTTPException(403);
        break;
      case "user":
      default:
        break;
    }

    await next();
  });
