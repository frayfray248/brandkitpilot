# Data Access Layer (DAL)

This document describes the architecture, conventions, and usage patterns of the Data Access Layer in BrandKitPilot. The DAL is the **sole authorized interface** between the application and the database — all database reads and writes outside of the authentication system must flow through it.

---

## Table of Contents

- [Overview](#overview)
- [Architecture Diagram](#architecture-diagram)
- [Database Foundation](#database-foundation)
  - [Prisma Client Singleton](#prisma-client-singleton)
  - [Client Extensions](#client-extensions)
  - [Connection URL Construction](#connection-url-construction)
- [DAL Modules](#dal-modules)
  - [users.ts](#usersts)
  - [brandkits.ts](#brandkitsts)
  - [tokens.ts](#tokensts)
  - [tokenTransactions.ts](#tokentransactionsts)
  - [brandFrameworks.ts](#brandframeworksts)
- [Authentication and Authorization](#authentication-and-authorization)
  - [Server Auth Checks](#server-auth-checks)
  - [Admin Auth Checks](#admin-auth-checks)
  - [Unauthenticated DAL Functions](#unauthenticated-dal-functions)
- [Transaction Patterns](#transaction-patterns)
  - [Batch Transactions](#batch-transactions)
  - [Atomic Multi-Model Updates](#atomic-multi-model-updates)
- [ESLint Enforcement](#eslint-enforcement)
- [Data Flow Examples](#data-flow-examples)
  - [Server Component → DAL](#server-component--dal)
  - [Server Action → DAL](#server-action--dal)
  - [Background Worker → DAL](#background-worker--dal)
  - [Stripe Webhook → DAL](#stripe-webhook--dal)
- [Conventions and Best Practices](#conventions-and-best-practices)

---

## Overview

The Data Access Layer (DAL) lives in `src/lib/dal/` and is organized into five domain-specific modules:

| Module | File | Domain |
|--------|------|--------|
| Users | `users.ts` | User profiles, terms acceptance, admin queries |
| Brand Kits | `brandkits.ts` | Brand kit CRUD, completion with token deduction |
| Tokens | `tokens.ts` | Token balance mutations (add/deduct), idempotency checks |
| Token Transactions | `tokenTransactions.ts` | Transaction creation, user transaction history |
| Brand Frameworks | `brandFrameworks.ts` | Framework lookups (all, by slug) |

Each module exports plain async functions that encapsulate Prisma queries. Consumers (pages, API routes, workers) import only from `@/lib/dal/*` and never touch `@prisma/client` or `@/db/db` directly.

---

## Architecture Diagram

```mermaid
flowchart TD
    subgraph Consumers
        SC["Server Components\n(Pages)"]
        AR["API Routes &\nServer Actions"]
        BW["Background Workers\n(BullMQ Processors)"]
    end

    subgraph DAL["DAL Layer — src/lib/dal/*"]
        users["users.ts"]
        brandkits["brandkits.ts"]
        tokens["tokens.ts"]
        txns["tokenTransactions.ts"]
        frameworks["brandFrameworks.ts"]
    end

    subgraph DB["Database Layer"]
        prisma["Prisma ORM Singleton\nsrc/db/db.ts"]
        mongo[("MongoDB")]
    end

    subgraph Exception["⚠ Exception"]
        auth["auth.ts\n(Better Auth adapter)"]
    end

    SC --> DAL
    AR --> DAL
    BW --> DAL

    DAL --> prisma
    prisma --> mongo

    auth -. "direct import\n(ESLint bypassed)" .-> prisma
```

---

## Database Foundation

### Prisma Client Singleton

The Prisma client is instantiated in `src/db/db.ts` as a **global singleton** to prevent multiple client instances during development hot-reloading:

```typescript
// src/db/db.ts (simplified)
const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || getDatabaseUrl()
}).$extends({ /* ... */ })

if (serverEnv.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
```

Key details:
- **In development**, the client is cached on the `global` object so Next.js hot-reloads don't create new connections.
- **In production**, a single instance is created per process lifetime.
- The `datasourceUrl` supports both a single `DATABASE_URL` env var and a decomposed set of `DATABASE_*` variables (via `getDatabaseUrl()`).

### Client Extensions

The Prisma client is extended with a `$extends` block that sets default values Prisma cannot express in the schema:

```typescript
.$extends({
    name: "Default User termsAccepted",
    query: {
        user: {
            async create({ args, query }) {
                if (!args.data.termsAccepted) {
                    args.data.termsAccepted = {
                        timestamp: new Date().toISOString(),
                        version: ""
                    }
                }
                return query(args);
            }
        }
    }
})
```

This extension exists because:
1. Prisma does not support default values for **composite types** (embedded documents in MongoDB).
2. Better Auth's user creation flow cannot pass arbitrary JS objects as additional fields.
3. The extension intercepts every `user.create` call and injects a default `termsAccepted` value if one isn't provided — an empty `version` string signals that the user has not yet explicitly accepted the terms.

### Connection URL Construction

`src/db/utils.ts` exports `getDatabaseUrl()`, which assembles a MongoDB connection string from discrete environment variables:

```
DATABASE_PROTOCOL + DATABASE_USERNAME + DATABASE_PASSWORD
+ DATABASE_HOST + DATABASE_PORT + DATABASE_NAME + DATABASE_ARGS
→ mongodb://user:pass@host:port/dbname?authSource=admin
```

Credentials are URL-encoded to handle special characters. `DATABASE_ARGS` is the only optional variable.

---

## DAL Modules

### users.ts

**Directive:** `"use server"` — functions in this module can be called as React Server Actions and from Server Components.

| Function | Auth Required | Description |
|----------|---------------|-------------|
| `getUser()` | Yes (session) | Returns the full `User` record for the currently authenticated user. Throws if not found. |
| `userAcceptTerms(version)` | Yes (session) | Updates the authenticated user's `termsAccepted` with the given version string and current timestamp. |
| `getAllUsers()` | Yes (admin) | Returns a projected list of all users (id, name, email, role, tokens, ban status). Admin only. |
| `getUserCount()` | Yes (admin) | Returns the total user count. Admin only. |

**Notable patterns:**
- `getUser()` is the most widely used DAL function — called by nearly every authenticated page to retrieve user state and gate access based on terms acceptance.
- Admin functions use `checkAdminAuth()`, which verifies both authentication *and* admin role before querying.

### brandkits.ts

| Function | Auth Required | Description |
|----------|---------------|-------------|
| `createBrandKit(userId, title)` | No | Creates a new brand kit with `PENDING` status and empty outputs. |
| `updateBrandKitById(brandKitId, updates)` | No | Partially updates a brand kit by ID. Protects `id` and `userId` from modification via `Omit`. |
| `getBrandKitById(brandKitId)` | Yes (session) | Fetches a single brand kit by its ID. |
| `getAllBrandKitsByUserId(userId)` | Yes (session + ownership) | Fetches all brand kits for a user. Validates that the session user matches the requested `userId`. |
| `getBrandKitForExport(brandKitId)` | Yes (session + ownership) | Fetches a brand kit for export. Returns `null` if not found, not owned by user, or not `COMPLETED`. |
| `completeBrandKitWithTokenDeduction(...)` | No | Atomic transaction: updates brand kit to `COMPLETED`, deducts tokens from user, and logs a transaction. |

**Notable patterns:**
- `createBrandKit` and `updateBrandKitById` are **unauthenticated** because they are called from background workers (BullMQ processors) that don't have an HTTP request context with session cookies.
- `completeBrandKitWithTokenDeduction` uses `prisma.$transaction()` (batch mode) to guarantee atomicity across three models — see [Transaction Patterns](#transaction-patterns).
- `getAllBrandKitsByUserId` performs an **ownership check**: even with a valid session, a user can only fetch their own brand kits.
- `getBrandKitForExport` validates ownership and status, returning `null` for unauthorized or incomplete brand kits instead of throwing.

### tokens.ts

| Function | Auth Required | Description |
|----------|---------------|-------------|
| `addTokensToUser(userId, tokens, stripeSessionId)` | No | Atomically increments user tokens and creates a `PURCHASE` transaction. |
| `deductTokensFromUser(userId, tokens)` | No | Atomically decrements user tokens and creates a `CONSUME` transaction. |
| `stripeTransactionExists(stripeSessionId)` | No | Idempotency check: returns `true` if a transaction with the given Stripe session ID already exists. |

**Notable patterns:**
- Both mutation functions use `prisma.$transaction()` to keep the user's token balance and the transaction log in sync.
- `stripeTransactionExists` leverages the `@@unique([stripeSessionId])` constraint on `TokenTransaction` to provide a fast uniqueness lookup, preventing duplicate fulfillment of Stripe checkout sessions.
- These functions are unauthenticated because they're called from webhook handlers and background workers.
- Exports `TOKENS_PER_USD = 4000` as a shared conversion rate constant.

### tokenTransactions.ts

**Directive:** `"use server"`

| Function | Auth Required | Description |
|----------|---------------|-------------|
| `createTokenTransaction(userId, type, tokens, stripeSessionId?)` | No | Creates a standalone token transaction record. |
| `getUserTokenTransactions()` | Yes (session) | Returns all transactions for the authenticated user, ordered by most recent first. |

**Notable patterns:**
- `getUserTokenTransactions` reads the `userId` directly from the session, ensuring users can only see their own transactions.
- `createTokenTransaction` is a lower-level primitive; higher-level functions in `tokens.ts` and `brandkits.ts` typically create transactions as part of larger atomic operations.

### brandFrameworks.ts

**Directive:** `"use server"`

| Function | Auth Required | Description |
|----------|---------------|-------------|
| `getFrameworks()` | Yes (session) | Returns all brand frameworks. |
| `getFrameworkBySlug(slug)` | No | Returns a single framework by its unique slug. |

**Notable patterns:**
- `getFrameworkBySlug` is unauthenticated because it's called from the background worker during brand kit processing, where no HTTP session is available.
- `getFrameworks` requires authentication since it's only called from the `/start` page where the user selects a framework.

---

## Authentication and Authorization

The DAL enforces authentication and authorization at the function level using helpers from `src/lib/auth/server/session.ts`.

### Server Auth Checks

Most user-facing DAL functions call `checkServerAuth(headers)`:

```typescript
export const checkServerAuth = async (headers) => {
    const session = await getServerSession(headers)
    if (!session) {
        redirect(CHECK_AUTH_REDIRECT_URL)  // → /login
    }
    return session
}
```

This:
1. Reads the session from the request headers via Better Auth.
2. Redirects unauthenticated users to the login page (never throws, uses Next.js `redirect()`).
3. Returns the authenticated session for downstream use (e.g., reading `session.user.id`).

### Admin Auth Checks

Admin functions call `checkAdminAuth(headers)`:

```typescript
export const checkAdminAuth = async (headers) => {
    const session = await getServerSession(headers)
    if (!session) redirect(CHECK_AUTH_REDIRECT_URL)
    if (!isAdmin(session.user.role)) redirect(CHECK_ADMIN_AUTH_REDIRECT_URL)
    return session
}
```

This adds a **role check** on top of the session check, redirecting non-admin users to a separate URL.

### Unauthenticated DAL Functions

Several DAL functions deliberately omit auth checks:

| Function | Reason |
|----------|--------|
| `createBrandKit` | Called from server actions after auth is already verified upstream. |
| `updateBrandKitById` | Called from background workers with no HTTP context. |
| `completeBrandKitWithTokenDeduction` | Called from background workers with no HTTP context. |
| `addTokensToUser` | Called from Stripe webhook fulfillment handlers. |
| `deductTokensFromUser` | Called from background workers with no HTTP context. |
| `stripeTransactionExists` | Called from Stripe webhook fulfillment handlers. |
| `createTokenTransaction` | Lower-level primitive, auth handled by callers. |
| `getFrameworkBySlug` | Called from background workers with no HTTP context. |

These functions trust that their callers (server actions, webhook handlers, workers) have already verified authorization or are running in trusted server-side contexts.

---

## Transaction Patterns

The DAL uses Prisma's `$transaction()` API (batch mode) to ensure atomicity for operations that span multiple models.

### Batch Transactions

Prisma batch transactions accept an array of Prisma operations and execute them atomically. All succeed or all fail. Used in two patterns:

**Pattern 1: Token balance + transaction log** (in `tokens.ts`)

```typescript
await prisma.$transaction([
    prisma.user.update({
        where: { id: userId },
        data: { tokens: { increment: tokens } }
    }),
    prisma.tokenTransaction.create({
        data: { userId, type: "PURCHASE", tokens, stripeSessionId }
    })
])
```

This ensures that a user's token balance is never incremented without a corresponding audit trail record, and vice versa.

**Pattern 2: Brand kit completion + token deduction + transaction log** (in `brandkits.ts`)

```typescript
return await prisma.$transaction([
    prisma.brandKit.update({
        where: { id: brandKitId },
        data: { status: BrandKitStatus.COMPLETED, outputs }
    }),
    prisma.user.update({
        where: { id: userId },
        data: { tokens: { decrement: tokensConsumed } }
    }),
    prisma.tokenTransaction.create({
        data: { userId, type: "CONSUME", tokens: tokensConsumed }
    })
])
```

This is the most complex transaction in the application — three model updates in a single atomic operation. The return type is a typed tuple `[BrandKit, User, TokenTransaction]`, giving callers access to all three updated records.

### Atomic Multi-Model Updates

A key design principle: **every token balance change is paired with a `TokenTransaction` record inside a single transaction**. This makes the token economy fully auditable — the sum of all `PURCHASE` transactions minus the sum of all `CONSUME` transactions should always equal the user's current `tokens` balance.

---

## ESLint Enforcement

The DAL's exclusivity is enforced at the linting level via a custom rule in `eslint.config.mjs`:

```javascript
const dalConfig = {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    ignores: ["src/lib/dal/**/*.{js,ts,jsx,tsx}", "src/auth/auth.ts"],
    rules: {
        "no-restricted-imports": ["error", {
            paths: [
                {
                    name: "@prisma/client",
                    message: "Please use the data access layer (src/lib/dal) instead of importing Prisma Client directly.",
                },
                {
                    name: "@/db/db",
                    message: "Please use the data access layer (src/lib/dal) instead of importing the database client directly.",
                }
            ]
        }]
    }
}
```

This rule:
1. **Applies to** all source files in `src/`.
2. **Ignores** the DAL itself (`src/lib/dal/**`) and the Better Auth config (`src/auth/auth.ts`).
3. **Blocks** direct imports of `@prisma/client` and `@/db/db` everywhere else with a descriptive error message.

The Better Auth exemption exists because the `betterAuth()` setup requires a direct Prisma adapter reference that cannot be cleanly routed through the DAL.

---

## Data Flow Examples

### Server Component → DAL

The most common pattern. Next.js Server Components call DAL functions directly:

```
/dashboard (Server Component)
  → getUser()               [DAL - users.ts]
  → getAllBrandKitsByUserId  [DAL - brandkits.ts]
  → Renders page with data
```

Auth is verified inside the DAL functions themselves. If the user is not authenticated, `checkServerAuth` triggers a redirect before any data is fetched.

### Server Action → DAL

The brand kit creation flow uses a server action that calls into the DAL and then enqueues a background job:

```
User submits form
  → startGenerateBrandKitJob()  [Server Action - queue/actions.ts]
    → createBrandKit()          [DAL - brandkits.ts]       (creates PENDING kit)
    → queue.add()               [BullMQ]                   (enqueues processing job)
  → Returns brandKitId to client
```

### Background Worker → DAL

BullMQ workers process brand kit generation asynchronously. They call DAL functions without auth checks:

```
BullMQ Worker picks up job
  → processBrandKitJob()                    [Worker - brandkit.processor.ts]
    → getFrameworkBySlug()                  [DAL - brandFrameworks.ts]
    → createBrandKitResponse()              [AI - responses.ts]
    → completeBrandKitWithTokenDeduction()  [DAL - brandkits.ts]     (atomic transaction)
  On failure:
    → updateBrandKitById(status: FAILED)    [DAL - brandkits.ts]
```

### Stripe Webhook → DAL

When Stripe confirms a payment, the webhook handler fulfills the purchase:

```
POST /api/webhooks/stripe/checkout
  → fulfillCheckout(session)            [lib/stripe/fulfillCheckout.ts]
    → stripeTransactionExists()         [DAL - tokens.ts]  (idempotency check)
    → addTokensToUser()                 [DAL - tokens.ts]  (atomic: balance + txn)
```

The `stripeTransactionExists` check prevents double-fulfillment — Stripe may deliver the same webhook event multiple times.

---

## Conventions and Best Practices

1. **All database access goes through the DAL.** No component, API route, or utility should import `@/db/db` or `@prisma/client` directly. This is enforced by ESLint.

2. **Auth at the DAL boundary.** Functions called from user-facing contexts (Server Components, Server Actions) include their own auth checks. Functions called from trusted server contexts (workers, webhooks) omit auth and trust the caller.

3. **Transactions for multi-model mutations.** Any operation that modifies more than one model uses `prisma.$transaction()` to guarantee atomicity. This is especially critical for token operations where balance and audit trail must stay in sync.

4. **`"use server"` directive.** Modules that export functions callable as React Server Actions use the `"use server"` directive at the top of the file. Not all DAL modules use this — `tokens.ts` and `brandkits.ts` omit it because they're primarily consumed by backend services (workers, webhooks) rather than React components.

5. **Typed return values.** Functions return Prisma-generated types (`User`, `BrandKit`, `TokenTransaction`, etc.) directly, keeping the type system end-to-end from schema to UI.

6. **Ownership checks.** Where a function could return another user's data, the DAL validates ownership (e.g., `getAllBrandKitsByUserId` compares `session.user.id` against the requested `userId`).

7. **Idempotency.** The `stripeTransactionExists` function and the `@@unique([stripeSessionId])` schema constraint together prevent duplicate transaction processing from webhook retries.

8. **Single responsibility per module.** Each DAL file maps to one primary domain model. Cross-model transactions (like `completeBrandKitWithTokenDeduction`) live in the module of the primary entity being affected.
