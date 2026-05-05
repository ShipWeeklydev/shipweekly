Let's go. Full senior system design. All three stages. No code.

---

# ShipWeekly.dev — Full System Design Document

**Architect:** Solo builder, scaling from 0 to 100k users
**Design Philosophy:** Start simple, scale intentionally, never over-engineer early

---

## Part 1 — System Overview

ShipWeekly is a read-heavy, weekly-reset platform. Most users browse and upvote. Few users submit products. This shapes every architectural decision — reads must be blazing fast, writes can tolerate slight delays.

**Core Traffic Pattern:**
- Monday morning — highest traffic spike (new week resets, everyone checks leaderboard)
- Thursday — second spike (streak reminder emails drive people back)
- Rest of week — steady low traffic
- This means your architecture must handle spikes, not just average load

---

## Part 2 — High Level Architecture

### The Three Layers

**Layer 1 — Client Layer**
What the user sees and interacts with. Next.js handles this. Server components render on the server and send HTML to the browser — this is critical for SEO. Client components handle interactivity like upvote buttons, roast submissions, and real-time counters. The browser never talks directly to your database. Ever.

**Layer 2 — Application Layer**
Your Next.js API routes and server actions. This is the brain. It receives requests from the client, validates them, applies business logic, talks to the database, and returns responses. All authentication checks happen here. All rate limiting happens here.

**Layer 3 — Data Layer**
Neon Postgres. This is your single source of truth. Nothing else stores permanent data in Stage 1. Cloudinary stores media separately but that's not business data.

---

## Part 3 — Stage 1 Architecture (0 to 1k users — MVP)

### Philosophy
Ship fast. Don't over-engineer. One server, one database, one deployment. Prove the product works before optimizing anything.

### Infrastructure
Everything runs on Vercel free tier. One Next.js app handles both frontend and backend. Neon Postgres on free tier handles all data. Cloudinary free tier handles all media. Resend free tier handles all emails. Zero infrastructure cost in Stage 1.

### How a Request Flows — Stage 1

A user opens ShipWeekly homepage. Here is exactly what happens step by step.

The browser sends a request to Vercel's edge network. Vercel routes it to your Next.js app. The server component on the homepage runs on the server — it directly queries Neon Postgres for this week's products sorted by upvote count. Neon returns the data. Next.js renders the full HTML with the product list embedded. The HTML is sent to the browser. The browser displays it instantly — no loading spinner, no API call, just content. This is why SSR matters for a leaderboard. Fast first paint, great SEO.

### How Upvoting Works — Stage 1

User clicks upvote button. The client component fires a POST request to your API route. The API route checks if the user is authenticated via Clerk `auth()`. If not authenticated, returns 401. If authenticated, checks the upvotes table for an existing vote from this user on this product. If vote exists, deletes it and decrements product upvote count — this is the toggle. If no vote exists, inserts a new row and increments product upvote count. Returns success. The client updates the UI optimistically — meaning it updates the number before the server responds — and corrects it if the server returns an error.

### How Auth Works — Stage 1

User clicks Login. Clerk opens the sign-in modal. User authorizes via GitHub or Google. Clerk manages the entire OAuth flow and sets a secure session token in the browser. Your Next.js middleware (`clerkMiddleware`) protects the routes. Your API routes and server components read the user ID using Clerk's `auth()` helper. Clerk acts as your source of truth for sessions, meaning you don't need to manage a sessions table in your own database. You simply store a `clerk_user_id` in your local `users` table to link ShipWeekly data (like upvotes and bio) to the Clerk identity.

### What Gets Server Side Rendered vs Client Side

Server rendered — homepage leaderboard, product detail pages, builder profiles, blog articles, directories page. These need SEO and fast first load.

Client rendered — upvote button state, roast submission form, dashboard charts, real-time counters. These need interactivity and don't need SEO.

### Stage 1 Weaknesses — Intentional
No caching. Every request hits the database. Fine for 1k users. Neon free tier handles this easily. No queue for emails. Resend is called directly from API routes. Fine for low volume. No CDN for dynamic content. Vercel's edge handles this adequately. These are conscious trade-offs, not mistakes.

