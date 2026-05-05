"use server";

import { z } from "zod";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createUser, getUserByUsername, getUserByClerkId, updateUser } from "@/lib/db/queries";
import { redirect } from "next/navigation";

// Zod schema for onboarding validation
const onboardingSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .transform((val) => val.toLowerCase()),
  bio: z.string().max(160, "Bio must be 160 characters or less").optional(),
});

export async function completeOnboarding(formData: FormData) {
  // 1. Verify Clerk auth
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Not authenticated with Clerk." };
  }

  // 2. Prevent duplicate onboarding
  const existingUser = await getUserByClerkId(userId);
  if (existingUser) {
    redirect("/dashboard");
  }

  // 3. Validate form input
  const validatedFields = onboardingSchema.safeParse({
    username: formData.get("username"),
    bio: formData.get("bio"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, bio } = validatedFields.data;

  // 4. Check if username is taken
  const usernameTaken = await getUserByUsername(username);
  if (usernameTaken) {
    return {
      success: false,
      error: { username: ["This username is already taken."] },
    };
  }

  // 5. Get full user details from Clerk (for email and avatar)
  const user = await currentUser();
  if (!user) {
    return { success: false, error: "Could not fetch user details from Clerk." };
  }

  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!primaryEmail) {
    return { success: false, error: "No primary email found on Clerk account." };
  }

  // 6. Create user in Neon Postgres
  try {
    await createUser({
      clerkUserId: userId,
      email: primaryEmail,
      username: username,
      bio: bio,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || undefined,
      avatarUrl: user.imageUrl,
    });
  } catch (error) {
    console.error("Failed to create user in DB:", error);
    return { success: false, error: "Database error. Please try again." };
  }

  // 7. Success! Redirect to dashboard
  redirect("/dashboard");
}

// Zod schema for profile update validation
const profileSchema = z.object({
  name: z.string().max(50, "Name must be less than 50 characters").optional(),
  bio: z.string().max(160, "Bio must be 160 characters or less").optional(),
  twitterHandle: z.string().max(30).optional(),
  githubHandle: z.string().max(30).optional(),
  websiteUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export async function updateProfile(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Not authenticated with Clerk." };
  }

  const validatedFields = profileSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio"),
    twitterHandle: formData.get("twitterHandle")?.toString().replace("@", ""),
    githubHandle: formData.get("githubHandle")?.toString().replace("@", ""),
    websiteUrl: formData.get("websiteUrl"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  try {
    await updateUser(userId, {
      name: data.name || undefined,
      bio: data.bio || undefined,
      twitterHandle: data.twitterHandle || undefined,
      githubHandle: data.githubHandle || undefined,
      websiteUrl: data.websiteUrl || undefined,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Database error. Please try again." };
  }
}
