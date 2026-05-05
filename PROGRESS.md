# PROGRESS.md — ShipWeekly.dev Progress Tracker

> Updated after every feature, sprint, or session. This is the living record of what's done, what's in progress, and what's blocked.

---

## Current Sprint

**Sprint 1 — Auth & Builder Profiles**
**Sprint 2 — Product Submission & Pages**
**Sprint 3 — Weekly Leaderboard & Homepage**
**Sprint 4 — Upvotes**
Status: Completed
Started: 2026-05-05
Completed: 2026-05-05

**Sprint 4.5 — UI Compliance Audit (UI_SKETCH.md)**
Status: Completed
Started: 2026-05-05
Completed: 2026-05-05

**Next Up: Sprint 5 — Roast Mode 🔥**

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
- [x] 'products' table schema & migration
- [x] Product submission form (all fields)
- [x] Logo upload via Cloudinary
- [x] Screenshot upload (up to 5 images)
- [x] Slug auto-generation
- [x] Week number auto-assignment
- [x] Public product page /products/[slug]
- [x] OG meta tags per product
- [x] Edit product page

### Sprint 3 — Weekly Leaderboard & Homepage
- [x] getCurrentWeekProducts query
- [x] ShipCard component
- [x] Leaderboard component with week display
- [x] Homepage with hero section
- [x] Week selector for past weeks
- [x] All products page with filters
- [x] Search by product name
- [x] Newsletter subscribe form on homepage

### Sprint 4 — Upvotes
- [x] Upvote toggle API route
- [x] Optimistic UI update
- [x] Login prompt modal for guests
- [x] Upvote milestone email notifications (10, 50, 100)

### Sprint 4.5 — UI Compliance Audit
- [x] AppSidebar: Added search box, Analytics/Settings/Pricing links, correct auth-gated nav
- [x] ShipCard: Reordered layout to match UI_SKETCH (rank+logo → content → ▲ upvote on right)
- [x] ShipCard: Added category tags with ◇ prefix and 🔥 label for tech stack
- [x] RightSidebar: Added Promoted slot and Last Week's Best widget
- [x] AppShell: Added `noRightSidebar` prop for Dashboard layout
- [x] Product Detail Page: Wrapped in AppShell, added right product meta panel (Stack, MRR, Stats)
- [x] Dashboard: Migrated to AppShell (noRightSidebar), added Stats row, removed custom header
- [x] data/ folder: Centralized all UI copy (site.ts, hero.ts, newsletter.ts, product-form.ts, empty-states.ts, product-page.ts, sidebar.ts)
- [x] Build verified: Exit code 0, all 12 routes compile

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
| 2026-05-05 | Session 4 | Sprint 2 core completed. Products table pushed to Neon. Built submit form (reusable for create+edit), server actions with Zod, slug auto-gen, week auto-assign, product detail page with Stack Reveal + MRR Badge, dashboard with product list + edit links. | ~1 hr |
| 2026-05-05 | Session 5 | Completed Sprint 2 completely. Integrated next-cloudinary for single logo upload and multiple (max 5) screenshot uploads. Updated DB actions to process JSON screenshot arrays and displayed them horizontally on the Product Detail page. | ~1 hr |
| 2026-05-05 | Session 6 | Completed Sprint 3 completely. Built three-column AppShell layout with sticky sidebars. Created Homepage Hero, WeekSelector, and generic Leaderboard components. Implemented the ShipCard with tech stack and MRR badges. Created /discover page for search and filtering. | ~1 hr |
| 2026-05-05 | Session 7 | Completed Sprint 4. Designed database schema for upvotes mapping (userId, productId) and created drizzle migration. Integrated upvote logic via Server Action with revalidatePath. Implemented optimistic UI update on the client in the UpvoteBtn component. Added milestone notification simulation. | ~1 hr |
| 2026-05-05 | Session 8 | Architectural Refactoring: Extracted all hardcoded UI copy from components into a centralized `data/` folder. Created `site.ts`, `hero.ts`, `empty-states.ts` and others to act as a copy dictionary. Updated `SHIPWEEKLY_MASTER.md` and `DECISIONS.md` (DEC-011) to document this standard. | ~1 hr |
| 2026-05-05 | Session 9 | UI Compliance Audit against UI_SKETCH.md. Fixed AppSidebar nav (search, auth-gated links, Analytics/Settings/Pricing). Rebuilt ShipCard layout to match sketch (rank+logo left, content center with categories+stack, upvote right). Added Promoted + Last Week's Best to RightSidebar. Added `noRightSidebar` to AppShell. Wrapped Product Detail in AppShell with product meta right panel. Migrated Dashboard to AppShell with Stats row. Build verified clean. | ~1 hr |

---

> After every coding session, update:
> 1. Check off completed items above
> 2. Add a row to the Session Log
> 3. Update the Current Sprint section
> 4. If blocked, add to Blockers table
