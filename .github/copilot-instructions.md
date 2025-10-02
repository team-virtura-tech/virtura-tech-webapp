# Copilot Instructions

**Stack:** Next.js (App Router) • React • TypeScript • Tailwind CSS v4 • Framer Motion • shadcn/ui • Lucide Icons • next-themes • ESLint • Prettier • Husky
**Infra:** GitHub for code, Vercel for deploys

When you’re **not ≥95% sure** of the requirement, **ask concise clarifying questions first** before writing code.

---

## 1) House Rules (always follow)

1. **Ask before coding** when scope, data shape, breakpoints, a11y, animation intent, env vars, or deploy needs are unclear.
2. **Stay on the listed stack.** Don’t add new libs unless explicitly requested.
3. **Server-first.** Prefer Server Components in App Router; use Client Components only when necessary (state, effects, `useTheme`, motion).
4. **TypeScript strict.** No `any`; use narrow types, discriminated unions, and `satisfies` when helpful.
5. **Tailwind-first styling.** Minimal bespoke CSS; keep tokens in `globals.css`.
6. **Accessible by default.** Proper roles, labels, focus, color contrast; honor `prefers-reduced-motion`.
7. **Performance-aware.** Use `next/image`, `next/font`, `dynamic()` for heavy client bits; cache on the server when safe.
8. **No secrets in code.** Document `.env`; client vars must be `NEXT_PUBLIC_*`.
9. **Lint/format pass.** ESLint + Prettier clean; small PRs; Conventional Commits.
10. **Vercel-ready.** Keep builds/env keys deploy-friendly; preview branches expected.
11. **Mobile-first always.** Build unprefixed (mobile) styles first, scale up with Tailwind breakpoints; test at common widths (360, 390, 768, 1024, 1280+).

---

## 2) Component Conventions (new rules included)

- **Export style:** **Always** declare components with **named exports**:
  `export const ComponentName = () => { … }`
  _Exception:_ use `default export` only where **Next.js requires it** (e.g., `app/**/page.tsx`, `layout.tsx`, route handlers).

- **ID & data attributes (to help QA/integration):**
  - The root element of **every component** must include `data-component="ComponentName"`.
  - **ID rule:** prefer `id="ComponentName"` on components intended to be **unique** on a page (Header, Footer, Modal portals).
    - For components that can render **multiple times** (list items, cards), **accept an optional `id` prop** and, if provided, render `id={id}`; otherwise omit to avoid duplicate IDs.
    - If you must enforce the ID pattern for non-unique components, **suffix a unique segment supplied by the caller** (e.g., `id={`\${ComponentName}-\${uniqueKey}`}`) — never use array index.

- **Small, focused components:** keep components cohesive (aim ≤150–200 LOC). Extract presentational pieces (e.g., `CardHeader`, `CardBody`) instead of conditionals that branch UI heavily.

- **Feature folders:** if a feature needs multiple components/hooks/types, create a directory:

  ```
  /src/features/<feature>/
    components/
    hooks/
    api/
    types/
    index.ts
  ```

  Re-export public pieces from the feature’s `index.ts`.

- **File naming:** `PascalCase.tsx` for components, `kebab-case.ts`/`tsx` for non-component modules if preferred; keep consistent.

- **Root markup:** wrap with the most semantic element available (`section`, `nav`, `form`, `button`, etc.) and apply the ID/data attributes there.

---

## 3) Project Structure

```
/src
  /app
    /(marketing) ...
    /dashboard ...
    /api ...
    layout.tsx      // default export required by Next
    page.tsx        // default export required by Next
    globals.css
  /components
    ui/             // shadcn (generated/extended)
    common/         // shared atoms/molecules
  /features
    /<feature>/
      components/
      hooks/
      api/
      types/
      index.ts
  /lib
    utils.ts        // cn(), helpers
    config.ts       // app constants
  /hooks
  /types
  /styles
```

---

## 4) UI, Motion, Icons, Theme

- **shadcn/ui** for primitives (Buttons, Inputs, Dialogs). Extend via variants/CVA; don’t fork unless necessary.
- **Lucide** only for icons. Size via Tailwind (`h-5 w-5`) or `size` prop.
- **Framer Motion:** purposeful, subtle (200–300ms). Respect `useReducedMotion`. Use `AnimatePresence` only when it improves clarity.
- **Dark mode:** wrap app with `next-themes` `ThemeProvider` (`attribute="class"`, `defaultTheme="system"`). Test light & dark.

---

## 4a) Tailwind & Responsiveness (Mobile-First)

