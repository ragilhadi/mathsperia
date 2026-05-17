# Mathsperia Design System

This project uses a dark **"Precision Observatory"** visual language — the aesthetic of high-end scientific instrumentation fused with the elegance of a master mathematician's drafting table. Interfaces should feel precise, confident, and deeply trustworthy: like looking through a high-powered lens at something beautiful.

---

## Stack

- **Framework:** SvelteKit 5 + TypeScript
- **Styling:** Tailwind CSS v4 via `@theme inline` in `src/app.css`
- **Math Rendering:** KaTeX
- **Icons:** Lucide Svelte
- **Fonts:** Space Grotesk (display), Inter (body), JetBrains Mono (numbers/variables)
- **Dark mode:** Always-on dark theme via `class="dark"` on `<html>`

---

## Visual Direction

Mathsperia is a geometry tool for students and learners — not a generic SaaS app, and not a gaming UI with cheap neon.

- Think: a master geometer's studio at midnight. Obsidian surfaces. Precise gridlines. Formulas that glow like they mean something.
- Use deep near-void backgrounds, cool slate surfaces, and a restrained indigo primary with emerald and amber as supporting accents.
- Depth through layering: background → surface → elevated panel → floating element. Each layer lightens slightly.
- The geometric grid dot pattern should whisper in the background — present but never dominant.
- Shape SVG visualizations live in glowing panels with a faint inner light, like blueprints on a light table.
- Formulas are sacred. KaTeX blocks get amber-tinted panels with a mono feel.
- Avoid: harsh raw cyan, generic purple-glow hero sections, dark mode that's just "white UI with colors inverted", busy gradients.

---

## Color Tokens

All tokens are defined in `src/app.css` and exposed to Tailwind via `@theme inline`.

### Base Surfaces

| Token | Value | Usage |
|---|---|---|
| `--color-bg-base` | `#07090F` | Page canvas — near-void depth |
| `--color-bg-surface` | `#0D1117` | Main content background |
| `--color-bg-elevated` | `#141B2D` | Cards, panels, dropdowns |
| `--color-bg-overlay` | `#1C2540` | Hover states, tooltips, modals |
| `--color-bg-inset` | `#090D16` | Input backgrounds, code blocks |

### Text

| Token | Value | Usage |
|---|---|---|
| `--color-text-primary` | `#F1F5F9` | Headings, labels, important copy |
| `--color-text-secondary` | `#94A3B8` | Body copy, descriptions |
| `--color-text-muted` | `#475569` | Placeholders, disabled states |
| `--color-text-inverse` | `#07090F` | Text on bright accent backgrounds |

### Accent — Indigo (Primary)

| Token | Value | Usage |
|---|---|---|
| `--color-indigo-dim` | `#312E81` | Subtle tints, active backgrounds |
| `--color-indigo-mid` | `#4F46E5` | Interactive elements, links |
| `--color-indigo` | `#818CF8` | Primary accent — buttons, highlights |
| `--color-indigo-bright` | `#C7D2FE` | Hover states on indigo elements |

### Accent — Emerald (Results / Success)

| Token | Value | Usage |
|---|---|---|
| `--color-emerald-dim` | `#064E3B` | Result backgrounds |
| `--color-emerald` | `#34D399` | Calculated results, success states |
| `--color-emerald-bright` | `#A7F3D0` | Highlighted result values |

### Accent — Amber (Formulas / Math)

| Token | Value | Usage |
|---|---|---|
| `--color-amber-dim` | `#451A03` | Formula panel tint |
| `--color-amber` | `#FCD34D` | Formula symbols, KaTeX output |
| `--color-amber-bright` | `#FEF3C7` | Important formula parts |

### Accent — Rose (Errors / Destructive)

| Token | Value | Usage |
|---|---|---|
| `--color-rose` | `#F87171` | Error messages, invalid inputs |
| `--color-rose-dim` | `#450A0A` | Error state backgrounds |

### Borders & Dividers

| Token | Value | Usage |
|---|---|---|
| `--color-border-subtle` | `rgba(99, 102, 241, 0.10)` | Default panel borders |
| `--color-border-default` | `rgba(99, 102, 241, 0.20)` | Emphasized borders, input rings |
| `--color-border-strong` | `rgba(99, 102, 241, 0.40)` | Focus rings, active card borders |
| `--color-border-divider` | `rgba(148, 163, 184, 0.08)` | Horizontal rules, section dividers |

---

## Typography

### Font Stack

```css
/* src/app.css */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;
}
```

### Scale & Usage

