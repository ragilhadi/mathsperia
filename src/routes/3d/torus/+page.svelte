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
	import { calculateTorus } from '$lib/utils/shapes3d';
	import { formatNumber, clamp, safeNumber } from '$lib/utils/format';
	import {
		getLastUnit,
		setLastUnit,
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
		shape: 'Torus',
		urlPath: '/3d/torus',
		category: '3D',
		resultType: 'volume and surface area',
		keywords: 'torus volume calculator, torus surface area, donut shape math, major minor radius'
	});

	let majorRadius = $state(10);
	let minorRadius = $state(3);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateTorus>>(calculateTorus(10, 3));

	const BASE_UNIT: Unit = 'cm';

	let displayVolume = $derived(safeNumber(convertVolumeValue(result.volume, BASE_UNIT, unit), 0));
	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));

	const PERSP = 0.35;
	const CX = 100;
	const CY = 100;

	let rawMajor = $derived(majorRadius * 6);
	let rawMinor = $derived(minorRadius * 6);
	let svgMajor = $derived(clamp(rawMajor, 15, 65));
	let svgMinor = $derived(clamp(rawMinor, 5, 25));
	let scale = $derived(svgMajor + svgMinor > 85 ? 85 / (svgMajor + svgMinor) : 1);
	let sMajor = $derived(svgMajor * scale);
	let sMinor = $derived(svgMinor * scale);

	let outerRx = $derived(sMajor + sMinor);
	let outerRy = $derived((sMajor + sMinor) * PERSP);
	let innerRx = $derived(Math.max(sMajor - sMinor, 0));
	let innerRy = $derived(Math.max(sMajor - sMinor, 0) * PERSP);

	const crossAngles = [0, 45, 90, 135, 180, 225, 270, 315];
	function toRad(deg: number) {
		return (deg * Math.PI) / 180;
	}

	let evaluatedVolume = $derived(
		`V = 2\\pi^2 \\times \\text{${formatNumber(majorRadius)}} \\times \\text{${formatNumber(minorRadius)}}^2 \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = 4\\pi^2 \\times \\text{${formatNumber(majorRadius)}} \\times \\text{${formatNumber(minorRadius)}} \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);

	let volumeSteps = $derived([
		`V = 2\\pi^2 R r^2`,
		`V = 2\\pi^2 \\times \\text{${formatNumber(majorRadius)}} \\times \\text{${formatNumber(minorRadius)}}^2`,
		`V \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	]);

	let areaSteps = $derived([
		`A = 4\\pi^2 R r`,
		`A = 4\\pi^2 \\times \\text{${formatNumber(majorRadius)}} \\times \\text{${formatNumber(minorRadius)}}`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	function handleCalculate() {
		if (majorRadius <= 0) majorRadius = 0.1;
		if (minorRadius <= 0) minorRadius = 0.1;
		result = calculateTorus(majorRadius, minorRadius);
		addToHistory('torus', {
			inputs: `R=${formatNumber(majorRadius)}, r=${formatNumber(minorRadius)}`,
			results: `V=${formatNumber(result.volume)}, A=${formatNumber(result.area)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		majorRadius = 10;
		minorRadius = 3;
		result = calculateTorus(majorRadius, minorRadius);
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			majorRadius = convertValue(majorRadius, oldUnit, newUnit);
			minorRadius = convertValue(minorRadius, oldUnit, newUnit);
		}
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('R', String(majorRadius));
		params.set('r', String(minorRadius));
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
		const R = sp.get('R');
		if (R !== null) {
			const val = parseFloat(R);
			if (!isNaN(val) && val > 0) majorRadius = val;
		}
		const r = sp.get('r');
		if (r !== null) {
			const val = parseFloat(r);
			if (!isNaN(val) && val > 0) minorRadius = val;
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
		setLastUnit(unit);
	});
</script>

<SeoHead
	title="Torus Calculator — Volume & Surface Area"
	description="Interactive torus calculator. Calculate volume and surface area with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/3d/torus"
	keywords="torus volume calculator, torus surface area, donut shape math, major minor radius"
	structuredData={pageData}
/>

<Breadcrumb
	items={[{ label: tKey('nav.home'), href: '/' }, { label: tKey('common.geometry3d'), href: '/3d' }, { label: tKey('shapes.torus.name') }]}
/>

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry3d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">{tKey('shapes.torus.name')} Calculator</h1>
	<p class="mt-2 text-text-secondary">{tKey('shapes.torus.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<!-- Inner hole (back rim) -->
			<ellipse
				cx={CX}
				cy={CY}
				rx={innerRx}
				ry={innerRy}
				fill="none"
				stroke="#818CF8"
				stroke-width="1.5"
				stroke-dasharray="4 3"
				opacity="0.5"
			/>

			<!-- Cross-section ellipses around the ring -->
			{#each crossAngles as deg}
				{@const theta = toRad(deg)}
				{@const px = CX + sMajor * Math.cos(theta)}
				{@const py = CY + sMajor * PERSP * Math.sin(theta)}
				{@const rot = (Math.atan2(py - CY, px - CX) * 180) / Math.PI}
				{@const isBack = Math.sin(theta) > 0}
				<ellipse
					cx={px}
					cy={py}
					rx={sMinor}
					ry={sMinor * 0.6}
					fill="none"
					stroke="#818CF8"
					stroke-width="1.5"
					transform={`rotate(${rot} ${px} ${py})`}
					opacity={isBack ? 0.4 : 0.85}
					stroke-dasharray={isBack ? '4 3' : undefined}
				/>
			{/each}

			<!-- Main outer ring -->
			<ellipse
				cx={CX}
				cy={CY}
				rx={outerRx}
				ry={outerRy}
				fill="none"
				stroke="#818CF8"
				stroke-width="2"
			/>

			<!-- Major radius line -->
			<line
				x1={CX}
				y1={CY}
				x2={CX + sMajor}
				y2={CY}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<circle cx={CX} cy={CY} r="3" fill="#818CF8" />
			<text
				x={CX + sMajor / 2}
				y={CY - 8}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle"
			>
				R = {formatNumber(majorRadius)}
			</text>

			<!-- Minor radius cross-section label at rightmost point -->
			<text
				x={CX + sMajor + sMinor + 6}
				y={CY + 4}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="start"
			>
				r = {formatNumber(minorRadius)}
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
				label={tKey('shapes.torus.majorRadius')}
				bind:value={majorRadius}
				min={0}
				max={50}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.torus.minorRadius')}
				bind:value={minorRadius}
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

		<CalculationHistory shapeId="torus" />
	</div>
</div>

<ShapeFacts shapeId="torus" />
<ShapeProperties shapeId="torus" />
