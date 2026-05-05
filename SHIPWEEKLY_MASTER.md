# SHIPWEEKLY_MASTER.md
# The Single Source of Truth — Read This Before Everything

> Every time you start a Cursor session, paste this file first and say:
> "Read this entire document before writing any code. This is the master project bible for ShipWeekly.dev. Confirm you have read it and tell me the current sprint."

---

## 1. PRODUCT VISION

### What Is ShipWeekly
ShipWeekly.dev is a weekly product launch platform where builders submit their products every week, compete on a leaderboard, collect upvotes, get roasted by the community, reveal their tech stack publicly, and display their revenue badge. It resets every week like a game.

### Tagline
**Ship it. Roast it. Stack it. Weekly.**

### Audience
- Indie hackers
- SaaS founders
- Open source developers
- Solo makers

### Key Features
- Weekly leaderboard
- Product pages + SEO
- Upvotes
- Threaded comments
- Directories
- Blog / SEO articles
- Roast mode 🔥
- Stack reveal
- MRR badge
- Builder streaks
- Builder profiles
- Collections
- Weekly newsletter
- Product of the Week badge
- Launch scheduling
- Screenshot gallery
- Embed widget
- Community discussions
- Builder Pass subscription
- India-first payments

---

## 2. FULL TECH STACK

| Layer | Tool | Why |
|---|---|---|
| Framework | Next.js 15, App Router, TypeScript | SSR/SSG for SEO, server components |
| Styling | Tailwind CSS + shadcn/ui (New York, zinc) | Fast, consistent UI |
| Auth | Clerk | Pre-built UI, 50k free users, Next.js native |
| Database | Neon Postgres (free tier) | Serverless, scales to zero |
| ORM | Drizzle ORM + drizzle-kit | Type-safe, lightweight |
| Validation | Zod | Runtime type safety |
| Storage | Cloudinary (free 25GB) | Logo uploads, image optimization |
| Email | Resend (free 3k/mo) | Transactional emails |
| Payments | Dodo Payments | MoR, global tax, subscriptions |
| Deployment | Vercel (free tier) | Native Next.js, auto deploy |
| IDs | nanoid | URL-safe unique IDs |
| Utils | clsx + tailwind-merge | Clean class merging |

### Future Stack (Stage 2+)
- Upstash Redis — caching + rate limiting
- Upstash QStash — background job queue
- Tinybird — analytics at scale

---

## 3. FOLDER STRUCTURE

