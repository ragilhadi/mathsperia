<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import ShapeFacts from '$lib/components/ShapeFacts.svelte';
	import ShapeProperties from '$lib/components/ShapeProperties.svelte';
	import { calculateSphere } from '$lib/utils/shapes3d';
	import { formatNumber, clamp } from '$lib/utils/format';
	import {
		getLastUnit,
		setLastUnit,
		areaUnitLabel,
		volumeUnitLabel,
		type Unit
	} from '$lib/utils/units';
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
		shape: 'Sphere',
		urlPath: '/3d/sphere',
		category: '3D',
		resultType: 'volume and surface area',
		keywords: 'sphere volume calculator, sphere surface area calculator, radius, ball shape math'
	});

	let radius = $state(5);
	let unit = $state<Unit>(getLastUnit());
	let result = $derived(calculateSphere(radius));
	const BASE_UNIT: Unit = 'cm';

	let displayVolume = $derived(safeNumber(convertVolumeValue(result.volume, BASE_UNIT, unit), 0));
	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));

	let volumeSteps = $derived([
		`V = \\frac{4}{3}\\pi r^3`,
		`V = \\frac{4}{3}\\pi \\times \\text{${formatNumber(radius)}}^3`,
		`V \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	]);
	let evaluatedVolume = $derived(
		`V = \\frac{4}{3}\\pi \\times \\text{${formatNumber(radius)}}^3 \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = 4\\pi \\times \\text{${formatNumber(radius)}}^2 \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);

	let areaSteps = $derived([
		`A = 4\\pi r^2`,
		`A = 4\\pi \\times \\text{${formatNumber(radius)}}^2`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	let svgRadius = $derived(clamp(radius * 8, 20, 80));

	function handleCalculate() {
		addToHistory('sphere', {
			inputs: `r=${radius}`,
			results: `V=${formatNumber(result.volume)}, A=${formatNumber(result.area)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		radius = 5;
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('r', String(radius));
		if (unit !== 'cm') params.set('unit', unit);
		const newUrl = `?${params.toString()}`;
		if (newUrl !== window.location.search && newUrl !== '?') {
			history.replaceState(history.state, '', newUrl);
		}
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			radius = convertValue(radius, oldUnit, newUnit);
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
		setLastUnit(unit);
	});
</script>

<SeoHead
	title="Sphere Calculator — Volume & Surface Area"
	description="Interactive sphere calculator. Calculate volume and surface area with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/3d/sphere"
	keywords="sphere volume calculator, sphere surface area calculator, radius, ball shape math"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry3d'), href: '/3d' },
		{ label: tKey('shapes.sphere.name') }
	]}
/>

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry3d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('shapes.sphere.name')}
		{tKey('common.calculator')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('shapes.sphere.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<!-- Radial glow for 3D depth -->
			<circle cx="100" cy="100" r={svgRadius} fill="url(#sphereGrad)" stroke="none" />
			<defs>
				<radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
					<stop offset="0%" stop-color="rgba(99,102,241,0.18)" />
					<stop offset="60%" stop-color="rgba(99,102,241,0.06)" />
					<stop offset="100%" stop-color="rgba(99,102,241,0.01)" />
				</radialGradient>
			</defs>
			<!-- Sphere outline -->
			<circle
				cx="100"
				cy="100"
				r={svgRadius}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>

			<!-- Parallels (latitude lines) -->
			<ellipse
				cx="100"
				cy="100"
				rx={svgRadius}
				ry={svgRadius * 0.35}
				fill="none"
				stroke="#818CF8"
				stroke-width="1"
				stroke-dasharray="4 3"
				opacity="0.5"
			/>
			<ellipse
				cx="100"
				cy={100 - svgRadius * 0.5}
				rx={svgRadius * 0.87}
				ry={svgRadius * 0.3}
				fill="none"
				stroke="#818CF8"
				stroke-width="1"
				stroke-dasharray="4 3"
				opacity="0.4"
			/>
			<ellipse
				cx="100"
				cy={100 + svgRadius * 0.5}
				rx={svgRadius * 0.87}
				ry={svgRadius * 0.3}
				fill="none"
				stroke="#818CF8"
				stroke-width="1"
				stroke-dasharray="4 3"
				opacity="0.4"
			/>

			<!-- Meridians (longitude lines) -->
			<ellipse
				cx="100"
				cy="100"
				rx={svgRadius * 0.35}
				ry={svgRadius}
				fill="none"
				stroke="#818CF8"
				stroke-width="1"
				stroke-dasharray="4 3"
				opacity="0.5"
			/>
			<ellipse
				cx="100"
				cy="100"
				rx={svgRadius * 0.35}
				ry={svgRadius}
				fill="none"
				stroke="#818CF8"
				stroke-width="1"
				stroke-dasharray="4 3"
				opacity="0.3"
				transform="rotate(60 100 100)"
			/>
			<ellipse
				cx="100"
				cy="100"
				rx={svgRadius * 0.35}
				ry={svgRadius}
				fill="none"
				stroke="#818CF8"
				stroke-width="1"
				stroke-dasharray="4 3"
				opacity="0.3"
				transform="rotate(-60 100 100)"
			/>

			<!-- Radius line -->
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

	<!-- Right: Inputs + Formula + Results -->
	<div class="surface-panel flex flex-col gap-6 p-6">
		<!-- Inputs -->
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<p class="micro-label">{tKey('common.dimensions')}</p>
				<UnitSelector bind:unit onChange={handleUnitChange} />
			</div>
			<SliderInput
				label={tKey('shapes.sphere.radius')}
				bind:value={radius}
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
			</div>
			<div class="mt-3 flex items-center gap-2">
				<CopyLinkButton />
				<DownloadPngButton />
			</div>
		</div>
		<CalculationHistory shapeId="sphere" />
	</div>
</div>

<ShapeFacts shapeId="sphere" />
<ShapeProperties shapeId="sphere" />
