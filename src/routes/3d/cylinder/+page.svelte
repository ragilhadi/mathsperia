<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import ShapeFacts from '$lib/components/ShapeFacts.svelte';
	import ShapeProperties from '$lib/components/ShapeProperties.svelte';
	import { calculateCylinder } from '$lib/utils/shapes3d';
	import { formatNumber, clamp } from '$lib/utils/format';
	import { getLastUnit, areaUnitLabel, volumeUnitLabel, type Unit } from '$lib/utils/units';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';

	const pageData = mathSolverData({
		shape: 'Cylinder',
		urlPath: '/3d/cylinder',
		category: '3D',
		resultType: 'volume and surface area',
		keywords: 'cylinder volume calculator, cylinder surface area, radius height, pipe volume math'
	});

	let radius = $state(4);
	let height = $state(10);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateCylinder>>(calculateCylinder(4, 10));

	let svgRx = $derived(clamp(radius * 8, 15, 70));
	let svgRy = $derived(svgRx * 0.3);
	let svgH = $derived(clamp(height * 6, 20, 120));
	let cx = $derived(100);
	let topCy = $derived(100 - svgH / 2);
	let bottomCy = $derived(100 + svgH / 2);

	let evaluatedVolume = $derived(
		`V = \\pi \\times \\text{${formatNumber(radius)}}^2 \\times \\text{${formatNumber(height)}} \\approx \\text{${formatNumber(result.volume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = 2\\pi \\times \\text{${formatNumber(radius)}}(\\text{${formatNumber(radius)}} + \\text{${formatNumber(height)}}) \\approx \\text{${formatNumber(result.area)}} \\text{ ${unit}}^2`
	);

	function handleCalculate() {
		result = calculateCylinder(radius, height);
	}

	function handleReset() {
		radius = 4;
		height = 10;
		result = calculateCylinder(radius, height);
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('r', String(radius));
		params.set('h', String(height));
		if (unit !== 'cm') params.set('unit', unit);
		const newUrl = `?${params.toString()}`;
		if (newUrl !== window.location.search && newUrl !== '?') {
			history.replaceState(history.state, '', newUrl);
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleCalculate();
			updateUrl();
		}
	}

	onMount(() => {
		const sp = $page.url.searchParams;
		const r = sp.get('r');
		if (r !== null) {
			const val = parseFloat(r);
			if (!isNaN(val) && val > 0) radius = val;
		}
		const h = sp.get('h');
		if (h !== null) {
			const val = parseFloat(h);
			if (!isNaN(val) && val > 0) height = val;
		}
		const u = sp.get('unit') as Unit | null;
		if (u === 'mm' || u === 'cm' || u === 'm' || u === 'km' || u === 'in' || u === 'ft' || u === 'yd') {
			unit = u;
		}
		handleCalculate();
	});

	$effect(() => {
		handleCalculate();
		updateUrl();
	});
</script>

<SeoHead
	title="Cylinder Calculator — Volume & Surface Area"
	description="Interactive cylinder calculator. Calculate volume, lateral area, and total surface area with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/3d/cylinder"
	keywords="cylinder volume calculator, cylinder surface area, radius height, pipe volume math"
	structuredData={pageData}
/>

