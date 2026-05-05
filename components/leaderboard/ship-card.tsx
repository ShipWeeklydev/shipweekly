import Link from "next/link";
import { Product } from "@/lib/db/schema";
import { UpvoteBtn } from "./upvote-btn";
import { Badge } from "@/components/ui/badge";
import { MessageSquareIcon } from "lucide-react";

interface ShipCardProps {
  product: Product;
  rank: number;
  initialHasUpvoted?: boolean;
}

export function ShipCard({ product, rank, initialHasUpvoted = false }: ShipCardProps) {
  const mrrDollars = product.mrrCents > 0
    ? `$${(product.mrrCents / 100).toLocaleString()}`
    : null;

  return (
    <div className="group flex gap-4 p-4 rounded-xl border bg-card hover:border-primary/50 hover:shadow-sm transition-all duration-300">
      {/* Rank & Logo on the left */}
      <div className="flex items-start gap-4">
        <span className="text-lg font-bold text-muted-foreground w-6 text-center mt-3 shrink-0">
          #{rank}
        </span>
        <Link href={`/products/${product.slug}`} className="shrink-0">
          {product.logoUrl ? (
            <img
              src={product.logoUrl}
              alt={product.name}
              className="size-16 rounded-xl border object-cover group-hover:scale-105 transition-transform duration-300 mt-1"
            />
          ) : (
            <div className="size-16 rounded-xl border bg-muted flex items-center justify-center text-2xl font-bold group-hover:scale-105 transition-transform duration-300 mt-1">
              {product.name[0]?.toUpperCase()}
            </div>
          )}
        </Link>
      </div>

      {/* Main Content (Center) */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Title row */}
        <div className="flex items-center gap-2 mb-1">
          <Link href={`/products/${product.slug}`} className="font-bold text-lg hover:text-primary transition-colors truncate">
            {product.name}
          </Link>
          {/* Verified Badge placeholder (Sprint 11) */}
          {/* <span title="Verified Builder" className="text-blue-500 text-sm">✅</span> */}
        </div>
        
        {/* Tagline */}
        <p className="text-sm text-foreground truncate mb-2">{product.tagline}</p>
        
        {/* Comments & Categories */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <Link href={`/products/${product.slug}#comments`} className="flex items-center gap-1 hover:text-foreground transition-colors">
            <MessageSquareIcon className="size-4" />
            <span>{product.commentCount}</span>
          </Link>
          {product.categories && product.categories.length > 0 && (
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[10px]">◇</span>
              <span className="truncate">{product.categories.join(", ")}</span>
            </div>
          )}
        </div>
        
        {/* Tech Stack & MRR */}
        <div className="flex flex-wrap gap-2">
          {product.techStack && product.techStack.length > 0 && (
            <div className="flex items-center gap-1.5 mr-2">
              <span className="text-xs">🔥</span>
              {product.techStack.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-[10px] h-5 px-1.5 font-medium">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
          {mrrDollars && (
            <Badge variant="default" className="text-[10px] h-5 px-1.5 font-bold bg-green-600 hover:bg-green-700">
              💰 {mrrDollars} MRR
            </Badge>
          )}
        </div>
      </div>

      {/* Upvotes (Right aligned) */}
      <div className="flex flex-col items-end justify-center shrink-0 pl-2">
        <UpvoteBtn 
          productId={product.id} 
          initialCount={product.upvoteCount} 
          initialHasUpvoted={initialHasUpvoted}
        />
      </div>
    </div>
  );
}
