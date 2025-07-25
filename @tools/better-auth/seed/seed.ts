import { db, eq, profile, user } from "@tools/drizzle";
import { auth } from "../src";

export const main = async () => {
  const admin = await db.query.user.findFirst({
    where: eq(user.email, process.env.ADMIN_EMAIL || ""),
  });

  if (!admin) {
    const newAdmin = await auth.api.signUpEmail({
      body: {
        email: process.env.ADMIN_EMAIL || "",
        name: "",
        password: process.env.ADMIN_PASSWORD || "",
      },
    });

    await db.insert(profile).values({
      userId: newAdmin.user.id,
      role: "admin",
    });
  }

  process.exit(0);
};

main();
