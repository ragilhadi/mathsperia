# Mathsperia — UI Refinement Plan

> **Goal:** Transform the current flat neon-on-dark aesthetic into the "Precision Observatory" design system defined in `DESIGN.md`.  
> **Scope:** Visual/UI changes only — no new features. Every change maps to an existing file.  
> **Approach:** Ship in 4 focused sprints so the site is never broken mid-refactor.

---

## Current State Audit

Based on the existing codebase (SvelteKit 5, Tailwind CSS 4, KaTeX):

| Area            | Current Problem                                                       | Target State                                                           |
| --------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Backgrounds     | `#0e0e10` / `#1a1a1d` — flat, no texture                              | Layered surfaces with `geo-grid` dot pattern                           |
| Accent colors   | Raw cyan `#06b6d4` + blue `#3b82f6` + violet `#8b5cf6` simultaneously | Single primary (indigo), emerald for results, amber for formulas       |
| Typography      | System/Tailwind defaults                                              | Space Grotesk (display) + Inter (body) + JetBrains Mono (numbers)      |
| Cards           | Basic rounded border boxes                                            | Layered `.surface-panel` with depth shadow + hover lift                |
| SVG shapes      | Simple strokes, minimal styling                                       | Glowing indigo strokes on `.glow-panel` radial background              |
| Formula display | Flat KaTeX dump                                                       | `.formula-panel` amber-tinted block with template + evaluated sections |
| Results         | Plain text output                                                     | `.result-chip` emerald monospaced chips                                |
| Navigation      | Minimal, no breadcrumb                                                | Fixed blur header + breadcrumb on shape pages                          |
| Spacing         | Inconsistent                                                          | Defined scale: `p-6` panels, `gap-5` grids, `space-y-16` sections      |
| Motion          | None                                                                  | Hover lift, result fade-in, SVG `tweened()` transitions                |

---

## Sprint 1 — Foundation (Days 1–2)

**Files:** `src/app.css`, `src/app.html`

This sprint sets up every token and utility class. Nothing visible changes yet, but every subsequent sprint depends on it.

### 1.1 — Google Fonts Import

Add to the top of `src/app.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
```

Set base font on `<html>`:

```css
html {
	font-family: 'Inter', system-ui, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
```

### 1.2 — CSS Custom Properties

Replace the existing color variables in `src/app.css` with the full token set:

```css
:root {
	/* Surfaces */
	--color-bg-base: #07090f;
	--color-bg-surface: #0d1117;
	--color-bg-elevated: #141b2d;
	--color-bg-overlay: #1c2540;
	--color-bg-inset: #090d16;

	/* Text */
	--color-text-primary: #f1f5f9;
	--color-text-secondary: #94a3b8;
	--color-text-muted: #475569;

	/* Indigo — primary accent */
	--color-indigo-dim: #312e81;
	--color-indigo-mid: #4f46e5;
	--color-indigo: #818cf8;
	--color-indigo-bright: #c7d2fe;

	/* Emerald — results */
	--color-emerald-dim: #064e3b;
	--color-emerald: #34d399;
	--color-emerald-bright: #a7f3d0;

	/* Amber — formulas */
	--color-amber-dim: #451a03;
	--color-amber: #fcd34d;
	--color-amber-bright: #fef3c7;

	/* Rose — errors */
	--color-rose: #f87171;
	--color-rose-dim: #450a0a;

	/* Borders */
	--color-border-subtle: rgba(99, 102, 241, 0.1);
	--color-border-default: rgba(99, 102, 241, 0.2);
	--color-border-strong: rgba(99, 102, 241, 0.4);
	--color-border-divider: rgba(148, 163, 184, 0.08);

	/* Fonts */
	--font-display: 'Space Grotesk', system-ui, sans-serif;
	--font-body: 'Inter', system-ui, sans-serif;
	--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### 1.3 — Tailwind Theme Bridge

Add to `src/app.css` (Tailwind v4 `@theme inline`):

```css
@theme inline {
	--color-bg-base: var(--color-bg-base);
	--color-bg-surface: var(--color-bg-surface);
	--color-bg-elevated: var(--color-bg-elevated);
	--color-bg-inset: var(--color-bg-inset);

	--color-text-primary: var(--color-text-primary);
	--color-text-secondary: var(--color-text-secondary);
	--color-text-muted: var(--color-text-muted);

	--color-indigo: var(--color-indigo);
	--color-indigo-dim: var(--color-indigo-dim);
	--color-indigo-bright: var(--color-indigo-bright);

	--color-emerald: var(--color-emerald);
	--color-emerald-bright: var(--color-emerald-bright);
	--color-emerald-dim: var(--color-emerald-dim);

	--color-amber: var(--color-amber);
	--color-amber-bright: var(--color-amber-bright);

	--color-rose: var(--color-rose);
	--color-rose-dim: var(--color-rose-dim);

	--font-display: var(--font-display);
	--font-body: var(--font-body);
	--font-mono: var(--font-mono);
}
```

### 1.4 — Utility Classes

Add to `src/app.css`:

```css
/* Dot grid texture */
.geo-grid {
	background-image: radial-gradient(circle, rgba(99, 102, 241, 0.15) 1px, transparent 1px);
	background-size: 28px 28px;
}

