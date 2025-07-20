# GitHub Copilot Instructions for Next.js + React 19 + TypeScript Projects

## Project Context

- **Framework:** Next.js 14+ (App Router)
- **React:** React 19 with Server and Client Components
- **Language:** TypeScript with strict typing
- **Styling:** Tailwind CSS
- **Features:** React Actions, Server Components, Client Components, Type Safety, Async/Await

## Code Style Guidelines

- Use TypeScript strict mode (`strict: true` in `tsconfig.json`).
- Prefer `async/await` syntax over Promises.
- Use named imports and type imports (`import type`).
- Apply Next.js conventions for Server/Client components:
  - `"use client"` at the top for Client Components.
  - No `"use client"` for Server Components.

- Co-locate components by domain/feature.
- Use Tailwind CSS for styling with utility-first classes.
- Use `//` for single-line comments and `/* */` for multi-line comments.
- Always use "" for string literals, avoiding template literals unless necessary.
- Use `===` for equality checks instead of `==`.
- Use ES6+ features like arrow functions, destructuring, and spread/rest operators.

## Next.js Guidelines

- Use `app/` directory structure with `page.tsx`, `layout.tsx`, and metadata.
- Implement caching and revalidation using `fetch` options.
- Use `generateMetadata` in Server Components for SEO.
- Use Next.js Actions API for forms and mutations.
- Use `next/link` and `next/image` for navigation and images.

## React 19 Guidelines

- Use React Actions for server mutations.
- Prefer React Server Components when no interactivity is needed.
- Use Client Components only when necessary (e.g., hooks, state, event handlers).

## Tailwind CSS Best Practices

- Use responsive utility classes (`sm:`, `md:`, `lg:`, `xl:`) to build mobile-first designs.
- Apply consistent spacing with Tailwind's spacing scale.
- Use `container` and `max-w-*` classes to control layout width.
- Favor component composition with reusable Tailwind class patterns.
- Apply dark mode using `dark:` modifier with Next.js' theme system.
- Minimize custom CSS; prefer Tailwind classes for consistency.
- Use `@apply` in CSS only for truly repetitive class combinations.

## JavaScript/TypeScript Best Practices

- Prefer `const` and `let` over `var`.
- Always define types/interfaces for props and API responses.
- Avoid `any` type; use `unknown` or define strict types.
- Use ES6+ features like optional chaining, nullish coalescing, and destructuring.
- Structure code with reusable functions and utilities.
- Follow consistent naming conventions: `camelCase` for variables, `PascalCase` for components.
- Write pure functions and avoid side effects where possible.
- Document complex logic with comments and JSDoc.

## Accessibility Best Practices

- Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`, etc.).
- Ensure all interactive elements are keyboard accessible.
- Use `aria-*` attributes where appropriate for assistive technologies.
- Provide meaningful alt text for images.
- Use sufficient color contrast for text and UI elements.
- Ensure focus states are visible and distinct.
- Prefer label elements for form controls.
- Use roles (`role="button"`, `role="dialog"`, etc.) where semantics are not obvious.
- Test components with screen readers and keyboard navigation.

## Copilot Suggestions

- Suggest TypeScript typings for all function signatures.
- Prefer code that complies with Next.js best practices.
- Generate components that are either Server or Client — not mixed.
- Use Tailwind classes instead of custom CSS.
- For forms, suggest using Next.js Actions instead of client-side handlers.
- Provide responsive design considerations in Tailwind suggestions.
- Recommend accessibility best practices for UI components.
- Avoid suggesting deprecated or legacy React features.
- Ensure all code is compatible with React 19 features.
- Always end file with a newline character.

---

Follow these instructions to keep the codebase consistent, modern, responsive, accessible, and aligned with Next.js, React 19, TypeScript, Tailwind CSS, and JavaScript best practices.