```
shipweekly/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx                  # Login with GitHub or Google
│   │   └── onboarding/page.tsx             # Username + bio setup after first login
│   ├── (marketing)/
│   │   ├── page.tsx                        # Homepage — weekly leaderboard
│   │   ├── products/
│   │   │   ├── page.tsx                    # All products, filterable
│   │   │   └── [slug]/page.tsx             # Individual product detail page
│   │   ├── builders/
│   │   │   ├── page.tsx                    # All builder profiles
│   │   │   └── [username]/page.tsx         # Public builder profile
│   │   ├── directories/page.tsx            # Curated submission directories
│   │   ├── blog/
│   │   │   ├── page.tsx                    # All blog articles
│   │   │   └── [slug]/page.tsx             # Individual article
│   │   ├── collections/
│   │   │   ├── page.tsx                    # All public collections
│   │   │   └── [id]/page.tsx               # Single collection view
│   │   ├── discussions/
│   │   │   ├── page.tsx                    # Community discussions forum
│   │   │   └── [id]/page.tsx               # Single discussion thread
│   │   ├── launch-checklist/page.tsx       # Launch guide for makers
│   │   └── pricing/page.tsx                # Pricing tiers
│   ├── dashboard/
│   │   ├── layout.tsx                      # Protected layout
│   │   ├── page.tsx                        # Overview stats
│   │   ├── products/
│   │   │   ├── page.tsx                    # My submitted products
│   │   │   ├── new/page.tsx                # Submit a new product
│   │   │   └── [id]/edit/page.tsx          # Edit existing product
│   │   ├── analytics/page.tsx              # Per-product analytics
│   │   ├── collections/
│   │   │   ├── page.tsx                    # My collections
│   │   │   └── new/page.tsx                # Create new collection
│   │   └── settings/page.tsx               # Profile settings
│   └── api/
│       ├── webhooks/
│       │   └── dodo/route.ts               # Dodo Payments webhook handler
│       ├── products/
│       │   ├── route.ts                    # GET list, POST create
│       │   └── [id]/
│       │       ├── route.ts                # GET one, PUT update, DELETE
│       │       ├── upvote/route.ts         # POST toggle upvote
│       │       ├── roast/route.ts          # POST add roast
│       │       └── comment/route.ts        # POST add comment, GET comments
│       ├── collections/
│       │   ├── route.ts                    # GET list, POST create
│       │   └── [id]/
│       │       ├── route.ts                # GET one, PUT update, DELETE
│       │       └── items/route.ts          # POST add item, DELETE remove
│       ├── discussions/
│       │   ├── route.ts                    # GET list, POST create
│       │   └── [id]/
│       │       ├── route.ts                # GET one, DELETE
│       │       └── reply/route.ts          # POST reply
│       ├── newsletter/route.ts             # POST subscribe, DELETE unsubscribe
│       ├── directories/route.ts            # GET directories
│       ├── blog/route.ts                   # GET blog posts
│       └── upload/route.ts                 # POST image to Cloudinary
├── components/
│   ├── ui/                                 # shadcn primitives (auto-generated)
│   ├── ship-card.tsx                       # Product card for leaderboard
│   ├── leaderboard.tsx                     # Weekly ranked product list
│   ├── upvote-btn.tsx                      # Toggle upvote button
│   ├── roast-box.tsx                       # Roast comment section
│   ├── comment-box.tsx                     # Threaded comment section
│   ├── stack-badge.tsx                     # Tech stack tag pill
│   ├── mrr-badge.tsx                       # Revenue badge pill
│   ├── builder-card.tsx                    # Builder profile card
│   ├── streak-counter.tsx                  # Fire streak display
│   ├── analytics-chart.tsx                 # Dashboard line chart
│   ├── collection-card.tsx                 # Collection preview card
│   ├── discussion-card.tsx                 # Discussion thread preview card
│   ├── screenshot-gallery.tsx              # Product screenshot carousel
│   ├── badge-display.tsx                   # Product of the Week/Month badge
│   ├── embed-widget.tsx                    # "Featured on ShipWeekly" embed code
│   ├── newsletter-form.tsx                 # Email subscription form
│   └── providers/
│       └── clerk-provider.tsx           # Clerk auth wrapper
├── lib/
│   ├── db/
│   │   ├── index.ts                        # Drizzle client (Neon pooled)
│   │   ├── schema.ts                       # All table definitions
│   │   └── queries.ts                      # All reusable DB query functions
│   ├── actions/
│   │   ├── products.ts                     # createProduct, updateProduct, deleteProduct
│   │   ├── upvotes.ts                      # toggleUpvote
│   │   ├── roasts.ts                       # createRoast, deleteRoast
│   │   ├── comments.ts                     # createComment, deleteComment
│   │   ├── collections.ts                  # createCollection, addItem, removeItem
│   │   ├── discussions.ts                  # createDiscussion, createReply
│   │   ├── newsletter.ts                   # subscribe, unsubscribe
│   │   └── users.ts                        # updateProfile, completeOnboarding
│   ├── cloudinary.ts                       # Cloudinary upload helper
│   ├── dodo.ts                             # Dodo Payments helpers
│   ├── resend.ts                           # Email sending helpers
│   └── utils.ts                            # cn(), generateSlug(), getISOWeek()
├── drizzle/
│   └── migrations/                         # Auto-generated migration files
├── drizzle.config.ts                       # Drizzle kit config
├── middleware.ts                           # Clerk route protection
├── .cursorrules                            # Cursor AI rules
├── AGENT.md                                # Session starter (points to docs)
├── SHIPWEEKLY_MASTER.md                    # This file
├── PROGRESS.md                             # Sprint progress tracker
├── DECISIONS.md                            # Architecture decision log
├── ERRORS.md                               # Bug fix log
└── .env.local                              # Environment variables (never commit)
```

---

## 4. DATABASE SCHEMA — ALL TABLES

