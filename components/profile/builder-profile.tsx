import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/db/schema";
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

export function BuilderProfile({ user }: { user: User }) {
  // Use a fallback initial for the avatar
  const initial = user.name ? user.name.charAt(0).toUpperCase() : user.username?.charAt(0).toUpperCase() || "?";

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <Avatar className="size-24 border-4 border-background shadow-md">
          <AvatarImage src={user.avatarUrl || ""} alt={user.username || "Builder"} />
          <AvatarFallback className="text-3xl bg-primary/10 text-primary">{initial}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{user.name || user.username}</h1>
            {user.tier === "builder_pass" && (
              <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-none">
                Builder Pass
              </Badge>
            )}
          </div>
          <p className="text-lg text-muted-foreground font-medium">@{user.username}</p>
          
          {user.bio && (
            <p className="text-base text-foreground mt-2 max-w-xl leading-relaxed">
              {user.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            {user.twitterHandle && (
              <a 
                href={`https://twitter.com/${user.twitterHandle}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <TwitterLogoIcon className="size-4" />
                <span>@{user.twitterHandle}</span>
              </a>
            )}
            {user.websiteUrl && (
              <a 
                href={user.websiteUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <LinkIcon className="size-4" />
                <span>{new URL(user.websiteUrl).hostname}</span>
              </a>
            )}
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="size-4" />
              <span>Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="flex flex-col gap-1 p-4 rounded-xl border bg-card">
          <span className="text-sm text-muted-foreground font-medium">Products Shipped</span>
          <span className="text-2xl font-bold">{user.totalShips}</span>
        </div>
        <div className="flex flex-col gap-1 p-4 rounded-xl border bg-card">
          <span className="text-sm text-muted-foreground font-medium">Ship Streak 🔥</span>
          <span className="text-2xl font-bold text-primary">{user.shipStreak} wks</span>
        </div>
        <div className="flex flex-col gap-1 p-4 rounded-xl border bg-card">
          <span className="text-sm text-muted-foreground font-medium">Upvotes Received</span>
          <span className="text-2xl font-bold">0</span> {/* Will implement in Sprint 4 */}
        </div>
      </div>

      {/* Products Section placeholder (Sprint 2) */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Shipped Products</h2>
        <div className="p-12 border border-dashed rounded-xl flex flex-col items-center justify-center text-center bg-muted/30">
          <p className="text-muted-foreground">This builder hasn&apos;t shipped anything yet.</p>
        </div>
      </div>
    </div>
  );
}
