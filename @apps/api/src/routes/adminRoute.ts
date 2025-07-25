import { Hono } from "hono";

import { middleware } from "../middleware/middleware";

export const adminRoute = new Hono().use("*", middleware({ role: "admin" }));
