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
	import { calculateRightTriangle } from '$lib/utils/shapes';
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
		shape: 'Right Triangle',
		urlPath: '/2d/triangle/right',
		category: '2D',
		resultType: 'area and hypotenuse',
		keywords:
			'right triangle area calculator, right triangle perimeter, hypotenuse, pythagorean theorem'
	});

	let base = $state(6);
	let height = $state(8);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateRightTriangle>>(calculateRightTriangle(6, 8));

	const BASE_UNIT: Unit = 'cm';

	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));
	let displayPerimeter = $derived(safeNumber(convertValue(result.perimeter, BASE_UNIT, unit), 0));
	let displayHypotenuse = $derived(
		safeNumber(convertValue(Math.sqrt(base * base + height * height), BASE_UNIT, unit), 0)
	);

	let scaleFactor = $derived(Math.max(base, height) / 8);
	let svgBase = $derived(clamp((base / scaleFactor) * 12, 50, 120));
	let svgHeight = $derived(clamp((height / scaleFactor) * 12, 50, 120));

	let evaluatedArea = $derived(
		`A = \\frac{1}{2} \\times \\text{${formatNumber(base)}} \\times \\text{${formatNumber(height)}} = \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`P = \\text{${formatNumber(base)}} + \\text{${formatNumber(height)}} + c = \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	);

	const pythagoreanFormula = 'c = \\sqrt{a^2 + b^2}';
	let evaluatedHypotenuse = $derived(
		`c = \\sqrt{\\text{${formatNumber(base)}}^2 + \\text{${formatNumber(height)}}^2} \\approx \\text{${formatNumber(displayHypotenuse)}} \\text{ ${unit}}`
	);

	let areaSteps = $derived([
		`A = \\frac{1}{2}ab`,
		`A = \\frac{1}{2} \\times \\text{${formatNumber(base)}} \\times \\text{${formatNumber(height)}}`,
		`A = \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	let perimeterSteps = $derived([
		`P = a + b + c`,
		`P = \\text{${formatNumber(base)}} + \\text{${formatNumber(height)}} + \\text{${formatNumber(displayHypotenuse)}}`,
		`P = \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	]);

	let hypotenuseSteps = $derived([
		`c = \\sqrt{a^2 + b^2}`,
		`c = \\sqrt{\\text{${formatNumber(base)}}^2 + \\text{${formatNumber(height)}}^2}`,
		`c \\approx \\text{${formatNumber(displayHypotenuse)}} \\text{ ${unit}}`
	]);

	function handleCalculate() {
		if (base <= 0) base = 0.1;
		if (height <= 0) height = 0.1;
		result = calculateRightTriangle(base, height);
		addToHistory('triangle-right', {
			inputs: `a=${formatNumber(base)}, b=${formatNumber(height)}`,
			results: `A=${formatNumber(result.area)}, P=${formatNumber(result.perimeter)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		base = 6;
		height = 8;
		result = calculateRightTriangle(base, height);
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			base = convertValue(base, oldUnit, newUnit);
			height = convertValue(height, oldUnit, newUnit);
		}
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('a', String(base));
		params.set('b', String(height));
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
			if (!isNaN(val) && val > 0) base = val;
		}
		const b = sp.get('b');
		if (b !== null) {
			const val = parseFloat(b);
			if (!isNaN(val) && val > 0) height = val;
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
	title="Right Triangle Calculator — Area & Perimeter"
	description="Interactive right triangle calculator. Calculate area and hypotenuse with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/2d/triangle/right"
	keywords="right triangle area calculator, right triangle perimeter, hypotenuse, pythagorean theorem"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: 'Home', href: '/' },
		{ label: '2D Geometry', href: '/2d' },
		{ label: 'Triangle', href: '/2d/triangle' },
		{ label: 'Right Triangle' }
	]}
/>

<BackButton href="/2d/triangle" />

<div class="mb-8">
	<p class="micro-label mb-2">Triangle Types</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">Right Triangle</h1>
	<p class="mt-2 text-text-secondary">Has one 90° angle. Pythagorean theorem applies.</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<polygon
				points={`60,${140} 60,${140 - svgHeight} ${60 + svgBase},140`}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<rect
				x="60"
				y={140 - 15}
				width="15"
				height="15"
				fill="none"
				stroke="#818CF8"
				stroke-width="1"
			/>
			<text
				x={60 + svgBase / 2}
				y="155"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle">a = {formatNumber(base)}</text
			>
			<text
				x="48"
				y={140 - svgHeight / 2}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="end">b = {formatNumber(height)}</text
			>
		</svg>
	</div>

	<!-- Right: Inputs + Formula + Results -->
	<div class="surface-panel flex flex-col gap-6 p-6">
		<!-- Inputs -->
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<p class="micro-label">Dimensions</p>
				<UnitSelector bind:unit onChange={handleUnitChange} />
			</div>
			<SliderInput
				label="Base (a)"
				bind:value={base}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label="Height (b)"
				bind:value={height}
				min={0}
				max={100}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<button
				onclick={handleReset}
				class="border-border-default hover:border-border-strong w-full rounded-lg border bg-bg-inset px-4 py-2.5 font-mono text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
				>Reset</button
			>
		</div>

		<hr class="border-border-divider" />

		<!-- Formula -->
		<div>
			<p class="micro-label mb-3">Formulas</p>
			<FormulaDisplay template={result.formulas.area} evaluated={evaluatedArea} />
			<StepByStep steps={areaSteps} />
			<div class="mt-4"></div>
			<FormulaDisplay template={result.formulas.perimeter} evaluated={evaluatedPerimeter} />
			<StepByStep steps={perimeterSteps} />
			<div class="mt-4"></div>
			<FormulaDisplay template={pythagoreanFormula} evaluated={evaluatedHypotenuse} />
			<StepByStep steps={hypotenuseSteps} />
		</div>

		<hr class="border-border-divider" />

		<!-- Results -->
		<div>
			<p class="micro-label mb-3">Results</p>
			<div class="flex flex-wrap gap-3">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">Area</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={displayArea} unit={areaUnitLabel(unit)} />
					</span>
				</div>
				<div class="result-chip animate-fade-slide-up" style="animation-delay: 50ms">
					<span class="micro-label text-text-muted">Perimeter</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={displayPerimeter} {unit} />
					</span>
				</div>
				<div class="result-chip animate-fade-slide-up" style="animation-delay: 100ms">
					<span class="micro-label text-text-muted">Hypotenuse</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={displayHypotenuse} {unit} />
					</span>
				</div>
			</div>
			<div class="mt-3 flex items-center gap-2">
				<CopyLinkButton />
				<DownloadPngButton />
			</div>
		</div>

		<CalculationHistory shapeId="triangle-right" />
	</div>
</div>

<ShapeFacts shapeId="right-triangle" />
<ShapeProperties shapeId="right-triangle" />
