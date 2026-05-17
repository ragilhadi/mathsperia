<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import ShapeFacts from '$lib/components/ShapeFacts.svelte';
	import ShapeProperties from '$lib/components/ShapeProperties.svelte';
	import { calculateSquare } from '$lib/utils/shapes';
	import { formatNumber, clamp } from '$lib/utils/format';
	import { getLastUnit, areaUnitLabel, type Unit } from '$lib/utils/units';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';

	const pageData = mathSolverData({
		shape: 'Square',
		urlPath: '/2d/square',
		category: '2D',
		resultType: 'area and perimeter',
		keywords: 'square area calculator, square perimeter calculator, side length, quadrilateral math'
	});

	let side = $state(6);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateSquare>>(calculateSquare(6));

	let svgSide = $derived(clamp(side * 10, 40, 140));

	let evaluatedArea = $derived(
		`A = \\text{${formatNumber(side)}}^2 = \\text{${formatNumber(result.area)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`P = 4 \\times \\text{${formatNumber(side)}} = \\text{${formatNumber(result.perimeter)}} \\text{ ${unit}}`
	);

	function handleCalculate() {
		result = calculateSquare(side);
	}

	function handleReset() {
		side = 6;
		result = calculateSquare(side);
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('s', String(side));
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
		const s = sp.get('s');
		if (s !== null) {
			const val = parseFloat(s);
			if (!isNaN(val) && val > 0) side = val;
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
	title="Square Calculator — Area & Perimeter"
	description="Interactive square calculator. Calculate area and perimeter with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/2d/square"
	keywords="square area calculator, square perimeter calculator, side length, quadrilateral math"
	structuredData={pageData}
/>

<Breadcrumb items={[
	{ label: 'Home', href: '/' },
	{ label: '2D Geometry', href: '/2d' },
	{ label: 'Square' }
]} />

<BackButton href="/2d" />

<div class="mb-8">
	<p class="micro-label mb-2">2D Geometry</p>
	<h1 class="font-display font-bold text-4xl tracking-tight text-text-primary">Square Calculator</h1>
	<p class="text-text-secondary mt-2">Calculate area and perimeter of a square.</p>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
	<!-- Left: Visualization -->
	<div class="glow-panel aspect-square flex items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow w-full h-full max-w-xs">
			<rect
				x={100 - svgSide / 2}
				y={100 - svgSide / 2}
				width={svgSide}
				height={svgSide}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<line x1={100 - svgSide / 2} y1={100 - svgSide / 2 - 6} x2={100 + svgSide / 2} y2={100 - svgSide / 2 - 6}
				stroke="rgba(148, 163, 184, 0.4)" stroke-width="1" stroke-dasharray="4 3"/>
			<text x="100" y={100 - svgSide / 2 - 10} font-family="JetBrains Mono" font-size="11" fill="#475569" text-anchor="middle">
				s = {formatNumber(side)}
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
				<label class="micro-label" for="side">Side Length (s)</label>
				<div class="relative">
					<input
						id="side"
						type="number"
						min="0"
						class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150"
						placeholder="Enter a positive number"
						bind:value={side}
						onkeydown={handleKeyDown}
					/>
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<button
				onclick={handleReset}
				class="w-full px-4 py-2.5 bg-bg-inset border border-border-default rounded-lg text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors duration-150 font-mono text-sm"
			>
				Reset
			</button>
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

<ShapeFacts shapeId="square" />
<ShapeProperties shapeId="square" />
