<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { categoryPageData } from '$lib/utils/seo';
	import ShapeCard from '$lib/components/ShapeCard.svelte';
	import { shapes } from '$lib/utils/shapes';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { tKey } from '$lib/stores/lang.svelte';

	const pageData = categoryPageData({
		name: '2D Geometry Calculators',
		urlPath: '/2d',
		description: 'Interactive 2D geometry calculators for circles, triangles, polygons and more.',
		itemList: [
			{ name: 'Circle Calculator', url: '/2d/circle' },
			{ name: 'Square Calculator', url: '/2d/square' },
			{ name: 'Rectangle Calculator', url: '/2d/rectangle' },
			{ name: 'Triangle Calculators', url: '/2d/triangle' },
			{ name: 'Equilateral Triangle Calculator', url: '/2d/triangle/equilateral' },
			{ name: 'Isosceles Triangle Calculator', url: '/2d/triangle/isosceles' },
			{ name: 'Right Triangle Calculator', url: '/2d/triangle/right' },
			{ name: 'Scalene Triangle Calculator', url: '/2d/triangle/scalene' },
			{ name: 'Trapezoid Calculator', url: '/2d/trapezoid' },
			{ name: 'Parallelogram Calculator', url: '/2d/parallelogram' },
			{ name: 'Ellipse Calculator', url: '/2d/ellipse' },
			{ name: 'Rhombus Calculator', url: '/2d/rhombus' },
			{ name: 'Kite Calculator', url: '/2d/kite' }
		]
	});

	// Shape ID to inline SVG preview mapping
	const svgPreviews: Record<string, string> = {
		circle:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><circle cx="50" cy="50" r="38" fill="none" stroke="#818CF8" stroke-width="2"/><circle cx="50" cy="50" r="3" fill="#818CF8"/></svg>',
		rectangle:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><rect x="15" y="28" width="70" height="44" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		square:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><rect x="20" y="20" width="60" height="60" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		triangle:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="50,15 88,78 12,78" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		trapezoid:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="25,28 75,28 90,72 10,72" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		parallelogram:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="18,72 42,28 80,28 56,72" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		ellipse:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><ellipse cx="50" cy="50" rx="40" ry="24" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		rhombus:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="50,12 88,50 50,88 12,50" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		kite: '<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="50,12 70,50 50,88 30,50" fill="none" stroke="#818CF8" stroke-width="2"/></svg>'
	};
</script>

<SeoHead
	title="2D Geometry Calculators — 12 Shapes | Mathsperia"
	description="Free interactive 2D geometry calculators. Calculate area and perimeter for circles, squares, rectangles, triangles, trapezoids, parallelograms, ellipses, rhombuses, and kites. Step-by-step formulas with visual diagrams."
	canonicalPath="/2d"
	keywords="2d geometry calculator, area calculator 2d, perimeter calculator, circle area, triangle area, rectangle area, square area, trapezoid area, parallelogram area, ellipse area, rhombus area, kite area, free math tools"
	structuredData={pageData}
/>

<Breadcrumb items={[{ label: tKey('nav.home'), href: '/' }, { label: tKey('common.geometry2d') }]} />
<p class="micro-label mb-3">{tKey('common.geometry2d')}</p>
<h1 class="mb-2 font-display text-4xl font-bold tracking-tight text-text-primary">
	{tKey('pages.shapes2d.title')}
</h1>
<p class="mb-10 text-text-secondary">{tKey('pages.shapes2d.desc')}</p>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
	{#each shapes as shape}
		<ShapeCard
			name={tKey('shapes.' + shape.id + '.name')}
			description={tKey('shapes.' + shape.id + '.desc')}
			href="/2d/{shape.id}"
			svgPreview={svgPreviews[shape.id]}
		/>
	{/each}
</div>
