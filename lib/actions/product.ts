"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId, createProduct, getProductBySlug, updateProduct } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import { getWeekNumber } from "@/lib/utils";

// --- Helpers ---

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// --- Validation ---

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  tagline: z.string().min(5, "Tagline must be at least 5 characters").max(120),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000),
  websiteUrl: z.string().url("Must be a valid URL"),
  logoUrl: z.string().url().optional().or(z.literal("")),
  categories: z.string().optional(),
  techStack: z.string().optional(),
  mrrCents: z.coerce.number().min(0).default(0),
});

// --- Submit Product ---

export async function submitProduct(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return { success: false, error: "Not authenticated." };
  }

  const user = await getUserByClerkId(clerkId);
  if (!user) {
    return { success: false, error: "Complete onboarding first." };
  }

  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    websiteUrl: formData.get("websiteUrl"),
    logoUrl: formData.get("logoUrl"),
    categories: formData.get("categories"),
    techStack: formData.get("techStack"),
    mrrCents: formData.get("mrrCents"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;
  
  let parsedScreenshots: string[] = [];
  try {
    const rawScreenshots = formData.get("screenshots");
    if (rawScreenshots && typeof rawScreenshots === "string") {
      parsedScreenshots = JSON.parse(rawScreenshots);
    }
  } catch (e) {
    // Ignore parsing errors
  }

  // Generate unique slug
  let slug = slugify(data.name);
  const existingProduct = await getProductBySlug(slug);
  if (existingProduct) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  // Parse comma-separated strings into arrays
  const categories = data.categories
    ? data.categories.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const techStack = data.techStack
    ? data.techStack.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  // Auto-assign current week
  const now = new Date();
  const weekNumber = getWeekNumber(now);
  const weekYear = now.getFullYear();

  try {
    const product = await createProduct({
      userId: user.id,
      name: data.name,
      slug,
      tagline: data.tagline,
      description: data.description,
      websiteUrl: data.websiteUrl,
      logoUrl: data.logoUrl || undefined,
      screenshots: parsedScreenshots,
      categories,
      techStack,
      mrrCents: data.mrrCents,
      weekNumber,
      weekYear,
      status: "published",
      publishedAt: now,
    });

    redirect(`/products/${product.slug}`);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") throw error;
    console.error("Failed to create product:", error);
    return { success: false, error: "Database error. Please try again." };
  }
}

// --- Edit Product ---

const editSchema = productSchema.extend({
  productId: z.string().min(1),
});

export async function editProduct(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return { success: false, error: "Not authenticated." };
  }

  const user = await getUserByClerkId(clerkId);
  if (!user) {
    return { success: false, error: "Complete onboarding first." };
  }

  const validatedFields = editSchema.safeParse({
    productId: formData.get("productId"),
    name: formData.get("name"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    websiteUrl: formData.get("websiteUrl"),
    logoUrl: formData.get("logoUrl"),
    categories: formData.get("categories"),
    techStack: formData.get("techStack"),
    mrrCents: formData.get("mrrCents"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const categories = data.categories
    ? data.categories.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const techStack = data.techStack
    ? data.techStack.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  let parsedScreenshots: string[] = [];
  try {
    const rawScreenshots = formData.get("screenshots");
    if (rawScreenshots && typeof rawScreenshots === "string") {
      parsedScreenshots = JSON.parse(rawScreenshots);
    }
  } catch (e) {
    // Ignore parsing errors
  }

  try {
    const product = await updateProduct(data.productId, {
      name: data.name,
      tagline: data.tagline,
      description: data.description,
      websiteUrl: data.websiteUrl,
      logoUrl: data.logoUrl || undefined,
      screenshots: parsedScreenshots,
      categories,
      techStack,
      mrrCents: data.mrrCents,
    });

    if (!product) {
      return { success: false, error: "Product not found." };
    }

    redirect(`/products/${product.slug}`);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") throw error;
    console.error("Failed to update product:", error);
    return { success: false, error: "Database error. Please try again." };
  }
}
