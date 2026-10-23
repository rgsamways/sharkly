CREATE TABLE "shark_votes" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	"month" text NOT NULL,
	"species_id" text NOT NULL,
	CONSTRAINT "shark_votes_month_format" CHECK ("shark_votes"."month" ~ '^[0-9]{4}-(0[1-9]|1[0-2])$')
);
--> statement-breakpoint
ALTER TABLE "shark_votes" ADD CONSTRAINT "shark_votes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shark_votes" ADD CONSTRAINT "shark_votes_species_id_species_id_fk" FOREIGN KEY ("species_id") REFERENCES "public"."species"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "shark_votes_user_month_key" ON "shark_votes" USING btree ("user_id","month");--> statement-breakpoint
CREATE INDEX "shark_votes_month_species_idx" ON "shark_votes" USING btree ("month","species_id");