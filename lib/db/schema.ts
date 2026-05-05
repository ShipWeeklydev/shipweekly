import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

// ============================================
// Sprint 0 — Users table only
// New tables are added per sprint via migrations
// ============================================

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text("email").notNull().unique(),
  username: text("username").unique(),
  name: text("name"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  twitterHandle: text("twitter_handle"),
  githubHandle: text("github_handle"),
  websiteUrl: text("website_url"),
  tier: text("tier", { enum: ["free", "builder_pass", "launch_boost"] })
    .notNull()
    .default("free"),
  isAdmin: boolean("is_admin").notNull().default(false),
  shipStreak: text("ship_streak").notNull().default("0"),
  totalShips: text("total_ships").notNull().default("0"),
  lastShipWeek: text("last_ship_week"),
  lastShipYear: text("last_ship_year"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Type exports for use across the app
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
