<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { categoryPageData } from '$lib/utils/seo';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import 'katex/dist/katex.min.css';
	import katex from 'katex';
	import { tKey } from '$lib/stores/lang.svelte';

	function renderFormula(formula: string): string {
		try {
			return katex.renderToString(formula, { throwOnError: false, displayMode: false });
		} catch {
			return formula;
		}
	}

	const pageData = categoryPageData({
		name: 'Geometry Formula Cheat Sheet',
		urlPath: '/formulas',
		description:
			'Quick-reference formula cheat sheet for 2D and 3D geometry shapes. Area, perimeter, volume, and surface area.',
		itemList: [
			{ name: '2D Geometry Shapes', url: '/2d' },
			{ name: '3D Geometry Solids', url: '/3d' }
		]
	});

	interface Formula2D {
		shapeId: string;
		name: string;
		href: string;
		variables: string;
		area: string;
		perimeter: string;
	}

	interface Formula3D {
		shapeId: string;
		name: string;
		href: string;
		variables: string;
		volume: string;
		area: string;
	}

	const formulas2d: Formula2D[] = [
		{
			shapeId: 'circle',
			name: 'Circle',
			href: '/2d/circle',
			variables: 'r = radius',
			area: 'A = \\pi r^2',
			perimeter: 'C = 2\\pi r'
		},
		{
			shapeId: 'square',
			name: 'Square',
			href: '/2d/square',
			variables: 's = side',
			area: 'A = s^2',
			perimeter: 'P = 4s'
		},
		{
			shapeId: 'rectangle',
			name: 'Rectangle',
			href: '/2d/rectangle',
			variables: 'l = length, w = width',
			area: 'A = l \\times w',
			perimeter: 'P = 2(l + w)'
		},
		{
			shapeId: 'equilateral-triangle',
			name: 'Equilateral Triangle',
			href: '/2d/triangle/equilateral',
			variables: 's = side',
			area: 'A = \\frac{\\sqrt{3}}{4}s^2',
			perimeter: 'P = 3s'
		},
		{
			shapeId: 'isosceles-triangle',
			name: 'Isosceles Triangle',
			href: '/2d/triangle/isosceles',
			variables: 'b = base, s = equal side',
			area: 'A = \\frac{1}{2}bh',
			perimeter: 'P = b + 2s'
		},
		{
			shapeId: 'right-triangle',
			name: 'Right Triangle',
			href: '/2d/triangle/right',
			variables: 'a = base, b = height',
			area: 'A = \\frac{1}{2}ab',
			perimeter: 'P = a + b + c'
		},
		{
			shapeId: 'scalene-triangle',
			name: 'Scalene Triangle',
			href: '/2d/triangle/scalene',
			variables: 'a, b, c = sides',
			area: 'A = \\sqrt{s(s-a)(s-b)(s-c)}',
			perimeter: 'P = a + b + c'
		},
		{
			shapeId: 'trapezoid',
			name: 'Trapezoid',
			href: '/2d/trapezoid',
			variables: 'a, b = bases, h = height',
			area: 'A = \\frac{1}{2}(a + b)h',
			perimeter: 'P = a + b + c + d'
		},
		{
			shapeId: 'parallelogram',
			name: 'Parallelogram',
			href: '/2d/parallelogram',
			variables: 'b = base, h = height, s = side',
			area: 'A = b \\times h',
			perimeter: 'P = 2(b + s)'
		},
		{
			shapeId: 'ellipse',
			name: 'Ellipse',
			href: '/2d/ellipse',
			variables: 'a = semi-major, b = semi-minor',
			area: 'A = \\pi a b',
			perimeter: 'P \\approx \\pi(a + b)(1 + \\frac{3h}{10 + \\sqrt{4 - 3h}})'
		},
		{
			shapeId: 'rhombus',
			name: 'Rhombus',
			href: '/2d/rhombus',
			variables: 'd\u2081, d\u2082 = diagonals',
			area: 'A = \\frac{d_1 \\times d_2}{2}',
			perimeter: 'P = 4s'
		},
		{
			shapeId: 'kite',
			name: 'Kite',
			href: '/2d/kite',
			variables: 'd\u2081, d\u2082 = diagonals',
			area: 'A = \\frac{d_1 \\times d_2}{2}',
			perimeter: 'P = 2(a + b)'
		}
	];

	const formulas3d: Formula3D[] = [
		{
			shapeId: 'cube',
			name: 'Cube',
			href: '/3d/cube',
			variables: 's = side',
			volume: 'V = s^3',
			area: 'A = 6s^2'
		},
		{
			shapeId: 'rectangular-prism',
			name: 'Rectangular Prism',
			href: '/3d/rectangular-prism',
			variables: 'l, w, h',
			volume: 'V = lwh',
			area: 'A = 2(lw + lh + wh)'
		},
		{
			shapeId: 'sphere',
			name: 'Sphere',
			href: '/3d/sphere',
			variables: 'r = radius',
			volume: 'V = \\frac{4}{3}\\pi r^3',
			area: 'A = 4\\pi r^2'
		},
		{
			shapeId: 'cylinder',
			name: 'Cylinder',
			href: '/3d/cylinder',
			variables: 'r = radius, h = height',
			volume: 'V = \\pi r^2 h',
			area: 'A = 2\\pi r(r + h)'
		},
		{
			shapeId: 'cone',
			name: 'Cone',
			href: '/3d/cone',
			variables: 'r = radius, h = height',
			volume: 'V = \\frac{1}{3}\\pi r^2 h',
			area: 'A = \\pi r(r + l)'
		},
		{
			shapeId: 'pyramid',
			name: 'Pyramid',
			href: '/3d/pyramid',
			variables: 's = base side, h = height',
			volume: 'V = \\frac{1}{3}s^2 h',
			area: 'A = s^2 + 2sl'
		},
		{
			shapeId: 'torus',
			name: 'Torus',
			href: '/3d/torus',
			variables: 'R = major, r = minor',
			volume: 'V = 2\\pi^2 R r^2',
			area: 'A = 4\\pi^2 R r'
		}
	];
