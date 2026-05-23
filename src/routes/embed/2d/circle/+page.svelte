<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import StepByStep from '$lib/components/StepByStep.svelte';
	import SafeDisplay from '$lib/components/SafeDisplay.svelte';
	import SliderInput from '$lib/components/SliderInput.svelte';
	import { calculateCircle, shapes } from '$lib/utils/shapes';
	import { formatNumber, clamp, safeNumber } from '$lib/utils/format';
	import {
		getLastUnit,
		areaUnitLabel,
		convertValue,
		convertAreaValue,
		type Unit
	} from '$lib/utils/units';

	const shape = shapes.find((s) => s.id === 'circle')!;

	let radius = $state(5);
	let unit = $state<Unit>(getLastUnit());
	let result = $derived(calculateCircle(radius));

	const BASE_UNIT: Unit = 'cm';

	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));
	let displayPerimeter = $derived(safeNumber(convertValue(result.perimeter, BASE_UNIT, unit), 0));

	let svgRadius = $derived(clamp(radius * 8, 20, 80));

	let evaluatedArea = $derived(
		`A = \\pi \\times \\text{${formatNumber(radius)}}^2 \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);
	let evaluatedPerimeter = $derived(
		`C = 2\\pi \\times \\text{${formatNumber(radius)}} \\approx \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	);

	let areaSteps = $derived([
		`A = \\pi r^2`,
		`A = \\pi \\times \\text{${formatNumber(radius)}}^2`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	let perimeterSteps = $derived([
		`C = 2\\pi r`,
		`C = 2\\pi \\times \\text{${formatNumber(radius)}}`,
		`C \\approx \\text{${formatNumber(displayPerimeter)}} \\text{ ${unit}}`
	]);

	function handleCalculate() {
		if (radius <= 0) radius = 0.1;
	}

	function handleReset() {
		radius = 5;
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			radius = convertValue(radius, oldUnit, newUnit);
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleCalculate();
		}
	}

	onMount(() => {
		const sp = $page.url.searchParams;
		const r = sp.get('r');
		if (r !== null) {
			const val = parseFloat(r);
			if (!isNaN(val) && val > 0) radius = val;
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
</script>

<div class="mb-6">
	<p class="micro-label mb-1">2D Geometry</p>
	<h1 class="font-display text-2xl font-bold tracking-tight text-text-primary">
		{shape.name} Calculator
	</h1>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<circle
				cx="100"
				cy="100"
				r={svgRadius}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<line
				x1="100"
				y1="100"
				x2={100 + svgRadius}
				y2="100"
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<circle cx="100" cy="100" r="3" fill="#818CF8" />
			<text
				x={100 + svgRadius / 2}
				y="92"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle"
			>
				r = {formatNumber(radius)}
			</text>
		</svg>
	</div>

	<div class="surface-panel flex flex-col gap-6 p-6">
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<p class="micro-label">Dimensions</p>
				<UnitSelector bind:unit onChange={handleUnitChange} />
			</div>
			<SliderInput
				label="Radius (r)"
				bind:value={radius}
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

		<div>
			<p class="micro-label mb-3">Formulas</p>
			<FormulaDisplay template={result.formulas.area} evaluated={evaluatedArea} />
			<StepByStep steps={areaSteps} />
			<div class="mt-4"></div>
			<FormulaDisplay template={result.formulas.perimeter} evaluated={evaluatedPerimeter} />
			<StepByStep steps={perimeterSteps} />
		</div>

		<hr class="border-border-divider" />

		<div>
			<p class="micro-label mb-3">Results</p>
			<div class="flex flex-wrap gap-3" aria-live="polite" role="status">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">Area</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={displayArea} unit={areaUnitLabel(unit)} />
					</span>
				</div>
				<div class="result-chip animate-fade-slide-up" style="animation-delay: 50ms">
					<span class="micro-label text-text-muted">Circumference</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={displayPerimeter} {unit} />
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
