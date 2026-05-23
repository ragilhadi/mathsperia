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
	import SliderInput from '$lib/components/SliderInput.svelte';
	import CalculationHistory from '$lib/components/CalculationHistory.svelte';
	import CopyLinkButton from '$lib/components/CopyLinkButton.svelte';
	import DownloadPngButton from '$lib/components/DownloadPngButton.svelte';
	import { calculateRectangle } from '$lib/utils/shapes';
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
	import { addToHistory } from '$lib/utils/history';
	import { tKey } from '$lib/stores/lang.svelte';

	const pageData = mathSolverData({
		shape: 'Rectangle',
		urlPath: '/2d/rectangle',
		category: '2D',
		resultType: 'area and perimeter',
		keywords: 'rectangle area calculator, rectangle perimeter calculator, length width math'
	});

	let length = $state(8);
	let width = $state(5);
	let unit = $state<Unit>(getLastUnit());
	let result = $derived(calculateRectangle(length, width));

	const BASE_UNIT: Unit = 'cm';

	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));
	let displayPerimeter = $derived(safeNumber(convertValue(result.perimeter, BASE_UNIT, unit), 0));

	let scaleFactor = $derived(Math.max(length, width) / 8);
	let svgLength = $derived(clamp((length / scaleFactor) * 10, 20, 160));
	let svgWidth = $derived(clamp((width / scaleFactor) * 10, 20, 160));

	let evaluatedArea = $derived(
		`A = \\text{${formatNumber(length)}} \\times \\text{${formatNumber(width)}} = \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`P = 2(\\text{${formatNumber(length)}} + \\text{${formatNumber(width)}}) = \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	);

	let areaSteps = $derived([
		`A = l \\times w`,
		`A = \\text{${formatNumber(length)}} \\times \\text{${formatNumber(width)}}`,
		`A = \\text{${formatNumber(length * width)}} \\text{ cm}^2`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	let perimeterSteps = $derived([
		`P = 2(l + w)`,
		`P = 2 \\times (\\text{${formatNumber(length)}} + \\text{${formatNumber(width)}})`,
		`P \\approx \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	]);

	function handleCalculate() {
		if (length <= 0) length = 0.1;
		if (width <= 0) width = 0.1;
		addToHistory('rectangle', {
			inputs: `l=${formatNumber(length)}, w=${formatNumber(width)}`,
			results: `A=${formatNumber(result.area)}, P=${formatNumber(result.perimeter)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		length = 8;
		width = 5;
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			length = convertValue(length, oldUnit, newUnit);
			width = convertValue(width, oldUnit, newUnit);
		}
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('l', String(length));
		params.set('w', String(width));
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
		const l = sp.get('l');
		if (l !== null) {
			const val = parseFloat(l);
			if (!isNaN(val) && val > 0) length = val;
		}
		const w = sp.get('w');
		if (w !== null) {
			const val = parseFloat(w);
			if (!isNaN(val) && val > 0) width = val;
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
	title="Rectangle Calculator — Area & Perimeter"
	description="Interactive rectangle calculator. Calculate area and perimeter with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/2d/rectangle"
	keywords="rectangle area calculator, rectangle perimeter calculator, length width math"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry2d'), href: '/2d' },
		{ label: tKey('shapes.rectangle.name') }
	]}
/>

<BackButton href="/2d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry2d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('shapes.rectangle.name')} Calculator
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('shapes.rectangle.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<rect
				x={100 - svgLength / 2}
				y={100 - svgWidth / 2}
				width={svgLength}
				height={svgWidth}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<line
				x1={100 - svgLength / 2}
				y1={100 - svgWidth / 2 - 6}
				x2={100 + svgLength / 2}
				y2={100 - svgWidth / 2 - 6}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x="100"
				y={100 - svgWidth / 2 - 10}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle"
			>
				l = {formatNumber(length)}
			</text>
			<line
				x1={100 + svgLength / 2 + 6}
				y1={100 - svgWidth / 2}
				x2={100 + svgLength / 2 + 6}
				y2={100 + svgWidth / 2}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x={100 + svgLength / 2 + 14}
				y="100"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="start"
			>
				w = {formatNumber(width)}
			</text>
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
				label={tKey('shapes.rectangle.length') + ' (l)'}
				bind:value={length}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.rectangle.width') + ' (w)'}
				bind:value={width}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<button
				onclick={handleReset}
				class="border-border-default hover:border-border-strong w-full rounded-lg border bg-bg-inset px-4 py-2.5 font-mono text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
			>
				{tKey('common.reset')}
			</button>
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

		<CalculationHistory shapeId="rectangle" />
	</div>
</div>

<ShapeFacts shapeId="rectangle" />
<ShapeProperties shapeId="rectangle" />
