# UI_SKETCH.md — ShipWeekly.dev UI Layout Reference

> The definitive layout reference for ShipWeekly's three-column responsive UI. All components and pages must follow this structure.

---

## Global Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     ROOT LAYOUT                             │
│  ┌──────────┬──────────────────────────┬──────────────────┐ │
│  │  LEFT    │       CENTER             │     RIGHT        │ │
│  │ SIDEBAR  │     MAIN FEED            │    SIDEBAR       │ │
│  │  240px   │     flex-1               │     320px        │ │
│  │  sticky  │     scrollable           │     sticky       │ │
│  └──────────┴──────────────────────────┴──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Behavior
| Breakpoint | Layout |
|---|---|
| **Desktop** (≥1280px) | Left sidebar + Center feed + Right sidebar |
| **Tablet** (768–1279px) | Center feed + Right sidebar (left sidebar → hamburger menu) |
| **Mobile** (<768px) | Center feed only (both sidebars → hamburger menu / hidden) |

---

## 1. LEFT SIDEBAR (240px, sticky)

```
┌─────────────────────┐
│ 🚀 ShipWeekly       │  ← Logo + brand
│                     │
│ ┌─────────────────┐ │
│ │ 🔍 Search...    │ │  ← Search products
│ └─────────────────┘ │
│                     │
│ 🏠 Home             │  ← / (weekly leaderboard)
│ 📦 Products         │  ← /products (all products)
│ 📊 Dashboard        │  ← /dashboard (auth required)
│ 👤 Profile          │  ← /builders/[username]
│                     │
│ ➕ New Launch        │  ← /submit (CTA button)
│ 📈 Analytics        │  ← /dashboard/analytics
│ ⚙️ Settings         │  ← /settings
│ 💰 Pricing          │  ← /pricing
│                     │
│ ┌─────────────────┐ │
│ │ 📁 Directories  │ │  ← Card with description
│ │ Hand-picked     │ │
│ │ places to list  │ │
│ │ your product.   │ │
│ │                 │ │
│ │ [Browse →]      │ │  ← /directories
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ 🔥 Roast Mode   │ │  ← ShipWeekly exclusive
│ │ Read the        │ │
│ │ spiciest takes  │ │
│ │ from builders.  │ │
│ │                 │ │
│ │ [Top Roasts →]  │ │
│ └─────────────────┘ │
└─────────────────────┘
```

### Nav Items (when logged in)
| Icon | Label | Route |
|---|---|---|
| 🏠 | Home | `/` |
| 📦 | Products | `/products` |
| 📊 | Dashboard | `/dashboard` |
| 👤 | Profile | `/builders/[username]` |
| ➕ | New Launch | `/submit` |
| 📈 | Analytics | `/dashboard/analytics` |
| ⚙️ | Settings | `/settings` |
| 💰 | Pricing | `/pricing` |

### Nav Items (when logged out)
Same as above but Dashboard, Profile, Analytics, Settings are hidden. "New Launch" becomes "Sign Up to Launch".

---

## 2. CENTER COLUMN (Main Feed — flex-1, scrollable)

### 2A. Top Header Bar

```
┌──────────────────────────────────────────────────────────┐
│ 🚀 ShipWeekly          [+ New Launch]     [🔔] [Avatar] │
└──────────────────────────────────────────────────────────┘
```
- Logo (links to `/`)
- "New Launch" primary CTA button
- Notification bell (future)
- User avatar dropdown (Profile, Settings, Sign Out)

### 2B. Week Selector

```
┌──────────────────────────────────────────────────────────┐
│  ◀  Week 16  Week 17  Week 18  [Week 19]  Week 20  ▶   │
└──────────────────────────────────────────────────────────┘
```
- Horizontally scrollable pill tabs
- Current week is highlighted with primary color
- Left/right arrow buttons for navigation
- Clicking a past week loads that week's products

### 2C. Product Cards (Leaderboard Feed)

