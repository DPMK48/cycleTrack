CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"summary" text,
	"category" varchar(100),
	"language" varchar(50) DEFAULT 'English',
	"media_type" varchar(20) DEFAULT 'article',
	"media_url" text,
	"image_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cycle_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"date" date NOT NULL,
	"symptoms" jsonb,
	"mood" text,
	"flow" text,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "teas" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"benefits" jsonb,
	"ingredients" jsonb,
	"single_price" text NOT NULL,
	"bulk_price" text NOT NULL,
	"bulk_min_qty" integer DEFAULT 10,
	"image_url" text,
	"is_primary" boolean DEFAULT false,
	"category" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"cycle_length" integer DEFAULT 28,
	"period_length" integer DEFAULT 5,
	"last_period_start" date,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "cycle_entries" ADD CONSTRAINT "cycle_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;