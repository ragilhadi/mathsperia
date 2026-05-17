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

	const pageData = mathSolverData({
		shape: 'Rectangular Prism',
		urlPath: '/3d/rectangular-prism',
		category: '3D',
		resultType: 'volume and surface area',
		keywords: 'rectangular prism volume calculator, rectangular prism surface area, cuboid math, box volume'
	});

	let length = $state(5);
	let width = $state(4);
	let height = $state(3);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateRectangularPrism>>(calculateRectangularPrism(5, 4, 3));

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

	let evaluatedVolume = $derived(
		`V = \\text{${formatNumber(length)}} \\times \\text{${formatNumber(width)}} \\times \\text{${formatNumber(height)}} = \\text{${formatNumber(result.volume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = 2(\\text{${formatNumber(length)}}\\cdot\\text{${formatNumber(width)}} + \\text{${formatNumber(length)}}\\cdot\\text{${formatNumber(height)}} + \\text{${formatNumber(width)}}\\cdot\\text{${formatNumber(height)}}) = \\text{${formatNumber(result.area)}} \\text{ ${unit}}^2`
	);

	function handleCalculate() {
		result = calculateRectangularPrism(length, width, height);
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
		if (u === 'mm' || u === 'cm' || u === 'm' || u === 'km' || u === 'in' || u === 'ft' || u === 'yd') {
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

<Breadcrumb items={[
	{ label: 'Home', href: '/' },
	{ label: '3D Geometry', href: '/3d' },
	{ label: 'Rectangular Prism' }
]} />

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">3D Geometry</p>
	<h1 class="font-display font-bold text-4xl tracking-tight text-text-primary">Rectangular Prism Calculator</h1>
	<p class="text-text-secondary mt-2">Calculate volume and surface area of a rectangular prism.</p>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
	<!-- Left: Visualization -->
	<div class="glow-panel aspect-square flex items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow w-full h-full max-w-xs">
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
	<div class="surface-panel p-6 flex flex-col gap-6">
		<!-- Inputs -->
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<p class="micro-label">Dimensions</p>
				<UnitSelector bind:unit />
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="length">Length (l)</label>
				<div class="relative">
					<input
						id="length"
						type="number"
						min="0"
						class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150"
						placeholder="Enter a positive number"
						bind:value={length}
						onkeydown={handleKeyDown}
					/>
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="width">Width (w)</label>
				<div class="relative">
					<input
						id="width"
						type="number"
						min="0"
						class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150"
						placeholder="Enter a positive number"
						bind:value={width}
						onkeydown={handleKeyDown}
					/>
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="height">Height (h)</label>
				<div class="relative">
					<input
						id="height"
						type="number"
						min="0"
						class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150"
						placeholder="Enter a positive number"
						bind:value={height}
						onkeydown={handleKeyDown}
					/>
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<button
				onclick={handleReset}
				class="w-full px-4 py-2.5 bg-bg-inset border border-border-default rounded-lg text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors duration-150 font-mono text-sm"
			>
				Reset
			</button>
		</div>

		<hr class="border-border-divider" />

		<!-- Formula -->
		<div>
			<p class="micro-label mb-3">Formulas</p>
			<FormulaDisplay template={result.formulas.volume} evaluated={evaluatedVolume} />
			<div class="mt-3"></div>
			<FormulaDisplay template={result.formulas.area} evaluated={evaluatedArea} />
		</div>

		<hr class="border-border-divider" />

		<!-- Results -->
		<div>
			<p class="micro-label mb-3">Results</p>
			<div class="flex flex-wrap gap-3">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">Volume</span>
					<span class="font-mono text-2xl font-medium text-emerald-bright mt-0.5">
						{formatNumber(result.volume)} <span class="text-sm text-emerald/70">{volumeUnitLabel(unit)}</span>
					</span>
				</div>
				<div class="result-chip animate-fade-slide-up" style="animation-delay: 50ms">
					<span class="micro-label text-text-muted">Surface Area</span>
					<span class="font-mono text-2xl font-medium text-emerald-bright mt-0.5">
						{formatNumber(result.area)} <span class="text-sm text-emerald/70">{areaUnitLabel(unit)}</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>

<ShapeFacts shapeId="rectangular-prism" />
<ShapeProperties shapeId="rectangular-prism" />