### users
Every registered user. One row per person.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| clerk_user_id | text | Unique, from Clerk auth |
| name | text | From Clerk user object |
| email | text | Unique, not null |
| image | text | Avatar URL from Clerk |
| username | text | Unique, set at onboarding |
| bio | text | Max 160 chars |
| twitter | text | Handle without @ |
| github | text | Handle |
| subscription_tier | text | free / builder_pass |
| subscription_status | text | active / cancelled / expired |
| dodo_customer_id | text | Nullable, Dodo Payments customer ID |
| ship_streak | integer | Default 0, weeks shipped in a row |
| total_ships | integer | Default 0, all time count |
| is_admin | boolean | Default false |
| created_at | timestamp | defaultNow |

### products
Every submitted product.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| slug | text | Unique, URL identifier |
| name | text | Not null |
| tagline | text | Not null, max 60 chars |
| description | text | Max 500 chars |
| logo_url | text | Cloudinary URL |
| website_url | text | Not null |
| maker_id | text | FK → users.id |
| week_number | integer | ISO week number |
| year | integer | Year of submission |
| upvote_count | integer | Default 0, denormalized |
| roast_count | integer | Default 0, denormalized |
| comment_count | integer | Default 0, denormalized |
| tech_stack | text[] | Array of stack names |
| categories | text[] | Array of category names |
| screenshots | text[] | Array of Cloudinary URLs for gallery |
| mrr_badge | text | $0 / $1-$100 / $100-$1k / $1k-$10k / $10k+ |
| badge | text | Nullable — potw (Product of the Week) / potm (Product of the Month) |
| scheduled_week | integer | Nullable, ISO week for scheduled launch |
| scheduled_year | integer | Nullable, year for scheduled launch |
| roast_enabled | boolean | Default true |
| is_premium | boolean | Default false |
| status | text | active / pending / rejected / scheduled |
| created_at | timestamp | defaultNow |

### upvotes
One row per user per product vote.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| user_id | text | FK → users.id |
| product_id | text | FK → products.id |
| created_at | timestamp | defaultNow |
| UNIQUE | — | (user_id, product_id) |

### roasts
Community feedback comments.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| product_id | text | FK → products.id |
| user_id | text | FK → users.id |
| content | text | Not null, max 280 chars |
| parent_roast_id | text | Nullable, for maker replies |
| upvote_count | integer | Default 0 |
| created_at | timestamp | defaultNow |

### roast_upvotes
One row per user per roast vote.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| user_id | text | FK → users.id |
| roast_id | text | FK → roasts.id |
| created_at | timestamp | defaultNow |
| UNIQUE | — | (user_id, roast_id) |

### directories
Curated external submission sites.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| name | text | Not null |
| url | text | Not null |
| description | text | — |
| domain_rating | integer | DR score |
| is_free | boolean | Default true |
| category | text | ai-ml / saas / dev-tools / general |
| created_at | timestamp | defaultNow |

### blog_posts
AI-generated launch articles.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| slug | text | Unique |
| title | text | Not null |
| content | text | Markdown, not null |
| product_id | text | FK → products.id |
| seo_title | text | — |
| seo_description | text | — |
| published_at | timestamp | defaultNow |

### page_views
Raw analytics — one row per product page visit.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| product_id | text | FK → products.id |
| source | text | direct / google / twitter / other |
| created_at | timestamp | defaultNow |

### payments
Payment records (Dodo Payments).
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| user_id | text | FK → users.id |
| product_id | text | Nullable FK → products.id (for Launch Boost) |
| dodo_payment_id | text | Unique |
| dodo_subscription_id | text | Nullable, for Builder Pass |
| tier | text | builder_pass / launch_boost |
| type | text | subscription / one_time |
| status | text | pending / completed / failed / cancelled |
| amount | integer | In cents (USD) |
| currency | text | Default USD |
| created_at | timestamp | defaultNow |

### comments
Threaded discussion comments on products (separate from roasts).
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| product_id | text | FK → products.id |
| user_id | text | FK → users.id |
| content | text | Not null, max 500 chars |
| parent_comment_id | text | Nullable, for threaded replies |
| upvote_count | integer | Default 0 |
| created_at | timestamp | defaultNow |

### comment_upvotes
One row per user per comment vote.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| user_id | text | FK → users.id |
| comment_id | text | FK → comments.id |
| created_at | timestamp | defaultNow |
| UNIQUE | — | (user_id, comment_id) |

### collections
User-curated product lists.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| user_id | text | FK → users.id (creator) |
| title | text | Not null, max 100 chars |
| description | text | Max 280 chars |
| is_public | boolean | Default true |
| item_count | integer | Default 0, denormalized |
| created_at | timestamp | defaultNow |

