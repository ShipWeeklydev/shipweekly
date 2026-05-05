"use server";

import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId, toggleUpvote as toggleUpvoteDb } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";

export async function toggleUpvoteAction(productId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const user = await getUserByClerkId(userId);
  if (!user) {
    return { success: false, error: "User not found" };
  }

  try {
    const result = await toggleUpvoteDb(user.id, productId);
    
    // Milestone notifications (simulated for Sprint 4 since Resend is not configured yet)
    if (result.upvoted) {
      const milestones = [10, 50, 100];
      if (milestones.includes(result.newCount)) {
        console.log(`🎉 MILESTONE REACHED! Sending email to maker: Product ${productId} reached ${result.newCount} upvotes!`);
        // TODO: Await actual Resend email trigger here
      }
    }

    // Revalidate paths where upvotes are displayed
    revalidatePath("/");
    revalidatePath("/discover");
    revalidatePath("/products/[slug]", "page");
    
    return { success: true, upvoted: result.upvoted };
  } catch (error) {
    console.error("Upvote error:", error);
    return { success: false, error: "Failed to toggle upvote" };
  }
}
