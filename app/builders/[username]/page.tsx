import { getUserByUsername } from "@/lib/db/queries";
import { BuilderProfile } from "@/components/profile/builder-profile";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return { title: "Builder Not Found" };
  }

  return {
    title: `${user.name || user.username} (@${user.username})`,
    description: user.bio || `Check out ${user.username}'s shipped products on ShipWeekly.`,
  };
}

export default async function BuilderPage({ params }: Props) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <main className="flex-1 w-full bg-background min-h-svh flex flex-col items-center">
      <div className="w-full max-w-3xl px-6 pt-12 flex flex-col gap-6">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 w-fit">
          <ArrowLeftIcon className="size-4" /> Back to Leaderboard
        </Link>
      </div>
      <BuilderProfile user={user} />
    </main>
  );
}
