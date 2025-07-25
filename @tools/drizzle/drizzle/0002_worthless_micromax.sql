CREATE TYPE "public"."roles" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TABLE "profile" (
	"role" "roles" DEFAULT 'user',
	"user_id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;