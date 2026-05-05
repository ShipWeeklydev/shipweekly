# PROGRESS.md — ShipWeekly.dev Progress Tracker

> Updated after every feature, sprint, or session. This is the living record of what's done, what's in progress, and what's blocked.

---

## Current Sprint

**Sprint 1 — Auth & Builder Profiles**
Status: Completed
Started: 2026-05-04
Completed: 2026-05-04
Completed: —

---

## Sprint Progress

### Sprint 0 — Project Setup
- [x] Next.js 15 initialized with App Router + TypeScript
- [x] All dependencies installed (see tech stack in SHIPWEEKLY_MASTER.md)
- [x] shadcn/ui configured (Saffron / Warm India aesthetic)
- [x] Drizzle ORM + Neon Postgres connected
- [x] Initial schema setup (users table only)
- [x] First database migration run successfully
- [x] Clerk auth installed and configured
- [x] .env.local created with all variables
- [x] .cursorrules and AGENT.md finalized
- [x] First commit pushed to GitHub

### Sprint 1 — Auth & Builder Profiles
- [x] Login page with Clerk (GitHub + Google)
- [x] Clerk middleware protecting /dashboard routes
- [x] Onboarding flow (username, bio, socials)
- [x] Public builder profile page /builders/[username]
- [x] Settings page to edit profile

### Sprint 2 — Product Submission & Pages
- [ ] 'products' table schema & migration
- [ ] Product submission form (all fields)
- [ ] Logo upload via Cloudinary
- [ ] Screenshot upload (up to 5 images)
- [ ] Slug auto-generation
- [ ] Week number auto-assignment
- [ ] Public product page /products/[slug]
- [ ] OG meta tags per product
- [ ] Edit product page

### Sprint 3 — Weekly Leaderboard & Homepage
- [ ] getCurrentWeekProducts query
- [ ] ShipCard component
- [ ] Leaderboard component with week display
- [ ] Homepage with hero section
- [ ] Week selector for past weeks
- [ ] All products page with filters
- [ ] Search by product name
- [ ] Newsletter subscribe form on homepage

### Sprint 4 — Upvotes
- [ ] Upvote toggle API route
- [ ] Optimistic UI update
- [ ] Login prompt modal for guests
- [ ] Upvote milestone email notifications (10, 50, 100)

### Sprint 5 — Roast Mode 🔥
- [ ] 'roasts' and 'roast_upvotes' schema & migration
- [ ] Roast section on product pages
- [ ] Roast submission (auth required)
- [ ] Maker replies to roasts
- [ ] Roast upvoting
- [ ] Maker can delete roasts on own products
- [ ] Top Roasts sidebar on homepage
- [ ] Email notification to maker on new roast

### Sprint 6 — Stack Reveal + MRR Badge
- [ ] Stack badges on product cards and pages
- [ ] /stacks discovery page
- [ ] Stack popularity stats
- [ ] MRR badge on product cards and pages
- [ ] MRR filter on homepage and products page

### Sprint 7 — Builder Streaks
- [ ] Streak counter on builder profiles
- [ ] Vercel cron — weekly streak calculation
- [ ] Streak reset logic for missed weeks
- [ ] Streak milestone badges (4, 8, 12, 52 weeks)
- [ ] Thursday reminder email
- [ ] Streak leaderboard page

### Sprint 8 — Maker Dashboard & Analytics
- [ ] Dashboard overview
- [ ] Per-product analytics page
- [ ] Page view tracking
- [ ] Line charts — views and upvotes over time
- [ ] Traffic source breakdown
- [ ] Weekly rank history per product

### Sprint 9 — Directories
- [ ] /directories page
- [ ] Sort by domain rating
- [ ] Filter by free / paid / category
- [ ] Direct submit links

### Sprint 10 — Blog & AI Articles
- [ ] /blog listing page
- [ ] /blog/[slug] article page
- [ ] SEO meta tags per article
- [ ] AI article generation for Launch Boost users
- [ ] Sitemap at /sitemap.xml
- [ ] RSS feed at /blog/rss.xml

### Sprint 11 — Pricing & Payments
- [ ] Pricing page
- [ ] Dodo Payments checkout integration
- [ ] Dodo webhook handler with signature verification
- [ ] Builder Pass subscription flow
- [ ] Launch Boost one-time payment flow
- [ ] Feature gating based on tier
- [ ] Payment records in database

### Sprint 12 — Threaded Comments
- [ ] Comment section on product pages
- [ ] Threaded replies
- [ ] Comment upvoting
- [ ] Comment moderation
- [ ] Comment count on ship cards

### Sprint 13 — Collections
- [ ] Create collection from dashboard
- [ ] Add/remove products to collections
- [ ] Public collection pages
- [ ] Browse all collections
- [ ] "Save to collection" button on product pages

### Sprint 14 — Community Discussions
- [ ] /discussions forum page
- [ ] Create discussion thread
- [ ] Discussion categories
- [ ] Threaded replies
- [ ] Upvoting on discussions
- [ ] Pinned discussions

### Sprint 15 — Weekly Newsletter
- [ ] Newsletter subscribe form
- [ ] Vercel cron — Monday digest
- [ ] Digest email template
- [ ] Unsubscribe flow

### Sprint 16 — Screenshot Gallery + Launch Scheduling
- [ ] Multi-image upload
- [ ] Screenshot gallery carousel
- [ ] Lightbox view
- [ ] Launch scheduling UI
- [ ] Auto-publish cron job

### Sprint 17 — Product Badges + Embed Widget
- [ ] Product of the Week auto-award cron
- [ ] Product of the Month calculation
- [ ] Badge display components
- [ ] Embed widget generator
- [ ] Badge history page

### Sprint 18 — Launch Checklist
- [ ] /launch-checklist static page
- [ ] Step-by-step guide content

### Sprint 19 — Polish & Launch
- [ ] Loading skeletons
- [ ] Empty states
- [ ] Error boundaries
- [ ] Mobile responsive audit
- [ ] Dark mode
- [ ] Legal pages
- [ ] Umami analytics
- [ ] Launch on startup directories
- [ ] Launch tweet thread

---

## Blockers

| Date | Sprint | Blocker | Status |
|---|---|---|---|
| — | — | — | — |

---

## Session Log

| Date | Session | What Was Done | Time Spent |
|---|---|---|---|
| 2026-05-04 | Session 1 | Next.js 16 init, shadcn/ui setup, Saffron theme, Clerk + Drizzle + Neon configured, users table pushed to DB, middleware.ts created, layout wrapped in ClerkProvider, ERRORS.md + PROGRESS.md updated | ~3 hrs |
| 2026-05-04 | Session 2 | Sprint 1 completed. Implemented shadcn split-screen auth forms, Clerk integration, Zod onboarding flow, Builder Profiles UI, and Settings page logic. Strict logic/UI separation maintained. | ~1 hr |
| 2026-05-05 | Session 3 | Pushed to GitHub and deployed to Vercel (Sprint 0 fully checked off). Reorganized UI components into domain folders (auth/ and profile/). Added Back navigation buttons to deep pages. Created .env.example. | ~1 hr |

---

> After every coding session, update:
> 1. Check off completed items above
> 2. Add a row to the Session Log
> 3. Update the Current Sprint section
> 4. If blocked, add to Blockers table
