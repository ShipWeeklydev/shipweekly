import { RocketIcon } from "lucide-react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <RocketIcon className="size-5" />
            </div>
            ShipWeekly
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-zinc-900 lg:flex items-center justify-center overflow-hidden">
        {/* Deep India Dark abstract background element */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-zinc-900 to-zinc-950"></div>
        <div className="relative z-10 text-center max-w-md px-8">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Ship it. Roast it. Stack it. Weekly.</h2>
          <p className="text-zinc-400 text-lg">
            Join the arena. Submit your product, climb the leaderboard, and reveal your stack to the world.
          </p>
        </div>
      </div>
    </div>
  );
}
