import { pgTable, serial, text, integer, date, timestamp, boolean, jsonb, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  cycleLength: integer("cycle_length").default(28),
  periodLength: integer("period_length").default(5),
  lastPeriodStart: date("last_period_start"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cycleEntries = pgTable("cycle_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  date: date("date").notNull(),
  symptoms: jsonb("symptoms").$type<string[]>(),
  mood: text("mood"),
  flow: text("flow"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const teas = pgTable("teas", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  benefits: jsonb("benefits").$type<string[]>(),
  ingredients: jsonb("ingredients").$type<string[]>(),
  singlePrice: text("single_price").notNull(),
  bulkPrice: text("bulk_price").notNull(),
  bulkMinQty: integer("bulk_min_qty").default(10),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  isPrimary: boolean("is_primary").default(false),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
  category: varchar("category", { length: 100 }),
  language: varchar("language", { length: 50 }).default("English"),
  mediaType: varchar("media_type", { length: 20 }).default("article"),
  mediaUrl: text("media_url"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});
