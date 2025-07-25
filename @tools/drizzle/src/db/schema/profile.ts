import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";

import { user } from "./betterAuth";

export const rolesEnum = pgEnum("roles", ["admin", "user"]);
export type Role = (typeof rolesEnum.enumValues)[number];

export const profile = pgTable("profile", {
  role: rolesEnum().default("user"),
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
});
