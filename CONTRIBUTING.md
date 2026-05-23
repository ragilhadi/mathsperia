# Contributing to Mathsperia

Thank you for your interest in contributing! This guide covers the basics.

## Development Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start dev server:**

   ```bash
   npm run dev
   ```

3. **Run tests:**

   ```bash
   npm run test:unit        # Unit tests only
   npm run test:e2e         # E2E tests (requires build first)
   npm run test              # All tests
   ```

4. **Lint & typecheck:**

   ```bash
   npm run lint              # Prettier + ESLint
   npm run check             # svelte-check (TypeScript)
   ```

5. **Build:**
   ```bash
   npm run build
   npm run preview
   ```

## Project Structure

```
src/
├── lib/
│   ├── components/     # Svelte components
│   ├── i18n/           # Translations (en, id)
│   ├── stores/         # Svelte stores
│   └── utils/          # Pure TS utilities (shapes, units, etc.)
├── routes/
│   ├── 2d/             # 2D shape calculators
│   ├── 3d/             # 3D shape calculators
│   ├── tools/          # Coordinate geometry, trig, converter
│   ├── quiz/           # Interactive quizzes
│   ├── formulas/       # Formula reference
│   ├── glossary/       # Geometry glossary
│   └── embed/          # Embeddable widget routes
└── app.css             # Global styles & design system
```

## Code Style

- **TypeScript** for all logic; **Svelte 5** with `$state`, `$derived`, `$effect`, `$props`
- No comments unless absolutely necessary
- Use existing component patterns (SafeDisplay, SliderInput, UnitSelector, etc.)
- Follow the existing design system (CSS variables defined in `app.css`)
- Unit-aware calculators should support `Unit` conversion via `$lib/utils/units.ts`
- All calculator pages should include: Breadcrumb, BackButton, ShapeFacts, ShapeProperties, StepByStep, CalculationHistory, SeoHead

## Adding a New Shape

1. Add calculation function in `src/lib/utils/shapes.ts` (2D) or `shapes3d.ts` (3D)
2. Add tests in `shapes.test.ts` or `shapes3d.test.ts`
3. Register the shape in `src/lib/utils/shapeConfig.ts`
4. Add i18n keys in `src/lib/i18n/en.ts` and `id.ts`
5. Create the page at `src/routes/2d/<shape>/+page.svelte` following an existing page as template
6. Add glossary entries if needed in `src/lib/utils/glossary.ts`

## Pull Requests

- Run `npm run lint` and `npm run check` before pushing
- Add tests for new utility functions
- Keep PRs focused — one feature or fix per PR
- Ensure all existing tests pass: `npm run test:unit`
