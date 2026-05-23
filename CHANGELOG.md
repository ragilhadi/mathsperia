# Changelog

## v2.1.0

### Added

- **2D Shape Calculators**: Circle, Square, Rectangle, Ellipse, Rhombus, Kite, Trapezoid, Parallelogram, Equilateral/Isosceles/Right/Scalene Triangle
- **3D Shape Calculators**: Cube, Rectangular Prism, Sphere, Cylinder, Cone, Pyramid, Torus
- **Coordinate Geometry Tools**: Distance, Midpoint, Slope, Area (Shoelace formula)
- **Trigonometry Calculator**: Right triangle solver, unit circle visualization, common angles table
- **Unit Converter**: Length, Area, Volume, Angle conversions
- **Interactive Quiz**: 2D geometry questions with scoring
- **Geometry Glossary**: 44 terms with search, categories, and cross-references
- **Formula Reference Page**: Complete formula table for all shapes
- **2D Shape Comparison**: Side-by-side comparison mode
- **Embeddable Widgets**: Minimal-chrome embed routes for iframes
- **i18n Support**: English and Indonesian (Bahasa Indonesia)
- **Dark/Light Theme Toggle**: With system preference detection
- **Unit Selection**: 7 length units (mm, cm, m, km, in, ft, yd) with area/volume conversion
- **Step-by-Step Breakdowns**: KaTeX-rendered solution steps for all calculators
- **Shape Properties Reference**: Collapsible property cards for each shape
- **Did You Know Facts**: Educational ShapeFacts component on every calculator
- **Calculation History**: Last 10 calculations per shape, stored in localStorage
- **Share & Export**: Copy-link with URL-encoded inputs, 4x PNG export
- **SEO**: Structured data (JSON-LD), Open Graph, Twitter Cards, canonical URLs, sitemap, robots.txt
- **Accessibility**: Keyboard navigation (Enter key), labeled inputs, unit selection

### Technical

- Built with **SvelteKit** + **Svelte 5** (runes)
- **Tailwind CSS v4** design system with CSS custom properties
- **KaTeX** for mathematical formula rendering
- **Vitest** unit test suite (230+ tests)
- **Playwright** E2E test suite
- **GitHub Actions** CI pipeline (lint, typecheck, test, build)
- Prerender enabled for static generation
- KaTeX CSS lazy-loaded per component
- `aria-live` regions on all calculator results for screen reader announcements
