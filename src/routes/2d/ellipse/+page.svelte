<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import ShapeFacts from '$lib/components/ShapeFacts.svelte';
	import ShapeProperties from '$lib/components/ShapeProperties.svelte';
	import { calculateEllipse } from '$lib/utils/shapes';
	import { formatNumber, clamp } from '$lib/utils/format';
	import { getLastUnit, areaUnitLabel, type Unit } from '$lib/utils/units';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';

	const pageData = mathSolverData({
		shape: 'Ellipse',
		urlPath: '/2d/ellipse',
		category: '2D',
		resultType: 'area and perimeter',
		keywords: 'ellipse area calculator, ellipse perimeter, semi-major semi-minor axis'
	});

	let semiMajor = $state(8);
	let semiMinor = $state(5);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateEllipse>>(calculateEllipse(8, 5));

	let scaleFactor = $derived(Math.max(semiMajor, semiMinor) / 8);
	let svgSemiMajor = $derived(clamp(semiMajor / scaleFactor * 12, 30, 80));
	let svgSemiMinor = $derived(clamp(semiMinor / scaleFactor * 12, 20, 60));

	let evaluatedArea = $derived(
		`A = \\pi \\times \\text{${formatNumber(semiMajor)}} \\times \\text{${formatNumber(semiMinor)}} \\approx \\text{${formatNumber(result.area)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`P \\approx \\text{${formatNumber(result.perimeter)}} \\text{ ${unit}} \\text{ (Ramanujan)}`
	);

	function handleCalculate() {
		result = calculateEllipse(semiMajor, semiMinor);
	}

	function handleReset() {
		semiMajor = 8; semiMinor = 5;
		result = calculateEllipse(semiMajor, semiMinor);
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('a', String(semiMajor));
		params.set('b', String(semiMinor));
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
		const a = sp.get('a');
		if (a !== null) {
			const val = parseFloat(a);
			if (!isNaN(val) && val > 0) semiMajor = val;
		}
		const b = sp.get('b');
		if (b !== null) {
			const val = parseFloat(b);
			if (!isNaN(val) && val > 0) semiMinor = val;
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
	title="Ellipse Calculator — Area & Perimeter"
	description="Interactive ellipse calculator. Calculate area and approximate perimeter with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/2d/ellipse"
	keywords="ellipse area calculator, ellipse perimeter, semi-major semi-minor axis"
	structuredData={pageData}
/>

<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: '2D Geometry', href: '/2d' }, { label: 'Ellipse' }]} />

<BackButton href="/2d" />

<div class="mb-8">
	<p class="micro-label mb-2">2D Geometry</p>
	<h1 class="font-display font-bold text-4xl tracking-tight text-text-primary">Ellipse Calculator</h1>
	<p class="text-text-secondary mt-2">Calculate area and approximate perimeter (Ramanujan's approximation) of an ellipse.</p>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
	<!-- Left: Visualization -->
	<div class="glow-panel aspect-square flex items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow w-full h-full max-w-xs">
			<ellipse
				cx="100"
				cy="100"
				rx={svgSemiMajor}
				ry={svgSemiMinor}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<!-- Semi-major axis -->
			<line x1={100 - svgSemiMajor} y1="100" x2={100 + svgSemiMajor} y2="100"
				stroke="rgba(148, 163, 184, 0.4)" stroke-width="1" stroke-dasharray="4 3"/>
			<!-- Semi-minor axis -->
			<line x1="100" y1={100 - svgSemiMinor} x2="100" y2={100 + svgSemiMinor}
				stroke="rgba(148, 163, 184, 0.4)" stroke-width="1" stroke-dasharray="4 3"/>
			<circle cx="100" cy="100" r="3" fill="#818CF8" />
			<text x={100 + (svgSemiMajor / 2)} y="92" font-family="JetBrains Mono" font-size="11" fill="#475569" text-anchor="middle">a = {formatNumber(semiMajor)}</text>
			<text x="110" y={100 - (svgSemiMinor / 2)} font-family="JetBrains Mono" font-size="11" fill="#475569" text-anchor="start">b = {formatNumber(semiMinor)}</text>
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
				<label class="micro-label" for="semiMajor">Semi-Major Axis (a)</label>
				<div class="relative">
					<input id="semiMajor" type="number" min="0" class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150" placeholder="Enter a positive number" bind:value={semiMajor} onkeydown={handleKeyDown} />
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="semiMinor">Semi-Minor Axis (b)</label>
				<div class="relative">
					<input id="semiMinor" type="number" min="0" class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150" placeholder="Enter a positive number" bind:value={semiMinor} onkeydown={handleKeyDown} />
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<button onclick={handleReset} class="w-full px-4 py-2.5 bg-bg-inset border border-border-default rounded-lg text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors duration-150 font-mono text-sm">Reset</button>
		</div>

		<hr class="border-border-divider" />

		<!-- Formula -->
		<div>
			<p class="micro-label mb-3">Formulas</p>
			<FormulaDisplay template={result.formulas.area} evaluated={evaluatedArea} />
			<div class="mt-3"></div>
			<FormulaDisplay template={result.formulas.perimeter} evaluated={evaluatedPerimeter} />
		</div>

		<hr class="border-border-divider" />

		<!-- Results -->
		<div>
			<p class="micro-label mb-3">Results</p>
			<div class="flex flex-wrap gap-3">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">Area</span>
					<span class="font-mono text-2xl font-medium text-emerald-bright mt-0.5">
						{formatNumber(result.area)} <span class="text-sm text-emerald/70">{areaUnitLabel(unit)}</span>
					</span>
				</div>
				<div class="result-chip animate-fade-slide-up" style="animation-delay: 50ms">
					<span class="micro-label text-text-muted">Perimeter (approx)</span>
					<span class="font-mono text-2xl font-medium text-emerald-bright mt-0.5">
						{formatNumber(result.perimeter)} <span class="text-sm text-emerald/70">{unit}</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>

<ShapeFacts shapeId="ellipse" />
<ShapeProperties shapeId="ellipse" />