### collection_items
Products in a collection.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| collection_id | text | FK → collections.id |
| product_id | text | FK → products.id |
| added_at | timestamp | defaultNow |
| UNIQUE | — | (collection_id, product_id) |

### discussions
Community forum threads.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| user_id | text | FK → users.id |
| title | text | Not null, max 200 chars |
| content | text | Not null, max 2000 chars (markdown) |
| category | text | general / feedback / show / ask / announcement |
| reply_count | integer | Default 0, denormalized |
| upvote_count | integer | Default 0 |
| is_pinned | boolean | Default false |
| created_at | timestamp | defaultNow |

### discussion_replies
Replies to discussion threads.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| discussion_id | text | FK → discussions.id |
| user_id | text | FK → users.id |
| content | text | Not null, max 1000 chars |
| upvote_count | integer | Default 0 |
| created_at | timestamp | defaultNow |

### newsletter_subscribers
Weekly newsletter email list.
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key, nanoid |
| email | text | Unique, not null |
| user_id | text | Nullable FK → users.id (linked if logged in) |
| is_active | boolean | Default true |
| subscribed_at | timestamp | defaultNow |
| unsubscribed_at | timestamp | Nullable |

---

## 5. DATABASE INDEXES

| Table | Columns | Reason |
|---|---|---|
| products | (week_number, year) | Homepage leaderboard filter |
| products | (maker_id) | Dashboard my products query |
| products | (slug) | Product page URL lookup |
| upvotes | (product_id) | Count votes per product |
| upvotes | (user_id, product_id) | Check if user already voted |
| roasts | (product_id) | Load roasts for a product |
| page_views | (product_id, created_at) | Analytics chart queries |
| users | (username) | Profile page lookup |
| users | (email) | Auth email lookup |
| payments | (dodo_payment_id) | Webhook idempotency |
| comments | (product_id) | Load comments for a product |
| comment_upvotes | (user_id, comment_id) | Check if user already voted |
| collections | (user_id) | Dashboard my collections |
| collection_items | (collection_id) | Load items in a collection |
| discussions | (category) | Filter discussions by category |
| discussions | (created_at) | Sort discussions by date |
| discussion_replies | (discussion_id) | Load replies for a thread |
| newsletter_subscribers | (email) | Lookup by email |

---

## 6. AUTH FLOW (Clerk)

```
1. User clicks Login
       ↓
2. Clerk opens sign-in modal (GitHub or Google OAuth)
       ↓
3. Clerk handles entire OAuth flow and creates session
       ↓
4. clerkMiddleware() runs on every request
       ↓
5. auth() gives { userId } (Clerk's user ID)
       ↓
6. App checks — does clerk_user_id exist in users table?
       ↓                          ↓
   YES — returning user       NO — new user
       ↓                          ↓
   Continue                   Create user row
       ↓                     username = null
       ↓                          ↓
       ↓←─────────────────────────┘
       ↓
7. Middleware checks — does user have username?
       ↓                    ↓
      YES                   NO
       ↓                    ↓
   Continue            Redirect to /onboarding
       ↓                    ↓
   /dashboard          User sets username + bio
                            ↓
                       Update user row
                            ↓
                       Redirect to /dashboard
```

**Key Rules:**
- Clerk manages sessions, tokens, and OAuth — never handle this yourself
- auth() returns { userId } — this is the Clerk user ID
- currentUser() returns full Clerk user object (name, email, image)
- Your users table links to Clerk via clerk_user_id column
- Never trust client-sent user IDs — always read from auth()
- clerkMiddleware() in middleware.ts protects /dashboard routes
- Admin routes additionally check is_admin flag on user row

---

## 7. API ROUTE CONTRACTS

### POST /api/products/[id]/upvote
- Auth required: Yes
- Request body: None
- Success: `{ success: true, upvoted: boolean, newCount: number }`
- Error: `{ success: false, error: string }`
- Logic: Toggle upvote. Insert or delete from upvotes table. Update upvote_count on products. Both in one transaction.

### POST /api/products/[id]/roast
- Auth required: Yes
- Request body: `{ content: string, parentRoastId?: string }`
- Success: `{ success: true, roast: RoastObject }`
- Error: `{ success: false, error: string }`
- Logic: Validate content ≤ 280 chars. Check roast_enabled on product. Insert roast. Increment roast_count.

