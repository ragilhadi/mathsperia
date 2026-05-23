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
	import { calculateParallelogram } from '$lib/utils/shapes';
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
		shape: 'Parallelogram',
		urlPath: '/2d/parallelogram',
		category: '2D',
		resultType: 'area and perimeter',
		keywords: 'parallelogram area calculator, parallelogram perimeter, base height side'
	});

	let base = $state(8);
	let height = $state(5);
	let side = $state(6);
	let unit = $state<Unit>(getLastUnit());
	const BASE_UNIT: Unit = 'cm';
	const offsetX = 20;
	let result = $derived(calculateParallelogram(base, height, side));

	let scaleFactor = $derived(Math.max(base, height) / 8);
	let svgBase = $derived(clamp((base / scaleFactor) * 12, 50, 140));
	let svgHeight = $derived(clamp((height / scaleFactor) * 10, 30, 100));

	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));
	let displayPerimeter = $derived(safeNumber(convertValue(result.perimeter, BASE_UNIT, unit), 0));

	let evaluatedArea = $derived(
		`A = \\text{${formatNumber(base)}} \\times \\text{${formatNumber(height)}} = \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`P = 2(\\text{${formatNumber(base)}} + \\text{${formatNumber(side)}}) = \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	);

	let areaSteps = $derived([
		`A = b \\times h`,
		`A = \\text{${formatNumber(base)}} \\times \\text{${formatNumber(height)}}`,
		`A = \\text{${formatNumber(base * height)}} \\text{ cm}^2`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	let perimeterSteps = $derived([
		`P = 2(b + s)`,
		`P = 2 \\times (\\text{${formatNumber(base)}} + \\text{${formatNumber(side)}})`,
		`P \\approx \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	]);

	function handleCalculate() {
		if (base <= 0) base = 0.1;
		if (height <= 0) height = 0.1;
		if (side <= 0) side = 0.1;
		addToHistory('parallelogram', {
			inputs: `b=${formatNumber(base)}, h=${formatNumber(height)}, s=${formatNumber(side)}`,
			results: `A=${formatNumber(result.area)}, P=${formatNumber(result.perimeter)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		base = 8;
		height = 5;
		side = 6;
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			base = convertValue(base, oldUnit, newUnit);
			height = convertValue(height, oldUnit, newUnit);
			side = convertValue(side, oldUnit, newUnit);
		}
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('b', String(base));
		params.set('h', String(height));
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
		const b = sp.get('b');
		if (b !== null) {
			const val = parseFloat(b);
			if (!isNaN(val) && val > 0) base = val;
		}
		const h = sp.get('h');
		if (h !== null) {
			const val = parseFloat(h);
			if (!isNaN(val) && val > 0) height = val;
		}
		const s = sp.get('s');
		if (s !== null) {
			const val = parseFloat(s);
			if (!isNaN(val) && val > 0) side = val;
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
	title="Parallelogram Calculator — Area & Perimeter"
	description="Interactive parallelogram calculator. Calculate area and perimeter with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/2d/parallelogram"
	keywords="parallelogram area calculator, parallelogram perimeter, base height side"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry2d'), href: '/2d' },
		{ label: tKey('shapes.parallelogram.name') }
	]}
/>

<BackButton href="/2d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry2d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('shapes.parallelogram.name')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('shapes.parallelogram.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<polygon
				points={`${70 - offsetX},${120 - svgHeight / 2} ${70 + svgBase - offsetX},${120 - svgHeight / 2} ${70 + svgBase},${120 + svgHeight / 2} ${70},${120 + svgHeight / 2}`}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<line
				x1={70 + svgBase / 2 - offsetX / 2}
				y1={120 - svgHeight / 2}
				x2={70 + svgBase / 2 - offsetX / 2}
				y2={120 + svgHeight / 2}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x={70 + svgBase / 2 - offsetX / 2 - 6}
				y="120"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="end">h = {formatNumber(height)}</text
			>
			<text
				x={70 + svgBase / 2 - offsetX / 2}
				y={120 - svgHeight / 2 - 10}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle">b = {formatNumber(base)}</text
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
				label={tKey('shapes.parallelogram.base')}
				bind:value={base}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.parallelogram.height')}
				bind:value={height}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.parallelogram.side')}
				bind:value={side}
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

		<!-- Formula -->
		<div>
			<p class="micro-label mb-3">{tKey('common.formulas')}</p>
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

		<CalculationHistory shapeId="parallelogram" />
	</div>
</div>

<ShapeFacts shapeId="parallelogram" />
<ShapeProperties shapeId="parallelogram" />