---

## Part 4 — Database Design (Deep Dive)

### Design Principles
Normalize early to avoid data duplication headaches later. Use Postgres properly — foreign keys, constraints, indexes. Design for the queries you'll actually run, not theoretical ones.

### Tables and Their Purpose

**Users Table**
Stores every person who has ever logged in. One row per person. Email is unique — this is how you prevent duplicate accounts across GitHub and Google login. Username is unique — this is their public identity. Ship streak and total ships are denormalized counts stored directly here for fast profile rendering — you don't want to COUNT rows every time someone views a profile.

**Products Table**
Stores every submitted product. Slug is the URL-safe unique identifier — generated from product name at creation time. Week number and year together identify which weekly leaderboard the product belongs to. Upvote count and roast count are denormalized — stored directly on the row and incremented/decremented atomically. This avoids expensive COUNT queries on the upvotes table every page load. Tech stack and categories are stored as arrays — Postgres supports this natively and it's fine for this use case. MRR badge is a text enum — not a number, because you're not verifying it, just displaying what the maker self-reports.

**Upvotes Table**
Stores every upvote ever cast. User ID and product ID together have a unique constraint — this is the database-level guarantee of one vote per user per product. Never rely on application logic alone for this. The database enforces it. When a user upvotes, you insert here AND update the count on the products table in the same database transaction.

**Roasts Table**
Stores every roast comment. Has a parent roast ID column for maker replies — if null it's a top-level roast, if set it's a reply. Roasts also have their own upvote count so the community can vote the funniest roast to the top.

**Roast Upvotes Table**
Same pattern as the main upvotes table but for roasts. User ID and roast ID have a unique constraint.

**Page Views Table**
Stores every product page visit with a timestamp, product ID, and source (where did the visitor come from — direct, google, twitter, etc.). This is your raw analytics data. You query this table aggregated for the maker's dashboard charts. In Stage 1 this table grows fast — every product visit writes a row. Plan to prune or archive old data.

**Directories Table**
Static-ish data. List of external directories where makers can submit their products. Seeded manually. Rarely updated. Has domain rating, free or paid flag, category.

**Blog Posts Table**
Stores AI-generated launch articles. Linked to a product via product ID. Has SEO title, SEO description, published date. Content is stored as markdown text in Postgres.

**Dodo Payments Table**
Stores every payment made via Dodo Payments. Links to user and product. Stores the Dodo subscription ID and payment ID for reconciliation. Stores which tier was purchased — Builder Pass or Launch Boost. Status field — pending, completed, failed, cancelled. When a payment is confirmed via Dodo webhook, you update this table and set the subscription tier on the user or product.

### Critical Database Indexes

Indexes are the difference between fast and slow queries at scale. You add these from day one.

Products table needs an index on week number and year together — your homepage query filters by these every single request. Products table needs an index on maker ID — your dashboard loads all products by a specific maker. Upvotes table needs an index on product ID — you query all votes for a product. Page views table needs an index on product ID and created at — your analytics charts query this constantly. Users table needs an index on username — profile pages look up by username.

Without these indexes, Postgres does a full table scan on every query. At 1k products this is fine. At 100k products this kills your database.

---

## Part 5 — Stage 2 Architecture (1k to 10k users — Growth)

### What Changes and Why

At 10k users, your homepage gets hit thousands of times per day. Every hit querying Postgres directly becomes expensive. Your weekly Monday spike will hammer the database. You need caching.

### Introducing Caching Layer

Move from Vercel free to Vercel Pro or a small VPS. Add Upstash Redis — serverless Redis with a generous free tier that scales per request, perfect for solo builders.

What you cache in Redis — the current week's leaderboard, cached for 60 seconds. Product detail pages for products that haven't changed, cached for 5 minutes. Builder profile data, cached for 2 minutes. Directory listing, cached for 1 hour since it rarely changes.

How cache invalidation works — when a new upvote happens, you invalidate the leaderboard cache for that week. When a product is edited, you invalidate that product's cache. You use a simple key-value structure in Redis — the cache key is something like leaderboard-week-22-2025 and the value is the JSON of the sorted product list. First request builds the cache. All subsequent requests within 60 seconds read from Redis instead of Postgres. This alone reduces database load by 80 to 90 percent on the homepage.

