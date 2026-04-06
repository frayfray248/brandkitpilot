# **UI**

This document describes the UI design of the BrandKitPilot app, covering the pages, their routes, authentication requirements, rendering strategies, and overall site navigation structure.

## **Pages**

| Page Name | URL Route | Auth | Purpose | Rendering Strategy |
| --- | --- | --- | --- | --- |
| Legal Accept | /legal/accept | User | Fetch latest legal docs and prompt user to agree | SSR |
| Privacy Policy | /privacy | Anonymous | Required for compliance | SSG |
| Terms of Use | /legal | Anonymous | Required for compliance | SSG |
| Purchase History | /purchases | User | List payments | SSR |
| Checkout | /checkout | User | Stripe checkout for buying tokens | SSG |
| Brand Kit Results | /results/[id] | User | Show generated copy with automatic refresh while status is pending | SSR |
| Brand Kit Wizard | /start | User | Select framework, fill inputs via guided wizard | SSG |
| Dashboard | /dashboard | User | Show Token Balance, purchase more tokens, CTA | SSR |
| Sign Up / Log In | /login | Anonymous | Auth via email or OAuth (Better-Auth) | SSG |
| Landing Page | / | Anonymous | Describe product, get signups | SSG |

## **Site Map**

```mermaid
graph TD
    A["Landing Page"] --> B["Sign Up / Log In"]
    B --> Legal["Legal Accept"]
    B --> C["Dashboard"]

    C --> D["Start New Brand Kit (/start)"]
    D --> E["Brand Kit Wizard (Select Framework + Input)"]
    E --> F["Brand Kit Results (/results/:id)"]
    F --> C

    C --> H["Checkout (/checkout)"]
    C --> G["Purchase History"]

    A --> J["Terms of Use (/terms)"]
    A --> K["Privacy Policy (/privacy)"]

    click J href "/terms" _blank
    click K href "/privacy" _blank
```

📌 **Note:** *"Terms of Use" and "Privacy Policy" are accessible via a persistent footer on all pages, even if only shown linked from the Landing Page here for simplicity.*
## Brand Kit Results Page - Polling Mechanism

The **Brand Kit Results** page (`/results/[id]`) implements automatic polling to display real-time updates as the brand kit generation completes:

### Initial Load
- Server-side rendering (`SSR`) fetches the current brand kit status on page load
- If status is `PENDING`, a client-side polling component takes over
- If status is `COMPLETED` or `FAILED`, the appropriate content is displayed immediately

### Client-Side Polling
When a brand kit is in `PENDING` state:
- **Polling starts automatically** with a 2-second interval
- The interval uses **exponential backoff**: 2s → 4s → 8s → 16s → 30s
- The client component calls the `getBrandKitStatus` Server Function to fetch updates
- **Polling stops automatically** when:
  - Status reaches a terminal state (`COMPLETED` or `FAILED`)
  - Component unmounts (e.g., user navigates away)
  - Connection errors occur 5+ consecutive times

### Error Handling
- Graceful error handling with visual feedback (error count indicator)
- Automatic retry with exponential backoff prevents server overload
- Users can manually refresh if polling fails

### User Experience
- Initial page load shows pending state with processing message
- Results automatically appear without manual refresh when generation completes
- Failed generations display an appropriate error message
- Error indicators help users understand when retries are occurring

## Landing Page Structure

The **Landing Page** (`/`) is a statically rendered (SSG) marketing page designed to convert anonymous visitors to signups. It follows StoryBrand messaging principles and consists of the following sections:

### Sections

1. **HeroSection** (`base-100`) - Primary hero with headline "Professional brand messaging in minutes", value proposition text, single CTA (Create Your BrandKit → `/start`), and micro-copy badge: "Takes less than 2 minutes".

2. **ProblemSection** (`base-200`) - Empathy section connecting with user pain points. Headline "Sound Familiar?" with failure avoidance messaging about unclear brand messaging challenges.

3. **AuthoritySection** (`base-100`) - Authority/trust section highlighting proven frameworks (StoryBrand, Brand Key, Brand Pyramid) with expert-level messaging claims.

4. **HowItWorksSection** (`base-100`) - 3-step explainer with numbered cards:
   - Step 1: Choose Your Framework
   - Step 2: Answer Guided Questions  
   - Step 3: Get Your Brand Kit
   Includes micro-copy badge: "Instant results".

5. **ValuePropSection** (`base-200`) - Success vision section "Walk Away With Confidence" with benefits of using the product (capture attention, build trust, convert visitors).

6. **SocialProofSection** (`base-200`) - Testimonials section with 2 placeholder testimonials displaying quotes and attribution. Marked as placeholder content.

7. **PricingSection** (`base-100`) - Token-based pricing section fetching real product data from Stripe. Shows benefits list and token pack prices. Links to `/checkout`.

8. **CTASection** (`primary`) - Final conversion CTA with success vision messaging "Ready to Build Your Brand?" and primary button (Create Your BrandKit → `/start`).

### Layout

- Full-width section backgrounds with constrained inner content (`max-w-3xl` to `max-w-5xl`)
- Alternating background colors (`base-100`, `base-200`, `primary`) for visual separation
- Uses existing component library: Stack, Box, Card, Button, Heading, Text, Badge, FlexBox
- Semantic HTML structure with proper heading hierarchy (h1 in Hero, h2 in other sections)
- PricingSection is async (fetches Stripe products) while other sections are static