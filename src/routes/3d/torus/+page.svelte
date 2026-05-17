<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import UnitSelector from '$lib/components/UnitSelector.svelte';
	import ShapeFacts from '$lib/components/ShapeFacts.svelte';
	import ShapeProperties from '$lib/components/ShapeProperties.svelte';
	import { calculateTorus } from '$lib/utils/shapes3d';
	import { formatNumber, clamp } from '$lib/utils/format';
	import { getLastUnit, setLastUnit, areaUnitLabel, volumeUnitLabel, type Unit } from '$lib/utils/units';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';

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
		`V = 2\\pi^2 \\times \\text{${formatNumber(majorRadius)}} \\times \\text{${formatNumber(minorRadius)}}^2 \\approx \\text{${formatNumber(result.volume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = 4\\pi^2 \\times \\text{${formatNumber(majorRadius)}} \\times \\text{${formatNumber(minorRadius)}} \\approx \\text{${formatNumber(result.area)}} \\text{ ${unit}}^2`
	);

	function handleCalculate() {
		result = calculateTorus(majorRadius, minorRadius);
	}

	function handleReset() {
		majorRadius = 10;
		minorRadius = 3;
		result = calculateTorus(majorRadius, minorRadius);
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
		if (u === 'mm' || u === 'cm' || u === 'm' || u === 'km' || u === 'in' || u === 'ft' || u === 'yd') {
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

<Breadcrumb items={[
	{ label: 'Home', href: '/' },
	{ label: '3D Geometry', href: '/3d' },
	{ label: 'Torus' }
]} />

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">3D Geometry</p>
	<h1 class="font-display font-bold text-4xl tracking-tight text-text-primary">Torus Calculator</h1>
	<p class="text-text-secondary mt-2">Calculate volume and surface area of a torus.</p>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
	<!-- Left: Visualization -->
	<div class="glow-panel aspect-square flex items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow w-full h-full max-w-xs">
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
	<div class="surface-panel p-6 flex flex-col gap-6">
		<!-- Inputs -->
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<p class="micro-label">Dimensions</p>
				<UnitSelector bind:unit />
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="majorRadius">Major Radius (R)</label>
				<div class="relative">
					<input
						id="majorRadius"
						type="number"
						min="0"
						class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5
								 font-mono text-text-primary placeholder:text-text-muted
								 focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20
								 transition-colors duration-150"
						placeholder="Enter a positive number"
						bind:value={majorRadius}
						onkeydown={handleKeyDown}
					/>
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="minorRadius">Minor Radius (r)</label>
				<div class="relative">
					<input
						id="minorRadius"
						type="number"
						min="0"
						class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5
								 font-mono text-text-primary placeholder:text-text-muted
								 focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20
								 transition-colors duration-150"
						placeholder="Enter a positive number"
						bind:value={minorRadius}
						onkeydown={handleKeyDown}
					/>
					<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">{unit}</span>
				</div>
			</div>
			<button
				onclick={handleReset}
				class="w-full px-4 py-2.5 bg-bg-inset border border-border-default rounded-lg
						 text-text-secondary hover:text-text-primary hover:border-border-strong
						 transition-colors duration-150 font-mono text-sm"
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

<ShapeFacts shapeId="torus" />
<ShapeProperties shapeId="torus" />
