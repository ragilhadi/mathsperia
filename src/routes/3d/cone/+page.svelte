
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import ShapeFacts from '$lib/components/ShapeFacts.svelte';
	import ShapeProperties from '$lib/components/ShapeProperties.svelte';
	import { calculateCone } from '$lib/utils/shapes3d';
	import { formatNumber } from '$lib/utils/format';
	import { getLastUnit, areaUnitLabel, volumeUnitLabel, type Unit } from '$lib/utils/units';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';

	const pageData = mathSolverData({
		shape: 'Cone',
		urlPath: '/3d/cone',
		category: '3D',
		resultType: 'volume and surface area',
		keywords: 'cone volume calculator, cone surface area calculator, slant height, radius height'
	});

	let radius = $state(5);
	let height = $state(12);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateCone>>(calculateCone(5, 12));

	let slantHeight = $derived(Math.sqrt(radius ** 2 + height ** 2));

	let svgR = $derived(Math.min(Math.max(radius * 6, 12), 70));
	let svgH = $derived(Math.min(Math.max(height * 4, 24), 130));
	let cx = 100;
	let cyBase = 165;
	let cyApex = $derived(cyBase - svgH);

	let evaluatedVolume = $derived(
		`V = \\frac{1}{3}\\pi \\times \\text{${formatNumber(radius)}}^2 \\times \\text{${formatNumber(height)}} \\approx \\text{${formatNumber(result.volume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = \\pi \\times \\text{${formatNumber(radius)}}(\\text{${formatNumber(radius)}} + \\text{${formatNumber(slantHeight)}}) \\approx \\text{${formatNumber(result.area)}} \\text{ ${unit}}^2`
	);

	function handleCalculate() {
		result = calculateCone(radius, height);
	}

	function handleReset() {
		radius = 5;
		height = 12;
		result = calculateCone(radius, height);
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
	title="Cone Calculator — Volume & Surface Area"
	description="Interactive cone calculator. Calculate volume and surface area with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/3d/cone"
	keywords="cone volume calculator, cone surface area calculator, slant height, radius height"
	structuredData={pageData}
/>

<Breadcrumb items={[
	{ label: 'Home', href: '/' },
	{ label: '3D Geometry', href: '/3d' },
	{ label: 'Cone' }
]} />

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">3D Geometry</p>
	<h1 class="font-display font-bold text-4xl tracking-tight text-text-primary">
		Cone Calculator
	</h1>
	<p class="text-text-secondary mt-2">
		Calculate volume and surface area of a cone.
	</p>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
	<!-- Left: Visualization -->
	<div class="glow-panel aspect-square flex items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow w-full h-full max-w-xs">
			<!-- Base ellipse -->
			<ellipse
				{cx}
				cy={cyBase}
				rx={svgR}
				ry={svgR * 0.3}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<!-- Left slant edge (solid) -->
			<line
				x1={cx - svgR} y1={cyBase}
				x2={cx} y2={cyApex}
				stroke="#818CF8"
				stroke-width="2"
			/>
			<!-- Right slant edge (dashed, represents slant height) -->
			<line
				x1={cx + svgR} y1={cyBase}
				x2={cx} y2={cyApex}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<!-- Height (dashed center line) -->
			<line
				x1={cx} y1={cyBase}
				x2={cx} y2={cyApex}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<!-- Radius (dashed horizontal) -->
			<line
				x1={cx} y1={cyBase}
				x2={cx + svgR} y2={cyBase}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<!-- Apex dot -->
			<circle cx={cx} cy={cyApex} r="3" fill="#818CF8" />
			<!-- Labels -->
			<text
				x={cx + svgR / 2} y={cyBase - 6}
				font-family="JetBrains Mono" font-size="11"
				fill="#475569" text-anchor="middle"
			>
				r = {formatNumber(radius)}
			</text>
			<text
				x={cx + 8} y={cyBase - svgH / 2 + 4}
				font-family="JetBrains Mono" font-size="11"
				fill="#475569" text-anchor="start"
			>
				h = {formatNumber(height)}
			</text>
			<text
				x={cx + svgR / 2 + 8} y={cyBase - svgH / 2 + 4}
				font-family="JetBrains Mono" font-size="11"
				fill="#475569" text-anchor="start"
			>
				l = {formatNumber(slantHeight)}
			</text>
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
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">
						{unit}
					</span>
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
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">
						{unit}
					</span>
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
				<div class="flex flex-col bg-bg-inset border border-border-default rounded-lg px-4 py-3 min-w-[140px] animate-fade-slide-up">
					<span class="micro-label text-text-muted">Volume</span>
					<span class="font-mono text-2xl font-medium text-emerald-bright mt-0.5">
						{formatNumber(result.volume)} <span class="text-sm text-emerald/70">{volumeUnitLabel(unit)}</span>
					</span>
				</div>
				<div class="flex flex-col bg-bg-inset border border-border-default rounded-lg px-4 py-3 min-w-[140px] animate-fade-slide-up" style="animation-delay: 50ms">
					<span class="micro-label text-text-muted">Surface Area</span>
					<span class="font-mono text-2xl font-medium text-emerald-bright mt-0.5">
						{formatNumber(result.area)} <span class="text-sm text-emerald/70">{areaUnitLabel(unit)}</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>

<ShapeFacts shapeId="cone" />
<ShapeProperties shapeId="cone" />

