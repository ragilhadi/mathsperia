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
	import { calculateCone } from '$lib/utils/shapes3d';
	import { formatNumber, safeNumber } from '$lib/utils/format';
	import {
		getLastUnit,
		areaUnitLabel,
		volumeUnitLabel,
		convertValue,
		convertAreaValue,
		convertVolumeValue,
		type Unit
	} from '$lib/utils/units';
	import { addToHistory } from '$lib/utils/history';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';
	import { tKey } from '$lib/stores/lang.svelte';

	const pageData = mathSolverData({
		shape: 'Cone',
		urlPath: '/3d/cone',
		category: '3D',
		resultType: 'volume and surface area',
		keywords: 'cone volume calculator, cone surface area calculator, slant height, radius height'
	});

	let radius = $state(5);
	let height = $state(12);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateCone>>(calculateCone(5, 12));

	const BASE_UNIT: Unit = 'cm';

	let displayVolume = $derived(safeNumber(convertVolumeValue(result.volume, BASE_UNIT, unit), 0));
	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));

	let slantHeight = $derived(Math.sqrt(radius ** 2 + height ** 2));

	let svgR = $derived(Math.min(Math.max(radius * 6, 12), 70));
	let svgH = $derived(Math.min(Math.max(height * 4, 24), 130));
	let cx = 100;
	let cyBase = 165;
	let cyApex = $derived(cyBase - svgH);

	let evaluatedVolume = $derived(
		`V = \\frac{1}{3}\\pi \\times \\text{${formatNumber(radius)}}^2 \\times \\text{${formatNumber(height)}} \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = \\pi \\times \\text{${formatNumber(radius)}}(\\text{${formatNumber(radius)}} + \\text{${formatNumber(slantHeight)}}) \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);

	let volumeSteps = $derived([
		`V = \\frac{1}{3}\\pi r^2 h`,
		`V = \\frac{1}{3}\\pi \\times \\text{${formatNumber(radius)}}^2 \\times \\text{${formatNumber(height)}}`,
		`V \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	]);

	let areaSteps = $derived([
		`A = \\pi r(r + l)`,
		`A = \\pi \\times \\text{${formatNumber(radius)}}(\\text{${formatNumber(radius)}} + \\text{${formatNumber(slantHeight)}})`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	function handleCalculate() {
		if (radius <= 0) radius = 0.1;
		if (height <= 0) height = 0.1;
		result = calculateCone(radius, height);
		addToHistory('cone', {
			inputs: `r=${formatNumber(radius)}, h=${formatNumber(height)}`,
			results: `V=${formatNumber(result.volume)}, A=${formatNumber(result.area)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		radius = 5;
		height = 12;
		result = calculateCone(radius, height);
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			radius = convertValue(radius, oldUnit, newUnit);
			height = convertValue(height, oldUnit, newUnit);
		}
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
		handleCalculate();
		updateUrl();
	});
</script>

<SeoHead
	title="Cone Calculator — Volume & Surface Area"
	description="Interactive cone calculator. Calculate volume and surface area with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/3d/cone"
	keywords="cone volume calculator, cone surface area calculator, slant height, radius height"
	structuredData={pageData}
/>

<Breadcrumb
	items={[{ label: tKey('nav.home'), href: '/' }, { label: tKey('common.geometry3d'), href: '/3d' }, { label: tKey('shapes.cone.name') }]}
/>

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry3d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">{tKey('shapes.cone.name')} {tKey('common.calculator')}</h1>
	<p class="mt-2 text-text-secondary">{tKey('shapes.cone.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<!-- Base ellipse -->
			<ellipse
				{cx}
				cy={cyBase}
				rx={svgR}
				ry={svgR * 0.3}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<!-- Left slant edge (solid) -->
			<line x1={cx - svgR} y1={cyBase} x2={cx} y2={cyApex} stroke="#818CF8" stroke-width="2" />
			<!-- Right slant edge (dashed, represents slant height) -->
			<line
				x1={cx + svgR}
				y1={cyBase}
				x2={cx}
				y2={cyApex}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<!-- Height (dashed center line) -->
			<line
				x1={cx}
				y1={cyBase}
				x2={cx}
				y2={cyApex}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<!-- Radius (dashed horizontal) -->
			<line
				x1={cx}
				y1={cyBase}
				x2={cx + svgR}
				y2={cyBase}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<!-- Apex dot -->
			<circle {cx} cy={cyApex} r="3" fill="#818CF8" />
			<!-- Labels -->
			<text
				x={cx + svgR / 2}
				y={cyBase - 6}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle"
			>
				r = {formatNumber(radius)}
			</text>
			<text
				x={cx + 8}
				y={cyBase - svgH / 2 + 4}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="start"
			>
				h = {formatNumber(height)}
			</text>
			<text
				x={cx + svgR / 2 + 8}
				y={cyBase - svgH / 2 + 4}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="start"
			>
				l = {formatNumber(slantHeight)}
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
				label={tKey('shapes.cone.radius')}
				bind:value={radius}
				min={0}
				max={50}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.cone.height')}
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
			<div class="flex flex-wrap gap-3">
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
			</div>
			<div class="mt-3 flex items-center gap-2">
				<CopyLinkButton />
				<DownloadPngButton />
			</div>
		</div>

		<CalculationHistory shapeId="cone" />
	</div>
</div>

<ShapeFacts shapeId="cone" />
<ShapeProperties shapeId="cone" />
