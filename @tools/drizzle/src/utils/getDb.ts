import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { travel } from "../db/schema/travel";

const schema = { travel };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDb = (env: any) =>
  drizzle(postgres(env.DATABASE_URL), { schema });
