<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import ShapeFacts from '$lib/components/ShapeFacts.svelte';
	import ShapeProperties from '$lib/components/ShapeProperties.svelte';
	import { calculateRhombus } from '$lib/utils/shapes';
	import { formatNumber, clamp } from '$lib/utils/format';
	import { getLastUnit, areaUnitLabel, type Unit } from '$lib/utils/units';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';

	const pageData = mathSolverData({
		shape: 'Rhombus',
		urlPath: '/2d/rhombus',
		category: '2D',
		resultType: 'area and perimeter',
		keywords: 'rhombus area calculator, rhombus perimeter, diagonals, diamond shape math'
	});

	let diagonal1 = $state(10);
	let diagonal2 = $state(6);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateRhombus>>(calculateRhombus(10, 6));

	let scaleFactor = $derived(Math.max(diagonal1, diagonal2) / 8);
	let svgD1 = $derived(clamp(diagonal1 / scaleFactor * 10, 60, 140));
	let svgD2 = $derived(clamp(diagonal2 / scaleFactor * 10, 40, 100));

	let evaluatedArea = $derived(
		`A = \\frac{\\text{${formatNumber(diagonal1)}} \\times \\text{${formatNumber(diagonal2)}}}{2} = \\text{${formatNumber(result.area)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`P \\approx \\text{${formatNumber(result.perimeter)}} \\text{ ${unit}}`
	);

	function handleCalculate() {
		if (diagonal1 <= 0) diagonal1 = 0.1;
		if (diagonal2 <= 0) diagonal2 = 0.1;
		result = calculateRhombus(diagonal1, diagonal2);
	}

	function handleReset() {
		diagonal1 = 10; diagonal2 = 6;
		result = calculateRhombus(diagonal1, diagonal2);
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('d1', String(diagonal1));
		params.set('d2', String(diagonal2));
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
		const d1 = sp.get('d1');
		if (d1 !== null) {
			const val = parseFloat(d1);
			if (!isNaN(val) && val > 0) diagonal1 = val;
		}
		const d2 = sp.get('d2');
		if (d2 !== null) {
			const val = parseFloat(d2);
			if (!isNaN(val) && val > 0) diagonal2 = val;
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
	title="Rhombus Calculator — Area & Perimeter"
	description="Interactive rhombus calculator. Calculate area and perimeter with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/2d/rhombus"
	keywords="rhombus area calculator, rhombus perimeter, diagonals, diamond shape math"
	structuredData={pageData}
/>

<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: '2D Geometry', href: '/2d' }, { label: 'Rhombus' }]} />

<BackButton href="/2d" />

<div class="mb-8">
	<p class="micro-label mb-2">2D Geometry</p>
	<h1 class="font-display font-bold text-4xl tracking-tight text-text-primary">Rhombus Calculator</h1>
	<p class="text-text-secondary mt-2">Calculate area and perimeter of a rhombus.</p>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
	<!-- Left: Visualization -->
	<div class="glow-panel aspect-square flex items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow w-full h-full max-w-xs">
			<polygon
				points={`100,${100 - svgD2 / 2} ${100 + svgD1 / 2},100 100,${100 + svgD2 / 2} ${100 - svgD1 / 2},100`}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<line x1={100 - svgD1 / 2} y1="100" x2={100 + svgD1 / 2} y2="100"
				stroke="rgba(148, 163, 184, 0.4)" stroke-width="1" stroke-dasharray="4 3"/>
			<line x1="100" y1={100 - svgD2 / 2} x2="100" y2={100 + svgD2 / 2}
				stroke="rgba(148, 163, 184, 0.4)" stroke-width="1" stroke-dasharray="4 3"/>
			<text x={100 + svgD1 / 2 + 8} y="105" font-family="JetBrains Mono" font-size="11" fill="#475569" text-anchor="start">d₁ = {formatNumber(diagonal1)}</text>
			<text x="100" y={100 - svgD2 / 2 - 6} font-family="JetBrains Mono" font-size="11" fill="#475569" text-anchor="middle">d₂ = {formatNumber(diagonal2)}</text>
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
				<label class="micro-label" for="diagonal1">Diagonal 1 (d₁)</label>
				<div class="relative">
					<input id="diagonal1" type="number" min="0" class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150" placeholder="Enter a positive number" bind:value={diagonal1} onkeydown={handleKeyDown} />
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="diagonal2">Diagonal 2 (d₂)</label>
				<div class="relative">
					<input id="diagonal2" type="number" min="0" class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150" placeholder="Enter a positive number" bind:value={diagonal2} onkeydown={handleKeyDown} />
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
					<span class="micro-label text-text-muted">Perimeter</span>
					<span class="font-mono text-2xl font-medium text-emerald-bright mt-0.5">
						{formatNumber(result.perimeter)} <span class="text-sm text-emerald/70">{unit}</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>

<ShapeFacts shapeId="rhombus" />
<ShapeProperties shapeId="rhombus" />
