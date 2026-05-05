import { Button } from "@/components/ui/button";
import { RocketIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-svh w-full bg-background">
      {/* Navbar Placeholder */}
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <RocketIcon className="size-5" />
            </div>
            ShipWeekly
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full container mx-auto px-4 py-16 flex flex-col items-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center max-w-3xl gap-6 mb-16 mt-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
            Ship it. Roast it. <br />
            <span className="text-primary">Stack it. Weekly.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            The arena for indie hackers, SaaS founders, and solo makers. Submit your product, climb the weekly leaderboard, and reveal your stack to the world.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Link href="/signup">
              <Button size="lg" className="text-base h-12 px-8">Submit Your Product</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-base h-12 px-8">Explore Leaderboard</Button>
            </Link>
          </div>
        </div>

        {/* Leaderboard Placeholder */}
        <div className="w-full max-w-5xl flex flex-col gap-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-3xl font-bold">This Week's Leaderboard</h2>
              <p className="text-muted-foreground mt-1">Week 18 • May 2026</p>
            </div>
          </div>
          
          <div className="p-16 border border-dashed rounded-2xl flex flex-col items-center justify-center text-center bg-muted/20">
            <RocketIcon className="size-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">No products shipped yet this week!</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Be the first to launch and secure the top spot on the leaderboard.
            </p>
            <Link href="/signup">
              <Button>Ship Your Product Now</Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Placeholder */}
      <footer className="w-full border-t py-8 mt-16 text-center text-muted-foreground text-sm">
        <p>© 2026 ShipWeekly. All rights reserved.</p>
      </footer>
    </div>
  );
}