/* Standard elevated card */
.surface-panel {
	background: var(--color-bg-elevated);
	border: 1px solid var(--color-border-subtle);
	border-radius: 1rem;
	box-shadow:
		0 0 0 1px rgba(99, 102, 241, 0.05),
		0 4px 24px rgba(0, 0, 0, 0.4),
		inset 0 1px 0 rgba(255, 255, 255, 0.04);
	transition:
		border-color 150ms ease,
		box-shadow 150ms ease,
		transform 150ms ease;
}
.surface-panel:hover {
	border-color: var(--color-border-default);
	box-shadow:
		0 0 0 1px rgba(99, 102, 241, 0.1),
		0 8px 32px rgba(99, 102, 241, 0.12),
		inset 0 1px 0 rgba(255, 255, 255, 0.05);
	transform: translateY(-2px);
}

/* SVG visualization container */
.glow-panel {
	background: radial-gradient(
		ellipse at center,
		rgba(99, 102, 241, 0.07) 0%,
		var(--color-bg-inset) 70%
	);
	border: 1px solid var(--color-border-default);
	border-radius: 1rem;
	box-shadow: inset 0 0 40px rgba(99, 102, 241, 0.05);
}

/* KaTeX / formula block */
.formula-panel {
	background: linear-gradient(135deg, rgba(120, 53, 15, 0.22) 0%, rgba(69, 26, 3, 0.14) 100%);
	border: 1px solid rgba(251, 191, 36, 0.18);
	border-radius: 0.75rem;
	padding: 1rem 1.25rem;
}

/* Calculated result chip */
.result-chip {
	display: inline-flex;
	flex-direction: column;
	background: rgba(6, 78, 59, 0.25);
	border: 1px solid rgba(52, 211, 153, 0.22);
	border-radius: 0.5rem;
	padding: 0.5rem 0.875rem;
}

/* Uppercase eyebrow label */
.micro-label {
	font-family: var(--font-body);
	font-size: 0.6875rem;
	font-weight: 600;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--color-indigo);
}

/* SVG shape glow */
.shape-glow {
	filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.55))
		drop-shadow(0 0 2px rgba(199, 210, 254, 0.35));
}

