import { SettingsForm } from "@/components/profile/settings-form";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await getUserByClerkId(userId);

  if (!user) {
    // If they have Clerk auth but no DB record, force them to onboard
    redirect("/onboarding");
  }

  return (
    <main className="flex-1 w-full bg-background min-h-svh p-6 md:p-12 lg:p-24 flex flex-col items-center">
      <div className="w-full max-w-xl mb-8 flex flex-col gap-6">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 w-fit">
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      <SettingsForm user={user} />
    </main>
  );
}