Each product card in the feed:

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  #1  [LOGO]  Product Name  ✅ (verified badge)          │
│              Short tagline goes here                     │
│              💬 7  ◇ AI, SaaS, Productivity             │
│                                                          │
│       🔥 Stack: Next.js, Supabase, Tailwind    ▲  17    │
│       💰 $2.4k MRR                                      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Card Elements:**
| Element | Description |
|---|---|
| `#N` | Rank number (by upvotes this week) |
| Logo | 48×48 rounded product logo (from Cloudinary) |
| Product Name | Bold, clickable → `/products/[slug]` |
| Verified Badge | ✅ if Builder Pass subscriber |
| Tagline | 1-line description |
| 💬 Count | Comment count |
| Tags | Category tags (AI, SaaS, etc.) |
| 🔥 Stack | Tech stack pills visible on every card |
| 💰 MRR | Revenue badge visible on every card |
| ▲ Upvotes | Upvote button + count (right-aligned) |

### 2D. Sponsored Slot (Future — Sprint 10+)

```
┌──────────────────────────────────────────────────────────┐
│  SPONSORED   Your product could be here                  │
│              ADVERTISE — $49/WEEK                         │
└──────────────────────────────────────────────────────────┘
```
Inserted after product #3 in the feed.

---

## 3. RIGHT SIDEBAR (320px, sticky)

### 3A. Featured Product Card (Promoted)

```
┌─────────────────────────┐
│  [Visit →]              │
│                         │
│  [Product Logo]         │
│  Product Name           │
│  Short tagline          │
│                         │
│  [Advertise] [Promoted] │
└─────────────────────────┘
```

### 3B. Last Week's Best (Top 3)

```
┌─────────────────────────┐
│ 🏆 Last Week's Best     │
│    Week 18, 2026    →   │
│                         │
│ [Logo] ProductA  🥇 138 │
│ [Logo] ProductB  🥈 103 │
│ [Logo] ProductC  🥉  63 │
└─────────────────────────┘
```

### 3C. Top Builders This Month

```
┌─────────────────────────┐
│ 🔥 Top Builders         │
│                         │
│ [Avatar] @builder1  🔥5 │  ← 5-week streak
│ [Avatar] @builder2  🔥3 │
│ [Avatar] @builder3  🔥2 │
│                         │
│ [View All Builders →]   │
└─────────────────────────┘
```

### 3D. Newsletter CTA

```
┌─────────────────────────┐
│ 📬 Weekly Digest        │
│                         │
│ Get the top 5 products  │
│ every Monday morning.   │
│                         │
│ [email@example.com    ] │
│ [Subscribe]             │
└─────────────────────────┘
```

### 3E. Stack Trends

```
┌─────────────────────────┐
│ 📊 Trending Stacks      │
│                         │
│ Next.js ████████░░  42  │
│ Supabase ██████░░░  31  │
│ Tailwind █████░░░░  28  │
│ Clerk    ████░░░░░  19  │
│                         │
│ [Explore Stacks →]      │
└─────────────────────────┘
```

---

## 4. PAGE-SPECIFIC LAYOUTS

### 4A. Homepage (`/`)
Uses the full three-column layout described above.

### 4B. Product Detail Page (`/products/[slug]`)

```
┌──────────┬───────────────────────────────┬──────────────┐
│  LEFT    │  Product Hero                 │   RIGHT      │
│  SIDEBAR │  ┌─────────────────────────┐  │   SIDEBAR    │
│  (same)  │  │ Logo + Name + Tagline   │  │              │
│          │  │ by @builder  🔥4 streak │  │  Visit Site  │
│          │  │ ▲ 47 upvotes            │  │  [Button]    │
│          │  │                         │  │              │
│          │  │ Screenshot Gallery      │  │  Stack       │
│          │  │ [img] [img] [img]       │  │  ┌─────────┐│
│          │  │                         │  │  │ Next.js  ││
│          │  │ Description (markdown)  │  │  │ Neon     ││
│          │  │ ...                     │  │  │ Clerk    ││
│          │  │                         │  │  └─────────┘│
│          │  │ 🔥 ROAST SECTION        │  │              │
│          │  │ "The landing page looks │  │  MRR Badge   │
│          │  │  like it was built in   │  │  💰 $2.4k    │
│          │  │  2019" — @roaster       │  │              │
│          │  │                         │  │  Categories  │
│          │  │ 💬 COMMENTS             │  │  AI, SaaS    │
│          │  │ ...                     │  │              │
│          │  └─────────────────────────┘  │  Launched    │
│          │                               │  Week 19     │
└──────────┴───────────────────────────────┴──────────────┘
```