### Introducing Background Jobs

At this scale, doing everything synchronously in API routes starts to hurt. Slow operations should happen in the background.

What goes to background jobs — sending emails, generating AI blog articles, updating streak calculations, aggregating analytics.

How you implement this at Stage 2 — Vercel cron jobs for scheduled tasks like weekly streak calculation. For triggered background work like sending a welcome email after signup, you use Upstash QStash — a serverless message queue that pairs with Upstash Redis. You push a job to QStash from your API route, it executes asynchronously, your API route responds immediately without waiting.

### Database Connection Pooling

Neon Postgres has a built-in connection pooler called PgBouncer. At Stage 2 you must enable this. Without pooling, every serverless function invocation opens a new database connection. Serverless functions can spin up hundreds of instances simultaneously during a traffic spike. Postgres has a connection limit. Without pooling you hit that limit and your app crashes. With PgBouncer enabled on Neon, all connections go through a pool and Postgres never sees more than its limit.

### Image Optimization

Move all product logo uploads through Next.js Image component. This auto-optimizes, resizes, and serves images in modern formats like WebP. Cloudinary serves as the origin. Vercel's CDN caches the optimized versions. Your users get fast image loads globally without you doing anything extra.

---

## Part 6 — Stage 3 Architecture (10k to 100k users — Scale)

### What Changes and Why

At 100k users you're no longer a hobby project. Monday morning spikes can mean tens of thousands of simultaneous users hitting your leaderboard. Single database writes during upvote storms can cause contention. Analytics queries over millions of page view rows start taking seconds. You need to think more seriously.

### Read Replicas

Neon Postgres supports read replicas. You add one read replica at this stage. All read queries — homepage leaderboard, product pages, builder profiles, analytics charts — go to the read replica. All write queries — upvotes, product submissions, roasts — go to the primary. This doubles your read throughput instantly. Your Drizzle ORM config has two database clients — one pointing to primary for writes, one pointing to replica for reads. You decide at the query level which to use.

### Analytics Separation

Your page views table has millions of rows at this stage. Running aggregation queries on it for every dashboard request is slow and wastes your primary database's resources. You move analytics to a separate system.

Option for solo builder — Tinybird. It's a columnar analytics database designed exactly for this use case. You stream page view events to Tinybird instead of Postgres. Tinybird queries over millions of rows in milliseconds. Your maker dashboard reads from Tinybird for charts. Your main Postgres database is freed from analytics load entirely.

### CDN Strategy

At Stage 3 you move fully to edge rendering for public pages. Next.js supports this natively — pages like the homepage, product pages, and blog articles are rendered at the edge closest to the user. A user in Mumbai gets the page rendered from a Mumbai edge node, not a server in the US. Latency drops from 200ms to under 50ms globally. You achieve this through Next.js edge runtime configuration on specific routes.

### Rate Limiting

At 100k users you have bad actors. People writing scripts to upvote their own products. Spam roasts. Abuse of the AI article generation endpoint. You implement rate limiting using Upstash Redis. Every API route checks how many times this IP or user ID has hit it in the last minute. If over the limit, return 429 Too Many Requests. Upstash has a built-in rate limiting library that makes this a few lines of config.

### Queue-Based Upvote Processing

At extreme upvote volumes on a popular product — imagine a product going viral on Twitter with thousands of people hitting upvote simultaneously — your database can get write contention on the upvote count column. You solve this by moving upvote count updates to a queue. Upvote events are pushed to a Redis list immediately — this is fast. A background worker processes the queue and batches the count updates to Postgres — instead of 1000 individual increments, it does one UPDATE adding 1000. This reduces database write pressure dramatically while keeping the user experience instant.

---

## Part 7 — Authentication Architecture (Deep Dive)

### Auth as a Service (Clerk)

You outsource auth entirely to Clerk. Here is why. Authentication is not your core product. Managing OAuth callbacks, session invalidation, JWT signing, MFA, and device tracking is massive overhead. Clerk handles all of this. Your app only cares about the `clerk_user_id`. When you need to ban a user, you ban them in the Clerk dashboard, and their session is revoked globally.

