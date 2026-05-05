import { AppShell } from "@/components/layout/app-shell";
import { Leaderboard } from "@/components/leaderboard/leaderboard";
import { WeekSelector } from "@/components/leaderboard/week-selector";
import { getWeekNumber } from "@/lib/utils";
import { RocketIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HERO } from "@/data/hero";
import { SITE, NAV } from "@/data/site";

export default async function HomePage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  
  const now = new Date();
  const currentWeek = getWeekNumber(now);
  const currentYear = now.getFullYear();

  const queryWeek = typeof searchParams.w === 'string' ? parseInt(searchParams.w) : currentWeek;
  const queryYear = typeof searchParams.y === 'string' ? parseInt(searchParams.y) : currentYear;

  return (
    <AppShell>
      <div className="w-full pt-8 pb-16 px-4 md:px-8">
        
        {/* Mobile Header (Hidden on Desktop because of AppSidebar) */}
        <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <RocketIcon className="size-5" />
            </div>
            {SITE.name}
          </div>
          <Link href="/submit">
            <Button size="sm" className="font-bold">{NAV.shipIt}</Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 mt-4 md:mt-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            {HERO.headlinePart1} <br />
            <span className="text-primary">{HERO.headlinePart2}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            {HERO.subtitle}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Link href="/submit">
              <Button size="lg" className="text-base font-bold shadow-md shadow-primary/20">
                {HERO.ctaPrimary}
              </Button>
            </Link>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="w-full flex flex-col mt-12">
          <WeekSelector currentWeek={currentWeek} currentYear={currentYear} />
          
          <Leaderboard weekNumber={queryWeek} weekYear={queryYear} />
        </div>

      </div>
    </AppShell>
  );
}
