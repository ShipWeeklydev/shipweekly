import { pgTable, text, boolean, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

// ============================================
// Sprint 0 — Users table
// Sprint 2 — Products table
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

export const products = pgTable("products", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  // Owner
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  // Core fields
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  websiteUrl: text("website_url").notNull(),
  // Media
  logoUrl: text("logo_url"),
  screenshots: text("screenshots").array(),
  // Categorization
  categories: text("categories").array(),
  techStack: text("tech_stack").array(),
  // Revenue
  mrrCents: integer("mrr_cents").notNull().default(0),
  // Weekly leaderboard
  weekNumber: integer("week_number").notNull(),
  weekYear: integer("week_year").notNull(),
  upvoteCount: integer("upvote_count").notNull().default(0),
  commentCount: integer("comment_count").notNull().default(0),
  // Status
  status: text("status", { enum: ["draft", "published", "archived"] })
    .notNull()
    .default("draft"),
  // Timestamps
  publishedAt: timestamp("published_at", { withTimezone: true }),
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
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const upvotes = pgTable(
  "upvotes",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    productId: text("product_id")
      .notNull()
      .references(() => products.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.productId] }),
  })
);

export type Upvote = typeof upvotes.$inferSelect;
export type NewUpvote = typeof upvotes.$inferInsert;
