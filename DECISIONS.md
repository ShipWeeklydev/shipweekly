# DECISIONS.md — ShipWeekly.dev Architecture Decision Record

> Every significant technical, design, or business decision is logged here with rationale. When any coding agent asks "why did you choose X?" — point them here.

---

## Decision Format

```
### DEC-XXX: [Title]
- Date: YYYY-MM-DD
- Status: Accepted / Superseded / Deprecated
- Context: Why this decision was needed
- Decision: What was decided
- Alternatives Considered: What else was evaluated
- Rationale: Why this option won
- Consequences: What this means going forward
```

---

## Decisions

### DEC-001: Use Next.js 15 with App Router
- Date: 2026-05-04
- Status: Accepted
- Context: Need a framework that supports SSR/SSG for SEO, server components for performance, and API routes for backend logic — all in one.
- Decision: Next.js 15 with App Router and TypeScript
- Alternatives Considered: Remix, Nuxt, Astro, SvelteKit
- Rationale: Best SSR/SSG support, native Vercel deployment, largest ecosystem, server components reduce client bundle, App Router is the stable future of Next.js.
- Consequences: Locked into React ecosystem. Must understand server vs client component boundary.

### DEC-002: Use Clerk instead of NextAuth for authentication
- Date: 2026-05-04
- Status: Accepted (supersedes original NextAuth choice)
- Context: Need OAuth authentication (GitHub + Google) with session management, user profiles, and middleware route protection.
- Decision: Clerk
- Alternatives Considered: NextAuth v5 (Auth.js), Supabase Auth, Lucia Auth
- Rationale:
  - Pre-built UI components (<SignIn />, <SignUp />, <UserProfile />) save weeks of development
  - Native Next.js App Router integration with clerkMiddleware()
  - 50,000 free monthly retained users — more than enough for 0-10k stage
  - Built-in user management dashboard (no need to build admin user panel)
  - Handles MFA, email verification, device tracking automatically
  - auth() and currentUser() helpers work in server components, route handlers, and server actions
  - No need to manage sessions table, accounts table, or Drizzle adapter for auth
- Consequences:
  - Removes need for NextAuth Drizzle adapter, sessions table, accounts table
  - Users table still needed for ShipWeekly-specific data (username, bio, streak, etc.)
  - Users table links to Clerk via clerk_user_id column
  - Clerk manages the OAuth flow entirely — no callback routes needed
  - Free tier covers Stage 1 and most of Stage 2

### DEC-003: Use Dodo Payments instead of Razorpay
- Date: 2026-05-04
- Status: Accepted (supersedes original Razorpay choice)
- Context: Need payment processing for Builder Pass subscriptions ($5/mo) and Launch Boost one-time payments ($19).
- Decision: Dodo Payments
- Alternatives Considered: Razorpay, Stripe, Lemon Squeezy, Paddle
- Rationale:
  - Merchant of Record (MoR) — handles tax compliance, GST/VAT across 150+ countries automatically
  - Supports UPI and local Indian payment methods (covers India-first audience)
  - Supports 80+ currencies and 30+ payment methods globally
  - Built-in subscription management (perfect for Builder Pass recurring billing)
  - Next.js adaptor and webhook support out of the box
  - No need to handle tax calculations, compliance, or fraud prevention ourselves
  - 4% + 40¢ per transaction — competitive for a solo builder
  - Customer portal for self-service subscription management
- Consequences:
  - Higher per-transaction fee than Razorpay (4%+40¢ vs ~2%)
  - But eliminates need to handle GST/VAT compliance ourselves — worth the trade-off
  - Payments table schema changes: dodo_payment_id replaces razorpay fields
  - Webhook endpoint changes to /api/webhooks/dodo

### DEC-004: Use Neon Postgres for database
- Date: 2026-05-04
- Status: Accepted
- Context: Need a reliable, serverless-compatible PostgreSQL database with a free tier.
- Decision: Neon Postgres (free tier, serverless)
- Alternatives Considered: Supabase Postgres, PlanetScale, Turso, Railway Postgres
- Rationale: Serverless with scale-to-zero, generous free tier, native connection pooling (PgBouncer), database branching for preview deployments, read replicas at Stage 3.
- Consequences: Must use @neondatabase/serverless driver. Connection pooling URL vs direct URL for different use cases.

### DEC-005: Use Drizzle ORM over Prisma
- Date: 2026-05-04
- Status: Accepted
- Context: Need a type-safe ORM for PostgreSQL that's lightweight and fast.
- Decision: Drizzle ORM with drizzle-kit
- Alternatives Considered: Prisma, Knex, raw SQL
- Rationale: Lighter than Prisma (no engine binary), SQL-like syntax, better serverless performance, drizzle-kit for migrations.
- Consequences: Less community resources than Prisma. Must define schema in TypeScript (not schema.prisma).

### DEC-006: Weekly cycle instead of daily
- Date: 2026-05-04
- Status: Accepted
- Context: Many platforms reset daily. Need to decide ShipWeekly's cycle.
- Decision: Weekly (7-day) leaderboard cycle, Monday to Sunday
- Rationale: Products get 7x more visibility than a 24hr window. Weekly cadence matches indie hacker shipping rhythm. Less pressure on builders. Creates anticipation for "Monday reset."
- Consequences: Only ~52 launch events per year instead of 365. Must design retention features (newsletter, discussions) for mid-week engagement.

### DEC-007: Builder Pass subscription + Launch Boost one-time (monetization model)
- Date: 2026-05-04
- Status: Accepted (supersedes original Pro/Pro+ one-time model)
- Context: Original $7/$15 one-time pricing had no recurring revenue. A platform showing MRR badges should have its own MRR.
- Decision: Builder Pass at $5/month + Launch Boost at $19 one-time
- Rationale: Subscription provides predictable MRR. $5/mo is low enough for indie hackers. Launch Boost is a premium one-time for high-value SEO features. Both tiers provide clear value.
- Consequences: Need subscription billing (Dodo Payments handles this). Need subscription status checks in middleware/queries.

### DEC-008: Vercel for deployment
- Date: 2026-05-04
- Status: Accepted
- Context: Need hosting for Next.js app with auto-deploy, edge functions, and cron jobs.
- Decision: Vercel (free tier → Pro)
- Alternatives Considered: Railway, Render, Cloudflare Pages, self-hosted
- Rationale: Native Next.js support, auto-deploy from GitHub, edge network, cron jobs, image optimization, analytics — all built in.
- Consequences: Vendor lock-in to Vercel. Free tier has limits on serverless function execution time.

### DEC-009: Group feature-specific UI components by domain
- Date: 2026-05-05
- Status: Accepted
- Context: The `components/` folder was getting cluttered with feature-specific forms (like `settings-form.tsx`) alongside generic UI elements (like shadcn buttons).
- Decision: Group feature components into subfolders (e.g., `components/auth/`, `components/profile/`) while keeping shadcn primitives in `components/ui/`.
- Rationale: Better discoverability. Prevents the root components directory from becoming a massive dumping ground as the app scales.
- Consequences: Import paths for these components must include the domain folder (e.g., `@/components/auth/auth-layout`).

---

## Pending Decisions

| ID | Question | Blocking Sprint | Notes |
|---|---|---|---|
| — | — | — | — |

---

> Add a new decision entry every time you:
> - Choose a library or service
> - Change an architectural pattern
> - Decide between two approaches
> - Override a previous decision (mark old one as "Superseded")
