<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { categoryPageData } from '$lib/utils/seo';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	const pageData = categoryPageData({
		name: 'Geometry Formula Cheat Sheet',
		urlPath: '/formulas',
		description: 'Quick-reference formula cheat sheet for 2D and 3D geometry shapes. Area, perimeter, volume, and surface area.',
		itemList: [
			{ name: '2D Geometry Shapes', url: '/2d' },
			{ name: '3D Geometry Solids', url: '/3d' }
		]
	});

	interface Formula2D {
		name: string;
		href: string;
		variables: string;
		area: string;
		perimeter: string;
	}

	interface Formula3D {
		name: string;
		href: string;
		variables: string;
		volume: string;
		area: string;
	}

	const formulas2d: Formula2D[] = [
		{ name: 'Circle', href: '/2d/circle', variables: 'r = radius', area: 'A = \\pi r^2', perimeter: 'C = 2\\pi r' },
		{ name: 'Square', href: '/2d/square', variables: 's = side', area: 'A = s^2', perimeter: 'P = 4s' },
		{ name: 'Rectangle', href: '/2d/rectangle', variables: 'l = length, w = width', area: 'A = l \\times w', perimeter: 'P = 2(l + w)' },
		{ name: 'Equilateral Triangle', href: '/2d/triangle/equilateral', variables: 's = side', area: 'A = \\frac{\\sqrt{3}}{4}s^2', perimeter: 'P = 3s' },
		{ name: 'Isosceles Triangle', href: '/2d/triangle/isosceles', variables: 'b = base, s = equal side', area: 'A = \\frac{1}{2}bh', perimeter: 'P = b + 2s' },
		{ name: 'Right Triangle', href: '/2d/triangle/right', variables: 'a = base, b = height', area: 'A = \\frac{1}{2}ab', perimeter: 'P = a + b + c' },
		{ name: 'Scalene Triangle', href: '/2d/triangle/scalene', variables: 'a, b, c = sides', area: 'A = \\sqrt{s(s-a)(s-b)(s-c)}', perimeter: 'P = a + b + c' },
		{ name: 'Trapezoid', href: '/2d/trapezoid', variables: 'a, b = bases, h = height', area: 'A = \\frac{1}{2}(a + b)h', perimeter: 'P = a + b + c + d' },
		{ name: 'Parallelogram', href: '/2d/parallelogram', variables: 'b = base, h = height, s = side', area: 'A = b \\times h', perimeter: 'P = 2(b + s)' },
		{ name: 'Ellipse', href: '/2d/ellipse', variables: 'a = semi-major, b = semi-minor', area: 'A = \\pi a b', perimeter: 'P \\approx \\pi(a + b)(1 + \\frac{3h}{10 + \\sqrt{4 - 3h}})' },
		{ name: 'Rhombus', href: '/2d/rhombus', variables: 'd\u2081, d\u2082 = diagonals', area: 'A = \\frac{d_1 \\times d_2}{2}', perimeter: 'P = 4s' },
		{ name: 'Kite', href: '/2d/kite', variables: 'd\u2081, d\u2082 = diagonals', area: 'A = \\frac{d_1 \\times d_2}{2}', perimeter: 'P = 2(a + b)' }
	];

	const formulas3d: Formula3D[] = [
		{ name: 'Cube', href: '/3d/cube', variables: 's = side', volume: 'V = s^3', area: 'A = 6s^2' },
		{ name: 'Rectangular Prism', href: '/3d/rectangular-prism', variables: 'l, w, h', volume: 'V = lwh', area: 'A = 2(lw + lh + wh)' },
		{ name: 'Sphere', href: '/3d/sphere', variables: 'r = radius', volume: 'V = \\frac{4}{3}\\pi r^3', area: 'A = 4\\pi r^2' },
		{ name: 'Cylinder', href: '/3d/cylinder', variables: 'r = radius, h = height', volume: 'V = \\pi r^2 h', area: 'A = 2\\pi r(r + h)' },
		{ name: 'Cone', href: '/3d/cone', variables: 'r = radius, h = height', volume: 'V = \\frac{1}{3}\\pi r^2 h', area: 'A = \\pi r(r + l)' },
		{ name: 'Pyramid', href: '/3d/pyramid', variables: 's = base side, h = height', volume: 'V = \\frac{1}{3}s^2 h', area: 'A = s^2 + 2sl' },
		{ name: 'Torus', href: '/3d/torus', variables: 'R = major, r = minor', volume: 'V = 2\\pi^2 R r^2', area: 'A = 4\\pi^2 R r' }
	];