**Principle:** Tailwind’s breakpoints are **mobile-first** (min-width).
Unprefixed classes apply to the smallest screens, and you **progressively enhance** with `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

**Default breakpoints (Tailwind):**

- `sm` (≥640px) • `md` (≥768px) • `lg` (≥1024px) • `xl` (≥1280px) • `2xl` (≥1536px)

### Rules

1. **Start with mobile layout (no prefixes)**, then layer on larger breakpoints.
2. Prefer **fluid widths**: `w-full`, `max-w-screen-*`, `flex-1`, `min-w-0` inside flex/grid to prevent overflow.
3. **Avoid desktop-first CSS** and fixed pixel widths for containers.
4. **Images**: use `next/image` with `sizes` and responsive layout; avoid hardcoded width/height combos that break on mobile.
5. **Typography & spacing scale up** with breakpoints, e.g. `text-base md:text-lg lg:text-xl`, `p-4 md:p-6`.
6. **Grids/Flex**: stack on mobile, expand later:
   `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
7. **Navigation**: mobile menu first (drawer/sheet), then `md:flex` for horizontal desktop nav.
8. **Tables/Long content**: allow horizontal scroll on small screens with `overflow-x-auto` and ensure inner cells don’t force overflow (`min-w-0`, `truncate`, `break-words`).
9. **Cards & lists**: never rely on fixed heights; prefer `aspect-*` + `object-cover` for media.
10. **A11y**: ensure tap targets ≥44px, readable line lengths, and test zoom at 200%.

### Patterns & Snippets

**Responsive container:**

```tsx
<section className="mx-auto w-full max-w-screen-lg px-4 md:px-6">
  {/* content */}
</section>
```

**Responsive grid:**

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* cards */}
</div>
```

**Responsive type & spacing:**

```tsx
<h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
  Headline
</h1>
<p className="mt-2 text-sm text-muted-foreground md:mt-3 md:text-base">
  Supporting copy…
</p>
```

**`next/image` with `sizes`:**

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  priority
  className="object-cover"
  sizes="(max-width: 768px) 100vw,
         (max-width: 1280px) 50vw,
         33vw"
/>;
```

**Mobile-first nav (drawer + desktop inline):**

```tsx
<nav className="flex items-center justify-between">
  <button className="md:hidden">Menu</button>
  <ul className="hidden md:flex md:items-center md:gap-6">
    <li>
      <a className="hover:underline" href="/features">
        Features
      </a>
    </li>
    <li>
      <a className="hover:underline" href="/pricing">
        Pricing
      </a>
    </li>
  </ul>
</nav>
```

**Overflow-safe flex row (cards):**

```tsx
<div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible">
  {/* mobile: horizontal scroll; desktop: grid */}
</div>
```

**Don’ts**

- ❌ Don’t ship separate “m.” layouts. One responsive codebase.
- ❌ Don’t hide large desktop DOM chunks on mobile (`hidden md:block`) if the same UI can be reflowed responsively.
- ❌ Don’t rely on fixed widths/heights that cause layout overflow or content clipping.

---

4b) Components Organization Policy

Folders

```
/src/components
  /ui        // shadcn/ui generated + lightly extended primitives ONLY
  /custom    // all project-specific/custom components
```

Rules

shadcn/ui lives in components/ui. Don’t put app-specific logic here. If you need to change behavior, wrap the shadcn primitive with a component in components/custom instead of forking the original.

All non-shadcn components go in components/custom. Group by component (folder per component when it grows), or by small sub-domain if it has multiple pieces.

Export style: always export const ComponentName = (…) => { … }. Re-export public components via an index.ts barrel where helpful.

Identification: root node should include data-component="ComponentName". Use id="ComponentName" for unique, singleton components; otherwise accept an optional id prop to avoid duplicate IDs.

File naming: component files PascalCase.tsx (e.g., AvatarCard.tsx). Co-locate tiny helpers/types with the component if they’re private.

Example

/src/components/custom/AvatarCard/
AvatarCard.tsx
index.ts // export { AvatarCard } from './AvatarCard';

---

4c) Small Components Rule (Enforceable)

Goal: small, focused, and composable by default.

Guidelines

Aim for ≤ 150–200 LOC per component. If it grows past that, extract sub-parts (e.g., Header, Body, Footer).

Keep props lean (≈ ≤10 props). If props balloon or conditionals explode, split into subcomponents or variants.

One responsibility per component: presentation vs data-fetching vs orchestration—don’t mix.

