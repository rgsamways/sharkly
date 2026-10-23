CREATE TABLE "facts" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"slug" text NOT NULL,
	"topic" text NOT NULL,
	"title" text NOT NULL,
	"short_answer" text,
	"verdict" text,
	"body" text NOT NULL,
	"sources" jsonb NOT NULL,
	CONSTRAINT "facts_topic_known" CHECK ("facts"."topic" in ('senses','anatomy','babies','history','records','myths')),
	CONSTRAINT "facts_has_a_source" CHECK (jsonb_array_length("facts"."sources") >= 1),
	CONSTRAINT "facts_myth_shape" CHECK (("facts"."topic" = 'myths' and "facts"."verdict" in ('true','false','partly') and "facts"."short_answer" is not null) or ("facts"."topic" <> 'myths' and "facts"."verdict" is null and "facts"."short_answer" is null))
);
--> statement-breakpoint
CREATE UNIQUE INDEX "facts_slug_key" ON "facts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "facts_topic_idx" ON "facts" USING btree ("topic");