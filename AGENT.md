# AGENT.md — ShipWeekly.dev Session Starter

**Read ALL referenced documents before writing any code.**

---

## Quick Start for Any Coding Agent

You are building **ShipWeekly.dev** — a weekly product launch platform for indie hackers.

**Tagline:** Ship it. Roast it. Stack it. Weekly.

Before doing ANYTHING, read these files in order:

1. **SHIPWEEKLY_MASTER.md** — The product bible. Every feature, table, route, and convention.
2. **PROGRESS.md** — What's done, what's in progress, what's blocked.
3. **DECISIONS.md** — Why we chose Clerk over NextAuth, Dodo over Razorpay, etc.
4. **ERRORS.md** — Past bugs and their fixes. Check before debugging.
5. **.cursorrules** — Coding conventions. Follow exactly.

---

## Project Documentation Map

```
shipweekly/
├── SHIPWEEKLY_MASTER.md    ← Product bible (features, schema, API, sprints)
├── PROGRESS.md             ← Updated after every feature/session
├── DECISIONS.md            ← Updated after every architecture choice
├── ERRORS.md               ← Updated after every non-obvious bug fix
├── AGENT.md                ← This file (session starter, points to above)
└── .cursorrules            ← Cursor coding rules (TypeScript, Next.js, Drizzle)
```

---

## Tech Stack Summary

| Layer | Tool |
|---|---|
| Framework | Next.js 15, App Router, TypeScript |
| Styling | Tailwind CSS, shadcn/ui (New York, zinc) |
| Auth | Clerk (GitHub + Google OAuth) |
| Database | Neon Postgres (serverless) |
| ORM | Drizzle ORM + drizzle-kit |
| Validation | Zod |
| Storage | Cloudinary (image uploads) |
| Email | Resend (transactional emails) |
| Payments | Dodo Payments (MoR — subscriptions + one-time) |
| Deployment | Vercel |
| IDs | nanoid |
| Utils | clsx + tailwind-merge |

---

## Auth Architecture (Clerk)

Clerk handles ALL authentication. No custom auth tables needed.

```
1. User clicks Login
       ↓
2. Clerk opens sign-in modal (GitHub or Google OAuth)
       ↓
3. Clerk handles entire OAuth flow and session
       ↓
4. clerkMiddleware() runs on every request
       ↓
5. In your code: auth() gives { userId } (Clerk's user ID)
       ↓
6. Your users table stores ShipWeekly-specific data linked via clerk_user_id
       ↓
7. First login → check if clerk_user_id exists in users table
       ↓                          ↓
   YES — returning user       NO — new user
       ↓                          ↓
   Continue to dashboard     Redirect to /onboarding
                                   ↓
                             User sets username + bio
                                   ↓
                             Insert user row with clerk_user_id
                                   ↓
                             Redirect to /dashboard
```

**Key Rules:**
- Clerk manages sessions, tokens, and OAuth — never handle this yourself
- auth() returns { userId } — this is the Clerk user ID
- currentUser() returns full Clerk user object (name, email, image)
- Your users table links to Clerk via clerk_user_id column
- Never trust client-sent user IDs — always read from auth()
- clerkMiddleware() protects /dashboard routes automatically

---

## Payment Architecture (Dodo Payments)

Dodo Payments is a Merchant of Record — handles tax, compliance, fraud.

**Two payment flows:**

### Builder Pass — $5/month subscription
```
User clicks "Subscribe" on pricing page
       ↓
Frontend calls server action to create Dodo checkout session
       ↓
Dodo Payments checkout modal opens
       ↓
User completes payment
       ↓
Dodo sends webhook to /api/webhooks/dodo
       ↓
Webhook handler verifies signature
       ↓
Updates user subscription status in database
       ↓
User gains Builder Pass features
```

### Launch Boost — $19 one-time per product
```
User clicks "Boost this product" on product page
       ↓
Frontend calls server action to create Dodo payment link
       ↓
Dodo checkout opens
       ↓
User completes payment
       ↓
Webhook confirms payment
       ↓
Product marked as boosted in database
       ↓
AI article generation triggered
```

**Key Rules:**
- Webhook handler at /api/webhooks/dodo
- Always verify webhook signature before processing
- Handler must be idempotent (same event arriving twice = same result)
- Store dodo_payment_id for reconciliation
- Use Dodo's customer portal for subscription self-management

---

## Database Schema Quick Reference

> Full schema details are in SHIPWEEKLY_MASTER.md. This is just a quick reference.

**Core Tables:**
- `users` — ShipWeekly user profiles (linked to Clerk via clerk_user_id)
- `products` — Submitted products with upvotes, roasts, comments
- `upvotes` — One vote per user per product
- `roasts` — Community feedback comments
- `roast_upvotes` — Votes on roasts
- `comments` — Threaded discussion on products
- `comment_upvotes` — Votes on comments
- `collections` — User-curated product lists
- `collection_items` — Products in collections
- `discussions` — Community forum threads
- `discussion_replies` — Replies to discussions
- `directories` — External submission sites
- `blog_posts` — AI-generated launch articles
- `page_views` — Analytics tracking
- `payments` — Payment records (Dodo)
- `newsletter_subscribers` — Weekly digest subscribers

