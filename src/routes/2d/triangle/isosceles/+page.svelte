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
	import { calculateIsoscelesTriangle } from '$lib/utils/shapes';
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
		shape: 'Isosceles Triangle',
		urlPath: '/2d/triangle/isosceles',
		category: '2D',
		resultType: 'area and perimeter',
		keywords: 'isosceles triangle area calculator, isosceles triangle perimeter, equal sides'
	});

	let base = $state(8);
	let equalSide = $state(10);
	let unit = $state<Unit>(getLastUnit());
	let result = $derived(calculateIsoscelesTriangle(base, equalSide));

	const BASE_UNIT: Unit = 'cm';

	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));
	let displayPerimeter = $derived(safeNumber(convertValue(result.perimeter, BASE_UNIT, unit), 0));

	let scaleFactor = $derived(Math.max(base, equalSide) / 8);
	let svgBase = $derived(clamp((base / scaleFactor) * 12, 60, 140));

	// Validation message
	let error = $state('');

	let evaluatedArea = $derived(
		`A = \\frac{1}{2} \\times \\text{${formatNumber(base)}} \\times h \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`P = \\text{${formatNumber(base)}} + 2 \\times \\text{${formatNumber(equalSide)}} = \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	);

	let areaSteps = $derived([
		`A = \\frac{1}{2}bh`,
		`h = \\sqrt{s^2 - (\\frac{b}{2})^2}`,
		`A = \\frac{1}{2} \\times \\text{${formatNumber(base)}} \\times h`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	let perimeterSteps = $derived([
		`P = b + 2s`,
		`P = \\text{${formatNumber(base)}} + 2 \\times \\text{${formatNumber(equalSide)}}`,
		`P = \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	]);

	function handleCalculate() {
		error = '';
		if (base <= 0) base = 0.1;
		if (equalSide <= 0) equalSide = 0.1;
		if (equalSide * 2 <= base) {
			error =
				'Each equal side must be greater than half the base (triangle inequality). Please increase the equal side length.';
			return;
		}
		addToHistory('triangle-isosceles', {
			inputs: `b=${formatNumber(base)}, s=${formatNumber(equalSide)}`,
			results: `A=${formatNumber(result.area)}, P=${formatNumber(result.perimeter)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		base = 8;
		equalSide = 10;
		error = '';
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			base = convertValue(base, oldUnit, newUnit);
			equalSide = convertValue(equalSide, oldUnit, newUnit);
		}
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('b', String(base));
		params.set('s', String(equalSide));
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
		const s = sp.get('s');
		if (s !== null) {
			const val = parseFloat(s);
			if (!isNaN(val) && val > 0) equalSide = val;
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
	title="Isosceles Triangle Calculator — Area & Perimeter"
	description="Interactive isosceles triangle calculator. Calculate area and perimeter with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/2d/triangle/isosceles"
	keywords="isosceles triangle area calculator, isosceles triangle perimeter, equal sides"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry2d'), href: '/2d' },
		{ label: tKey('shapes.isosceles-triangle.name') }
	]}
/>

<BackButton href="/2d/triangle" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry2d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('shapes.isosceles-triangle.name')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('shapes.isosceles-triangle.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<polygon
				points={`100,60 ${100 + svgBase / 2},140 ${100 - svgBase / 2},140`}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<line
				x1="100"
				y1="60"
				x2="100"
				y2="140"
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x="100"
				y="155"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle">b = {formatNumber(base)}</text
			>
			<text
				x={100 - svgBase / 4}
				y="95"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="end">s = {formatNumber(equalSide)}</text
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
				label={tKey('shapes.isosceles-triangle.base') + ' (b)'}
				bind:value={base}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.isosceles-triangle.equalSide') + ' (s)'}
				bind:value={equalSide}
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

		<CalculationHistory shapeId="triangle-isosceles" />
	</div>
</div>

<ShapeFacts shapeId="isosceles-triangle" />
<ShapeProperties shapeId="isosceles-triangle" />