### Multi-Provider Linking

A user signs up with GitHub using email john@gmail.com. Later they try to log in with Google using the same email john@gmail.com. Clerk automatically detects the email match and links both OAuth accounts to the same identity. You don't have to build any logic or an "Accounts" table for this.

### First Login Onboarding Flow

When a user signs up via Clerk, your app gets the `userId`. In your local `users` table, the `clerk_user_id` might not exist yet. When a user tries to access `/dashboard`, your app checks if the `clerk_user_id` is in the database. If not, they are redirected to `/onboarding`. Onboarding collects username, bio, and social links. On completion, the new user record is inserted locally with the `clerk_user_id`, and they proceed normally.

### Route Protection Architecture

Three levels of protection. Public routes — anyone can access, no session needed, homepage, product pages, blog, profiles. Protected routes — must be logged in, dashboard, submission form, upvoting, roasting. Admin routes — must be logged in AND have admin flag on user row. `clerkMiddleware` runs on every request. It protects routes at the Vercel edge network before Next.js even renders the page, making it extremely fast.

---

## Part 8 — Weekly Reset System Architecture

### The Core Problem

ShipWeekly revolves around a weekly cycle. Every Monday, a new week begins. Products compete for 7 days. Sunday midnight the week ends. Results are frozen. Monday a new leaderboard starts. This needs to be reliable, automatic, and accurate across time zones.

### How Week Numbers Work

You use ISO week numbers. Every product submission stores the ISO week number and year at the time of submission. The homepage query filters by current ISO week number and year. No manual resets needed — a new week just means a new filter value. Old weeks are automatically archived — they're still in the database with their week number, accessible via the week selector on the homepage.

### Streak Calculation Cron Job

Every Monday at 00:01 UTC a Vercel cron job runs. It gets the ISO week number for the week that just ended. It queries all products submitted in that week and collects the unique maker IDs. For every user in the database it checks — did this user submit a product last week? If yes, increment their ship streak by 1 and update their last ship week. If no, reset their streak to 0. This runs once a week, touches every user, and must be idempotent — meaning if it runs twice by accident, the result is the same as running once. You ensure idempotency by storing the last processed week number and skipping if already processed.

### Streak Reminder Email Flow

Every Thursday at 10am UTC, a second cron job runs. It queries all users where their last ship week was the previous week — meaning they shipped last week and have an active streak — and where they have NOT submitted a product in the current week yet. For each of these users it queues a streak reminder email via Resend. The email says their current streak count and nudges them to ship before Sunday. This is the single highest-engagement email you'll send — people hate losing streaks.

---

## Part 9 — Payment Architecture

### Flow for Payments

Builder clicks Upgrade to Launch Boost. Your frontend calls your API route to create a Dodo Payments checkout session. Your API route returns the checkout URL. The user is redirected to the Dodo hosted checkout page. User completes payment. Dodo calls your webhook URL (`/api/webhooks/dodo`) with the payment result. Your webhook handler verifies the signature — this is critical, anyone can call your webhook URL, you must verify it's actually from Dodo. If signature is valid, your webhook updates the payment record to completed and unlocks the feature (e.g. setting `tier` to `launch_boost`). The webhook is the source of truth — never trust the frontend to tell you a payment succeeded.

### Webhook Reliability

Webhooks can fail. Your server might be down when Dodo calls. Dodo retries failed webhooks. Your webhook handler must be idempotent — if the same payment webhook arrives twice, processing it twice should not grant the user the feature twice. You achieve this by storing the Dodo payment ID in your payments table and checking if it already exists before processing.

---

## Part 10 — SEO Architecture

### Why This Matters More Than Most Apps

ShipWeekly's growth engine is organic search. When someone Googles "ShipWeekly ProductName review" or "best indie products week 22 2025" you want to show up. This requires serious SEO architecture from day one.

### Static vs Dynamic SEO Pages

Homepage — dynamically rendered with current week's products, metadata updated weekly. Product pages — statically generated at build time for old products, dynamically rendered for current week products. This means Google has a stable HTML page to index for every product. Builder profiles — dynamically rendered. Blog articles — statically generated, these are your highest SEO value pages.

