
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

### Basic Components

- **Badge** - A flexible badge component for status indicators, labels, notifications, and activity dots with support for multiple color variants and sizes.
- **Button** - A fully featured button component with multiple variants (primary, secondary, accent, etc.), sizes, and built-in accessibility features.
- **Card** - A flexible card component with header, body, and footer sections, supporting multiple variants and interactive states.
- **Modal** - A accessible modal component for overlays, forms, and confirmations with backdrop management, keyboard navigation, and customizable behavior.

### Form Components

- **CheckBox** - A customizable checkbox input with label support, multiple color variants, and size options.
- **FormGroup** - A form wrapper component that provides consistent spacing, labels, helper text, error messages, and accessibility features for form controls.
- **InputField** - A versatile input component supporting text inputs and textareas with validation states, color variants, and full-width options.
- **Radio** - A radio button component with label support, color variants, and consistent styling with other form controls.

### Layout Components

- **Box** - A flexible container component with configurable padding, margins, and background colors for general layout purposes.
- **FlexBox** - A comprehensive flexbox wrapper with all CSS flexbox properties as props (direction, justify, align, wrap, gap).
- **Stack** - A simplified flexbox component specifically designed for vertical or horizontal stacking of elements with consistent spacing.

### Typography Components

- **Heading** - A semantic heading component (h1-h6) with predefined size mappings and consistent styling based on the Text component.
- **Text** - A versatile text component supporting multiple sizes, colors, and semantic HTML elements with customizable typography options.

All components follow consistent patterns with:
- TypeScript support with proper prop typing
- Tailwind CSS styling with variant-based customization
- Accessibility features and semantic HTML
- Storybook documentation with usage examples
- Support for custom styling through className props
- Integration with the project's design system and color palette
