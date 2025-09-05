
**Next.js Boilerplate for Scalable Web Applications**

This repository provides a comprehensive boilerplate for building modern Next.js applications with a strong focus on scalability, maintainability, and developer experience.

It includes:

* Prebuilt, reusable UI components
* Utility libraries and helper functions
* Standardized API route design
* Stripe integration for payments
* Better Auth integration for authentication
* MongoDB integration with a data access layer
* A consistent styling system

Key features:

* Fully TypeScript-based with types and interfaces inferred from Zod schemas where applicable
* Designed for both human readability and AI-assisted development
* Encourages best practices in architecture and code organization

Ideal for developers looking to kickstart their projects with a solid, production-ready foundation.

## Authentication

This project uses [Better Auth](https://better-auth.com/) for authentication, providing a comprehensive and framework-agnostic authentication solution with built-in support for:

- Email and password authentication
- Social sign-in providers
- Session management
- Type-safe authentication flows

The authentication configuration and client setup can be found in `/src/auth/`:
- `auth.ts` - Server-side authentication configuration
- `authClient.ts` - Client-side authentication utilities

Authentication routes are available at `/api/auth/*` and the project includes ready-to-use login and signup pages.

## Component Library

This project includes a comprehensive set of reusable UI components built with TypeScript, Tailwind CSS, and tailwind-variants for consistent styling and theming.

The component library covers essential UI patterns including basic components (buttons, badges), form controls, layout utilities, data display elements, and typography components. All components follow consistent patterns with TypeScript support, accessibility features, Storybook documentation, and integration with the project's design system.

For a complete list of available components and their features, see [Component List](docs/component-list.md).