</script>

<SeoHead
	title="Math Formulas Cheat Sheet — 2D & 3D Geometry | Mathsperia"
	description="Quick-reference formula cheat sheet for all geometry shapes. Area, perimeter, volume, and surface area formulas with variables. Printable-friendly for students and teachers."
	canonicalPath="/formulas"
	keywords="geometry formulas, area formulas, perimeter formulas, volume formulas, surface area formulas, math cheat sheet, geometry reference, area of circle, area of triangle, volume of sphere, cylinder volume formula"
	structuredData={pageData}
/>

<Breadcrumb
	items={[{ label: tKey('nav.home'), href: '/' }, { label: tKey('pages.formulas.title') }]}
/>

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('pages.formulas.subtitle')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('pages.formulas.title')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('pages.formulas.desc')}</p>
	<button
		onclick={() => window.print()}
		class="print-hidden mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-bright"
		aria-label="Print cheat sheet"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><polyline points="6 9 6 2 18 2 18 9" /><path
				d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
			/><rect x="6" y="14" width="12" height="8" /></svg
		>
		{tKey('common.printCheatSheet')}
	</button>
</div>

<!-- 2D Shapes -->
<div class="mb-10">
	<h2 class="mb-4 font-display text-2xl font-semibold text-text-primary">
		{tKey('pages.formulas.heading2d')}
	</h2>
	<div class="surface-panel overflow-x-auto p-6">
		<table class="w-full border-collapse text-left">
			<thead>
				<tr class="border-border-default border-b">
					<th class="px-4 py-3 text-sm font-medium text-text-muted"
						>{tKey('pages.formulas.colShape')}</th
					>
					<th class="px-4 py-3 text-sm font-medium text-text-muted"
						>{tKey('pages.formulas.colVariables')}</th
					>
					<th class="px-4 py-3 text-sm font-medium text-text-muted"
						>{tKey('pages.formulas.colArea')}</th
					>
					<th class="px-4 py-3 text-sm font-medium text-text-muted"
						>{tKey('pages.formulas.colPerimeter')}</th
					>
				</tr>
			</thead>
			<tbody>
				{#each formulas2d as entry}
					<tr class="border-border-divider border-b transition-colors hover:bg-bg-inset/30">
						<td class="px-4 py-3">
							<a
								href={entry.href}
								class="text-sm font-medium text-indigo transition-colors hover:text-indigo-bright"
								>{tKey(`shapes.${entry.shapeId}.name`)}</a
							>
						</td>
						<td class="px-4 py-3 font-mono text-sm text-text-secondary">{entry.variables}</td>
						<td class="px-4 py-3 text-sm text-text-secondary">{@html renderFormula(entry.area)}</td>
						<td class="px-4 py-3 text-sm text-text-secondary"
							>{@html renderFormula(entry.perimeter)}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- 3D Shapes -->
<div class="mb-10">
	<h2 class="mb-4 font-display text-2xl font-semibold text-text-primary">
		{tKey('pages.formulas.heading3d')}
	</h2>
	<div class="surface-panel overflow-x-auto p-6">
		<table class="w-full border-collapse text-left">
			<thead>
				<tr class="border-border-default border-b">
					<th class="px-4 py-3 text-sm font-medium text-text-muted"
						>{tKey('pages.formulas.colSolid')}</th
					>
					<th class="px-4 py-3 text-sm font-medium text-text-muted"
						>{tKey('pages.formulas.colVariables')}</th
					>
					<th class="px-4 py-3 text-sm font-medium text-text-muted"
						>{tKey('pages.formulas.colVolume')}</th
					>
					<th class="px-4 py-3 text-sm font-medium text-text-muted"
						>{tKey('pages.formulas.colSurfaceArea')}</th
					>
				</tr>
			</thead>
			<tbody>
				{#each formulas3d as entry}
					<tr class="border-border-divider border-b transition-colors hover:bg-bg-inset/30">
						<td class="px-4 py-3">
							<a
								href={entry.href}
								class="text-sm font-medium text-indigo transition-colors hover:text-indigo-bright"
								>{tKey(`shapes.${entry.shapeId}.name`)}</a
							>
						</td>
						<td class="px-4 py-3 font-mono text-sm text-text-secondary">{entry.variables}</td>
						<td class="px-4 py-3 text-sm text-text-secondary"
							>{@html renderFormula(entry.volume)}</td
						>
						<td class="px-4 py-3 text-sm text-text-secondary">{@html renderFormula(entry.area)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	/* Print-friendly cheat sheet styles */
	@media print {
		.print-hidden,
		:global(.breadcrumb),
		:global(nav) {
			display: none !important;
		}

		.surface-panel {
			background: #fff !important;
			box-shadow: none !important;
			border: 1px solid #ccc !important;
			transform: none !important;
		}

		table {
			width: 100% !important;
			border-collapse: collapse !important;
		}

		th,
		td {
			border: 1px solid #ddd !important;
			color: #000 !important;
		}

		a {
			color: #000 !important;
			text-decoration: none !important;
		}

		a::after {
			content: ' (' attr(href) ')';
			font-size: 0.75rem;
			color: #555;
		}

		h1,
		h2 {
			color: #000 !important;
		}
	}
</style>