| Role | Font | Size | Weight | Tracking | Usage |
|---|---|---|---|---|---|
| Hero Title | Space Grotesk | `text-5xl` / `text-6xl` | 700 | `-0.03em` | Page hero, category titles |
| Section Heading | Space Grotesk | `text-3xl` | 700 | `-0.02em` | Shape page title |
| Card Title | Space Grotesk | `text-xl` | 600 | `-0.01em` | Shape card headings |
| Body | Inter | `text-base` | 400 | `0` | Descriptions, labels |
| Small / Caption | Inter | `text-sm` | 400 | `0.01em` | Helper text, metadata |
| Micro Label | Inter | `text-xs` | 600 | `0.08em` uppercase | Eyebrow labels, badges |
| Number / Result | JetBrains Mono | `text-2xl` | 500 | `-0.01em` | Calculated values |
| Formula Variable | JetBrains Mono | `text-sm` | 400 | `0` | Input labels, variable names |

### Guidelines

- Hero and section headings use `font-display` with tight negative tracking.
- All numeric outputs — area, perimeter, individual values — use `font-mono`. Numbers rendered in a sans font look amateur in a math tool.
- KaTeX formula containers inherit an amber tint so they stand out from regular text.
- Avoid system-font stacks anywhere visible to the user.

---

## Core CSS Utilities

Defined in `src/app.css`:

### `.geo-grid`
Subtle dot-grid background that tiles across the page canvas. Used on `<body>` or hero sections.
```css
.geo-grid {
  background-image: radial-gradient(circle, rgba(99, 102, 241, 0.15) 1px, transparent 1px);
  background-size: 28px 28px;
}
```

### `.surface-panel`
Standard elevated panel for cards and calculators. Uses layered box-shadow for depth.
```css
.surface-panel {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: 1rem;
  box-shadow:
    0 0 0 1px rgba(99, 102, 241, 0.05),
    0 4px 24px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
```

### `.glow-panel`
Used for the SVG shape visualization container. Produces a cool inner-light effect.
```css
.glow-panel {
  background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.06) 0%, var(--color-bg-inset) 70%);
  border: 1px solid var(--color-border-default);
  border-radius: 1rem;
  box-shadow: inset 0 0 40px rgba(99, 102, 241, 0.05);
}
```

### `.formula-panel`
Amber-tinted container for KaTeX formula blocks.
```css
.formula-panel {
  background: linear-gradient(135deg, rgba(120, 53, 15, 0.20) 0%, rgba(69, 26, 3, 0.15) 100%);
  border: 1px solid rgba(251, 191, 36, 0.20);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
}
```

### `.result-chip`
Used around calculated output values.
```css
.result-chip {
  background: rgba(6, 78, 59, 0.30);
  border: 1px solid rgba(52, 211, 153, 0.25);
  border-radius: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-family: var(--font-mono);
  color: var(--color-emerald-bright);
}
```

### `.micro-label`
Uppercase eyebrow labels above section headings.
```css
.micro-label {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-indigo);
}
```

### `.shape-glow` (SVG stroke utility)
Applied to SVG shape strokes to produce the signature glow effect.
```css
.shape-glow {
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))
          drop-shadow(0 0 2px rgba(199, 210, 254, 0.4));
}
```

---

## Components

### Navigation / Header

- Fixed top bar, `backdrop-blur-md`, `bg-bg-base/80`
- Left: `𝕸` monogram logo in Space Grotesk bold + wordmark "mathsperia" in indigo
- Right: links styled as `micro-label` with indigo underline on hover
- Active route: indigo dot indicator below link text
- No hamburger menus — keep it minimal; shape names are short enough

### Shape Cards (Homepage / Category)

- Grid of cards: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- Each card uses `.surface-panel` with a hover transition:
  - `hover:border-color-border-default`
  - `hover:-translate-y-1`
  - `hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)]`
- Top half: shape SVG preview centered in a `.glow-panel` area (fixed height ~120px)
- Bottom half: shape name in `text-lg font-display font-semibold` + 1-line description in `text-secondary text-sm`
- Top-right badge: category tag (`micro-label`) like "2D" or "3D"
- Shape stroke color: indigo, with `.shape-glow` filter

### Calculator Layout (Shape Pages)

Two-column layout on desktop, stacked on mobile:

```
┌─────────────────────┬──────────────────────┐
│  Shape Visualization│   Input Panel        │
│  (.glow-panel)      │                      │
│                     │  [Input Fields]      │
│  [SVG — live update]│                      │
│                     │  [Formula Panel]     │
│                     │  (.formula-panel)    │
│                     │                      │
│                     │  [Results]           │
│                     │  (.result-chip × N)  │
└─────────────────────┴──────────────────────┘
```

- Visualization panel is square on desktop (e.g. `aspect-square max-w-sm`)
- Inputs update the SVG in real-time without a Calculate button
- Results appear below the formula with a fade-in transition

### Input Fields