### 4C. Builder Profile (`/builders/[username]`)

```
┌──────────┬───────────────────────────────┬──────────────┐
│  LEFT    │  Builder Hero                 │   RIGHT      │
│  SIDEBAR │  ┌─────────────────────────┐  │   SIDEBAR    │
│  (same)  │  │ Avatar + Name           │  │              │
│          │  │ @username               │  │  Stats       │
│          │  │ Bio text                │  │  Products: 5 │
│          │  │ 🔗 twitter 🔗 github    │  │  Upvotes: 89 │
│          │  │ 🔥 12-week streak       │  │  Streak: 🔥12│
│          │  │                         │  │              │
│          │  │ ── Shipped Products ──  │  │  Badges      │
│          │  │ [ProductCard]           │  │  🏆 PotW x2  │
│          │  │ [ProductCard]           │  │  🔥 Streak 8 │
│          │  │ [ProductCard]           │  │  💎 Builder  │
│          │  └─────────────────────────┘  │     Pass     │
│          │                               │              │
└──────────┴───────────────────────────────┴──────────────┘
```

### 4D. Dashboard (`/dashboard`)
Uses two-column layout (left sidebar + main content). No right sidebar needed — full-width main area for analytics, tables, and forms.

---

## 5. WHAT MAKES SHIPWEEKLY UNIQUE

| Feature | Description |
|---|---|
| Stack Reveal | Tech stack pills on every product card and detail page |
| MRR Badge | Revenue badge on cards ("$2.4k MRR") — transparency first |
| Roast Mode 🔥 | Dedicated roast section on product pages for brutally honest feedback |
| Builder Streaks | Fire emoji streak counter on profiles — gamified shipping |
| Trending Stacks | Right sidebar widget showing the most popular tech this week |
| Top Builders | Right sidebar leaderboard for the most active builders |
| Saffron Aesthetic | Warm India design with bold saffron accents — not another bland SaaS UI |

---

## 6. COMPONENT MAPPING

| UI Section | Component File | Folder |
|---|---|---|
| Left Sidebar | `app-sidebar.tsx` | `components/layout/` |
| Right Sidebar | `right-sidebar.tsx` | `components/layout/` |
| Week Selector | `week-selector.tsx` | `components/leaderboard/` |
| Product Card (Feed) | `ship-card.tsx` | `components/leaderboard/` |
| Upvote Button | `upvote-btn.tsx` | `components/leaderboard/` |
| Stack Pills | `stack-badge.tsx` | `components/product/` |
| MRR Badge | `mrr-badge.tsx` | `components/product/` |
| Roast Section | `roast-box.tsx` | `components/product/` |
| Screenshot Gallery | `screenshot-gallery.tsx` | `components/product/` |
| Builder Card | `builder-card.tsx` | `components/profile/` |
| Streak Counter | `streak-counter.tsx` | `components/profile/` |
| Newsletter Form | `newsletter-form.tsx` | `components/marketing/` |
| Top Builders Widget | `top-builders.tsx` | `components/layout/` |
| Trending Stacks Widget | `trending-stacks.tsx` | `components/layout/` |
| Last Week's Best | `last-week-best.tsx` | `components/layout/` |

---

## 7. DESIGN TOKENS (Saffron / Warm India)

| Token | Value | Usage |
|---|---|---|
| Primary | `hsl(36, 100%, 50%)` | Saffron — CTAs, active tabs, highlights |
| Primary Foreground | `hsl(0, 0%, 100%)` | White text on saffron |
| Background | `hsl(0, 0%, 100%)` | Clean white base |
| Card | `hsl(0, 0%, 98%)` | Subtle gray for cards |
| Border | `hsl(0, 0%, 92%)` | Light borders |
| Muted | `hsl(0, 0%, 96%)` | Muted backgrounds |
| Accent | `hsl(15, 90%, 55%)` | Deep orange for fire/roast elements |
| Destructive | `hsl(0, 85%, 60%)` | Red for errors |

---

> **Next Step:** Implement the three-column `AppShell` layout component, then build each widget piece by piece as we progress through the sprints.
