<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { categoryPageData } from '$lib/utils/seo';
	import ShapeCard from '$lib/components/ShapeCard.svelte';
	import { shapes3d } from '$lib/utils/shapes3d';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { tKey } from '$lib/stores/lang.svelte';

	const pageData = categoryPageData({
		name: '3D Geometry Calculators',
		urlPath: '/3d',
		description:
			'Interactive 3D solid calculators for cubes, spheres, cylinders, cones, pyramids, and more.',
		itemList: [
			{ name: 'Cube Calculator', url: '/3d/cube' },
			{ name: 'Rectangular Prism Calculator', url: '/3d/rectangular-prism' },
			{ name: 'Sphere Calculator', url: '/3d/sphere' },
			{ name: 'Cylinder Calculator', url: '/3d/cylinder' },
			{ name: 'Cone Calculator', url: '/3d/cone' },
			{ name: 'Pyramid Calculator', url: '/3d/pyramid' },
			{ name: 'Torus Calculator', url: '/3d/torus' }
		]
	});

	const svgPreviews: Record<string, string> = {
		cube: '<svg viewBox="0 0 100 100" class="w-16 h-16"><path d="M25 35 L50 20 L75 35 L75 65 L50 80 L25 65 Z" fill="none" stroke="#818CF8" stroke-width="2"/><path d="M50 20 L50 80" fill="none" stroke="#818CF8" stroke-width="1.5" opacity="0.5"/><path d="M25 35 L75 65" fill="none" stroke="#818CF8" stroke-width="1" opacity="0.3"/><path d="M25 65 L75 35" fill="none" stroke="#818CF8" stroke-width="1" opacity="0.3"/></svg>',
		'rectangular-prism':
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><path d="M20 40 L45 25 L80 35 L80 65 L55 80 L20 70 Z" fill="none" stroke="#818CF8" stroke-width="2"/><path d="M45 25 L45 80" fill="none" stroke="#818CF8" stroke-width="1.5" opacity="0.5"/></svg>',
		sphere:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><circle cx="50" cy="50" r="36" fill="none" stroke="#818CF8" stroke-width="2"/><ellipse cx="50" cy="50" rx="36" ry="12" fill="none" stroke="#818CF8" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/><ellipse cx="50" cy="50" rx="12" ry="36" fill="none" stroke="#818CF8" stroke-width="1" stroke-dasharray="3 3" opacity="0.3"/></svg>',
		cylinder:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><ellipse cx="50" cy="28" rx="28" ry="10" fill="none" stroke="#818CF8" stroke-width="2"/><path d="M22 28 L22 72" fill="none" stroke="#818CF8" stroke-width="2"/><path d="M78 28 L78 72" fill="none" stroke="#818CF8" stroke-width="2"/><ellipse cx="50" cy="72" rx="28" ry="10" fill="none" stroke="#818CF8" stroke-width="2" opacity="0.5"/></svg>',
		cone: '<svg viewBox="0 0 100 100" class="w-16 h-16"><ellipse cx="50" cy="72" rx="30" ry="10" fill="none" stroke="#818CF8" stroke-width="2" opacity="0.5"/><path d="M20 72 L50 18 L80 72" fill="none" stroke="#818CF8" stroke-width="2"/><path d="M50 18 L50 72" fill="none" stroke="#818CF8" stroke-width="1" stroke-dasharray="3 3" opacity="0.4"/><ellipse cx="50" cy="72" rx="8" ry="3" fill="none" stroke="#818CF8" stroke-width="1" opacity="0.3"/></svg>',
		pyramid:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="50,15 78,68 50,78 22,68" fill="none" stroke="#818CF8" stroke-width="2"/><polygon points="22,68 50,15 50,78" fill="none" stroke="#818CF8" stroke-width="1.5" opacity="0.5"/><line x1="50" y1="15" x2="50" y2="78" stroke="#818CF8" stroke-width="1" opacity="0.3"/></svg>',
		torus:
			'<svg viewBox="0 0 100 100" class="w-16 h-16"><ellipse cx="50" cy="50" rx="38" ry="22" fill="none" stroke="#818CF8" stroke-width="2"/><ellipse cx="50" cy="50" rx="38" ry="22" fill="none" stroke="#818CF8" stroke-width="2" transform="rotate(60 50 50)" opacity="0.4"/><ellipse cx="50" cy="50" rx="38" ry="22" fill="none" stroke="#818CF8" stroke-width="2" transform="rotate(-60 50 50)" opacity="0.4"/></svg>'
	};
</script>

<SeoHead
	title="3D Geometry Calculators — 7 Solids | Mathsperia"
	description="Free interactive 3D solid calculators. Calculate volume and surface area for cubes, rectangular prisms, spheres, cylinders, cones, pyramids, and tori. Step-by-step formulas with visual diagrams."
	canonicalPath="/3d"
	keywords="3d geometry calculator, volume calculator, surface area calculator, cube volume, sphere volume, cylinder volume, cone volume, pyramid volume, rectangular prism volume, torus volume, free math tools"
	structuredData={pageData}
/>

<Breadcrumb
	items={[{ label: tKey('nav.home'), href: '/' }, { label: tKey('common.geometry3d') }]}
/>
<p class="micro-label mb-3">{tKey('common.geometry3d')}</p>
<h1 class="mb-2 font-display text-4xl font-bold tracking-tight text-text-primary">
	{tKey('pages.shapes3d.title')}
</h1>
<p class="mb-10 text-text-secondary">{tKey('pages.shapes3d.desc')}</p>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
	{#each shapes3d as shape}
		<ShapeCard
			name={tKey('shapes.' + shape.id + '.name')}
			description={tKey('shapes.' + shape.id + '.desc')}
			href="/3d/{shape.id}"
			svgPreview={svgPreviews[shape.id]}
		/>
	{/each}
</div>
