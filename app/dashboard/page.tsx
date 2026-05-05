import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RocketIcon, SettingsIcon, UserIcon } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await getUserByClerkId(userId);

  if (!user) {
    // Failsafe: if somehow they bypassed onboarding
    redirect("/onboarding");
  }

  return (
    <div className="flex flex-col min-h-svh w-full bg-background">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <RocketIcon className="size-5" />
            </div>
            ShipWeekly
          </Link>
          <div className="flex items-center gap-4">
            <Link href={`/builders/${user.username}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <UserIcon className="size-4" /> Profile
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="gap-2">
                <SettingsIcon className="size-4" /> Settings
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, @{user.username}</p>
          </div>
          <Link href="/submit">
            <Button className="gap-2">
              <RocketIcon className="size-4" />
              Submit Product
            </Button>
          </Link>
        </div>

        <div className="p-12 border border-dashed rounded-2xl flex flex-col items-center justify-center text-center bg-muted/20">
          <RocketIcon className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold mb-2">You haven't shipped anything yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Launch your first product to start your builder streak and climb the leaderboard.
          </p>
          <Link href="/submit">
            <Button>Start Your First Submission</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
