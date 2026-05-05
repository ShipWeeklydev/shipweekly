import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/db/queries";
import { RocketIcon, HomeIcon, LayoutDashboardIcon, UserIcon, TrophyIcon, SearchIcon, Rocket } from "lucide-react";

export async function AppSidebar() {
  const { userId } = await auth();
  const user = userId ? await getUserByClerkId(userId) : null;

  return (
    <aside className="w-[240px] border-r h-[calc(100svh-4rem)] md:h-svh sticky top-0 md:top-0 hidden md:flex flex-col bg-background/95 backdrop-blur z-30">
      <div className="p-4 border-b h-16 flex items-center shrink-0">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <RocketIcon className="size-5" />
          </div>
          ShipWeekly
        </Link>
      </div>

      <div className="px-4 py-2 mt-2">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <form action="/discover" method="get">
            <input 
              name="q"
              placeholder="Search..." 
              className="w-full bg-muted/50 border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </form>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 flex flex-col gap-1 overflow-y-auto">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start gap-3 h-9">
            <HomeIcon className="size-4" /> Home
          </Button>
        </Link>
        <Link href="/discover">
          <Button variant="ghost" className="w-full justify-start gap-3 h-9">
            <SearchIcon className="size-4" /> Products
          </Button>
        </Link>

        {/* Auth Required Links */}
        {user && (
          <>
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-3 h-9">
                <LayoutDashboardIcon className="size-4" /> Dashboard
              </Button>
            </Link>
            <Link href={`/builders/${user.username}`}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-9">
                <UserIcon className="size-4" /> Profile
              </Button>
            </Link>
          </>
        )}
      </nav>

      <div className="p-4 border-t flex flex-col gap-3 shrink-0">
        <Link href="/submit">
          <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
            <Rocket className="size-4" /> {user ? "New Launch" : "Sign Up to Launch"}
          </Button>
        </Link>

        {user ? (
          <div className="flex flex-col gap-1 mt-2 border-t pt-3">
            <Link href="/dashboard/analytics">
              <Button variant="ghost" className="w-full justify-start h-8 text-sm text-muted-foreground">
                Analytics
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start h-8 text-sm text-muted-foreground">
                Settings
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="w-full justify-start h-8 text-sm text-muted-foreground">
                Pricing
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <Link href="/login">
              <Button variant="outline" className="w-full">Log in</Button>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
