---
mode: 'agent'
model: Claude Sonnet 4
tools: ['codebase', 'usages', 'problems', 'changes', 'openSimpleBrowser', 'searchResults', 'githubRepo', 'editFiles', 'search', 'runCommands']
description: 'Create/update Zod Schemas from Prisma models'
---

Create or update the Zod Schemas in `/src/lib/schemas.ts` so they accurately reflect the Prisma models in `/prisma/schema.prisma`.
* Follow all guidelines in AGENTS.md
* Make sure there is a schema for each model
* Use the appropriate Zod types for each field (e.g., z.string(), z.number(), z.boolean(), etc.)
* Include any necessary validation rules (e.g., min/max length, required fields, etc.)
* Follow best security practices (e.g., ensure a password field has a minimum length)