<Breadcrumb items={[
	{ label: 'Home', href: '/' },
	{ label: '3D Geometry', href: '/3d' },
	{ label: 'Cylinder' }
]} />

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">3D Geometry</p>
	<h1 class="font-display font-bold text-4xl tracking-tight text-text-primary">Cylinder Calculator</h1>
	<p class="text-text-secondary mt-2">Calculate volume and surface area of a cylinder.</p>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
	<!-- Left: Visualization -->
	<div class="glow-panel aspect-square flex items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow w-full h-full max-w-xs">
			<!-- Bottom ellipse -->
			<ellipse
				cx={cx}
				cy={bottomCy}
				rx={svgRx}
				ry={svgRy}
				fill="none"
				stroke="#818CF8"
				stroke-width="2"
				opacity="0.5"
			/>
			<!-- Vertical edges -->
			<line
				x1={cx - svgRx} y1={topCy}
				x2={cx - svgRx} y2={bottomCy}
				stroke="#818CF8"
				stroke-width="2"
			/>
			<line
				x1={cx + svgRx} y1={topCy}
				x2={cx + svgRx} y2={bottomCy}
				stroke="#818CF8"
				stroke-width="2"
			/>
			<!-- Top ellipse -->
			<ellipse
				cx={cx}
				cy={topCy}
				rx={svgRx}
				ry={svgRy}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<!-- Radius label -->
			<line
				x1={cx} y1={topCy}
				x2={cx + svgRx} y2={topCy}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x={cx + svgRx / 2} y={topCy - 6}
				font-family="JetBrains Mono" font-size="11"
				fill="#475569" text-anchor="middle"
			>
				r = {formatNumber(radius)}
			</text>
			<!-- Height label -->
			<line
				x1={cx + svgRx + 10} y1={topCy}
				x2={cx + svgRx + 10} y2={bottomCy}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x={cx + svgRx + 18} y={(topCy + bottomCy) / 2}
				font-family="JetBrains Mono" font-size="11"
				fill="#475569" text-anchor="start"
				dominant-baseline="middle"
			>
				h = {formatNumber(height)}
			</text>
			<!-- Height ticks -->
			<line
				x1={cx + svgRx + 6} y1={topCy}
				x2={cx + svgRx + 14} y2={topCy}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
			/>
			<line
				x1={cx + svgRx + 6} y1={bottomCy}
				x2={cx + svgRx + 14} y2={bottomCy}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
			/>
		</svg>
	</div>

	<!-- Right: Inputs + Formula + Results -->
	<div class="surface-panel p-6 flex flex-col gap-6">
		<!-- Inputs -->
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<p class="micro-label">Dimensions</p>
				<UnitSelector bind:unit />
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="radius">Radius (r)</label>
				<div class="relative">
					<input
						id="radius"
						type="number"
						min="0"
						class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5
								 font-mono text-text-primary placeholder:text-text-muted
								 focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20
								 transition-colors duration-150"
						placeholder="Enter a positive number"
						bind:value={radius}
						onkeydown={handleKeyDown}
					/>
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="height">Height (h)</label>
				<div class="relative">
					<input
						id="height"
						type="number"
						min="0"
						class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5
								 font-mono text-text-primary placeholder:text-text-muted
								 focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20
								 transition-colors duration-150"
						placeholder="Enter a positive number"
						bind:value={height}
						onkeydown={handleKeyDown}
					/>
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<button
				onclick={handleReset}
				class="w-full px-4 py-2.5 bg-bg-inset border border-border-default rounded-lg
						 text-text-secondary hover:text-text-primary hover:border-border-strong
						 transition-colors duration-150 font-mono text-sm"
			>
				Reset
			</button>
		</div>

		<hr class="border-border-divider" />

		<!-- Formula -->
		<div>
			<p class="micro-label mb-3">Formulas</p>
			<FormulaDisplay template={result.formulas.volume} evaluated={evaluatedVolume} />
			<div class="mt-3"></div>
			<FormulaDisplay template={result.formulas.area} evaluated={evaluatedArea} />
		</div>

		<hr class="border-border-divider" />

		<!-- Results -->
		<div>
			<p class="micro-label mb-3">Results</p>
			<div class="flex flex-wrap gap-3">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">Volume</span>
					<span class="font-mono text-2xl font-medium text-emerald-bright mt-0.5">
						{formatNumber(result.volume)} <span class="text-sm text-emerald/70">{volumeUnitLabel(unit)}</span>
					</span>
				</div>
				<div class="result-chip animate-fade-slide-up" style="animation-delay: 50ms">
					<span class="micro-label text-text-muted">Surface Area</span>
					<span class="font-mono text-2xl font-medium text-emerald-bright mt-0.5">
						{formatNumber(result.area)} <span class="text-sm text-emerald/70">{areaUnitLabel(unit)}</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>

<ShapeFacts shapeId="cylinder" />
<ShapeProperties shapeId="cylinder" />
