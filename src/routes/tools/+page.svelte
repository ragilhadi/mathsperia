<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { categoryPageData } from '$lib/utils/seo';
	import ShapeCard from '$lib/components/ShapeCard.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { tKey } from '$lib/stores/lang.svelte';

	interface Tool {
		nameKey: string;
		descKey: string;
		id: string;
		color: 'blue' | 'cyan' | 'violet';
	}

	const tools: Tool[] = [
		{
			nameKey: 'pages.tools.distanceName',
			descKey: 'pages.tools.distanceDesc',
			id: 'distance',
			color: 'blue'
		},
		{
			nameKey: 'pages.tools.midpointName',
			descKey: 'pages.tools.midpointDesc',
			id: 'midpoint',
			color: 'cyan'
		},
		{
			nameKey: 'pages.tools.slopeName',
			descKey: 'pages.tools.slopeDesc',
			id: 'slope',
			color: 'violet'
		},
		{
			nameKey: 'pages.tools.areaCoordsName',
			descKey: 'pages.tools.areaCoordsDesc',
			id: 'area-coordinates',
			color: 'blue'
		},
		{
			nameKey: 'pages.tools.trigName',
			descKey: 'pages.tools.trigDesc',
			id: 'trig',
			color: 'cyan'
		},
		{
			nameKey: 'pages.tools.convertName',
			descKey: 'pages.tools.convertDesc',
			id: 'convert',
			color: 'violet'
		}
	];

	const colorMap: Record<string, { stroke: string; fill: string }> = {
		blue: { stroke: '#818CF8', fill: 'rgba(99,102,241,0.08)' },
		cyan: { stroke: '#22D3EE', fill: 'rgba(34,211,238,0.08)' },
		violet: { stroke: '#A78BFA', fill: 'rgba(167,139,250,0.08)' }
	};

	const svgPreviews: Record<string, string> = {
		distance: `<svg viewBox="0 0 100 100" class="w-16 h-16"><line x1="18" y1="72" x2="82" y2="28" stroke="${colorMap.blue.stroke}" stroke-width="2"/><circle cx="18" cy="72" r="4" fill="${colorMap.blue.fill}" stroke="${colorMap.blue.stroke}" stroke-width="2"/><circle cx="82" cy="28" r="4" fill="${colorMap.blue.fill}" stroke="${colorMap.blue.stroke}" stroke-width="2"/></svg>`,
		midpoint: `<svg viewBox="0 0 100 100" class="w-16 h-16"><line x1="18" y1="72" x2="82" y2="28" stroke="${colorMap.cyan.stroke}" stroke-width="2"/><circle cx="18" cy="72" r="3" fill="${colorMap.cyan.stroke}"/><circle cx="82" cy="28" r="3" fill="${colorMap.cyan.stroke}"/><circle cx="50" cy="50" r="5" fill="${colorMap.cyan.fill}" stroke="${colorMap.cyan.stroke}" stroke-width="2"/></svg>`,
		slope: `<svg viewBox="0 0 100 100" class="w-16 h-16"><line x1="8" y1="92" x2="8" y2="8" stroke="#8B8FA3" stroke-width="1.5"/><line x1="8" y1="92" x2="92" y2="92" stroke="#8B8FA3" stroke-width="1.5"/><line x1="18" y1="78" x2="82" y2="22" stroke="${colorMap.violet.stroke}" stroke-width="2.5"/><circle cx="18" cy="78" r="3" fill="${colorMap.violet.stroke}"/><circle cx="82" cy="22" r="3" fill="${colorMap.violet.stroke}"/></svg>`,
		'area-coordinates': `<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="50,14 86,50 74,86 26,86 14,50" fill="${colorMap.blue.fill}" stroke="${colorMap.blue.stroke}" stroke-width="2"/><circle cx="50" cy="14" r="3" fill="${colorMap.blue.stroke}"/><circle cx="86" cy="50" r="3" fill="${colorMap.blue.stroke}"/><circle cx="74" cy="86" r="3" fill="${colorMap.blue.stroke}"/><circle cx="26" cy="86" r="3" fill="${colorMap.blue.stroke}"/><circle cx="14" cy="50" r="3" fill="${colorMap.blue.stroke}"/></svg>`,
		trig: `<svg viewBox="0 0 100 100" class="w-16 h-16"><polygon points="20,80 80,80 80,30" fill="${colorMap.cyan.fill}" stroke="${colorMap.cyan.stroke}" stroke-width="2"/><path d="M 72,80 A 8,8 0 0,0 66,74" fill="none" stroke="${colorMap.cyan.stroke}" stroke-width="2"/></svg>`,
		convert: `<svg viewBox="0 0 100 100" class="w-16 h-16"><line x1="20" y1="40" x2="80" y2="40" stroke="${colorMap.violet.stroke}" stroke-width="2"/><polygon points="80,40 70,35 70,45" fill="${colorMap.violet.stroke}"/><line x1="80" y1="60" x2="20" y2="60" stroke="${colorMap.violet.stroke}" stroke-width="2"/><polygon points="20,60 30,55 30,65" fill="${colorMap.violet.stroke}"/></svg>`
	};

	const pageData = categoryPageData({
		name: 'Coordinate Geometry Tools & Calculators',
		urlPath: '/tools',
		description:
			'Free interactive math tools: distance calculator, midpoint calculator, slope calculator, area by coordinates, trigonometry calculator, and unit converter.',
		itemList: [
			{ name: 'Distance Calculator', url: '/tools/distance' },
			{ name: 'Midpoint Calculator', url: '/tools/midpoint' },
			{ name: 'Slope Calculator', url: '/tools/slope' },
			{ name: 'Area by Coordinates', url: '/tools/area-coordinates' },
			{ name: 'Trigonometry Calculator', url: '/tools/trig' },
			{ name: 'Unit Converter', url: '/tools/convert' }
		]
	});
</script>

<SeoHead
	title="Math Tools — Coordinate Geometry, Trigonometry & Unit Converter | Mathsperia"
	description="Free interactive math tools. Calculate distance, midpoint, slope, and polygon area on a coordinate plane. Solve right triangles with the trigonometry calculator. Convert length, area, volume, and angle units."
	canonicalPath="/tools"
	keywords="distance calculator, midpoint calculator, slope calculator, area by coordinates, shoelace formula, trigonometry calculator, unit converter, coordinate geometry tools, math tools"
	structuredData={pageData}
/>

<Breadcrumb items={[{ label: tKey('nav.home'), href: '/' }, { label: tKey('nav.tools') }]} />
<p class="micro-label mb-3">{tKey('pages.tools.subtitle')}</p>
<h1 class="mb-2 font-display text-4xl font-bold tracking-tight text-text-primary">
	{tKey('pages.tools.title')}
</h1>
<p class="mb-10 text-text-secondary">{tKey('pages.tools.desc')}</p>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
	{#each tools as tool}
		<ShapeCard
			name={tKey(tool.nameKey)}
			description={tKey(tool.descKey)}
			href="/tools/{tool.id}"
			svgPreview={svgPreviews[tool.id]}
		/>
	{/each}
</div>
