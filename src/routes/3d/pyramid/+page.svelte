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
	import { calculatePyramid } from '$lib/utils/shapes3d';
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
		shape: 'Pyramid',
		urlPath: '/3d/pyramid',
		category: '3D',
		resultType: 'volume and surface area',
		keywords: 'pyramid volume calculator, pyramid surface area, square base, triangular faces'
	});

	let baseSide = $state(6);
	let height = $state(8);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculatePyramid>>(calculatePyramid(6, 8));

	const BASE_UNIT: Unit = 'cm';

	let displayVolume = $derived(safeNumber(convertVolumeValue(result.volume, BASE_UNIT, unit), 0));
	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));

	let slantHeight = $derived(Math.sqrt(height ** 2 + (baseSide / 2) ** 2));

	let svgBase = $derived(Math.min(Math.max(baseSide * 5, 30), 90));
	let svgH = $derived(Math.min(Math.max(height * 4, 25), 120));
	let half = $derived(svgBase / 2);
	let dx = $derived(half * 0.5);
	let dy = $derived(half * 0.35);
	let cx = 100;
	let cyBase = 165;
	let apexX = $derived(cx - dx / 2);
	let apexY = $derived(cyBase - dy / 2 - svgH);

	let evaluatedVolume = $derived(
		`V = \\frac{1}{3} \\times \\text{${formatNumber(baseSide)}}^2 \\times \\text{${formatNumber(height)}} \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = \\text{${formatNumber(baseSide)}}^2 + 2 \\times \\text{${formatNumber(baseSide)}} \\times \\text{${formatNumber(slantHeight)}} \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);

	let volumeSteps = $derived([
		`V = \\frac{1}{3} b^2 h`,
		`V = \\frac{1}{3} \\times \\text{${formatNumber(baseSide)}}^2 \\times \\text{${formatNumber(height)}}`,
		`V \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	]);

	let areaSteps = $derived([
		`A = b^2 + 2bl`,
		`A = \\text{${formatNumber(baseSide)}}^2 + 2 \\times \\text{${formatNumber(baseSide)}} \\times \\text{${formatNumber(slantHeight)}}`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	function handleCalculate() {
		if (baseSide <= 0) baseSide = 0.1;
		if (height <= 0) height = 0.1;
		result = calculatePyramid(baseSide, height);
		addToHistory('pyramid', {
			inputs: `b=${formatNumber(baseSide)}, h=${formatNumber(height)}`,
			results: `V=${formatNumber(result.volume)}, A=${formatNumber(result.area)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		baseSide = 6;
		height = 8;
		result = calculatePyramid(baseSide, height);
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			baseSide = convertValue(baseSide, oldUnit, newUnit);
			height = convertValue(height, oldUnit, newUnit);
		}
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('b', String(baseSide));
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
		const b = sp.get('b');
		if (b !== null) {
			const val = parseFloat(b);
			if (!isNaN(val) && val > 0) baseSide = val;
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
	title="Pyramid Calculator — Volume & Surface Area"
	description="Interactive square pyramid calculator. Calculate volume and surface area with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/3d/pyramid"
	keywords="pyramid volume calculator, pyramid surface area, square base, triangular faces"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry3d'), href: '/3d' },
		{ label: tKey('shapes.pyramid.name') }
	]}
/>

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry3d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('shapes.pyramid.name')} {tKey('common.calculator')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('shapes.pyramid.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<!-- Base face -->
			<polygon
				points="{cx - half},{cyBase} {cx + half},{cyBase} {cx + half - dx},{cyBase - dy} {cx -
					half -
					dx},{cyBase - dy}"
				fill="rgba(99,102,241,0.04)"
				stroke="none"
			/>

			<!-- Right face -->
			<polygon
				points="{apexX},{apexY} {cx + half},{cyBase} {cx + half - dx},{cyBase - dy}"
				fill="rgba(99,102,241,0.06)"
				stroke="#818CF8"
				stroke-width="1.5"
				opacity="0.7"
			/>

			<!-- Front face -->
			<polygon
				points="{apexX},{apexY} {cx - half},{cyBase} {cx + half},{cyBase}"
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>

			<!-- Hidden base edges -->
			<line
				x1={cx - half - dx}
				y1={cyBase - dy}
				x2={cx + half - dx}
				y2={cyBase - dy}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<line
				x1={cx - half}
				y1={cyBase}
				x2={cx - half - dx}
				y2={cyBase - dy}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>

			<!-- Hidden left slant edge -->
			<line
				x1={apexX}
				y1={apexY}
				x2={cx - half - dx}
				y2={cyBase - dy}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>

			<!-- Visible base edges -->
			<line
				x1={cx - half}
				y1={cyBase}
				x2={cx + half}
				y2={cyBase}
				stroke="#818CF8"
				stroke-width="2"
			/>
			<line
				x1={cx + half}
				y1={cyBase}
				x2={cx + half - dx}
				y2={cyBase - dy}
				stroke="#818CF8"
				stroke-width="2"
			/>

			<!-- Apex dot -->
			<circle cx={apexX} cy={apexY} r="3" fill="#818CF8" />

			<!-- Height dashed line -->
			<line
				x1={apexX}
				y1={apexY}
				x2={apexX}
				y2={cyBase - dy / 2}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>

			<!-- Base side dimension line -->
			<line
				x1={cx - half}
				y1={cyBase + 10}
				x2={cx + half}
				y2={cyBase + 10}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>

			<!-- Labels -->
			<text
				x={cx}
				y={cyBase + 22}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle"
			>
				b = {formatNumber(baseSide)}
			</text>
			<text
				x={apexX + 10}
				y={Math.round((apexY + cyBase - dy / 2) / 2) + 4}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="start"
			>
				h = {formatNumber(height)}
			</text>
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
				label="Base Side (b)"
				bind:value={baseSide}
				min={0}
				max={50}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label="Height (h)"
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
				Reset
			</button>
		</div>

		<hr class="border-border-divider" />

		<!-- Formula -->
		<div>
			<p class="micro-label mb-3">Formulas</p>
			<FormulaDisplay template={result.formulas.volume} evaluated={evaluatedVolume} />
			<StepByStep steps={volumeSteps} />
			<div class="mt-4"></div>
			<FormulaDisplay template={result.formulas.area} evaluated={evaluatedArea} />
			<StepByStep steps={areaSteps} />
		</div>

		<hr class="border-border-divider" />

		<!-- Results -->
		<div>
			<p class="micro-label mb-3">Results</p>
			<div class="flex flex-wrap gap-3">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">Volume</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={displayVolume} unit={volumeUnitLabel(unit)} />
					</span>
				</div>
				<div class="result-chip animate-fade-slide-up" style="animation-delay: 50ms">
					<span class="micro-label text-text-muted">Surface Area</span>
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

		<CalculationHistory shapeId="pyramid" />
	</div>
</div>

<ShapeFacts shapeId="pyramid" />
<ShapeProperties shapeId="pyramid" />