/* Keyframes */
@keyframes fadeSlideUp {
	from {
		opacity: 0;
		transform: translateY(6px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.animate-fade-slide-up {
	animation: fadeSlideUp 0.2s ease-out both;
}
.animate-fade-in {
	animation: fadeIn 0.3s ease-out both;
}
```

### 1.5 — Base Body Styles

Update `src/app.css` body/html defaults:

```css
body {
	background-color: var(--color-bg-surface);
	color: var(--color-text-primary);
	font-family: var(--font-body);
}
```

---

## Sprint 2 — Global Shell (Day 3)

**Files:** `src/routes/+layout.svelte`, new `src/lib/components/Header.svelte`, new `src/lib/components/Footer.svelte`

### 2.1 — Apply `geo-grid` to Layout

In `src/routes/+layout.svelte`:

```svelte
<body class="bg-bg-surface geo-grid min-h-screen text-text-primary antialiased">
```

### 2.2 — Rebuild Header Component

Create `src/lib/components/Header.svelte`:

```svelte
<header
	class="border-border-subtle fixed top-0 right-0 left-0 z-50 border-b bg-bg-base/80 backdrop-blur-md"
>
	<div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Logo -->
		<a href="/" class="group flex items-center gap-2">
			<span class="font-display text-xl font-bold text-indigo">𝕸</span>
			<span class="font-display text-base font-semibold tracking-tight text-text-primary">
				mathsperia
			</span>
		</a>
		<!-- Nav -->
		<nav class="flex items-center gap-6">
			<a
				href="/2d"
				class="micro-label text-text-secondary transition-colors hover:text-text-primary"
				>2D Shapes</a
			>
			<a
				href="/formulas"
				class="micro-label text-text-secondary transition-colors hover:text-text-primary"
				>Formulas</a
			>
		</nav>
	</div>
</header>
<!-- Spacer for fixed header -->
<div class="h-14" />
```

### 2.3 — Add Breadcrumb Component

Create `src/lib/components/Breadcrumb.svelte`:

```svelte
<script lang="ts">
	export let items: { label: string; href?: string }[];
</script>

<nav class="mb-8 flex items-center gap-2 text-sm">
	{#each items as item, i}
		{#if i > 0}
			<span class="text-text-muted">/</span>
		{/if}
		{#if item.href && i < items.length - 1}
			<a href={item.href} class="text-text-secondary transition-colors hover:text-text-primary"
				>{item.label}</a
			>
		{:else}
			<span class="font-medium text-indigo">{item.label}</span>
		{/if}
	{/each}
</nav>
```

### 2.4 — Add Minimal Footer

Create `src/lib/components/Footer.svelte`:

```svelte
<footer class="border-border-divider mt-24 border-t py-8">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<span class="font-mono text-sm text-text-muted">mathsperia.web.id</span>
		<span class="text-sm text-text-muted">No login required · Open source</span>
	</div>
</footer>
```

---

## Sprint 3 — Homepage & Category Pages (Day 4–5)

**Files:** `src/routes/+page.svelte`, `src/routes/2d/+page.svelte`, `src/lib/components/ShapeCard.svelte`

### 3.1 — Homepage Hero Section

Replace the current homepage header with:

```svelte
<!-- Hero -->
<section class="py-20 text-center">
	<p class="micro-label mb-4">Interactive Mathematics</p>
	<h1 class="mb-5 font-display text-5xl font-bold tracking-[-0.03em] text-text-primary sm:text-6xl">
		Geometry,<br class="sm:hidden" />
		<span class="text-indigo"> made visual.</span>
	</h1>
	<p class="mx-auto max-w-xl text-lg leading-relaxed text-text-secondary">
		Real-time shape calculators with step-by-step formulas. Built for students, useful for everyone.
	</p>
</section>

<!-- Category Cards -->
<section class="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
	<!-- 2D Geometry card -->
	<a href="/2d" class="surface-panel flex cursor-pointer flex-col gap-3 p-6">
		<span class="micro-label">Available</span>
		<h2 class="font-display text-xl font-semibold text-text-primary">2D Geometry</h2>
		<p class="text-sm leading-relaxed text-text-secondary">
			9 shapes — circles, triangles, polygons and more.
		</p>
	</a>
	<!-- 3D Geometry card (coming soon) -->
	<div class="surface-panel flex cursor-not-allowed flex-col gap-3 p-6 opacity-50">
		<span class="micro-label" style="color: var(--color-text-muted)">Coming Soon</span>
		<h2 class="font-display text-xl font-semibold text-text-muted">3D Geometry</h2>
		<p class="text-sm leading-relaxed text-text-muted">Spheres, cylinders, pyramids and more.</p>
	</div>
</section>
```

### 3.2 — Rebuild ShapeCard Component

Replace `src/lib/components/ShapeCard.svelte` content:

```svelte
<script lang="ts">
	export let name: string;
	export let href: string;
	export let description: string = '';
	export let svgPreview: string = ''; // inline SVG string
</script>

<a {href} class="surface-panel group block cursor-pointer overflow-hidden">
	<!-- SVG preview area -->
	<div class="glow-panel m-3 flex h-28 items-center justify-center">
		{#if svgPreview}
			<div class="shape-glow opacity-80 transition-opacity group-hover:opacity-100">
				{@html svgPreview}
			</div>
		{/if}
	</div>
	<!-- Label area -->
	<div class="px-4 pt-2 pb-4">
		<h3 class="font-display text-base font-semibold text-text-primary">{name}</h3>
		{#if description}
			<p class="mt-0.5 text-xs leading-snug text-text-muted">{description}</p>
		{/if}
	</div>
</a>
```

### 3.3 — 2D Category Page Grid

Update `src/routes/2d/+page.svelte` layout:

```svelte
<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: '2D Geometry' }]} />
<p class="micro-label mb-3">2D Geometry</p>
<h1 class="mb-2 font-display text-4xl font-bold tracking-tight text-text-primary">
	Shapes & Calculators
</h1>
<p class="mb-10 text-text-secondary">Select a shape to explore its properties and formulas.</p>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
	<!-- ShapeCard × 9 -->
</div>
```

---

## Sprint 4 — Shape Calculator Pages (Day 6–8)

**Files:** All `src/routes/2d/[shape]/+page.svelte` files

This is the highest-impact sprint — the calculator pages are what users spend time on.

### 4.1 — Two-Column Calculator Layout

Apply this wrapper to every shape page:

```svelte
<Breadcrumb
	items={[
		{ label: 'Home', href: '/' },
		{ label: '2D Geometry', href: '/2d' },
		{ label: shapeName }
	]}
/>

<!-- Page title -->
<div class="mb-8">
	<p class="micro-label mb-2">{category}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">{shapeName}</h1>
	<p class="mt-2 text-text-secondary">{shapeDescription}</p>
</div>

<!-- Main layout -->
<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg class="shape-glow h-full w-full max-w-xs" ...>
			<!-- shape strokes: stroke="#818CF8" fill="rgba(99,102,241,0.08)" stroke-width="2" -->
		</svg>
	</div>

	<!-- Right: Inputs + Formula + Results -->
	<div class="surface-panel flex flex-col gap-6 p-6">
		<!-- Inputs -->
		<div class="flex flex-col gap-4">
			<p class="micro-label">Dimensions</p>
			<!-- [input fields] -->
		</div>

		<!-- Divider -->
		<hr class="border-border-divider" />

		<!-- Formula -->
		<div>
			<p class="micro-label mb-3">Formula</p>
			<div class="formula-panel">
				<!-- KaTeX template formula -->
				<!-- KaTeX evaluated formula -->
			</div>
		</div>

		<!-- Divider -->
		<hr class="border-border-divider" />

		<!-- Results -->
		<div>
			<p class="micro-label mb-3">Results</p>
			<div class="flex flex-wrap gap-3">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">Area</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						{area} <span class="text-sm text-emerald/70">cm²</span>
					</span>
				</div>
				<div class="result-chip animate-fade-slide-up" style="animation-delay: 50ms">
					<span class="micro-label text-text-muted">Perimeter</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						{perimeter} <span class="text-sm text-emerald/70">cm</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
```

### 4.2 — Input Field Styling

Replace all `<input>` elements with the refined style:

```svelte
<div class="flex flex-col gap-1.5">
	<label class="micro-label" for={id}>{label}</label>
	<div class="relative">
		<input
			{id}
			type="number"
			min="0"
			class="border-border-default focus:border-border-strong w-full rounded-lg border bg-bg-inset px-4
             py-2.5 font-mono text-text-primary
             transition-colors duration-150 placeholder:text-text-muted focus:ring-2
             focus:ring-indigo/20 focus:outline-none"
			placeholder="0"
			bind:value
		/>
		{#if unit}
			<span class="absolute top-1/2 right-3 -translate-y-1/2 font-mono text-sm text-text-muted"
				>{unit}</span
			>
		{/if}
	</div>
</div>
```

### 4.3 — SVG Shape Styling

Update all SVG elements across shape pages to use the new design tokens:

```svelte
<!-- Before -->
<circle cx="..." cy="..." r="..." stroke="#06b6d4" fill="none" stroke-width="2" />

<!-- After -->
<circle cx="..." cy="..." r="..." stroke="#818CF8" fill="rgba(99,102,241,0.08)" stroke-width="2" />
```

Add dimension annotation lines:

```svelte
<!-- Dashed dimension line -->
<line x1="..." y1="..." x2="..." x2="..."
  stroke="rgba(148, 163, 184, 0.4)" stroke-width="1" stroke-dasharray="4 3"/>

<!-- Dimension label -->
<text x="..." y="..." font-family="JetBrains Mono" font-size="11" fill="#475569"
  text-anchor="middle">{dimensionLabel}</text>
```

### 4.4 — FormulaDisplay Component Refactor

Update `src/lib/components/FormulaDisplay.svelte`:

```svelte
<script lang="ts">
	export let template: string; // e.g. "A = \\pi r^2"
	export let evaluated: string; // e.g. "A = \\pi \\times 25 = 78.54"
</script>

<div class="formula-panel flex flex-col gap-3">
	<!-- Template -->
	<div>
		<p class="micro-label mb-1.5" style="color: rgba(252, 211, 77, 0.6)">Template</p>
		<div class="katex-template">
			{@html renderKatex(template)}
		</div>
	</div>
	<!-- Divider -->
	<hr class="border-border-divider" />
	<!-- Evaluated -->
	<div>
		<p class="micro-label mb-1.5" style="color: rgba(252, 211, 77, 0.6)">Calculation</p>
		<div class="katex-evaluated font-mono text-amber">
			{@html renderKatex(evaluated)}
		</div>
	</div>
</div>
```

---

## Checklist — Sprint Summary

### Sprint 1 — Foundation

- [ ] Add Google Fonts import to `src/app.css`
- [ ] Define all CSS custom properties (surfaces, text, accents, borders, fonts)
- [ ] Add Tailwind `@theme inline` bridge
- [ ] Add utility classes: `.geo-grid`, `.surface-panel`, `.glow-panel`, `.formula-panel`, `.result-chip`, `.micro-label`, `.shape-glow`
- [ ] Add keyframe animations: `fadeSlideUp`, `fadeIn`
- [ ] Set base body/html styles

### Sprint 2 — Global Shell

- [ ] Apply `geo-grid` to layout body
- [ ] Build and wire `Header.svelte` with logo + nav
- [ ] Build `Breadcrumb.svelte` component
- [ ] Build `Footer.svelte`
- [ ] Add `pt-14` spacer for fixed header

### Sprint 3 — Homepage & Category Pages

- [ ] Rewrite homepage hero section
- [ ] Rebuild category card grid (2D available, 3D coming soon)
- [ ] Rebuild `ShapeCard.svelte` with glow preview area
- [ ] Update `2d/+page.svelte` with new grid layout and breadcrumb

### Sprint 4 — Shape Calculator Pages

- [ ] Apply two-column layout to all 9 shape pages
- [ ] Style all input fields with new token classes
- [ ] Update all SVG fills/strokes to indigo design tokens
- [ ] Add dimension annotation lines and labels to SVGs
- [ ] Refactor `FormulaDisplay.svelte` with amber `.formula-panel`
- [ ] Convert result outputs to `.result-chip` with emerald mono values
- [ ] Add `animate-fade-slide-up` to result chips
- [ ] Add Breadcrumb to each shape page

---

## Notes

- All changes are isolated to `src/` — no config files (`vite.config.ts`, `svelte.config.js`) need touching.
- Test on mobile after each sprint: the `lg:grid-cols-2` layout must degrade gracefully to stacked single column.
- The existing KaTeX dependency (`katex: ^0.16.25`) is unchanged — only the wrapper markup changes.
- Existing Playwright e2e tests should still pass since functionality is untouched; re-run after Sprint 4 to confirm.
