import { AppShell } from "@/components/layout/app-shell";
import { searchProducts } from "@/lib/db/queries";
import { ShipCard } from "@/components/leaderboard/ship-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, RocketIcon } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId, getUserUpvotes } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Discover Products | ShipWeekly",
};

export default async function DiscoverPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const query = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const category = typeof searchParams.c === "string" ? searchParams.c : undefined;

  const products = await searchProducts(query, category);
  
  const { userId } = await auth();
  let upvotedIds: string[] = [];
  if (userId) {
    const user = await getUserByClerkId(userId);
    if (user) {
      upvotedIds = await getUserUpvotes(user.id);
    }
  }

  return (
    <AppShell>
      <div className="w-full pt-8 pb-16 px-4 md:px-8">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <RocketIcon className="size-5" />
            </div>
            ShipWeekly
          </div>
          <Link href="/submit">
            <Button size="sm" className="font-bold">Ship It</Button>
          </Link>
        </div>

        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold mb-2">Discover Products</h1>
          <p className="text-muted-foreground">Find the best products shipped by builders worldwide.</p>
        </div>

        <form className="flex gap-2 mb-8" action="/discover" method="get">
          <Input 
            name="q" 
            defaultValue={query} 
            placeholder="Search products by name or tagline..." 
            className="flex-1"
          />
          {category && <input type="hidden" name="c" value={category} />}
          <Button type="submit" variant="secondary" className="gap-2">
            <SearchIcon className="size-4" /> Search
          </Button>
        </form>

        {(query || category) && (
          <div className="mb-4 text-sm text-muted-foreground flex items-center gap-2">
            Showing results for 
            {query && <span className="font-bold text-foreground">"{query}"</span>}
            {query && category && " in "}
            {category && <span className="font-bold text-foreground">"{category}"</span>}
            <Link href="/discover" className="ml-auto text-primary hover:underline">Clear filters</Link>
          </div>
        )}

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-muted/20 border-dashed">
            <SearchIcon className="size-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </AppShell>
  );
}
