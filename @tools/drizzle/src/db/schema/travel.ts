import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const travel = pgTable("travel", {
  date: date().notNull(),
  name: varchar({ length: 255 }).notNull(),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});
