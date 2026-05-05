import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function RightSidebar() {
  return (
    <aside className="w-[320px] hidden xl:flex flex-col gap-6 sticky top-0 h-svh overflow-y-auto p-6 border-l bg-background/95 backdrop-blur z-30 no-scrollbar">
      
      {/* Featured Product Placeholder (Sprint 10+) */}
      <div className="flex flex-col gap-3 p-5 border rounded-xl bg-muted/30 shadow-sm relative overflow-hidden group border-primary/20">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-primary tracking-wider">PROMOTED</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary">S</div>
          <div>
            <h4 className="font-bold text-sm">ShipWeekly Boost</h4>
            <p className="text-xs text-muted-foreground">Boost your launch</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full text-xs h-7 mt-1 border-primary/50 hover:bg-primary hover:text-primary-foreground">
          Advertise Here
        </Button>
      </div>

      {/* Last Week's Best Placeholder */}
      <div className="flex flex-col gap-3 p-5 border rounded-xl bg-card shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm text-muted-foreground tracking-wider">🏆 LAST WEEK'S BEST</h3>
        </div>
        <div className="flex flex-col gap-3 mt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="size-8 rounded-md bg-muted flex items-center justify-center font-bold text-xs">
                P{i}
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <span className="font-semibold text-sm truncate">Product {i}</span>
              </div>
              <span className="text-xs font-bold w-12 text-right">
                {i === 1 ? "🥇" : i === 2 ? "🥈" : "🥉"} {150 - i * 30}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <NewsletterForm />

      {/* Top Builders Placeholder */}
      <div className="flex flex-col gap-3 p-5 border rounded-xl bg-card shadow-sm">
        <h3 className="font-semibold text-sm text-muted-foreground tracking-wider">🔥 TOP BUILDERS</h3>
        <div className="flex flex-col gap-3 mt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                U{i}
              </div>
              <div className="flex-1 flex flex-col">
                <span className="font-semibold text-sm">Builder {i}</span>
                <span className="text-xs text-muted-foreground">🔥 {4 - i} streak</span>
              </div>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">View</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Stacks Placeholder */}
      <div className="flex flex-col gap-3 p-5 border rounded-xl bg-card shadow-sm">
        <h3 className="font-semibold text-sm text-muted-foreground tracking-wider">📊 TRENDING STACKS</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="secondary">Supabase</Badge>
          <Badge variant="secondary">Neon</Badge>
          <Badge variant="secondary">Clerk</Badge>
          <Badge variant="secondary">Vercel</Badge>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-auto pt-4 text-center pb-8">
        <p className="text-xs text-muted-foreground">© 2026 ShipWeekly.</p>
        <div className="flex gap-2 justify-center mt-2 text-xs text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          <span>·</span>
          <a href="#" className="hover:text-primary transition-colors">Guidelines</a>
          <span>·</span>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
      </div>
    </aside>
  );
}
