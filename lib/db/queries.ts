// Empty queries file — all database queries go here
// Each sprint adds new query functions as features are built
// This keeps data access centralized and testable

import { db } from "./index";
import { users, products, upvotes } from "./schema";
import { eq, and, desc, sql, ilike, or, arrayContains } from "drizzle-orm";

// --- User Queries ---

export async function getUserByClerkId(clerkUserId: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .limit(1);
  return result[0] ?? null;
}

export async function getUserByUsername(username: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);
  return result[0] ?? null;
}

export async function createUser(data: {
  clerkUserId: string;
  email: string;
  username: string;
  bio?: string;
  name?: string;
  avatarUrl?: string;
}) {
  const result = await db.insert(users).values(data).returning();
  return result[0];
}

export async function updateUser(
  clerkUserId: string,
  data: {
    username?: string;
    name?: string;
    bio?: string;
    avatarUrl?: string;
    twitterHandle?: string;
    githubHandle?: string;
    websiteUrl?: string;
  }
) {
  const result = await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.clerkUserId, clerkUserId))
    .returning();
  return result[0];
}

// --- Product Queries (Sprint 2) ---

export async function createProduct(data: {
  userId: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  websiteUrl: string;
  logoUrl?: string;
  screenshots?: string[];
  categories?: string[];
  techStack?: string[];
  mrrCents?: number;
  weekNumber: number;
  weekYear: number;
  status?: "draft" | "published" | "archived";
  publishedAt?: Date;
}) {
  const result = await db.insert(products).values(data).returning();
  return result[0];
}

export async function getProductBySlug(slug: string) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return result[0] ?? null;
}

export async function getProductsByUserId(userId: string) {
  return db
    .select()
    .from(products)
    .where(eq(products.userId, userId))
    .orderBy(desc(products.createdAt));
}

export async function getProductsByWeek(weekNumber: number, weekYear: number) {
  return db
    .select()
    .from(products)
    .where(
      and(
        eq(products.weekNumber, weekNumber),
        eq(products.weekYear, weekYear),
        eq(products.status, "published")
      )
    )
    .orderBy(desc(products.upvoteCount));
}

export async function searchProducts(query?: string, category?: string) {
  let conditions = [];
  conditions.push(eq(products.status, "published"));

  if (query) {
    conditions.push(
      or(
        ilike(products.name, `%${query}%`),
        ilike(products.tagline, `%${query}%`)
      )
    );
  }

  if (category) {
    conditions.push(arrayContains(products.categories, [category]));
  }

  return db
    .select()
    .from(products)
    .where(and(...conditions))
    .orderBy(desc(products.createdAt));
}

export async function updateProduct(
  productId: string,
  data: {
    name?: string;
    tagline?: string;
    description?: string;
    websiteUrl?: string;
    logoUrl?: string;
    screenshots?: string[];
    categories?: string[];
    techStack?: string[];
    mrrCents?: number;
    status?: "draft" | "published" | "archived";
    publishedAt?: Date;
  }
) {
  const result = await db
    .update(products)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(products.id, productId))
    .returning();
  return result[0];
}

export async function hasUpvoted(userId: string, productId: string) {
  const [existing] = await db
    .select()
    .from(upvotes)
    .where(
      and(
        eq(upvotes.userId, userId),
        eq(upvotes.productId, productId)
      )
    );
  return !!existing;
}

export async function getUserUpvotes(userId: string) {
  const result = await db
    .select({ productId: upvotes.productId })
    .from(upvotes)
    .where(eq(upvotes.userId, userId));
  return result.map((row) => row.productId);
}

export async function toggleUpvote(userId: string, productId: string) {
  const upvoted = await hasUpvoted(userId, productId);

  if (upvoted) {
    // Remove upvote
    await db
      .delete(upvotes)
      .where(
        and(
          eq(upvotes.userId, userId),
          eq(upvotes.productId, productId)
        )
      );

    // Decrement count
    const [updatedProduct] = await db
      .update(products)
      .set({ upvoteCount: sql`${products.upvoteCount} - 1` })
      .where(eq(products.id, productId))
      .returning({ upvoteCount: products.upvoteCount });

    return { upvoted: false, newCount: updatedProduct.upvoteCount };
  } else {
    // Add upvote
    await db.insert(upvotes).values({ userId, productId });

    // Increment count
    const [updatedProduct] = await db
      .update(products)
      .set({ upvoteCount: sql`${products.upvoteCount} + 1` })
      .where(eq(products.id, productId))
      .returning({ upvoteCount: products.upvoteCount });

    return { upvoted: true, newCount: updatedProduct.upvoteCount };
  }
}