### POST /api/upload
- Auth required: Yes
- Request: multipart/form-data with image file
- Success: `{ success: true, url: string }`
- Error: `{ success: false, error: string }`
- Logic: Validate file type (image only) and size (max 2MB). Upload to Cloudinary. Return secure URL.

### GET /api/products
- Auth required: No
- Query params: `week`, `year`, `category`, `page`
- Success: `{ success: true, products: ProductObject[], total: number }`

### POST /api/products/[id]/comment
- Auth required: Yes
- Request body: `{ content: string, parentCommentId?: string }`
- Success: `{ success: true, comment: CommentObject }`
- Error: `{ success: false, error: string }`
- Logic: Validate content ≤ 500 chars. Insert comment. Increment comment_count on product. If parentCommentId set, it's a threaded reply.

### GET /api/products/[id]/comment
- Auth required: No
- Query params: `page`, `sort` (newest / top)
- Success: `{ success: true, comments: CommentObject[], total: number }`

### POST /api/collections
- Auth required: Yes
- Request body: `{ title: string, description?: string, isPublic?: boolean }`
- Success: `{ success: true, collection: CollectionObject }`
- Logic: Validate title ≤ 100 chars. Create collection linked to session user.

### POST /api/collections/[id]/items
- Auth required: Yes (must be collection owner)
- Request body: `{ productId: string }`
- Success: `{ success: true, added: boolean }`
- Logic: Check unique constraint. Insert item. Increment item_count.

### POST /api/discussions
- Auth required: Yes
- Request body: `{ title: string, content: string, category: string }`
- Success: `{ success: true, discussion: DiscussionObject }`
- Logic: Validate title ≤ 200, content ≤ 2000. Validate category enum.

### POST /api/discussions/[id]/reply
- Auth required: Yes
- Request body: `{ content: string }`
- Success: `{ success: true, reply: ReplyObject }`
- Logic: Validate content ≤ 1000. Insert reply. Increment reply_count.

### POST /api/newsletter
- Auth required: No
- Request body: `{ email: string }`
- Success: `{ success: true, subscribed: true }`
- Logic: Validate email with Zod. Check if already subscribed. Insert or reactivate.

### DELETE /api/newsletter
- Auth required: No
- Request body: `{ email: string }`
- Success: `{ success: true, unsubscribed: true }`
- Logic: Set is_active = false. Set unsubscribed_at.

### POST /api/webhooks/dodo
- Auth required: No (Verifies Dodo signature)
- Request body: Raw JSON payload
- Success: 200 OK
- Logic: Verify webhook signature. Handle `subscription.created`, `subscription.updated`, `payment.succeeded`. Update user tier or product status. Mark payment row as completed.

## 8. SYSTEM ARCHITECTURE BY STAGE

### Stage 1 — 0 to 1k Users (Current)
```
Browser
  ↓
Vercel Edge Network
  ↓
Next.js App (Vercel free)
  ↓         ↓           ↓
Neon      Cloudinary  Resend
Postgres  (media)     (email)
(free)
```
- No caching
- Direct DB queries on every request
- Synchronous email sending from API routes
- Zero infra cost

### Stage 2 — 1k to 10k Users
```
Browser
  ↓
Vercel Edge Network
  ↓
Next.js App
  ↓        ↓          ↓         ↓
Upstash  Neon       Cloudinary  Resend
Redis    Postgres
(cache)  + PgBouncer
         connection pooling
  ↓
Upstash QStash
(background jobs — emails, AI generation)
```
- Redis caches leaderboard (60s TTL), product pages (5min), profiles (2min)
- Connection pooling enabled on Neon
- Background queues for slow operations
- Rate limiting on all API routes via Redis

### Stage 3 — 10k to 100k Users
```
Browser
  ↓
Vercel Edge (render at edge globally)
  ↓
Next.js App
  ↓              ↓            ↓
Neon Primary   Neon Read    Upstash Redis
(writes only)  Replica      (cache + rate limit + queues)
               (reads only)
  ↓
Tinybird
(analytics — millions of page_view rows)
```
- Read replica splits read/write load
- Analytics moved off main Postgres to Tinybird
- Edge rendering for homepage, product pages, blog
- Queue-based upvote batching during viral spikes

---

## 9. SPRINT PLAN

