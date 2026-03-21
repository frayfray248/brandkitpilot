# BrandKitPilot Project Agents.md Guide for AI Agents

This Agents.md file provides comprehensive guidance for the OpenAI Codex, GitHub Copilot, and other AI agents working with this codebase.

## Required Reading

Before making any changes, read and follow the instructions in these files:

- `.github/instructions/agent-instructions.md` — required workflow, constraints, and guardrails
- `.github/instructions/general-project-instructions.md` — coding conventions and project standards

## Project Structure for the AI Agent Navigation

```
/
├── .github/                # GitHub configuration
│   ├── instructions/      # AI agent instructions
│   └── prompts/           # Development prompts
├── .storybook/            # Storybook configuration
│   ├── main.ts           # Storybook main config
│   ├── preview.ts        # Global Storybook settings
│   └── vitest.setup.ts   # Vitest integration setup
├── docker/                # Docker configuration
│   ├── .env              # Docker environment variables
│   ├── docker-compose.yml # Multi-service orchestration
│   ├── docker-entrypoint.sh # Worker container entrypoint script
│   ├── Dockerfile.playwright # Playwright test container
│   ├── Dockerfile.worker # Worker container configuration
│   └── mongodb-init.sh   # MongoDB replica set initialisation script
├── docs/                  # Project documentation
├── generated/             # Generated code
│   └── prisma/           # Generated Prisma client
├── prisma/               # Database schema and scripts
|   ├── schema.prisma     # Prisma schema definition
|   └── seed/             # Environment-specific seed scripts (dev, prod, test)
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API endpoints (auth, health, stripe, webhooks)
│   │   ├── checkout/     # Stripe checkout page
│   │   ├── dashboard/    # User dashboard and brand kit management
│   │   ├── legal/        # Legal pages (terms, privacy, acceptance)
│   │   ├── login/        # Authentication pages
│   │   ├── purchases/    # Purchase history and token management
│   │   ├── results/      # Brand kit results display ([id] dynamic routes)
│   │   ├── signup/       # User registration
│   │   ├── start/        # Brand kit creation form
│   │   └── [core files]  # globals.css, layout.tsx, page.tsx
│   ├── auth/             # Better Auth configuration
│   │   ├── auth.ts       # Server auth configuration
│   │   ├── authClient.ts # Client auth utilities
│   │   └── const.ts      # Auth constants
│   ├── components/       # React components with Storybook stories
│   ├── db/               # Database connection
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Shared utilities and services
│       ├── ai/           # OpenAI integration and brand generation
│       ├── api/          # API utilities and standardized responses
│       ├── auth/         # Authentication utilities (client/server)
│       ├── dal/          # Data Access Layer (brandkits, tokens, users)
│       ├── email/        # Email services and transport configuration
│       ├── env/          # Environment variable configuration
│       ├── queue/        # BullMQ job processing and schemas
│       ├── redis/        # Redis connection management
│       ├── stripe/       # Payment processing utilities
│       └── worker/       # Background job workers
├── scripts/              # Shell scripts for dev and CI workflows
├── tests/                # Playwright end-to-end tests
│   ├── specs/            # Test specs
│   ├── pages/            # Page object models
│   └── helpers/          # Test utility helpers
├── AGENTS.md             # AI agent development guide
```


## Documentation for the AI Agent

- The AI Agent should refer to the README.md for overall project understanding, setup instructions, and development guidelines.
- For specific technical documentation, the AI Agent should consult the `/docs/` directory, which contains detailed documentation on various aspects of the project, including API specifications, database schema, authentication flow, and more.

### Documentation Navigation

Use the table below to locate the right documentation file for a given topic:

| File | Description |
| --- | --- |
| `docs/BrandKitPilot/design/Architecture.md` | High-level system architecture, tech stack, and component interaction diagram |
| `docs/BrandKitPilot/design/UI.md` | Pages, URL routes, auth requirements, rendering strategies, and site map |
| `docs/BrandKitPilot/design/Data.md` | Data sources and storage providers. Data models are defined in `prisma/schema.prisma` |
| `docs/BrandKitPilot/development.md` | Local development setup, environment variables, and development workflow |
| `docs/BrandKitPilot/systems/auth.md` | Authentication system: magic link flow, session config, and admin role system |
| `docs/BrandKitPilot/systems/brandKitGeneration.md` | AI-powered brand kit generation pipeline and worker processing |
| `docs/BrandKitPilot/systems/payments.md` | Stripe integration, token purchasing, checkout flow, and webhooks |
| `docs/BrandKitPilot/systems/workerQueues.md` | BullMQ worker queue setup, job lifecycle, and Redis/Valkey configuration |
| `docs/api.md` | API endpoint reference: routes, request/response shapes, and auth requirements |
| `docs/better-auth.md` | Better Auth LLM-specific reference for working with the auth framework |
| `docs/data-access-layer.md` | DAL patterns, conventions, and how to add new data access functions |
| `docs/component-patterns.md` | UI component conventions, patterns, and usage guidelines |
| `docs/component-list.md` | Inventory of all available UI components and their props |

### Authentication Guidelines for AI Agents

This project uses **Better Auth** for authentication. AI agents should be familiar with this system when working on authentication-related features.

The `/docs/better-auth.md` file contains Better Auth's LLM-specific documentation designed to help AI models understand how to properly interact with the authentication system.

- Always use `authClient.useSession()` for session state management in React components
- Handle authentication states with proper loading and error handling
- Maintain consistency with existing authentication UI patterns
- Always use a Data Access Layer (DAL) for database interactions involving sensitive data

### Database Guidelines for AI Agents

- Use Prisma ORM for all database interactions.
- Never access the database directly from components or pages — always go through the Data Access Layer (DAL). See `docs/data-access-layer.md` for patterns and conventions.

### Documentation Guidelines for AI Agents

Whenever an AI agent makes code changes, it **must** update any documentation that is affected by those changes. This keeps the docs accurate and trustworthy for future agents and developers.

Examples of when documentation must be updated:

- Adding, removing, or modifying an API endpoint → update `docs/api.md`
- Changing authentication behaviour or config → update `docs/BrandKitPilot/systems/auth.md`
- Changing a Prisma model → update `prisma/schema.prisma` comments and `docs/BrandKitPilot/design/Data.md`
- Adding or changing a UI page or route → update `docs/BrandKitPilot/design/UI.md`
- Adding or changing a component → update `docs/component-list.md` and/or `docs/component-patterns.md`
- Changing the brand kit generation pipeline → update `docs/BrandKitPilot/systems/brandKitGeneration.md`
- Changing payment or Stripe integration → update `docs/BrandKitPilot/systems/payments.md`
- Changing worker queue behaviour → update `docs/BrandKitPilot/systems/workerQueues.md`
- Changing DAL patterns or adding new DAL functions → update `docs/data-access-layer.md`
- Changing infrastructure or tech stack → update `docs/BrandKitPilot/design/Architecture.md`

### Testing Guidelines for AI Agents

- **After applying any code changes, run `npm run test` to verify nothing is broken.**
- When adding new behaviour, add or update tests in `tests/specs/` accordingly.
- End-to-end tests use Playwright — follow existing spec patterns in `tests/specs/`.
- Unit and component tests use Vitest — follow existing patterns in the codebase.

