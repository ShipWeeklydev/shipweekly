import { getProductBySlug } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ExternalLinkIcon, CalendarIcon, TriangleIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/layout/app-shell";
import { PRODUCT_PAGE } from "@/data/product-page";
import { NAV } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: PRODUCT_PAGE.metaNotFound };

  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const mrrDollars = product.mrrCents > 0
    ? `$${(product.mrrCents / 100).toLocaleString()}`
    : null;

  return (
    <AppShell>
      <div className="w-full pt-8 pb-16 px-4 md:px-8">
        {/* Back nav */}
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 w-fit mb-8 transition-colors">
          <ArrowLeftIcon className="size-4" /> {NAV.backToLeaderboard}
        </Link>

        {/* Two-column: main content + product meta sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── LEFT / CENTER ── main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            {/* Product Hero */}
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {product.logoUrl && (
                <img
                  src={product.logoUrl}
                  alt={product.name}
                  className="size-20 rounded-xl border object-cover shrink-0"
                />
              )}
              <div className="flex flex-col gap-2 flex-1">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-lg text-muted-foreground">{product.tagline}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.categories?.map((cat) => (
                    <Badge key={cat} variant="secondary">{cat}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Screenshots */}
            {product.screenshots && product.screenshots.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">
                  {PRODUCT_PAGE.sections.screenshots}
                </h2>
                <div className="flex overflow-x-auto gap-4 pb-4 snap-x no-scrollbar">
                  {product.screenshots.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`${product.name} screenshot ${idx + 1}`}
                      className="w-[85%] sm:w-[65%] shrink-0 rounded-xl border object-cover snap-center shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* About */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">
                  {PRODUCT_PAGE.sections.about}
                </h2>
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Roast placeholder */}
            <div id="roasts" className="border border-dashed rounded-xl p-8 text-center">
              <p className="text-muted-foreground text-sm">🔥 Roast Mode — coming in Sprint 5</p>
            </div>

            {/* Comments placeholder */}
            <div id="comments" className="border border-dashed rounded-xl p-8 text-center">
              <p className="text-muted-foreground text-sm">💬 Comments — coming in Sprint 12</p>
            </div>
          </div>

          {/* ── RIGHT ── product meta sidebar */}
          <div className="w-full lg:w-[240px] shrink-0 flex flex-col gap-4">
            {/* Visit Site */}
            <a href={product.websiteUrl} target="_blank" rel="noreferrer" className="w-full">
              <Button className="w-full gap-2">
                <ExternalLinkIcon className="size-4" /> {NAV.visitSite}
              </Button>
            </a>

            {/* Stack Reveal */}
            {product.techStack && product.techStack.length > 0 && (
              <Card>
                <CardContent className="pt-5 pb-4">
                  <h3 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">
                    {PRODUCT_PAGE.sections.stackReveal}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* MRR Badge */}
            {mrrDollars && (
              <Card>
                <CardContent className="pt-5 pb-4">
                  <h3 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-2">MRR</h3>
                  <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
                    💰 {mrrDollars}/mo
                  </Badge>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <Card>
              <CardContent className="pt-5 pb-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <TriangleIcon className="size-4 text-primary fill-primary" />
                  <span className="font-semibold">{product.upvoteCount}</span>
                  <span className="text-muted-foreground">upvotes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="size-4" />
                  <span>Week {product.weekNumber}, {product.weekYear}</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
