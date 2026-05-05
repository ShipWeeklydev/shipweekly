import { AuthLayout } from "@/components/auth/auth-layout";
import { OnboardingForm } from "@/components/auth/onboarding-form";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/db/queries";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  // Prevent accessing onboarding if user already exists in DB
  const existingUser = await getUserByClerkId(userId);
  if (existingUser) {
    redirect("/dashboard");
  }

  return (
    <AuthLayout>
      <OnboardingForm />
    </AuthLayout>
  );
}