```css
/* Tailwind classes */
.input-field {
  @apply bg-bg-inset border border-border-default rounded-lg px-4 py-2.5
         font-mono text-text-primary placeholder:text-text-muted
         focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20
         transition-colors duration-150;
}
```

- Labels use `micro-label` style above each input
- Units displayed as suffix inside the input (right-aligned, muted color)
- Invalid state: `border-rose` + rose `ring` + error message in rose below

### Formula Display (KaTeX)

- Wrap in `.formula-panel`
- Section has a `micro-label` eyebrow: "Formula"
- Show formula template (with variable letters) first
- Below it, show evaluated formula (with numbers substituted) in `font-mono text-amber`
- Separate the two with a thin `border-b border-divider`

### Result Display

- Each result (Area, Perimeter, etc.) in its own `.result-chip`
- Label: `micro-label` text in `text-muted`
- Value: `font-mono text-2xl font-medium text-emerald-bright`
- Unit: `text-sm font-mono text-emerald/70` inline after value
- Results animate in: `animate-[fadeSlideUp_0.2s_ease-out]`

### Breadcrumb

```
Home  /  2D Geometry  /  Circle
```

- Separator `/` in `text-muted`
- Links in `text-secondary hover:text-text-primary`
- Current page in `text-indigo font-medium`

### Badges / Tags

- Pill shape: `rounded-full px-2.5 py-0.5`
- Font: `micro-label`
- Colors: indigo for category, emerald for "available", amber for "formula", muted for "coming soon"

---

## Layout

```svelte
<!-- src/routes/+layout.svelte -->
<body class="bg-bg-surface geo-grid min-h-screen text-text-primary font-body antialiased">
  <Header />
  <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
    <slot />
  </main>
  <Footer />
</body>
```

- Max content width: `1152px` (`max-w-6xl`)
- Section vertical spacing: `space-y-16` between major sections
- Card grid gap: `gap-5`
- Inner panel padding: `p-6` on desktop, `p-4` on mobile

---

## Motion & Interaction

| Interaction | CSS |
|---|---|
| Card hover lift | `transition: transform 150ms ease, box-shadow 150ms ease` + `hover:-translate-y-1` |
| Button press | `active:scale-[0.97]` |
| Input focus ring | `focus:ring-2 focus:ring-indigo/20 focus:border-border-strong` |
| Result appearance | `@keyframes fadeSlideUp` — `opacity: 0 → 1`, `translateY: 6px → 0` over 200ms |
| SVG update | Svelte `tweened()` store for smooth dimension transitions on the SVG viewport |
| Page enter | `animate-fade-in` — `opacity: 0 → 1` over 300ms, staggered per card |

Keep motion purposeful and brief. No looping animations, no parallax, no animated backgrounds. The geometry should be still and precise.

---

## Shape SVG Style Guidelines

The SVG visualizations are the heart of the UI — they need to look premium:

- **Stroke color:** `#818CF8` (indigo) with `.shape-glow` filter
- **Stroke width:** `2px` (scale-invariant, not viewport units)
- **Fill:** `rgba(99, 102, 241, 0.08)` — barely-there indigo tint
- **Dimension annotations:** dashed lines in `rgba(148, 163, 184, 0.4)`, labels in `JetBrains Mono` 11px, `text-muted`
- **Vertex dots:** 4px radius circles, `fill: #818CF8`
- **Right-angle indicator:** small square in corner, stroke indigo
- **Background:** see `.glow-panel` — radial gradient, not flat black
- SVGs should rescale smoothly as inputs change; use Svelte's `tweened()` for animated transitions

---

## Accessibility

- All focus rings must be visible: `focus-visible:ring-2 focus-visible:ring-indigo/50`
- Color is never the only indicator — icons or shapes accompany color-coded states
- Indigo on `--bg-elevated`: contrast ratio ≥ 3:1 for UI elements, ≥ 4.5:1 for text
- Emerald results: `#34D399` on `#141B2D` → meets AA for large text
- Inputs have associated `<label>` elements; result areas have `aria-live="polite"`
- KaTeX output should include `aria-label` with the plain-English formula description

---

## What to Avoid

| ❌ Avoid | ✅ Use instead |
|---|---|
| Raw cyan `#06b6d4` as primary | Indigo `#818CF8` — more refined |
| Harsh neon glow on everything | Glow reserved for SVG shapes only |
| Pure black `#000000` background | `#07090F` — has depth without being void |
| White text directly on dark | `#F1F5F9` — slightly warm off-white |
| Generic gray cards | Layered `.surface-panel` with indigo border tint |
| Bold colored section headers | `micro-label` eyebrows + large Space Grotesk heading |
| Flat number outputs in sans font | Always `font-mono` for numeric values |
| Decorative animated gradients | Static grid texture, motion only on interaction |