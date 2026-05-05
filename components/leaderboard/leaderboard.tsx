import { getProductsByWeek, getUserUpvotes, getUserByClerkId } from "@/lib/db/queries";
import { ShipCard } from "./ship-card";
import { RocketIcon } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { EMPTY_STATES } from "@/data/empty-states";

interface LeaderboardProps {
  weekNumber: number;
  weekYear: number;
}

export async function Leaderboard({ weekNumber, weekYear }: LeaderboardProps) {
  const products = await getProductsByWeek(weekNumber, weekYear);
  const { userId } = await auth();
  
  let upvotedIds: string[] = [];
  if (userId) {
    const user = await getUserByClerkId(userId);
    if (user) {
      upvotedIds = await getUserUpvotes(user.id);
    }
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-muted/20 border-dashed">
        <RocketIcon className="size-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-xl font-bold mb-2">{EMPTY_STATES.leaderboard.title}</h3>
        <p className="text-muted-foreground max-w-sm">
          {EMPTY_STATES.leaderboard.description(weekNumber, weekYear)}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {products.map((product, idx) => (
        <ShipCard 
          key={product.id} 
          product={product} 
          rank={idx + 1} 
          initialHasUpvoted={upvotedIds.includes(product.id)}
        />
      ))}
    </div>
  );
}
