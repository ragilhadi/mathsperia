<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import ShapeFacts from '$lib/components/ShapeFacts.svelte';
	import ShapeProperties from '$lib/components/ShapeProperties.svelte';
	import StepByStep from '$lib/components/StepByStep.svelte';
	import SafeDisplay from '$lib/components/SafeDisplay.svelte';
	import { calculateScaleneTriangle } from '$lib/utils/shapes';
	import { formatNumber, safeNumber } from '$lib/utils/format';
	import {
		getLastUnit,
		areaUnitLabel,
		convertValue,
		convertAreaValue,
		type Unit
	} from '$lib/utils/units';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';
	import SliderInput from '$lib/components/SliderInput.svelte';
	import CalculationHistory from '$lib/components/CalculationHistory.svelte';
	import CopyLinkButton from '$lib/components/CopyLinkButton.svelte';
	import DownloadPngButton from '$lib/components/DownloadPngButton.svelte';
	import { addToHistory } from '$lib/utils/history';
	import { tKey } from '$lib/stores/lang.svelte';

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
	let result = $derived(calculateScaleneTriangle(sideA, sideB, sideC));

	const BASE_UNIT: Unit = 'cm';

	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));
	let displayPerimeter = $derived(safeNumber(convertValue(result.perimeter, BASE_UNIT, unit), 0));

	let maxSide = $derived(Math.max(sideA, sideB, sideC));
	let scaleFactor = $derived(maxSide / 8);

	let evaluatedArea = $derived(
		`A = \\sqrt{s(s-a)(s-b)(s-c)} \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`P = \\text{${formatNumber(sideA)}} + \\text{${formatNumber(sideB)}} + \\text{${formatNumber(sideC)}} = \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	);

	const semiPerimeterFormula = 's = \\frac{a + b + c}{2}';
	let evaluatedSemiPerimeter = $derived(
		`s = \\frac{\\text{${formatNumber(sideA)}} + \\text{${formatNumber(sideB)}} + \\text{${formatNumber(sideC)}}}{2} = \\text{${formatNumber(result.perimeter / 2)}} \\text{ ${unit}}`
	);

	let semiPerimeterSteps = $derived([
		`s = \\frac{a + b + c}{2}`,
		`s = \\frac{\\text{${formatNumber(sideA)}} + \\text{${formatNumber(sideB)}} + \\text{${formatNumber(sideC)}}}{2}`,
		`s = \\text{${formatNumber(result.perimeter / 2)}} \\text{ ${unit}}`
	]);

	let areaSteps = $derived([
		`A = \\sqrt{s(s-a)(s-b)(s-c)}`,
		`A = \\sqrt{\\text{${formatNumber(result.perimeter / 2)}}(\\text{${formatNumber(result.perimeter / 2 - sideA)}})(\\text{${formatNumber(result.perimeter / 2 - sideB)}})(\\text{${formatNumber(result.perimeter / 2 - sideC)}})}`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	let perimeterSteps = $derived([
		`P = a + b + c`,
		`P = \\text{${formatNumber(sideA)}} + \\text{${formatNumber(sideB)}} + \\text{${formatNumber(sideC)}}`,
		`P = \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	]);

	let error = $state('');

	function isValidTriangle(a: number, b: number, c: number): boolean {
		return a + b > c && a + c > b && b + c > a;
	}

	function whichInequality(a: number, b: number, c: number): string {
		if (a + b <= c) return 'Side A + Side B must be greater than Side C';
		if (a + c <= b) return 'Side A + Side C must be greater than Side B';
		if (b + c <= a) return 'Side B + Side C must be greater than Side A';
		return '';
	}

	function handleCalculate() {
		error = '';
		if (sideA <= 0) {
			sideA = 0.1;
		}
		if (sideB <= 0) {
			sideB = 0.1;
		}
		if (sideC <= 0) {
			sideC = 0.1;
		}
		if (!isValidTriangle(sideA, sideB, sideC)) {
			error = `Triangle inequality violated: ${whichInequality(sideA, sideB, sideC)}.`;
			return;
		}
		addToHistory('triangle-scalene', {
			inputs: `a=${formatNumber(sideA)}, b=${formatNumber(sideB)}, c=${formatNumber(sideC)}`,
			results: `A=${formatNumber(result.area)}, P=${formatNumber(result.perimeter)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		sideA = 6;
		sideB = 8;
		sideC = 10;
		error = '';
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			sideA = convertValue(sideA, oldUnit, newUnit);
			sideB = convertValue(sideB, oldUnit, newUnit);
			sideC = convertValue(sideC, oldUnit, newUnit);
		}
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
		if (
			u === 'mm' ||
			u === 'cm' ||
			u === 'm' ||
			u === 'km' ||
			u === 'in' ||
			u === 'ft' ||
			u === 'yd'
		) {
			unit = u;
		}
		handleCalculate();
	});

	$effect(() => {
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

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry2d'), href: '/2d' },
		{ label: tKey('shapes.scalene-triangle.name'), href: '/2d/triangle' },
		{ label: 'Scalene' }
	]}
/>

<BackButton href="/2d/triangle" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry2d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('shapes.scalene-triangle.name')}
	</h1>
	<p class="mt-2 text-text-secondary">
		{tKey('shapes.scalene-triangle.desc')}
	</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<polygon
				points="60,140 100,60 140,140"
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<text
				x="100"
				y="155"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle">a = {formatNumber(sideA)}</text
			>
			<text
				x="75"
				y="95"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="end">b = {formatNumber(sideB)}</text
			>
			<text
				x="125"
				y="95"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="start">c = {formatNumber(sideC)}</text
			>
		</svg>
	</div>

	<!-- Right: Inputs + Formula + Results -->
	<div class="surface-panel flex flex-col gap-6 p-6">
		<!-- Inputs -->
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<p class="micro-label">{tKey('common.dimensions')}</p>
				<UnitSelector bind:unit onChange={handleUnitChange} />
			</div>
			<SliderInput
				label={tKey('shapes.scalene-triangle.sideA')}
				bind:value={sideA}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.scalene-triangle.sideB')}
				bind:value={sideB}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.scalene-triangle.sideC')}
				bind:value={sideC}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			{#if error}
				<div
					class="animate-fade-slide-up rounded-lg border border-rose-dim bg-rose/10 p-3 text-sm text-rose"
				>
					{error}
				</div>
			{/if}
			<button
				onclick={handleReset}
				class="border-border-default hover:border-border-strong w-full rounded-lg border bg-bg-inset px-4 py-2.5 font-mono text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
				>{tKey('common.reset')}</button
			>
		</div>

		<hr class="border-border-divider" />

		<!-- Formula -->
		<div>
			<p class="micro-label mb-3">{tKey('common.formulas')}</p>
			<FormulaDisplay template={semiPerimeterFormula} evaluated={evaluatedSemiPerimeter} />
			<StepByStep steps={semiPerimeterSteps} />
			<div class="mt-4"></div>
			<FormulaDisplay template={result.formulas.area} evaluated={evaluatedArea} />
			<StepByStep steps={areaSteps} />
			<div class="mt-4"></div>
			<FormulaDisplay template={result.formulas.perimeter} evaluated={evaluatedPerimeter} />
			<StepByStep steps={perimeterSteps} />
		</div>

		<hr class="border-border-divider" />

		<!-- Results -->
		<div>
			<p class="micro-label mb-3">{tKey('common.results')}</p>
			<div class="flex flex-wrap gap-3" aria-live="polite" role="status">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">{tKey('common.area')}</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={displayArea} unit={areaUnitLabel(unit)} />
					</span>
				</div>
				<div class="result-chip animate-fade-slide-up" style="animation-delay: 50ms">
					<span class="micro-label text-text-muted">{tKey('common.perimeter')}</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={displayPerimeter} {unit} />
					</span>
				</div>
			</div>
			<div class="mt-3 flex items-center gap-2">
				<CopyLinkButton />
				<DownloadPngButton />
			</div>
		</div>

		<CalculationHistory shapeId="triangle-scalene" />
	</div>
</div>

<ShapeFacts shapeId="scalene-triangle" />
<ShapeProperties shapeId="scalene-triangle" />
