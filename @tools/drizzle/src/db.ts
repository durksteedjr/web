import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { account, session, user, verification } from "./db/schema/betterAuth";
import { profile } from "./db/schema/profile";
import { travel } from "./db/schema/travel";

const schema = { account, profile, session, travel, user, verification };

export const db = drizzle(postgres(process.env.DATABASE_URL || ""), { schema });