### Sprint 0 — Project Setup ✅ / 🔄
**Goal:** Working Next.js app connected to Neon, auth ready to build
- Next.js 15 initialized
- All dependencies installed
- shadcn/ui configured
- Drizzle + Neon connected
- Full schema written and migrated
- .env.local configured
- .cursorrules and AGENT.md created
- First commit on GitHub

### Sprint 1 — Auth & Builder Profiles
**Goal:** Users can log in and have a public identity
- Login page (GitHub + Google via Clerk)
- Clerk middleware protecting /dashboard routes
- Onboarding flow (username, bio, socials)
- Public builder profile page /builders/[username]
- Settings page to edit profile

### Sprint 2 — Product Submission & Pages
**Goal:** Builders can submit products with public SEO pages
- Product submission form (all fields)
- Logo upload via Cloudinary
- Slug auto-generation
- Week number auto-assignment
- Public product page /products/[slug]
- OG meta tags per product
- Edit product page

### Sprint 3 — Weekly Leaderboard & Homepage
**Goal:** Homepage feels like a real ranked leaderboard
- getCurrentWeekProducts query
- ShipCard component
- Leaderboard component with week display
- Homepage with hero section
- Week selector for past weeks
- All products page with filters
- Search by product name

### Sprint 4 — Upvotes
**Goal:** Community can upvote, one per user per product
- Upvote toggle API route
- Optimistic UI update
- Login prompt modal for guests
- Upvote milestone email notifications (10, 50, 100)

### Sprint 5 — Roast Mode 🔥
**Goal:** ShipWeekly's biggest differentiator is live
- Roast section on product pages
- Roast submission (auth required)
- Maker replies to roasts
- Roast upvoting
- Maker can delete roasts on own products
- Top Roasts sidebar on homepage
- Email notification to maker on new roast

### Sprint 6 — Stack Reveal + MRR Badge
**Goal:** Full transparency features live
- Stack badges on product cards and pages
- /stacks discovery page — filter by technology
- Stack popularity stats
- MRR badge on product cards and pages
- MRR filter on homepage and products page

### Sprint 7 — Builder Streaks
**Goal:** Gamified weekly shipping habit
- Streak counter on builder profiles
- Vercel cron — weekly streak calculation (Monday 00:01 UTC)
- Streak reset logic for missed weeks
- Streak milestone badges (4, 8, 12, 52 weeks)
- Thursday reminder email for active streak builders
- Streak leaderboard page

### Sprint 8 — Maker Dashboard & Analytics
**Goal:** Builders understand their product performance
- Dashboard overview (total upvotes, roasts, views, streak)
- Per-product analytics page
- Page view tracking on product pages
- Line charts — views and upvotes over time
- Traffic source breakdown
- Weekly rank history per product

### Sprint 9 — Directories
**Goal:** Builders find places to submit their product
- /directories page
- Sort by domain rating
- Filter by free / paid / category
- Direct submit links
- Total directory count display

### Sprint 10 — Blog & AI Articles
**Goal:** SEO content engine for ShipWeekly and makers
- /blog listing page
- /blog/[slug] article page
- SEO meta tags per article
- AI article generation for Launch Boost users
- Sitemap at /sitemap.xml
- RSS feed at /blog/rss.xml

### Sprint 11 — Pricing & Payments
**Goal:** Make money while keeping core free
- Pricing page
- Dodo Payments checkout session creation
- Dodo webhook handler with signature verification
- Idempotent webhook processing
- Builder Pass subscription flow
- Launch Boost one-time payment flow
- Feature gating based on tier
- Payment records in database

### Sprint 12 — Threaded Comments
**Goal:** Product pages have full discussion alongside roasts
- Comment section on product pages (separate tab from roasts)
- Threaded replies (one level deep)
- Comment upvoting
- Comment moderation (maker can hide on own products)
- Comment count on ship cards
- Email notification to maker on new comment

### Sprint 13 — Collections
**Goal:** Users can curate and share product lists
- Create collection from dashboard
- Add/remove products to collections
- Public collection pages /collections/[id]
- Browse all public collections /collections
- Collection card component with preview thumbnails
- "Save to collection" button on product pages

### Sprint 14 — Community Discussions
**Goal:** Builders have a reason to return between launches
- /discussions forum page
- Create new discussion thread (auth required)
- Discussion categories: general, feedback, show, ask, announcement
- Threaded replies on discussion pages
- Upvoting on discussions and replies
- Pinned discussions (admin only)
- Trending discussions sidebar on homepage

