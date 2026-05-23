# Mathsperia — Improvement Plan

> **Project:** [mathsperia.web.id](https://mathsperia.web.id) · SvelteKit 5 + TypeScript + Tailwind CSS 4  
> **Current State:** 9 interactive 2D shape calculators with KaTeX formula display and SVG visualizations  
> **Goal:** Make Mathsperia genuinely useful to students, teachers, and developers worldwide

---

## Overview

The current codebase is clean, well-structured, and production-ready — but it only scratches the surface of what a math playground can be. Most features are static calculators with no persistence, no education layer, no units, and no content beyond 2D geometry. This plan is organized into **5 phases**, each building on the last, from quick wins to advanced capabilities.

---

## Phase 1 — Polish & Complete the 2D Foundation

**Estimated effort:** 1–2 weeks  
**Priority:** 🔴 High — these are blocking issues for real-world use

### 1.1 Input Validation & Error Handling

- Show friendly error messages for invalid inputs (negative values, zero sides, impossible triangles like `a + b ≤ c`)
- Prevent NaN / Infinity from appearing in the output
- Add input range hints (e.g. "Enter a positive number") as placeholder text

### 1.2 Unit Support

- Add a unit selector per calculator: **mm, cm, m, km, in, ft, yd**
- Automatically convert area/perimeter output to the selected unit (e.g. cm → cm²)
- Persist last-used unit in `localStorage`

### 1.3 Missing Shapes

The README lists 9 shapes but the route structure only shows 7. Complete the missing routes:

- `/2d/rhombus/+page.svelte`
- `/2d/kite/+page.svelte`

Ensure all 9 shapes have:

- SVG visualization with accurate proportions
- KaTeX formula block (both template and evaluated)
- Correct area **and** perimeter formula

### 1.4 Navigation & UX Improvements

- Add a breadcrumb: `Home → 2D Geometry → Circle`
- Add a **Back** button on each shape page
- Add keyboard shortcut (`Enter`) to trigger calculation
- Show a "Did you know?" math fact below each calculator (static, per shape)

### 1.5 SEO & Metadata

- Add `<svelte:head>` with unique `<title>` and `<meta name="description">` per shape page
- Add Open Graph tags so links preview nicely when shared
- Add `robots.txt` and `sitemap.xml`

---

## Phase 2 — Educational Layer

**Estimated effort:** 2–3 weeks  
**Priority:** 🟠 Medium-High — transforms the site from a calculator to a learning tool

### 2.1 Step-by-Step Calculation Breakdown

- After calculating, show the full substitution: e.g. for a circle  
  `A = π × r² → A = π × 5² → A = π × 25 → A ≈ 78.54 cm²`
- Render each step with KaTeX
- Add a toggle: **Show steps / Hide steps**

### 2.2 Shape Property Reference

- Add a collapsible "Properties" section per shape listing:
  - Number of sides / vertices / angles
  - Type of symmetry
  - Special cases (e.g. a square is a special rectangle)
  - Real-world examples (e.g. "Pizza slices are sectors of a circle")

### 2.3 Formula Cheat Sheet Page

- Add `/formulas` route listing all supported shapes in a reference table
- Columns: Shape · Area formula · Perimeter formula · Key variables
- Printable-friendly layout (print stylesheet)

### 2.4 Comparison Mode

- Add a `/2d/compare` route where users can pick 2 shapes and compare their area/perimeter side-by-side for the same inputs
- Useful for classroom demonstrations

---

## Phase 3 — 3D Geometry (Planned Phase)

**Estimated effort:** 3–4 weeks  
**Priority:** 🟠 Medium — mentioned in README as "coming soon", high expected value

### 3.1 Core 3D Shapes

Implement calculators for:

| Shape                 | Inputs                     | Outputs                      |
| --------------------- | -------------------------- | ---------------------------- |
| Cube                  | Side                       | Volume, Surface Area         |
| Rectangular Prism     | Length, Width, Height      | Volume, Surface Area         |
| Sphere                | Radius                     | Volume, Surface Area         |
| Cylinder              | Radius, Height             | Volume, Lateral SA, Total SA |
| Cone                  | Radius, Height             | Volume, Slant Height, SA     |
| Pyramid (square base) | Base Side, Height          | Volume, SA                   |
| Torus                 | Major radius, Minor radius | Volume, Surface Area         |

### 3.2 3D SVG / CSS Visualizations

- Use isometric CSS or SVG projections (no library needed) to render 3D shapes
- Keep the neon dark-theme aesthetic
- Show shaded faces to give depth perception

### 3.3 Shared Utility Layer

- Refactor `src/lib/utils/shapes.ts` into `shapes2d.ts` and `shapes3d.ts`
- Export a unified `ShapeConfig` type so adding new shapes requires only a config object, not a new route

---

## Phase 4 — Interactivity & Engagement

**Estimated effort:** 3–4 weeks  
**Priority:** 🟡 Medium — makes the site worth returning to

### 4.1 Draggable / Slider Inputs

- Replace number inputs with range sliders (with number fallback)
- Update SVG and result values in real-time as the slider moves
- Give users a tactile, visual sense of how dimensions affect area/perimeter

### 4.2 Calculation History

- Store the last 10 calculations per shape in `localStorage`
- Show a "Recent Calculations" panel per shape page
- Add a "Copy result" button for each entry

### 4.3 Share / Export

- Generate a shareable URL with inputs encoded in query params: `/2d/circle?r=5&unit=cm`
- "Copy link" button that encodes current inputs
- "Download as PNG" button that rasterizes the SVG visualization

### 4.4 Dark/Light Theme Toggle

- Add an optional light theme (the current always-on dark is good but limits accessibility)
- Persist preference in `localStorage`
- Use CSS custom properties already set up in `app.css`

### 4.5 i18n / Localization (Indonesian + English)

Since the domain is `.web.id` and the target audience likely includes Indonesian students:

- Add `src/lib/i18n/` with `en.ts` and `id.ts` translation objects
- Cover: shape names, input labels, formula descriptions, UI strings
- Language toggle in the navbar; persist in `localStorage`

---

## Phase 5 — Advanced Tools & Content

**Estimated effort:** 4–6 weeks  
**Priority:** 🟢 Lower / Long-term — high-value differentiators once the foundation is solid

### 5.1 Coordinate Geometry Tools

- `/tools/distance` — distance between two points
- `/tools/midpoint` — midpoint of a segment
- `/tools/slope` — slope and line equation from two points
- `/tools/area-coordinates` — area of polygon from coordinates (Shoelace formula)
- Each with an interactive grid/canvas visualization

### 5.2 Trigonometry Calculator

- `/tools/trig` — given one angle + one side of a right triangle, compute all others
- Unit circle visualization with real-time animation
- sin/cos/tan/csc/sec/cot tables for common angles

### 5.3 Unit Converter (Standalone)

- `/tools/convert` — length, area, volume, angle conversions
- Multi-directional: pick any two units and convert both ways

### 5.4 Interactive Quizzes

- `/quiz/2d` — "What is the area of a circle with radius 7?"
- Multiple choice or fill-in-the-blank
- Score tracking in `localStorage`
- Configurable difficulty: give area, find radius (inverse mode)

### 5.5 Geometry Glossary

- `/glossary` — searchable, alphabetical list of geometry terms
- Each term links to the relevant calculator if applicable
- Good for SEO and discoverability

### 5.6 Embeddable Widgets

- Allow teachers to embed individual calculators in their own sites via `<iframe>`
- Add `/embed/2d/circle` route variant with minimal chrome
- Document usage in the README

---

## Cross-Cutting Improvements (All Phases)

### Code Quality

- Add Vitest unit tests for all calculation functions in `shapes.ts`
- Target >80% test coverage on math utilities
- Add Playwright e2e tests for each shape calculator (test happy path + invalid inputs)
- Set up GitHub Actions to run tests on every PR (there is already a `.github/workflows` folder)

### Performance

- Add `+layout.ts` with `prerender = true` for all static pages
- Use SvelteKit's built-in code splitting (already works per-route)
- Lazy-load KaTeX CSS only on pages that need it

### Accessibility

- Ensure all inputs have associated `<label>` elements
- Add `aria-live` regions for result output so screen readers announce changes
- Test with keyboard navigation (Tab, Enter, Arrow keys on sliders)
- Audit color contrast — neon cyan on dark must meet WCAG AA (4.5:1 for text)

### Documentation

- Expand `README.md` with: live demo link, screenshot/GIF, feature checklist with checkboxes
- Add `CONTRIBUTING.md` explaining how to add a new shape in 5 steps
- Add `CHANGELOG.md` to track releases

---

## Suggested Phase Timeline

| Phase       | Focus                | Duration   | Outcome                                           |
| ----------- | -------------------- | ---------- | ------------------------------------------------- |
| **Phase 1** | Polish 2D foundation | Week 1–2   | Site is production-complete for 2D shapes         |
| **Phase 2** | Educational content  | Week 3–5   | Site becomes a learning resource, not just a tool |
| **Phase 3** | 3D Geometry          | Week 6–9   | Doubles the content scope                         |
| **Phase 4** | Interactivity        | Week 10–13 | Users return; shareable links drive traffic       |
| **Phase 5** | Advanced tools       | Week 14–19 | Mathsperia becomes a comprehensive math platform  |

---

## Quick Wins (Do First, Takes Hours Not Days)

1. **Fix SEO** — add `<svelte:head>` with title + description to every route (30 min)
2. **Add breadcrumbs** — simple Svelte component, improves navigation immediately (1 hr)
3. **Add Enter key handler** — `<form on:submit>` or keydown listener (15 min)
4. **URL-encoded inputs** — `$page.url.searchParams` in SvelteKit, enables sharing (2 hr)
5. **README screenshot** — add a screenshot/GIF to the README so the repo makes a first impression (20 min)

---

_This plan was generated based on the current state of the `ragilhadi/mathsperia` repository (May 2026). Priorities should be adjusted based on user feedback and actual traffic patterns._
