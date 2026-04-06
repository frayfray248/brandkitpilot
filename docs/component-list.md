# Component Library

This project includes a comprehensive set of reusable UI components built with TypeScript, Tailwind CSS, and tailwind-variants for consistent styling and theming.

## Basic Components

- **Badge** - A flexible badge component for status indicators, labels, notifications, and activity dots with support for multiple color variants and sizes.
- **Button** - A fully featured button component with multiple variants (primary, secondary, accent, etc.), sizes, and built-in accessibility features.
- **Card** - A flexible card component with header, body, and footer sections, supporting multiple variants and interactive states.
- **ExportButton** - A dropdown button component for exporting brand kits in various formats (PDF, JSON, Markdown, plain text). Includes loading states, keyboard navigation, and error handling.
- **Modal** - A accessible modal component for overlays, forms, and confirmations with backdrop management, keyboard navigation, and customizable behavior.
- **Toast** - A notification component for displaying feedback messages with multiple variants (primary, secondary, accent, neutral, base colors, info, success, warning, error), positioning options, auto-dismiss functionality, customizable icons and close buttons, and consistent responsive widths. Visibility is controlled through conditional rendering.

## Form Components

- **CheckBox** - A customizable checkbox input with label support, multiple color variants, and size options.
- **FormGroup** - A form wrapper component that provides consistent spacing, labels, helper text, error messages, and accessibility features for form controls.
- **InputField** - A versatile input component supporting text inputs and textareas with validation states, color variants, and full-width options.
- **Radio** - A radio button component with label support, color variants, and consistent styling with other form controls.

## Layout Components

- **Box** - A flexible container component with configurable padding, margins, and background colors for general layout purposes.
- **FlexBox** - A comprehensive flexbox wrapper with all CSS flexbox properties as props (direction, justify, align, wrap, gap).
- **Stack** - A simplified flexbox component specifically designed for vertical or horizontal stacking of elements with consistent spacing.

## Data Display Components

- **Table** - A comprehensive table component for displaying tabular data with multiple style variants (minimal, lined, bordered), color themes, zebra striping support, and responsive sizing options with consistent styling across all table elements.

## Typography Components

- **Heading** - A semantic heading component (h1-h6) with predefined size mappings and consistent styling based on the Text component.
- **Text** - A versatile text component supporting multiple sizes, colors, and semantic HTML elements with customizable typography options.

## Landing Section Components

- **HeroSection** - Primary hero section with headline, value proposition, CTA button, and micro-copy badge. Located at `src/components/landing/HeroSection.tsx`.
- **ProblemSection** - Empathy section that connects with user pain points and communicates the problem of unclear brand messaging. Located at `src/components/landing/ProblemSection.tsx`.
- **HowItWorksSection** - 3-step explainer section showing the user journey with numbered steps and descriptions. Located at `src/components/landing/HowItWorksSection.tsx`.
- **AuthoritySection** - Authority/trust section highlighting proven frameworks (StoryBrand, Brand Key, Brand Pyramid) and expertise. Located at `src/components/landing/AuthoritySection.tsx`.
- **ValuePropSection** - Success vision section with benefits of using the product. Located at `src/components/landing/ValuePropSection.tsx`.
- **SocialProofSection** - Testimonials section displaying placeholder testimonials with quotes and attribution. Located at `src/components/landing/SocialProofSection.tsx`.
- **PricingSection** - Token-based pricing section fetching real product data from Stripe. Includes error handling with graceful fallback when products cannot be loaded. Located at `src/components/landing/PricingSection.tsx`.
- **CTASection** - Final conversion CTA section with success vision messaging and primary button. Located at `src/components/landing/CTASection.tsx`.

## Component Features

All components follow consistent patterns with:
- TypeScript support with proper prop typing
- Tailwind CSS styling with variant-based customization
- Accessibility features and semantic HTML
- Storybook documentation with usage examples
- Support for custom styling through className props
- Integration with the project's design system and color palette
