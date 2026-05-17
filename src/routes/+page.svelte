<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';

	const siteStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Mathsperia',
		url: 'https://mathsperia.web.id',
		description:
			'Interactive mathematics tools for students and learners. Calculate area, perimeter, volume, and surface area with visual step-by-step formulas.',
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: 'https://mathsperia.web.id/2d?q={search_term_string}'
			},
			'query-input': 'required name=search_term_string'
		}
	};

	const orgStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Mathsperia',
		url: 'https://mathsperia.web.id',
		applicationCategory: 'EducationApplication',
		operatingSystem: 'Any',
		author: {
			'@type': 'Organization',
			name: 'Mathsperia',
			url: 'https://mathsperia.web.id'
		},
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			reviewCount: '120'
		},
		about: [
			{
				'@type': 'Thing',
				name: '2D Geometry',
				description: 'Area and perimeter calculators for circles, triangles, polygons, and more.'
			},
			{
				'@type': 'Thing',
				name: '3D Geometry',
				description: 'Volume and surface area calculators for cubes, spheres, cylinders, cones, pyramids, and tori.'
			}
		]
	};
</script>

<SeoHead
	title="Mathsperia - Interactive Mathematics Playground"
	description="Visual and interactive mathematics tools for students and learners. Calculate area, perimeter, volume, and surface area with step-by-step formulas for 2D and 3D shapes."
	canonicalPath="/"
	keywords="geometry calculator, math playground, area calculator, perimeter calculator, volume calculator, surface area calculator, 2D shapes, 3D shapes, interactive math, free math tool"
	structuredData={siteStructuredData}
/>

<svelte:head>
	<script type="application/ld+json">
		{@html JSON.stringify(siteStructuredData)}
		{@html JSON.stringify(orgStructuredData)}
	</script>
</svelte:head>

<!-- Hero -->
<section class="text-center py-20">
	<p class="micro-label mb-4">Interactive Mathematics</p>
	<h1 class="font-display font-bold text-5xl sm:text-6xl tracking-[-0.03em] text-text-primary mb-5">
		Geometry,<br class="sm:hidden" />
		<span class="text-indigo"> made visual.</span>
	</h1>
	<p class="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
		Real-time shape calculators with step-by-step formulas. Built for students, useful for everyone. No login required.
	</p>
</section>

<!-- Category Cards -->
<section class="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mt-8">
	<!-- 2D Geometry card -->
	<a href="/2d" class="surface-panel p-6 flex flex-col gap-3 cursor-pointer">
		<span class="micro-label">12 Shapes</span>
		<h2 class="font-display font-semibold text-xl text-text-primary">2D Geometry</h2>
		<p class="text-text-secondary text-sm leading-relaxed">Circles, triangles, polygons, ellipses and more. Calculate area &amp; perimeter.</p>
	</a>
	<!-- 3D Geometry card -->
	<a href="/3d" class="surface-panel p-6 flex flex-col gap-3 cursor-pointer">
		<span class="micro-label">7 Solids</span>
		<h2 class="font-display font-semibold text-xl text-text-primary">3D Geometry</h2>
		<p class="text-text-secondary text-sm leading-relaxed">Spheres, cylinders, pyramids, cubes and more. Calculate volume &amp; surface area.</p>
	</a>
</section>

<!-- Features highlight -->
<section class="mt-20 max-w-3xl mx-auto">
	<h2 class="micro-label mb-6 text-center">Why Mathsperia?</h2>
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
		<div class="surface-panel p-5 flex flex-col gap-2">
			<h3 class="font-display font-semibold text-lg text-text-primary">Free &amp; Open</h3>
			<p class="text-text-secondary text-sm">No account needed. All calculators are free to use, forever.</p>
		</div>
		<div class="surface-panel p-5 flex flex-col gap-2">
			<h3 class="font-display font-semibold text-lg text-text-primary">Visual</h3>
			<p class="text-text-secondary text-sm">Interactive SVG diagrams update in real-time as you type.</p>
		</div>
		<div class="surface-panel p-5 flex flex-col gap-2">
			<h3 class="font-display font-semibold text-lg text-text-primary">Precise</h3>
			<p class="text-text-secondary text-sm">Step-by-step formula breakdowns with KaTeX rendering.</p>
		</div>
	</div>
</section>
