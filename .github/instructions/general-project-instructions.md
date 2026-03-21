---
applyTo: '**'
---

# Coding Conventions

## General

- Consult `README.md` for additional project-specific guidance.
- Use TypeScript for all new code.
- Follow the existing code style in each file.
- Use meaningful variable and function names.
- Add comments for complex logic.
- Provide abstractions and decoupled interfaces for large, complex systems.
- Custom interfaces, classes, hooks, contexts, and utilities should be app-agnostic and use generics where appropriate.
- Follow the file naming convention:
  - React components and schemas: `PascalCase.tsx`
  - Most other files and functions: `camelCase.ts`

## React Components

- Use functional components with hooks.
- Keep components small and focused.
- Always type props.
- Add `ref` support via `ComponentPropsWithRef` when the component is a thin wrapper around a DOM element or another ref-forwarding component, and when consumers are likely to need direct access to that element (e.g., for focus, measurement, or scrolling).
- NEVER use `forwardRef` — it is deprecated.
- A full list of available components is in `docs/component-list.md`.
- Always update relevant documentation and Storybook stories when creating or modifying components.
- Always update `docs/component-list.md` when adding or removing components.
- Follow the practices in `docs/component-patterns.md` when implementing complex components, pages, and layouts.

## CSS / Styling

- Use Tailwind CSS for styling.
- Follow a utility-first approach.
- Use custom CSS only when necessary.
- Use the custom Tailwind theme colors defined in `src/app/globals.css`.
- Use `tailwind-variants` when making new reusable components.

## Pull Requests

When creating a PR:

1. Include a clear description of the changes.
2. Reference any related issues.
3. Ensure all tests pass.
4. Include screenshots for UI changes.
5. Keep PRs focused on a single concern.