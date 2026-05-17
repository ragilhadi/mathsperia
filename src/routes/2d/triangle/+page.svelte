<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { categoryPageData } from '$lib/utils/seo';
	import ShapeCard from '$lib/components/ShapeCard.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	const pageData = categoryPageData({
		name: 'Triangle Calculators',
		urlPath: '/2d/triangle',
		description: 'Interactive triangle calculators for all triangle types — equilateral, isosceles, right, and scalene.',
		itemList: [
			{ name: 'Equilateral Triangle Calculator', url: '/2d/triangle/equilateral' },
			{ name: 'Isosceles Triangle Calculator', url: '/2d/triangle/isosceles' },
			{ name: 'Right Triangle Calculator', url: '/2d/triangle/right' },
			{ name: 'Scalene Triangle Calculator', url: '/2d/triangle/scalene' }
		]
	});

	const triangleTypes = [
		{
			name: 'Equilateral',
			href: '/2d/triangle/equilateral',
			description: 'All sides equal',
			svgPreview: '<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="50,18 86,78 14,78" fill="none" stroke="#818CF8" stroke-width="2"/></svg>'
		},
		{
			name: 'Isosceles',
			href: '/2d/triangle/isosceles',
			description: 'Two sides equal',
			svgPreview: '<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="50,22 82,80 18,80" fill="none" stroke="#818CF8" stroke-width="2"/></svg>'
		},
		{
			name: 'Right Triangle',
			href: '/2d/triangle/right',
			description: '90° angle',
			svgPreview: '<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="22,78 22,34 74,78" fill="none" stroke="#818CF8" stroke-width="2"/></svg>'
		},
		{
			name: 'Scalene',
			href: '/2d/triangle/scalene',
			description: 'All sides different',
			svgPreview: '<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="24,76 48,20 84,80" fill="none" stroke="#818CF8" stroke-width="2"/></svg>'
		}
	];
</script>

<SeoHead
	title="Triangle Calculators — 4 Types | Mathsperia"
	description="Interactive triangle calculators for equilateral, isosceles, right, and scalene triangles. Calculate area and perimeter with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/2d/triangle"
	keywords="triangle calculator, triangle area calculator, equilateral triangle, isosceles triangle, right triangle, scalene triangle, herons formula, pythagorean theorem, triangle perimeter, triangle sides"
	structuredData={pageData}
/>

<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: '2D Geometry', href: '/2d' }, { label: 'Triangle Types' }]} />
<p class="micro-label mb-3">Triangle Types</p>
<h1 class="font-display font-bold text-4xl tracking-tight text-text-primary mb-2">Choose Your Triangle</h1>
<p class="text-text-secondary mb-10">Different types have specific calculation methods.</p>

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
	{#each triangleTypes as type}
		<ShapeCard
			name={type.name}
			href={type.href}
			description={type.description}
			svgPreview={type.svgPreview}
		/>
	{/each}
</div>
