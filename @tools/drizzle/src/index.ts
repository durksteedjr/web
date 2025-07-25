export { eq } from "drizzle-orm";

export { account, session, user, verification } from "./db/schema/betterAuth";
export { db } from "./db";
export { profile } from "./db/schema/profile";

export type { Role } from "./db/schema/profile";