### Sprint 15 — Weekly Newsletter
**Goal:** Recurring traffic driver and retention tool
- Newsletter subscribe form on homepage footer
- Newsletter subscribe form on product pages
- Vercel cron — Monday 09:00 UTC sends weekly digest
- Digest includes: top 5 products, hottest roast, builder spotlight, new discussions
- Unsubscribe link in every email
- Subscriber count display on homepage

### Sprint 16 — Screenshot Gallery + Launch Scheduling
**Goal:** Richer product pages and scheduled launches
- Multi-image upload on product submission (up to 5 screenshots)
- Screenshot gallery carousel on product pages
- Lightbox view for screenshots
- Launch scheduling — pick a future week to launch
- Scheduled products visible in dashboard with countdown
- Auto-publish when scheduled week begins (Monday 00:01 UTC cron)

### Sprint 17 — Product Badges + Embed Widget
**Goal:** Social proof and organic backlink growth
- Product of the Week badge — auto-awarded to #1 product each week (cron)
- Product of the Month badge — auto-awarded to top product across 4 weeks
- Badge display on product pages and builder profiles
- Badge history page /badges
- Embed widget — "Featured on ShipWeekly" HTML/JS snippet
- Embed widget generator on product page (copy code button)
- Widget links back to product page (free backlink to ShipWeekly)

### Sprint 18 — Launch Checklist
**Goal:** Guide new makers to successful launches
- /launch-checklist static page
- Step-by-step guide: before, during, after launch
- Tips for writing taglines, choosing categories, getting roasts
- Links to directories page for cross-posting

### Sprint 19 — Polish & Launch
**Goal:** Ship publicly with confidence
- Loading skeletons everywhere
- Empty states for all sections
- Error boundaries
- Full mobile responsive audit
- Dark mode
- Privacy policy, terms, refund policy pages
- Umami analytics setup
- Submit ShipWeekly to startup directories
- Launch tweet thread

---

## 10. MONETIZATION

### Free — $0 forever
- Unlimited product submissions
- Weekly leaderboard placement
- Public SEO product page
- Upvotes, roasts, and comments
- Stack reveal and MRR badge
- Basic analytics
- Dofollow backlink from product page
- Collections (create and browse)
- Community discussions access
- Weekly newsletter

### Builder Pass — $5/month subscription
- Everything in Free
- Verified checkmark badge on ALL products
- Priority placement above free listings
- Gold highlighted card on ALL products
- Advanced analytics on ALL products (traffic sources, rank history)
- Streak protection (1 skip per month)
- Launch scheduling (pick your launch week)
- Early access to new features

### Launch Boost — $19 one-time per product
- Everything Builder Pass offers for that product (no subscription needed)
- AI-generated launch article on /blog
- 3+ dofollow backlinks from article
- Article indexed via sitemap
- "Featured on ShipWeekly" embed widget code
- Screenshot gallery (up to 5 images)

### Payment Provider
Dodo Payments — Merchant of Record, handles global tax/GST/VAT
Subscription billing via Dodo Subscriptions API for Builder Pass

---

## 11. SEO ARCHITECTURE

### Page Types and Their Strategy
| Page | Render Type | SEO Priority |
|---|---|---|
| Homepage | Dynamic SSR | High — updated weekly |
| Product page | SSG (past) + SSR (current week) | Very High |
| Builder profile | Dynamic SSR | Medium |
| Blog article | SSG | Very High |
| Directories | SSG | Medium |
| Collections | Dynamic SSR | Medium |
| Discussions | Dynamic SSR | Medium |
| Launch checklist | SSG | High |

### Metadata Templates
- Product page: `[ProductName] — [Tagline] | ShipWeekly`
- Builder profile: `[Username] — [X] ships, [Y] upvotes | ShipWeekly`
- Blog article: `[ArticleTitle] | ShipWeekly Blog`
- Collection: `[Title] — Curated Products | ShipWeekly`
- Discussion: `[Title] | ShipWeekly Community`

### OG Images
Generated dynamically via Next.js OG Image API. Shows product logo, name, tagline, upvote count, and week badge.

