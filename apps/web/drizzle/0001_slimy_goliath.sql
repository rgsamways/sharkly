CREATE TABLE "shark_of_the_month" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"month" text NOT NULL,
	"species_id" text NOT NULL,
	"teaser" text NOT NULL,
	CONSTRAINT "shark_of_the_month_month_format" CHECK ("shark_of_the_month"."month" ~ '^[0-9]{4}-(0[1-9]|1[0-2])$')
);
--> statement-breakpoint
CREATE TABLE "species" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"slug" text NOT NULL,
	"common_name" text NOT NULL,
	"scientific_name" text NOT NULL,
	"max_length_cm" integer NOT NULL,
	"habitats" text[] NOT NULL,
	"depth_min_m" integer,
	"depth_max_m" integer,
	"diet" text NOT NULL,
	"iucn_status" text NOT NULL,
	"iucn_source_url" text NOT NULL,
	"iucn_assessed_year" integer NOT NULL,
	"summary" text NOT NULL,
	"weird_bit" text NOT NULL,
	"sources" jsonb NOT NULL,
	"image_url" text,
	"image_credit" text,
	CONSTRAINT "species_max_length_positive" CHECK ("species"."max_length_cm" > 0),
	CONSTRAINT "species_iucn_status_known" CHECK ("species"."iucn_status" in ('LC','NT','VU','EN','CR','DD')),
	CONSTRAINT "species_has_a_source" CHECK (jsonb_array_length("species"."sources") >= 1)
);
--> statement-breakpoint
ALTER TABLE "shark_of_the_month" ADD CONSTRAINT "shark_of_the_month_species_id_species_id_fk" FOREIGN KEY ("species_id") REFERENCES "public"."species"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "shark_of_the_month_month_key" ON "shark_of_the_month" USING btree ("month");--> statement-breakpoint
CREATE INDEX "shark_of_the_month_species_idx" ON "shark_of_the_month" USING btree ("species_id");--> statement-breakpoint
CREATE UNIQUE INDEX "species_slug_key" ON "species" USING btree ("slug");