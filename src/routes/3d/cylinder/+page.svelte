<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import ShapeFacts from '$lib/components/ShapeFacts.svelte';
	import ShapeProperties from '$lib/components/ShapeProperties.svelte';
	import { calculateCylinder } from '$lib/utils/shapes3d';
	import { formatNumber, clamp } from '$lib/utils/format';
	import { getLastUnit, areaUnitLabel, volumeUnitLabel, type Unit } from '$lib/utils/units';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';
	import { tKey } from '$lib/stores/lang.svelte';
	import SliderInput from '$lib/components/SliderInput.svelte';
	import CalculationHistory from '$lib/components/CalculationHistory.svelte';
	import CopyLinkButton from '$lib/components/CopyLinkButton.svelte';
	import DownloadPngButton from '$lib/components/DownloadPngButton.svelte';
	import { addToHistory } from '$lib/utils/history';

	import StepByStep from '$lib/components/StepByStep.svelte';
	import SafeDisplay from '$lib/components/SafeDisplay.svelte';
	import { convertValue, convertAreaValue, convertVolumeValue } from '$lib/utils/units';
	import { safeNumber } from '$lib/utils/format';

	const pageData = mathSolverData({
		shape: 'Cylinder',
		urlPath: '/3d/cylinder',
		category: '3D',
		resultType: 'volume and surface area',
		keywords: 'cylinder volume calculator, cylinder surface area, radius height, pipe volume math'
	});

	let radius = $state(4);
	let height = $state(10);
	let unit = $state<Unit>(getLastUnit());
	let result = $derived(calculateCylinder(radius, height));
	const BASE_UNIT: Unit = 'cm';

	let displayVolume = $derived(safeNumber(convertVolumeValue(result.volume, BASE_UNIT, unit), 0));
	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));

	let volumeSteps = $derived([
		`V = \\pi r^2 h`,
		`V = \\pi \\times \\text{${formatNumber(radius)}}^2 \\times \\text{${formatNumber(height)}}`,
		`V \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	]);
	let evaluatedVolume = $derived(
		`V = \\pi \\times \\text{${formatNumber(radius)}}^2 \\times \\text{${formatNumber(height)}} \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = 2\\pi \\times \\text{${formatNumber(radius)}}(\\text{${formatNumber(radius)}} + \\text{${formatNumber(height)}}) \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);

	let areaSteps = $derived([
		`A = 2\\pi r(r + h)`,
		`A = 2\\pi \\times \\text{${formatNumber(radius)}}(\\text{${formatNumber(radius)}} + \\text{${formatNumber(height)}})`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	let svgRx = $derived(clamp(radius * 8, 15, 70));
	let svgRy = $derived(svgRx * 0.3);
	let svgH = $derived(clamp(height * 6, 20, 120));
	let cx = $derived(100);
	let topCy = $derived(100 - svgH / 2);
	let bottomCy = $derived(100 + svgH / 2);

	function handleCalculate() {
		addToHistory('cylinder', {
			inputs: `r=${radius}, h=${height}`,
			results: `V=${formatNumber(result.volume)}, A=${formatNumber(result.area)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		radius = 4;
		height = 10;
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('r', String(radius));
		params.set('h', String(height));
		if (unit !== 'cm') params.set('unit', unit);
		const newUrl = `?${params.toString()}`;
		if (newUrl !== window.location.search && newUrl !== '?') {
			history.replaceState(history.state, '', newUrl);
		}
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			radius = convertValue(radius, oldUnit, newUnit);
			height = convertValue(height, oldUnit, newUnit);
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
		const r = sp.get('r');
		if (r !== null) {
			const val = parseFloat(r);
			if (!isNaN(val) && val > 0) radius = val;
		}
		const h = sp.get('h');
		if (h !== null) {
			const val = parseFloat(h);
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
		updateUrl();
	});
</script>

<SeoHead
	title="Cylinder Calculator — Volume & Surface Area"
	description="Interactive cylinder calculator. Calculate volume, lateral area, and total surface area with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/3d/cylinder"
	keywords="cylinder volume calculator, cylinder surface area, radius height, pipe volume math"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry3d'), href: '/3d' },
		{ label: tKey('shapes.cylinder.name') }
	]}
/>

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry3d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('shapes.cylinder.name')}
		{tKey('common.calculator')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('shapes.cylinder.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<!-- Lateral surface fill (approximated polygon) -->
			<polygon
				points="{cx - svgRx},{topCy} {cx + svgRx},{topCy} {cx + svgRx},{bottomCy} {cx -
					svgRx},{bottomCy}"
				fill="rgba(99,102,241,0.07)"
				stroke="none"
			/>
			<!-- Bottom ellipse -->
			<ellipse
				{cx}
				cy={bottomCy}
				rx={svgRx}
				ry={svgRy}
				fill="none"
				stroke="#818CF8"
				stroke-width="2"
				opacity="0.5"
			/>
			<!-- Vertical edges -->
			<line
				x1={cx - svgRx}
				y1={topCy}
				x2={cx - svgRx}
				y2={bottomCy}
				stroke="#818CF8"
				stroke-width="2"
			/>
			<line
				x1={cx + svgRx}
				y1={topCy}
				x2={cx + svgRx}
				y2={bottomCy}
				stroke="#818CF8"
				stroke-width="2"
			/>
			<!-- Top ellipse -->
			<ellipse
				{cx}
				cy={topCy}
				rx={svgRx}
				ry={svgRy}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<!-- Radius label -->
			<line
				x1={cx}
				y1={topCy}
				x2={cx + svgRx}
				y2={topCy}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x={cx + svgRx / 2}
				y={topCy - 6}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle"
			>
				r = {formatNumber(radius)}
			</text>
			<!-- Height label -->
			<line
				x1={cx + svgRx + 10}
				y1={topCy}
				x2={cx + svgRx + 10}
				y2={bottomCy}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x={cx + svgRx + 18}
				y={(topCy + bottomCy) / 2}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="start"
				dominant-baseline="middle"
			>
				h = {formatNumber(height)}
			</text>
			<!-- Height ticks -->
			<line
				x1={cx + svgRx + 6}
				y1={topCy}
				x2={cx + svgRx + 14}
				y2={topCy}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
			/>
			<line
				x1={cx + svgRx + 6}
				y1={bottomCy}
				x2={cx + svgRx + 14}
				y2={bottomCy}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
			/>
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
				label={tKey('shapes.cylinder.radius')}
				bind:value={radius}
				min={0}
				max={50}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.cylinder.height')}
				bind:value={height}
				min={0}
				max={50}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<button
				onclick={handleReset}
				class="border-border-default hover:border-border-strong w-full rounded-lg border bg-bg-inset px-4
						 py-2.5 font-mono text-sm
						 text-text-secondary transition-colors duration-150 hover:text-text-primary"
			>
				{tKey('common.reset')}
			</button>
		</div>

		<hr class="border-border-divider" />

		<!-- Formula -->
		<div>
			<p class="micro-label mb-3">{tKey('common.formulas')}</p>
			<FormulaDisplay template={result.formulas.volume} evaluated={evaluatedVolume} />
			<StepByStep steps={volumeSteps} />
			<div class="mt-4"></div>
			<FormulaDisplay template={result.formulas.area} evaluated={evaluatedArea} />
			<StepByStep steps={areaSteps} />
		</div>

		<hr class="border-border-divider" />

		<!-- Results -->
		<div>
			<p class="micro-label mb-3">{tKey('common.results')}</p>
			<div class="flex flex-wrap gap-3" aria-live="polite" role="status">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">{tKey('common.volume')}</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={displayVolume} unit={volumeUnitLabel(unit)} />
					</span>
				</div>
				<div class="result-chip animate-fade-slide-up" style="animation-delay: 50ms">
					<span class="micro-label text-text-muted">{tKey('common.surfaceArea')}</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={displayArea} unit={areaUnitLabel(unit)} />
					</span>
				</div>
				<div class="mt-3 flex items-center gap-2">
					<CopyLinkButton />
					<DownloadPngButton />
				</div>
			</div>
		</div>
	</div>
</div>

<CalculationHistory shapeId="cylinder" />

<ShapeFacts shapeId="cylinder" />
<ShapeProperties shapeId="cylinder" />
