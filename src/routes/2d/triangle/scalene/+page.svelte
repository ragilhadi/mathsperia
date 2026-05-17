<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import ShapeFacts from '$lib/components/ShapeFacts.svelte';
	import ShapeProperties from '$lib/components/ShapeProperties.svelte';
	import { calculateScaleneTriangle } from '$lib/utils/shapes';
	import { formatNumber, clamp } from '$lib/utils/format';
	import { getLastUnit, areaUnitLabel, type Unit } from '$lib/utils/units';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';

	const pageData = mathSolverData({
		shape: 'Scalene Triangle',
		urlPath: '/2d/triangle/scalene',
		category: '2D',
		resultType: 'area and perimeter',
		keywords: 'scalene triangle area calculator, scalene triangle perimeter, herons formula'
	});

	let sideA = $state(6);
	let sideB = $state(8);
	let sideC = $state(10);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateScaleneTriangle>>(calculateScaleneTriangle(6, 8, 10));

	let maxSide = $derived(Math.max(sideA, sideB, sideC));
	let scaleFactor = $derived(maxSide / 8);

	let evaluatedArea = $derived(
		`A = \\sqrt{s(s-a)(s-b)(s-c)} \\approx \\text{${formatNumber(result.area)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`P = \\text{${formatNumber(sideA)}} + \\text{${formatNumber(sideB)}} + \\text{${formatNumber(sideC)}} = \\text{${formatNumber(result.perimeter)}} \\text{ ${unit}}`
	);

	const semiPerimeterFormula = 's = \\frac{a + b + c}{2}';
	let evaluatedSemiPerimeter = $derived(
		`s = \\frac{\\text{${formatNumber(sideA)}} + \\text{${formatNumber(sideB)}} + \\text{${formatNumber(sideC)}}}{2} = \\text{${formatNumber(result.perimeter / 2)}} \\text{ ${unit}}`
	);

	let error = $state('');

	function handleCalculate() {
		error = '';
		if (sideA <= 0) sideA = 0.1;
		if (sideB <= 0) sideB = 0.1;
		if (sideC <= 0) sideC = 0.1;
		if (sideA + sideB <= sideC) {
			error = 'Triangle inequality violated: the sum of two sides must be greater than the third. Auto-correcting...';
			sideC = (sideA + sideB) * 0.9;
		}
		if (sideA + sideC <= sideB) {
			error = 'Triangle inequality violated: the sum of two sides must be greater than the third. Auto-correcting...';
			sideB = (sideA + sideC) * 0.9;
		}
		if (sideB + sideC <= sideA) {
			error = 'Triangle inequality violated: the sum of two sides must be greater than the third. Auto-correcting...';
			sideA = (sideB + sideC) * 0.9;
		}
		result = calculateScaleneTriangle(sideA, sideB, sideC);
	}

	function handleReset() {
		sideA = 6; sideB = 8; sideC = 10;
		error = '';
		result = calculateScaleneTriangle(sideA, sideB, sideC);
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('a', String(sideA));
		params.set('b', String(sideB));
		params.set('c', String(sideC));
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
			if (!isNaN(val) && val > 0) sideA = val;
		}
		const b = sp.get('b');
		if (b !== null) {
			const val = parseFloat(b);
			if (!isNaN(val) && val > 0) sideB = val;
		}
		const c = sp.get('c');
		if (c !== null) {
			const val = parseFloat(c);
			if (!isNaN(val) && val > 0) sideC = val;
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
	title="Scalene Triangle Calculator — Area & Perimeter"
	description="Interactive scalene triangle calculator. Calculate area and perimeter with Heron's formula, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/2d/triangle/scalene"
	keywords="scalene triangle area calculator, scalene triangle perimeter, herons formula"
	structuredData={pageData}
/>

<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: '2D Geometry', href: '/2d' }, { label: 'Triangle', href: '/2d/triangle' }, { label: 'Scalene' }]} />

<BackButton href="/2d/triangle" />

<div class="mb-8">
	<p class="micro-label mb-2">Triangle Types</p>
	<h1 class="font-display font-bold text-4xl tracking-tight text-text-primary">Scalene Triangle</h1>
	<p class="text-text-secondary mt-2">All three sides are different lengths. Uses Heron's formula.</p>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
	<!-- Left: Visualization -->
	<div class="glow-panel aspect-square flex items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow w-full h-full max-w-xs">
			<polygon
				points="60,140 100,60 140,140"
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<text x="100" y="155" font-family="JetBrains Mono" font-size="11" fill="#475569" text-anchor="middle">a = {formatNumber(sideA)}</text>
			<text x="75" y="95" font-family="JetBrains Mono" font-size="11" fill="#475569" text-anchor="end">b = {formatNumber(sideB)}</text>
			<text x="125" y="95" font-family="JetBrains Mono" font-size="11" fill="#475569" text-anchor="start">c = {formatNumber(sideC)}</text>
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
				<label class="micro-label" for="sideA">Side A (a)</label>
				<div class="relative">
					<input id="sideA" type="number" min="0" class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150" placeholder="Enter a positive number" bind:value={sideA} onkeydown={handleKeyDown} />
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="sideB">Side B (b)</label>
				<div class="relative">
					<input id="sideB" type="number" min="0" class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150" placeholder="Enter a positive number" bind:value={sideB} onkeydown={handleKeyDown} />
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="sideC">Side C (c)</label>
				<div class="relative">
					<input id="sideC" type="number" min="0" class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150" placeholder="Enter a positive number" bind:value={sideC} onkeydown={handleKeyDown} />
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			{#if error}
				<div class="p-3 rounded-lg border border-rose-dim bg-rose/10 text-rose text-sm animate-fade-slide-up">{error}</div>
			{/if}
			<button onclick={handleReset} class="w-full px-4 py-2.5 bg-bg-inset border border-border-default rounded-lg text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors duration-150 font-mono text-sm">Reset</button>
		</div>

		<hr class="border-border-divider" />

		<!-- Formula -->
		<div>
			<p class="micro-label mb-3">Formulas</p>
			<FormulaDisplay template={semiPerimeterFormula} evaluated={evaluatedSemiPerimeter} />
			<div class="mt-3"></div>
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

<ShapeFacts shapeId="scalene-triangle" />
<ShapeProperties shapeId="scalene-triangle" />