### Metadata Architecture

Every page type has a template for its title, description, and Open Graph image. Product page title template — "ProductName — Ship it on ShipWeekly". This gets the product name into the page title which Google indexes. OG image — dynamically generated using Next.js OG image API, shows product logo, name, tagline, upvote count, week number. When someone shares a product on Twitter, this image appears in the preview. Builder profile title — "BuilderName's products on ShipWeekly — X ships, Y upvotes".

### Sitemap Architecture

You generate a dynamic sitemap at the /sitemap.xml route. It includes every product page, every builder profile, every blog article, and every directory. It updates automatically as new content is added. You submit this sitemap to Google Search Console on launch day. Google uses it to discover and index all your pages.

---

## Part 11 — Deployment & CI/CD Pipeline

### Stage 1 — Solo Builder Pipeline

You push to main branch on GitHub. Vercel automatically detects the push and starts a build. Vercel runs your Next.js build. If the build succeeds, it deploys to production automatically. If the build fails, it keeps the previous version live. Total time from git push to live — under 2 minutes. This is your entire CI/CD in Stage 1. No complexity needed.

### Branch Strategy

Main branch is always production. You work on feature branches — sprint-1-auth, sprint-2-products, etc. When a feature is done you merge to main and it auto-deploys. Never push broken code to main. Test locally before merging.

### Environment Variables

Three environments — local development, Vercel preview deployments, and Vercel production. Each has its own set of environment variables. Local uses .env.local which is never committed to Git. Preview deployments on Vercel use a separate Neon database branch — Neon supports database branching, each branch is an isolated copy of your schema. Production uses the main Neon database. This means you can test database migrations on a preview branch without touching production data.

### Database Migration Strategy

Every schema change is a migration file managed by Drizzle. You never manually ALTER tables in production. You write a migration, test it on your preview database, and when you merge to main the migration runs automatically as part of the build process. You have a complete audit trail of every schema change ever made.

---

## Part 12 — Monitoring & Observability

### What You Monitor

Three categories — availability, performance, and errors.

Availability — is the site up? Use a free uptime monitor like BetterUptime or UptimeRobot. It pings your homepage every minute. If it doesn't respond, you get an SMS. Simple and free.

Performance — how fast are pages loading? Vercel's analytics dashboard gives you Core Web Vitals for free. You monitor Time to First Byte, Largest Contentful Paint, and Cumulative Layout Shift. These also affect Google rankings.

Errors — what's breaking in production? Use Sentry free tier. It catches unhandled errors in both server and client code, shows you the stack trace, the user's browser, and how many users were affected. Without this you're blind to production errors.

### Logging Strategy

Vercel logs all function invocations. In Stage 1 this is enough. You search logs in the Vercel dashboard when debugging. In Stage 2 you add structured logging — every important event writes a JSON log with user ID, action, and timestamp. This makes debugging production issues dramatically faster.

---

## Full Architecture Summary by Stage

**Stage 1 — 0 to 1k users**
Next.js on Vercel free. Neon Postgres free. Clerk Auth free tier. Cloudinary free. Resend free. No caching. No queues. Direct database queries. Zero cost.

**Stage 2 — 1k to 10k users**
Everything from Stage 1 plus Upstash Redis for caching. QStash for background jobs. Neon connection pooling enabled. Vercel cron for streaks. Rate limiting added. Cost — roughly $20 to $50 per month.

**Stage 3 — 10k to 100k users**
Everything from Stage 2 plus Neon read replica. Tinybird for analytics. Edge rendering on public pages. Queue-based upvote processing. Sentry for error monitoring. Cost — roughly $100 to $300 per month.

---

## The Golden Rule for Solo Builders

**Build for Stage 1. Design for Stage 3.**

Your code should be simple enough to ship fast today. Your architecture should be structured so that adding Redis caching tomorrow requires changing one config line, not rewriting your data layer. That's what this document gives you — a path from zero to scale without ever needing to burn everything down and restart.

---

Say "let's start Sprint 0" and we go from architecture to actual build. 🚀