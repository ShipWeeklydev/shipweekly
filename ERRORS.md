# ERRORS.md — ShipWeekly.dev Bug & Fix Log

> Every non-obvious bug fix is logged here. If you spent more than 10 minutes debugging something, write it down. Future-you (and future coding agents) will thank you.

---

## Error Format

```
### ERR-XXX: [Short Description]
- Date: YYYY-MM-DD
- Sprint: Sprint X
- Symptom: What went wrong (error message, unexpected behavior)
- Root Cause: Why it happened
- Fix: What was changed
- Files Changed: List of files modified
- Prevention: How to avoid this in the future
```

---

## Errors

### ERR-003: useActionState Strict Type Mismatch
- Date: 2026-05-04
- Sprint: Sprint 1
- Symptom: TypeScript error `Argument of type '{ success: boolean; error: string | Record<string, string[]> | null; }' is not assignable to parameter of type... Target signature provides too few arguments.`
- Root Cause: React 19's `useActionState` requires the `initialState` type to exactly match the return type of the Server Action wrapper. A simple inference mismatch causes massive TS errors.
- Fix: Explicitly defined a shared `type ActionState = { success: boolean; error?: string | Record<string, string[]> | null }` and applied it to `initialState` and the wrapper function's return type.
- Files Changed: `components/settings-form.tsx`
- Prevention: Always strictly type `initialState` and the action wrapper when using `useActionState`.

### ERR-001: Next.js 16 middleware.ts deprecation warning
- Date: 2026-05-04
- Sprint: Sprint 0
- Symptom: Build shows `⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.`
- Root Cause: Next.js 16.2.4 introduced a new `proxy` convention to replace `middleware.ts`. Clerk's `clerkMiddleware()` still uses the old pattern.
- Fix: No fix needed yet — middleware still works. Monitor Clerk docs for `proxy` support. When Clerk updates, migrate `middleware.ts` → `proxy.ts`.
- Files Changed: None (warning only, build succeeds)
- Prevention: Check Clerk changelog before upgrading Next.js major versions.

### ERR-002: drizzle-kit push fails with "connection url required"
- Date: 2026-05-04
- Sprint: Sprint 0
- Symptom: `npx drizzle-kit push` errors with `Either connection "url" or "host", "database" are required`
- Root Cause: `import "dotenv/config"` loads `.env` by default, but our secrets are in `.env.local`. Drizzle Kit does not auto-load `.env.local` like Next.js does.
- Fix: Changed `drizzle.config.ts` to use `import { config } from "dotenv"; config({ path: ".env.local" });`
- Files Changed: `drizzle.config.ts`
- Prevention: Always use explicit `config({ path: ".env.local" })` in any non-Next.js tooling config.

---

## Common Patterns to Watch

These are known gotchas for the tech stack. Log specific instances here when they bite you.

### Next.js App Router
- Server vs Client component confusion — "useState is not a function" means you forgot "use client"
- generateMetadata must be async and exported from page.tsx, not layout.tsx
- Server actions must be in files with "use server" or defined inline in server components
- Middleware runs on edge runtime — can't use Node.js APIs

### Clerk Auth
- clerkMiddleware() must be in middleware.ts at project root
- auth() returns { userId } in server components — NOT the full user object
- currentUser() is for getting the full Clerk user object
- Clerk user ID is different from your internal users table ID — always map via clerk_user_id

### Drizzle ORM
- Array columns (text[]) need special handling in insert/update
- Transactions must use db.transaction(async (tx) => { ... })
- Migration conflicts when schema.ts changes without running drizzle-kit generate

### Neon Postgres
- Use DATABASE_URL (pooled) for app queries, DATABASE_URL_UNPOOLED for migrations
- Connection timeouts on cold starts — neon serverless driver handles this, don't use pg directly

### Dodo Payments
- Webhook signature must be verified before processing any event
- Webhook handler must be idempotent — same event can arrive multiple times
- Subscription status changes are async — don't assume instant activation

---

> Rules for logging errors:
> 1. Only log NON-OBVIOUS bugs (not typos or missing imports)
> 2. Include the actual error message in Symptom
> 3. Be specific about the fix — include file names and line numbers if helpful
> 4. If you find a pattern, add it to "Common Patterns to Watch"
