<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { tKey } from '$lib/stores/lang.svelte';

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
				description:
					'Volume and surface area calculators for cubes, spheres, cylinders, cones, pyramids, and tori.'
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
	{@html `\u003cscript type="application/ld+json"\u003e${JSON.stringify(siteStructuredData)}\u003c/script\u003e`}
	{@html `\u003cscript type="application/ld+json"\u003e${JSON.stringify(orgStructuredData)}\u003c/script\u003e`}
</svelte:head>

<!-- Hero -->
<section class="py-20 text-center">
	<p class="micro-label mb-4">{tKey('home.tagline')}</p>
	<h1 class="mb-5 font-display text-5xl font-bold tracking-[-0.03em] text-text-primary sm:text-6xl">
		{tKey('home.heroTitle1')}<br class="sm:hidden" />
		<span class="text-indigo"> {tKey('home.heroTitle2')}</span>
	</h1>
	<p class="mx-auto max-w-xl text-lg leading-relaxed text-text-secondary">
		{tKey('home.heroDesc')}
	</p>
</section>

<!-- Category Cards -->
<section class="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
	<!-- 2D Geometry card -->
	<a href="/2d" class="surface-panel flex cursor-pointer flex-col gap-3 p-6">
		<span class="micro-label">{tKey('home.shapes2dCount')}</span>
		<h2 class="font-display text-xl font-semibold text-text-primary">{tKey('home.shapes2dTitle')}</h2>
		<p class="text-sm leading-relaxed text-text-secondary">
			{tKey('home.shapes2dDesc')}
		</p>
	</a>
	<!-- 3D Geometry card -->
	<a href="/3d" class="surface-panel flex cursor-pointer flex-col gap-3 p-6">
		<span class="micro-label">{tKey('home.shapes3dCount')}</span>
		<h2 class="font-display text-xl font-semibold text-text-primary">{tKey('home.shapes3dTitle')}</h2>
		<p class="text-sm leading-relaxed text-text-secondary">
			{tKey('home.shapes3dDesc')}
		</p>
	</a>
</section>

<!-- Tools & Resources -->
<section class="mx-auto mt-10 max-w-3xl">
	<h2 class="micro-label mb-6 text-center">{tKey('home.toolsTitle')}</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		<a href="/tools" class="surface-panel flex cursor-pointer flex-col gap-2 p-5">
			<h3 class="font-display text-lg font-semibold text-text-primary">{tKey('home.coordToolsTitle')}</h3>
			<p class="text-sm text-text-secondary">
				{tKey('home.coordToolsDesc')}
			</p>
		</a>
		<a href="/tools/trig" class="surface-panel flex cursor-pointer flex-col gap-2 p-5">
			<h3 class="font-display text-lg font-semibold text-text-primary">{tKey('home.trigTitle')}</h3>
			<p class="text-sm text-text-secondary">
				{tKey('home.trigDesc')}
			</p>
		</a>
		<a href="/tools/convert" class="surface-panel flex cursor-pointer flex-col gap-2 p-5">
			<h3 class="font-display text-lg font-semibold text-text-primary">{tKey('home.convertTitle')}</h3>
			<p class="text-sm text-text-secondary">
				{tKey('home.convertDesc')}
			</p>
		</a>
		<a href="/quiz" class="surface-panel flex cursor-pointer flex-col gap-2 p-5">
			<h3 class="font-display text-lg font-semibold text-text-primary">{tKey('home.quizTitle')}</h3>
			<p class="text-sm text-text-secondary">
				{tKey('home.quizDesc')}
			</p>
		</a>
		<a href="/formulas" class="surface-panel flex cursor-pointer flex-col gap-2 p-5">
			<h3 class="font-display text-lg font-semibold text-text-primary">{tKey('home.formulasTitle')}</h3>
			<p class="text-sm text-text-secondary">
				{tKey('home.formulasDesc')}
			</p>
		</a>
		<a href="/glossary" class="surface-panel flex cursor-pointer flex-col gap-2 p-5">
			<h3 class="font-display text-lg font-semibold text-text-primary">{tKey('home.glossaryTitle')}</h3>
			<p class="text-sm text-text-secondary">
				{tKey('home.glossaryDesc')}
			</p>
		</a>
	</div>
</section>

<!-- Features highlight -->
<section class="mx-auto mt-20 max-w-3xl">
	<h2 class="micro-label mb-6 text-center">{tKey('home.whyTitle')}</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		<div class="surface-panel flex flex-col gap-2 p-5">
			<h3 class="font-display text-lg font-semibold text-text-primary">{tKey('home.freeTitle')}</h3>
			<p class="text-sm text-text-secondary">
				{tKey('home.freeDesc')}
			</p>
		</div>
		<div class="surface-panel flex flex-col gap-2 p-5">
			<h3 class="font-display text-lg font-semibold text-text-primary">{tKey('home.visualTitle')}</h3>
			<p class="text-sm text-text-secondary">
				{tKey('home.visualDesc')}
			</p>
		</div>
		<div class="surface-panel flex flex-col gap-2 p-5">
			<h3 class="font-display text-lg font-semibold text-text-primary">{tKey('home.preciseTitle')}</h3>
			<p class="text-sm text-text-secondary">
				{tKey('home.preciseDesc')}
			</p>
		</div>
	</div>
</section>
