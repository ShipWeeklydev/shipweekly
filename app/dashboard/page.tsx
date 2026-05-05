import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId, getProductsByUserId } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { RocketIcon, PencilIcon } from "lucide-react";
import { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const user = await getUserByClerkId(userId);
  if (!user) redirect("/onboarding");

  const products = await getProductsByUserId(user.id);

  return (
    <AppShell noRightSidebar>
      <div className="w-full pt-8 pb-16 px-4 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, <span className="text-primary font-semibold">@{user.username}</span></p>
          </div>
          <Link href="/submit">
            <Button className="gap-2">
              <RocketIcon className="size-4" /> New Launch
            </Button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Upvotes</p>
              <p className="text-2xl font-bold">
                {products.reduce((sum, p) => sum + (p.upvoteCount ?? 0), 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Ship Streak</p>
              <p className="text-2xl font-bold">🔥 {user.shipStreak ?? 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Ships</p>
              <p className="text-2xl font-bold">{user.totalShips ?? 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* Products List */}
        {products.length === 0 ? (
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
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Your Products ({products.length})</h2>
            {products.map((product) => (
              <Card key={product.id} className="hover:border-primary/40 transition-colors">
                <CardContent className="flex items-center gap-4 py-4">
                  {product.logoUrl ? (
                    <img src={product.logoUrl} alt={product.name} className="size-12 rounded-lg border object-cover shrink-0" />
                  ) : (
                    <div className="size-12 rounded-lg border bg-muted flex items-center justify-center font-bold text-lg shrink-0">
                      {product.name[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${product.slug}`} className="font-semibold hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground truncate">{product.tagline}</p>
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      <Badge variant="secondary" className="text-xs">Week {product.weekNumber}</Badge>
                      <Badge variant="outline" className="text-xs">▲ {product.upvoteCount}</Badge>
                      {product.status === "draft" && <Badge variant="destructive" className="text-xs">Draft</Badge>}
                    </div>
                  </div>
                  <Link href={`/dashboard/products/${product.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-2 shrink-0">
                      <PencilIcon className="size-3" /> Edit
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
