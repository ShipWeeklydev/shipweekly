"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface WeekSelectorProps {
  currentWeek: number;
  currentYear: number;
}

export function WeekSelector({ currentWeek, currentYear }: WeekSelectorProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const queryWeek = searchParams.get("w");
  const queryYear = searchParams.get("y");

  const displayWeek = queryWeek ? parseInt(queryWeek) : currentWeek;
  const displayYear = queryYear ? parseInt(queryYear) : currentYear;

  // Simple logic to handle previous/next week boundaries (ignores 52/53 week edge cases for simplicity)
  const prevWeek = displayWeek > 1 ? displayWeek - 1 : 52;
  const prevYear = displayWeek > 1 ? displayYear : displayYear - 1;

  const nextWeek = displayWeek < 52 ? displayWeek + 1 : 1;
  const nextYear = displayWeek < 52 ? displayYear : displayYear + 1;

  const isCurrentWeek = displayWeek === currentWeek && displayYear === currentYear;

  const createQueryString = (w: number, y: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("w", w.toString());
    params.set("y", y.toString());
    return params.toString();
  };

  return (
    <div className="flex items-center justify-between border-b pb-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold">
          {isCurrentWeek ? "This Week's Leaderboard" : `Leaderboard: Week ${displayWeek}`}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Week {displayWeek} • {displayYear}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link href={`${pathname}?${createQueryString(prevWeek, prevYear)}`}>
          <Button variant="outline" size="icon" className="size-8">
            <ChevronLeftIcon className="size-4" />
          </Button>
        </Link>
        <Link 
          href={`${pathname}?${createQueryString(nextWeek, nextYear)}`}
          className={isCurrentWeek ? "pointer-events-none opacity-50" : ""}
        >
          <Button variant="outline" size="icon" className="size-8" disabled={isCurrentWeek}>
            <ChevronRightIcon className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