### Sitemap
Auto-generated at /sitemap.xml. Includes all product pages, builder profiles, blog articles, and directory page. Submitted to Google Search Console on launch day.

---

## 12. ENVIRONMENT VARIABLES

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
CLOUDINARY_CLOUD_NAME=           # Cloudinary cloud name
CLOUDINARY_API_KEY=              # Cloudinary API key
CLOUDINARY_API_SECRET=           # Cloudinary API secret
CLOUDINARY_UPLOAD_PRESET=        # Unsigned upload preset name

# Email
RESEND_API_KEY=                  # Resend API key

# Payments (Dodo)
DODO_API_KEY=                    # Dodo Payments API key
DODO_WEBHOOK_SECRET=             # Dodo webhook signing key
NEXT_PUBLIC_DODO_BUILDER_PASS_PRICE_ID=   # Builder Pass product/price ID
NEXT_PUBLIC_DODO_LAUNCH_BOOST_PRICE_ID=   # Launch Boost product/price ID

# App
NEXT_PUBLIC_APP_URL=             # http://localhost:3000 (dev) or https://shipweekly.dev (prod)
```

---

## 13. CODING CONVENTIONS

- Default to server components. Use client components only when needed (useState, useEffect, event handlers, browser APIs)
- Server actions for all form submissions — never API routes for forms
- API routes only for external webhooks and third party callbacks
- All DB queries live in lib/db/queries.ts — components never import from lib/db directly
- All server actions live in lib/actions/
- Every public page exports generateMetadata
- IDs are always nanoid strings — never auto-increment integers
- Dates always stored as UTC in database
- Week numbers are always ISO week numbers (1 to 52)
- Zod validation on every server action and API route before touching DB
- Never expose raw DB errors to the client
- Response shape always: `{ success: true, data: ... }` or `{ success: false, error: "..." }`
- Never use `any` TypeScript type
- Always use Next.js Image for images, Link for internal navigation
- Use cn() from lib/utils.ts for conditional Tailwind classes

---

## 14. COMPONENT LIBRARY

All UI primitives come from shadcn/ui. Installed components:
`button, input, textarea, label, card, badge, avatar, dialog, toast, switch, select, separator, dropdown-menu, sheet, tabs`

Custom components and their purpose:
- `ship-card.tsx` — product card shown on leaderboard and product listing
- `leaderboard.tsx` — ranked list of ship cards for the current week
- `upvote-btn.tsx` — toggle upvote with optimistic update
- `roast-box.tsx` — full roast comment section with replies
- `comment-box.tsx` — threaded discussion comments on product pages
- `stack-badge.tsx` — colored pill showing one technology
- `mrr-badge.tsx` — revenue tier badge pill
- `builder-card.tsx` — compact maker info card shown on product page
- `streak-counter.tsx` — fire emoji + streak number display
- `analytics-chart.tsx` — line chart for dashboard views/upvotes
- `collection-card.tsx` — collection preview card with product thumbnails
- `discussion-card.tsx` — discussion thread preview card for forum listing
- `screenshot-gallery.tsx` — product screenshot carousel with lightbox
- `badge-display.tsx` — Product of the Week/Month badge display
- `embed-widget.tsx` — "Featured on ShipWeekly" embed code generator
- `newsletter-form.tsx` — email subscription form component

---

## 15. REFERENCE LISTS

### Categories
`developer-tools, saas, ai-ml, productivity, design, marketing, finance, education, health, ecommerce, open-source, mobile, api, no-code, chrome-extension`

### Tech Stack Options
`Next.js, React, Vue, Svelte, Nuxt, Remix, Astro, Node.js, Express, FastAPI, Django, Laravel, PostgreSQL, MySQL, MongoDB, Redis, Supabase, Firebase, Neon, PlanetScale, Prisma, Drizzle, Stripe, Razorpay, Cloudflare, Vercel, Railway, Render, AWS, Tailwind CSS, TypeScript, Python, Rust, Go, OpenAI, Anthropic, Langchain, Pinecone`

### MRR Badge Options
`$0, $1-$100, $100-$1k, $1k-$10k, $10k+`

---

## 16. CURRENT STATUS

### Current Sprint
**Sprint 0 — Project Setup**
Status: In Progress

### Completed Sprints
None yet

### Next Up
Sprint 1 — Auth & Builder Profiles

---

> Update this section after every sprint is completed.
> This file is the living record of where the project is at all times.