</script>

<SeoHead
	title="Math Formulas Cheat Sheet — 2D & 3D Geometry | Mathsperia"
	description="Quick-reference formula cheat sheet for all geometry shapes. Area, perimeter, volume, and surface area formulas with variables. Printable-friendly for students and teachers."
	canonicalPath="/formulas"
	keywords="geometry formulas, area formulas, perimeter formulas, volume formulas, surface area formulas, math cheat sheet, geometry reference, area of circle, area of triangle, volume of sphere, cylinder volume formula"
	structuredData={pageData}
/>

<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Formula Cheat Sheet' }]} />

<div class="mb-8">
	<p class="micro-label mb-2">Reference</p>
	<h1 class="font-display font-bold text-4xl tracking-tight text-text-primary">Formula Cheat Sheet</h1>
	<p class="text-text-secondary mt-2">Quick reference for every shape on Mathsperia.</p>
</div>

<!-- 2D Shapes -->
<div class="mb-10">
	<h2 class="font-display font-semibold text-2xl text-text-primary mb-4">2D Shapes — Area &amp; Perimeter</h2>
	<div class="surface-panel p-6 overflow-x-auto">
		<table class="w-full text-left border-collapse">
			<thead>
				<tr class="border-b border-border-default">
					<th class="py-3 px-4 text-text-muted text-sm font-medium">Shape</th>
					<th class="py-3 px-4 text-text-muted text-sm font-medium">Variables</th>
					<th class="py-3 px-4 text-text-muted text-sm font-medium">Area Formula</th>
					<th class="py-3 px-4 text-text-muted text-sm font-medium">Perimeter Formula</th>
				</tr>
			</thead>
			<tbody>
				{#each formulas2d as entry}
					<tr class="border-b border-border-divider hover:bg-bg-inset/30 transition-colors">
						<td class="py-3 px-4">
							<a href={entry.href} class="text-indigo hover:text-indigo-bright transition-colors text-sm font-medium">{entry.name}</a>
						</td>
						<td class="py-3 px-4 text-text-secondary text-sm font-mono">{entry.variables}</td>
						<td class="py-3 px-4 text-text-secondary text-sm font-mono">{@html entry.area}</td>
						<td class="py-3 px-4 text-text-secondary text-sm font-mono">{@html entry.perimeter}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- 3D Shapes -->
<div class="mb-10">
	<h2 class="font-display font-semibold text-2xl text-text-primary mb-4">3D Solids — Volume &amp; Surface Area</h2>
	<div class="surface-panel p-6 overflow-x-auto">
		<table class="w-full text-left border-collapse">
			<thead>
				<tr class="border-b border-border-default">
					<th class="py-3 px-4 text-text-muted text-sm font-medium">Solid</th>
					<th class="py-3 px-4 text-text-muted text-sm font-medium">Variables</th>
					<th class="py-3 px-4 text-text-muted text-sm font-medium">Volume Formula</th>
					<th class="py-3 px-4 text-text-muted text-sm font-medium">Surface Area Formula</th>
				</tr>
			</thead>
			<tbody>
				{#each formulas3d as entry}
					<tr class="border-b border-border-divider hover:bg-bg-inset/30 transition-colors">
						<td class="py-3 px-4">
							<a href={entry.href} class="text-indigo hover:text-indigo-bright transition-colors text-sm font-medium">{entry.name}</a>
						</td>
						<td class="py-3 px-4 text-text-secondary text-sm font-mono">{entry.variables}</td>
						<td class="py-3 px-4 text-text-secondary text-sm font-mono">{@html entry.volume}</td>
						<td class="py-3 px-4 text-text-secondary text-sm font-mono">{@html entry.area}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