Prefer composition over flags: variant="ghost|solid" is fine; avoid many boolean flags (isX, isY, isZ) that conflict.

## Shared atoms (buttons, inputs) should remain in components/ui (shadcn). Your feature-specific and styled compositions belong in components/custom.

## 5) Data & Server

- Prefer RSC fetch with correct `cache`/`revalidate`.
- Mutations via **Server Actions** (if enabled) or route handlers.
- Validate server-side; return typed results; graceful error states.

---

## 6) Quality Gates

- **TypeScript:** no errors, no `any`.
- **ESLint/Prettier:** clean; Husky hooks pass.
- **A11y:** labels, roles, focus states; keyboard nav works.
- **Responsive:** mobile-first; no overflow bugs; test key breakpoints.
- **Motion:** honors reduced motion; adds clarity, not noise.
- **Theming:** works in light & dark.
- **States:** includes loading/empty/error.
- **Screenshots/GIFs:** add to PR (light & dark) for UI changes.
- **Env/Deploy:** document required env keys for Vercel previews.

---

## 7) GitHub, Husky, Scripts

Conventional commits; small PRs.
Example scripts (don’t overwrite existing if present):

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "prepare": "husky",
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  "lint:fix": "eslint . --fix --ext .js,.jsx,.ts,.tsx",
  "format": "prettier --write .",
},
```

---

## 8) Snippets

**`cn` helper (`src/lib/utils.ts`):**

```ts
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Component template (named export + id/data-component):**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export type CtaCardProps = {
  id?: string; // supply if multiple instances on a page
  className?: string;
};

export const CtaCard = ({ id, className }: CtaCardProps) => {
  const reduce = useReducedMotion();
  const componentName = 'CtaCard';
  const rootId = id ?? componentName; // prefer unique when multiple instances
  return (
    <motion.section
      id={rootId}
      data-component={componentName}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'rounded-2xl border p-6 shadow-sm bg-background',
        className
      )}
    >
      <h3 className="text-lg font-semibold">Get started</h3>
      <p className="text-muted-foreground mt-1">
        Ship faster with Next.js, Tailwind, and shadcn/ui.
      </p>
      <Button className="mt-4">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.section>
  );
};
```

---

## 9) Clarifying Questions (use when unsure)

- Is the component **unique** on the page or can it render **multiple times**?
- Desired **API** (`props`), **a11y** needs, and **animation** intent?
- Target **breakpoints** and **layout** behavior?
- Should the feature live under an existing **feature folder** or a new one?
- Any **env vars** or **Vercel** settings required?

---

## 10) Don’ts

- Don’t introduce new UI libs or icon sets.
- Don’t ship untyped code or rely on `any`.
- Don’t create giant components—extract and compose.
- Don’t hardcode colors; use tokens/utilities.
- Don’t generate duplicate DOM IDs—ensure uniqueness when components repeat.

Definition of Done / Quality Gates”:\*\*

- [ ] **Responsive** at key breakpoints (360/390, 768, 1024, 1280+); no horizontal scroll or clipped content.
- [ ] **Images** use `next/image` with proper `sizes`.
- [ ] **Overflow-safe**: long text wraps (`break-words`/`truncate`), tables scroll (`overflow-x-auto`), and flex children use `min-w-0` where needed.
- [ ] Non-shadcn components live in components/custom; shadcn primitives remain in components/ui.
- [ ] Component is small and focused (≤200 LOC, ≤10 props, reasonable complexity). If not, refactor or split.
- [ ] data-component set; id usage won’t create duplicates when rendered multiple times.

---

## 11) Interaction & Tone Expectations

- **Friendly, collaborative, and a little fun.** Use light, professional humor to keep things human. Avoid sarcasm or snark.
- **Answer-first, then brief rationale.** Keep it concise by default; expand only if asked or if complexity warrants it.
- **Ask clarifying questions when <95% sure** of requirements (max 2–3 targeted questions before coding).
- **Mirror the user’s vibe.** If the requester is casual, you can be casual; if the context is a PR/review, dial humor down to neutral.
- **Slang & emojis:** okay in chat sparingly (never in code, commits, or docs). If the user uses Indian slang, mirror lightly and respectfully; otherwise stick to plain English.
- **Be honest about uncertainty.** If you’re not sure, say so and propose options or trade-offs.
- **No fluff or flattery.** Be warm without being wordy.
- **Respect accessibility and inclusivity** in examples and language.
- **When pushing back, offer alternatives** (e.g., “Option A (simple), Option B (scalable)”).
- **Long replies get a TL;DR** at the top.
