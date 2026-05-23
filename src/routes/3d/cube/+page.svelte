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
	import { calculateCube } from '$lib/utils/shapes3d';
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
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';
	import { tKey } from '$lib/stores/lang.svelte';
	import SliderInput from '$lib/components/SliderInput.svelte';
	import CalculationHistory from '$lib/components/CalculationHistory.svelte';
	import CopyLinkButton from '$lib/components/CopyLinkButton.svelte';
	import DownloadPngButton from '$lib/components/DownloadPngButton.svelte';
	import { addToHistory } from '$lib/utils/history';

	const pageData = mathSolverData({
		shape: 'Cube',
		urlPath: '/3d/cube',
		category: '3D',
		resultType: 'volume and surface area',
		keywords: 'cube volume calculator, cube surface area calculator, side length, hexahedron math'
	});

	let side = $state(5);
	let unit = $state<Unit>(getLastUnit());
	let result = $derived(calculateCube(side));

	const BASE_UNIT: Unit = 'cm';

	let displayVolume = $derived(safeNumber(convertVolumeValue(result.volume, BASE_UNIT, unit), 0));
	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));

	let evaluatedVolume = $derived(
		`V = \\text{${formatNumber(side)}}^3 = \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = 6 \\times \\text{${formatNumber(side)}}^2 = \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);

	let volumeSteps = $derived([
		`V = s^3`,
		`V = \\text{${formatNumber(side)}}^3`,
		`V = \\text{${formatNumber(side ** 3)}} \\text{ cm}^3`,
		`V \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	]);
	let areaSteps = $derived([
		`A = 6s^2`,
		`A = 6 \\times \\text{${formatNumber(side)}}^2`,
		`A = 6 \\times \\text{${formatNumber(side * side)}}`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	function handleCalculate() {
		addToHistory('cube', {
			inputs: `s=${side}`,
			results: `V=${formatNumber(result.volume)}, A=${formatNumber(result.area)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		side = 5;
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			side = convertValue(side, oldUnit, newUnit);
		}
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('s', String(side));
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
		const s = sp.get('s');
		if (s !== null) {
			const val = parseFloat(s);
			if (!isNaN(val) && val > 0) side = val;
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
	title="Cube Calculator — Volume & Surface Area"
	description="Interactive cube calculator. Calculate volume and surface area with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/3d/cube"
	keywords="cube volume calculator, cube surface area calculator, side length, hexahedron math"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry3d'), href: '/3d' },
		{ label: tKey('shapes.cube.name') }
	]}
/>

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry3d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('shapes.cube.name')}
		{tKey('common.calculator')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('shapes.cube.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<!-- Top face (shaded for depth) -->
			<polygon
				points="60,40 140,40 110,20 30,20"
				fill="rgba(99,102,241,0.14)"
				stroke="#818CF8"
				stroke-width="1.5"
				opacity="0.85"
			/>
			<!-- Right face (shaded for depth) -->
			<polygon
				points="140,40 140,120 110,100 110,20"
				fill="rgba(99,102,241,0.10)"
				stroke="#818CF8"
				stroke-width="1.5"
				opacity="0.85"
			/>
			<!-- Front face -->
			<polygon
				points="60,120 140,120 140,40 60,40"
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="2"
			/>
			<!-- Back face outline -->
			<polygon
				points="30,100 110,100 110,20 30,20"
				fill="none"
				stroke="#818CF8"
				stroke-width="1.5"
				opacity="0.5"
			/>
			<!-- Connecting edges -->
			<line x1="60" y1="120" x2="30" y2="100" stroke="#818CF8" stroke-width="1" opacity="0.4" />
			<line x1="140" y1="120" x2="110" y2="100" stroke="#818CF8" stroke-width="1" opacity="0.4" />
			<line x1="140" y1="40" x2="110" y2="20" stroke="#818CF8" stroke-width="1" opacity="0.4" />
			<line x1="60" y1="40" x2="30" y2="20" stroke="#818CF8" stroke-width="1" opacity="0.4" />

			<!-- Side dimension label -->
			<line
				x1="60"
				y1="135"
				x2="140"
				y2="135"
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x="100"
				y="150"
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle"
			>
				s = {formatNumber(side)}
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
				label={tKey('shapes.cube.side')}
				bind:value={side}
				min={0}
				max={50}
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
		<CalculationHistory shapeId="cube" />
	</div>
</div>

<ShapeFacts shapeId="cube" />
<ShapeProperties shapeId="cube" />
