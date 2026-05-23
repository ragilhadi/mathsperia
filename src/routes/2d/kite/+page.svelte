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
	import { calculateKite } from '$lib/utils/shapes';
	import { formatNumber, clamp, safeNumber } from '$lib/utils/format';
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
		shape: 'Kite',
		urlPath: '/2d/kite',
		category: '2D',
		resultType: 'area and perimeter',
		keywords: 'kite area calculator, kite perimeter, diagonals, quadrilateral math'
	});

	let diagonal1 = $state(8);
	let diagonal2 = $state(12);
	let unit = $state<Unit>(getLastUnit());
	let result = $derived(calculateKite(diagonal1, diagonal2));

	const BASE_UNIT: Unit = 'cm';

	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));
	let displayPerimeter = $derived(safeNumber(convertValue(result.perimeter, BASE_UNIT, unit), 0));

	let scaleFactor = $derived(Math.max(diagonal1, diagonal2) / 10);
	let svgD1 = $derived(clamp((diagonal1 / scaleFactor) * 10, 50, 120));
	let svgD2 = $derived(clamp((diagonal2 / scaleFactor) * 10, 60, 140));

	let evaluatedArea = $derived(
		`A = \\frac{\\text{${formatNumber(diagonal1)}} \\times \\text{${formatNumber(diagonal2)}}}{2} = \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`P \\approx \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	);

	let areaSteps = $derived([
		`A = \\frac{d_1 \\times d_2}{2}`,
		`A = \\frac{\\text{${formatNumber(diagonal1)}} \\times \\text{${formatNumber(diagonal2)}}}{2}`,
		`A = \\text{${formatNumber((diagonal1 * diagonal2) / 2)}} \\text{ cm}^2`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	let perimeterSteps = $derived([
		`P \\approx \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	]);

	function handleCalculate() {
		if (diagonal1 <= 0) diagonal1 = 0.1;
		if (diagonal2 <= 0) diagonal2 = 0.1;
		addToHistory('kite', {
			inputs: `d1=${formatNumber(diagonal1)}, d2=${formatNumber(diagonal2)}`,
			results: `A=${formatNumber(result.area)}, P=${formatNumber(result.perimeter)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		diagonal1 = 8;
		diagonal2 = 12;
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			diagonal1 = convertValue(diagonal1, oldUnit, newUnit);
			diagonal2 = convertValue(diagonal2, oldUnit, newUnit);
		}
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
	title="Kite Calculator — Area & Perimeter"
	description="Interactive kite calculator. Calculate area and perimeter with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/2d/kite"
	keywords="kite area calculator, kite perimeter, diagonals, quadrilateral math"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry2d'), href: '/2d' },
		{ label: tKey('shapes.kite.name') }
	]}
/>

<BackButton href="/2d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry2d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('shapes.kite.name')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('shapes.kite.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<polygon
				points={`100,${100 - svgD2 / 2} ${100 + svgD1 / 2},100 100,${100 + svgD2 / 2} ${100 - svgD1 / 2},100`}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<line
				x1={100 - svgD1 / 2}
				y1="100"
				x2={100 + svgD1 / 2}
				y2="100"
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<line
				x1="100"
				y1={100 - svgD2 / 2}
				x2="100"
				y2={100 + svgD2 / 2}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x={100 + svgD1 / 2 + 8}
				y="105"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="start">d₁ = {formatNumber(diagonal1)}</text
			>
			<text
				x="100"
				y={100 - svgD2 / 2 - 6}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle">d₂ = {formatNumber(diagonal2)}</text
			>
		</svg>
	</div>

	<div class="surface-panel flex flex-col gap-6 p-6">
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<p class="micro-label">{tKey('common.dimensions')}</p>
				<UnitSelector bind:unit onChange={handleUnitChange} />
			</div>
			<SliderInput
				label={tKey('shapes.kite.diagonal1')}
				bind:value={diagonal1}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.kite.diagonal2')}
				bind:value={diagonal2}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<button
				onclick={handleReset}
				class="border-border-default hover:border-border-strong w-full rounded-lg border bg-bg-inset px-4 py-2.5 font-mono text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
				>{tKey('common.reset')}</button
			>
		</div>

		<hr class="border-border-divider" />

		<div>
			<p class="micro-label mb-3">{tKey('common.formulas')}</p>
			<FormulaDisplay template={result.formulas.area} evaluated={evaluatedArea} />
			<StepByStep steps={areaSteps} />
			<div class="mt-4"></div>
			<FormulaDisplay template={result.formulas.perimeter} evaluated={evaluatedPerimeter} />
			<StepByStep steps={perimeterSteps} />
		</div>

		<hr class="border-border-divider" />

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

		<CalculationHistory shapeId="kite" />
	</div>
</div>

<ShapeFacts shapeId="kite" />
<ShapeProperties shapeId="kite" />