---

## Folder Structure

```
shipweekly/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── onboarding/page.tsx
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── builders/
│   │   │   ├── page.tsx
│   │   │   └── [username]/page.tsx
│   │   ├── directories/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── collections/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── discussions/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── launch-checklist/page.tsx
│   │   └── pricing/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── collections/
│   │   │   ├── page.tsx
│   │   │   └── new/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── webhooks/
│       │   └── dodo/route.ts
│       ├── products/
│       │   ├── route.ts
│       │   └── [id]/
│       │       ├── route.ts
│       │       ├── upvote/route.ts
│       │       ├── roast/route.ts
│       │       └── comment/route.ts
│       ├── collections/
│       │   ├── route.ts
│       │   └── [id]/
│       │       ├── route.ts
│       │       └── items/route.ts
│       ├── discussions/
│       │   ├── route.ts
│       │   └── [id]/
│       │       ├── route.ts
│       │       └── reply/route.ts
│       ├── newsletter/route.ts
│       ├── directories/route.ts
│       ├── blog/route.ts
│       └── upload/route.ts
├── components/
│   ├── ui/
│   ├── ship-card.tsx
│   ├── leaderboard.tsx
│   ├── upvote-btn.tsx
│   ├── roast-box.tsx
│   ├── comment-box.tsx
│   ├── stack-badge.tsx
│   ├── mrr-badge.tsx
│   ├── builder-card.tsx
│   ├── streak-counter.tsx
│   ├── analytics-chart.tsx
│   ├── collection-card.tsx
│   ├── discussion-card.tsx
│   ├── screenshot-gallery.tsx
│   ├── badge-display.tsx
│   ├── embed-widget.tsx
│   └── newsletter-form.tsx
├── lib/
│   ├── db/
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   └── queries.ts
│   ├── actions/
│   │   ├── products.ts
│   │   ├── upvotes.ts
│   │   ├── roasts.ts
│   │   ├── comments.ts
│   │   ├── collections.ts
│   │   ├── discussions.ts
│   │   ├── newsletter.ts
│   │   └── users.ts
│   ├── cloudinary.ts
│   ├── dodo.ts
│   ├── resend.ts
│   └── utils.ts
├── drizzle/
│   └── migrations/
├── drizzle.config.ts
├── middleware.ts
├── SHIPWEEKLY_MASTER.md
├── PROGRESS.md
├── DECISIONS.md
├── ERRORS.md
├── AGENT.md
├── .cursorrules
└── .env.local
```

---

## Environment Variables

```
# Database
DATABASE_URL=                    # Neon pooled connection string
DATABASE_URL_UNPOOLED=           # Neon direct connection (for migrations)

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=   # Clerk publishable key
CLERK_SECRET_KEY=                     # Clerk secret key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_PRESET=

# Email
RESEND_API_KEY=

# Payments (Dodo)
DODO_API_KEY=                    # Dodo Payments API key
DODO_WEBHOOK_SECRET=             # Dodo webhook signing key
NEXT_PUBLIC_DODO_BUILDER_PASS_PRICE_ID=   # Builder Pass product/price ID
NEXT_PUBLIC_DODO_LAUNCH_BOOST_PRICE_ID=   # Launch Boost product/price ID

# App
NEXT_PUBLIC_APP_URL=             # http://localhost:3000 or https://shipweekly.dev
```

---

## Coding Conventions (Quick Reference)

> Full rules in .cursorrules

- Default to server components. "use client" only when needed.
- Server actions for forms. API routes only for webhooks.
- All DB queries in lib/db/queries.ts
- All server actions in lib/actions/
- Every public page exports generateMetadata
- IDs are nanoid strings, never auto-increment
- Zod validation on every server action and API route
- Response shape: `{ success: true, data }` or `{ success: false, error }`
- Never use `any` type
- Use cn() for conditional Tailwind classes

---

## Session Checklist

Every time you start a coding session:

1. ✅ Read SHIPWEEKLY_MASTER.md (or confirm you've read it)
2. ✅ Check PROGRESS.md for current sprint and what's done
3. ✅ Check DECISIONS.md if making any architecture choices
4. ✅ Check ERRORS.md if debugging something
5. ✅ Follow .cursorrules for all code
6. ✅ At session end: update PROGRESS.md with what you did

---

## Do Not Modify Without Asking

- lib/db/schema.ts — schema changes need migration planning
- middleware.ts — auth logic is sensitive
- drizzle/migrations/ — never manually edit migration files
- SHIPWEEKLY_MASTER.md — product bible, changes need discussion
