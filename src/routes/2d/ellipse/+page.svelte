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
	import { calculateEllipse } from '$lib/utils/shapes';
	import { formatNumber, clamp, safeNumber } from '$lib/utils/format';
	import {
		getLastUnit,
		areaUnitLabel,
		convertValue,
		convertAreaValue,
		type Unit
	} from '$lib/utils/units';
	import { addToHistory } from '$lib/utils/history';
	import { tKey } from '$lib/stores/lang.svelte';
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

	const BASE_UNIT: Unit = 'cm';

	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));
	let displayPerimeter = $derived(safeNumber(convertValue(result.perimeter, BASE_UNIT, unit), 0));

	let scaleFactor = $derived(Math.max(semiMajor, semiMinor) / 8);
	let svgSemiMajor = $derived(clamp((semiMajor / scaleFactor) * 12, 30, 80));
	let svgSemiMinor = $derived(clamp((semiMinor / scaleFactor) * 12, 20, 60));

	let evaluatedArea = $derived(
		`A = \\pi \\times \\text{${formatNumber(semiMajor)}} \\times \\text{${formatNumber(semiMinor)}} \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`P \\approx \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}} \\text{ (Ramanujan)}`
	);

	let areaSteps = $derived([
		`A = \\pi a b`,
		`A = \\pi \\times \\text{${formatNumber(semiMajor)}} \\times \\text{${formatNumber(semiMinor)}}`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	let perimeterSteps = $derived([
		`P \\approx \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}} \\text{ (Ramanujan)}`
	]);

	function handleCalculate() {
		if (semiMajor <= 0) semiMajor = 0.1;
		if (semiMinor <= 0) semiMinor = 0.1;
		result = calculateEllipse(semiMajor, semiMinor);
		addToHistory('ellipse', {
			inputs: `a=${formatNumber(semiMajor)}, b=${formatNumber(semiMinor)}`,
			results: `A=${formatNumber(result.area)}, P=${formatNumber(result.perimeter)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		semiMajor = 8;
		semiMinor = 5;
		result = calculateEllipse(semiMajor, semiMinor);
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			semiMajor = convertValue(semiMajor, oldUnit, newUnit);
			semiMinor = convertValue(semiMinor, oldUnit, newUnit);
		}
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

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry2d'), href: '/2d' },
		{ label: tKey('shapes.ellipse.name') }
	]}
/>

<BackButton href="/2d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry2d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('shapes.ellipse.name')}
	</h1>
	<p class="mt-2 text-text-secondary">
		{tKey('shapes.ellipse.desc')}
	</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
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
			<line
				x1={100 - svgSemiMajor}
				y1="100"
				x2={100 + svgSemiMajor}
				y2="100"
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<!-- Semi-minor axis -->
			<line
				x1="100"
				y1={100 - svgSemiMinor}
				x2="100"
				y2={100 + svgSemiMinor}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<circle cx="100" cy="100" r="3" fill="#818CF8" />
			<text
				x={100 + svgSemiMajor / 2}
				y="92"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle">a = {formatNumber(semiMajor)}</text
			>
			<text
				x="110"
				y={100 - svgSemiMinor / 2}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="start">b = {formatNumber(semiMinor)}</text
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
				label={tKey('shapes.ellipse.semiMajor')}
				bind:value={semiMajor}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.ellipse.semiMinor')}
				bind:value={semiMinor}
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
			<div class="flex flex-wrap gap-3">
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

		<CalculationHistory shapeId="ellipse" />
	</div>
</div>

<ShapeFacts shapeId="ellipse" />
<ShapeProperties shapeId="ellipse" />
