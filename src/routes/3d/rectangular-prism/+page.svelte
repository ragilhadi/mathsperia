<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import ShapeFacts from '$lib/components/ShapeFacts.svelte';
	import ShapeProperties from '$lib/components/ShapeProperties.svelte';
	import { calculateRectangularPrism } from '$lib/utils/shapes3d';
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
		shape: 'Rectangular Prism',
		urlPath: '/3d/rectangular-prism',
		category: '3D',
		resultType: 'volume and surface area',
		keywords:
			'rectangular prism volume calculator, rectangular prism surface area, cuboid math, box volume'
	});

	let length = $state(5);
	let width = $state(4);
	let height = $state(3);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateRectangularPrism>>(
		calculateRectangularPrism(5, 4, 3)
	);
	const BASE_UNIT: Unit = 'cm';

	let displayVolume = $derived(safeNumber(convertVolumeValue(result.volume, BASE_UNIT, unit), 0));
	let displayArea = $derived(safeNumber(convertAreaValue(result.area, BASE_UNIT, unit), 0));

	let volumeSteps = $derived([
		`V = l \\times w \\times h`,
		`V = \\text{${formatNumber(length)}} \\times \\text{${formatNumber(width)}} \\times \\text{${formatNumber(height)}}`,
		`V \\approx \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	]);
	let evaluatedVolume = $derived(
		`V = \\text{${formatNumber(length)}} \\times \\text{${formatNumber(width)}} \\times \\text{${formatNumber(height)}} = \\text{${formatNumber(displayVolume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = 2(\\text{${formatNumber(length)}} \\cdot \\text{${formatNumber(width)}} + \\text{${formatNumber(length)}} \\cdot \\text{${formatNumber(height)}} + \\text{${formatNumber(width)}} \\cdot \\text{${formatNumber(height)}}) = \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	);

	let areaSteps = $derived([
		`A = 2(lw + lh + wh)`,
		`A \\approx \\text{${formatNumber(displayArea)}} \\text{ ${unit}}^2`
	]);

	function iso(x: number, y: number, z: number, s: number) {
		return {
			x: 100 + (x - y) * s * 0.866,
			y: 115 + (x + y) * s * 0.5 - z * s
		};
	}

	let maxDim = $derived(Math.max(length, width, height, 1));
	let scale = $derived(clamp(55 / maxDim, 2, 30));

	let v0 = $derived(iso(0, 0, 0, scale));
	let v1 = $derived(iso(length, 0, 0, scale));
	let v2 = $derived(iso(length, width, 0, scale));
	let v3 = $derived(iso(0, width, 0, scale));
	let v4 = $derived(iso(0, 0, height, scale));
	let v5 = $derived(iso(length, 0, height, scale));
	let v6 = $derived(iso(length, width, height, scale));
	let v7 = $derived(iso(0, width, height, scale));

	function handleCalculate() {
		result = calculateRectangularPrism(length, width, height);
		addToHistory('rectangular-prism', {
			inputs: `l=${length}, w=${width}, h=${height}`,
			results: `V=${formatNumber(result.volume)}, A=${formatNumber(result.area)}`,
			unit,
			timestamp: Date.now()
		});
	}

	function handleReset() {
		length = 5;
		width = 4;
		height = 3;
		result = calculateRectangularPrism(length, width, height);
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('l', String(length));
		params.set('w', String(width));
		params.set('h', String(height));
		if (unit !== 'cm') params.set('unit', unit);
		const newUrl = `?${params.toString()}`;
		if (newUrl !== window.location.search && newUrl !== '?') {
			history.replaceState(history.state, '', newUrl);
		}
	}

	function handleUnitChange(oldUnit: Unit, newUnit: Unit) {
		if (oldUnit !== newUnit) {
			length = convertValue(length, oldUnit, newUnit);
			width = convertValue(width, oldUnit, newUnit);
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
		const l = sp.get('l');
		if (l !== null) {
			const val = parseFloat(l);
			if (!isNaN(val) && val > 0) length = val;
		}
		const w = sp.get('w');
		if (w !== null) {
			const val = parseFloat(w);
			if (!isNaN(val) && val > 0) width = val;
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
	title="Rectangular Prism Calculator — Volume & Surface Area"
	description="Interactive rectangular prism calculator. Calculate volume and surface area with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/3d/rectangular-prism"
	keywords="rectangular prism volume calculator, rectangular prism surface area, cuboid math, box volume"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry3d'), href: '/3d' },
		{ label: tKey('shapes.rectangular-prism.name') }
	]}
/>

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry3d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('shapes.rectangular-prism.name')} {tKey('common.calculator')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('shapes.rectangular-prism.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<!-- Top face (shaded) -->
			<polygon
				points={`${v4.x},${v4.y} ${v5.x},${v5.y} ${v6.x},${v6.y} ${v7.x},${v7.y}`}
				fill="rgba(99,102,241,0.14)"
				stroke="none"
				opacity="0.85"
			/>
			<!-- Right face (shaded) -->
			<polygon
				points={`${v1.x},${v1.y} ${v2.x},${v2.y} ${v6.x},${v6.y} ${v5.x},${v5.y}`}
				fill="rgba(99,102,241,0.08)"
				stroke="none"
				opacity="0.85"
			/>
			<!-- Bottom face -->
			<line x1={v0.x} y1={v0.y} x2={v1.x} y2={v1.y} stroke="#818CF8" stroke-width="2" />
			<line x1={v1.x} y1={v1.y} x2={v2.x} y2={v2.y} stroke="#818CF8" stroke-width="2" />
			<line x1={v2.x} y1={v2.y} x2={v3.x} y2={v3.y} stroke="#818CF8" stroke-width="2" />
			<line x1={v3.x} y1={v3.y} x2={v0.x} y2={v0.y} stroke="#818CF8" stroke-width="2" />
			<!-- Top face -->
			<line x1={v4.x} y1={v4.y} x2={v5.x} y2={v5.y} stroke="#818CF8" stroke-width="2" />
			<line x1={v5.x} y1={v5.y} x2={v6.x} y2={v6.y} stroke="#818CF8" stroke-width="2" />
			<line x1={v6.x} y1={v6.y} x2={v7.x} y2={v7.y} stroke="#818CF8" stroke-width="2" />
			<line x1={v7.x} y1={v7.y} x2={v4.x} y2={v4.y} stroke="#818CF8" stroke-width="2" />
			<!-- Vertical edges -->
			<line x1={v0.x} y1={v0.y} x2={v4.x} y2={v4.y} stroke="#818CF8" stroke-width="2" />
			<line x1={v1.x} y1={v1.y} x2={v5.x} y2={v5.y} stroke="#818CF8" stroke-width="2" />
			<line x1={v2.x} y1={v2.y} x2={v6.x} y2={v6.y} stroke="#818CF8" stroke-width="2" />
			<line x1={v3.x} y1={v3.y} x2={v7.x} y2={v7.y} stroke="#818CF8" stroke-width="2" />

			<!-- Dimension label: length -->
			<line
				x1={(v0.x + v1.x) / 2}
				y1={v0.y + 10}
				x2={(v0.x + v1.x) / 2}
				y2={v0.y + 24}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x={(v0.x + v1.x) / 2}
				y={v0.y + 30}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle"
			>
				l = {formatNumber(length)}
			</text>

			<!-- Dimension label: width -->
			<line
				x1={v0.x - 14}
				y1={(v0.y + v3.y) / 2}
				x2={v0.x - 28}
				y2={(v0.y + v3.y) / 2}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x={v0.x - 34}
				y={(v0.y + v3.y) / 2 + 4}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="end"
			>
				w = {formatNumber(width)}
			</text>

			<!-- Dimension label: height -->
			<line
				x1={v4.x - 14}
				y1={(v0.y + v4.y) / 2}
				x2={v4.x - 28}
				y2={(v0.y + v4.y) / 2}
				stroke="rgba(148, 163, 184, 0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>
			<text
				x={v4.x - 34}
				y={(v0.y + v4.y) / 2 + 4}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="end"
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
				<p class="micro-label">{tKey('common.dimensions')}</p>
				<UnitSelector bind:unit onChange={handleUnitChange} />
			</div>
			<SliderInput
				label={tKey('shapes.rectangular-prism.length')}
				bind:value={length}
				min={0}
				max={50}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.rectangular-prism.width')}
				bind:value={width}
				min={0}
				max={50}
				step={1}
				{unit}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label={tKey('shapes.rectangular-prism.height')}
				bind:value={height}
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
				<div class="mt-3 flex items-center gap-2">
					<CopyLinkButton />
					<DownloadPngButton />
				</div>
			</div>
		</div>
	</div>
</div>

<CalculationHistory shapeId="rectangular-prism" />

<ShapeFacts shapeId="rectangular-prism" />
<ShapeProperties shapeId="rectangular-prism" />
