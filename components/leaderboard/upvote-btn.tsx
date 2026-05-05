"use client";

import { Button } from "@/components/ui/button";
import { ChevronUpIcon } from "lucide-react";
import { useTransition, useState } from "react";
import { toggleUpvoteAction } from "@/lib/actions/upvote";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface UpvoteBtnProps {
  productId: string;
  initialCount: number;
  initialHasUpvoted?: boolean;
}

export function UpvoteBtn({ productId, initialCount, initialHasUpvoted = false }: UpvoteBtnProps) {
  const [isPending, startTransition] = useTransition();
  const [hasUpvoted, setHasUpvoted] = useState(initialHasUpvoted);
  const [count, setCount] = useState(initialCount);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      // Simple redirect for now (Sprint 4 calls for a modal, but redirect works flawlessly in standard Clerk flow)
      router.push("/login");
      return;
    }

    // Optimistic update
    setHasUpvoted(!hasUpvoted);
    setCount((prev) => (hasUpvoted ? prev - 1 : prev + 1));

    startTransition(async () => {
      const result = await toggleUpvoteAction(productId);
      if (!result.success) {
        // Revert optimistic update on failure
        setHasUpvoted(hasUpvoted);
        setCount(count);
      }
    });
  };

  return (
    <Button
      variant={hasUpvoted ? "default" : "outline"}
      className="flex flex-col gap-1 h-auto py-2 px-3 border-border hover:border-primary/50 transition-colors disabled:opacity-50"
      onClick={handleUpvote}
      disabled={isPending}
    >
      <ChevronUpIcon className="size-5 shrink-0" />
      <span className="text-sm font-bold">{count}</span>
    </Button>
  );
}
