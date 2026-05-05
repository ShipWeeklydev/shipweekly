// ============================================
// Site-wide constants & branding
// Change these to update across the entire app
// ============================================

export const SITE = {
  name: "ShipWeekly",
  tagline: "Ship it. Roast it. Stack it. Weekly.",
  url: "https://shipweekly.dev",
  copyright: `© ${new Date().getFullYear()} ShipWeekly.`,
  description:
    "The arena for indie hackers and solo makers. Climb the leaderboard, reveal your stack, and earn your streak.",
} as const;

export const NAV = {
  home: "Home",
  discover: "Discover",
  topBuilders: "Top Builders",
  dashboard: "Dashboard",
  profile: "Profile",
  login: "Log in",
  signup: "Sign up",
  shipProduct: "Ship Product",
  shipIt: "Ship It",
  submitProduct: "Submit Your Product",
  backToLeaderboard: "Back to Leaderboard",
  visitSite: "Visit Site",
  newLaunch: "New Launch",
  signUpToLaunch: "Sign Up to Launch",
} as const;

export const FOOTER_LINKS = [
  { label: "Twitter", href: "#" },
  { label: "Guidelines", href: "#" },
  { label: "Terms", href: "#" },
] as const;
