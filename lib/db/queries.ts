// Empty queries file — all database queries go here
// Each sprint adds new query functions as features are built
// This keeps data access centralized and testable

import { db } from "./index";
import { users } from "./schema";
import { eq } from "drizzle-orm";

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
