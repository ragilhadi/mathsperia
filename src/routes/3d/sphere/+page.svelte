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
	import { getLastUnit, setLastUnit, areaUnitLabel, volumeUnitLabel, type Unit } from '$lib/utils/units';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';

	const pageData = mathSolverData({
		shape: 'Sphere',
		urlPath: '/3d/sphere',
		category: '3D',
		resultType: 'volume and surface area',
		keywords: 'sphere volume calculator, sphere surface area calculator, radius, ball shape math'
	});

	let radius = $state(5);
	let unit = $state<Unit>(getLastUnit());
	let result = $state<ReturnType<typeof calculateSphere>>(calculateSphere(5));

	let svgRadius = $derived(clamp(radius * 8, 20, 80));

	let evaluatedVolume = $derived(
		`V = \\frac{4}{3}\\pi \\times \\text{${formatNumber(radius)}}^3 \\approx \\text{${formatNumber(result.volume)}} \\text{ ${unit}}^3`
	);
	let evaluatedArea = $derived(
		`A = 4\\pi \\times \\text{${formatNumber(radius)}}^2 \\approx \\text{${formatNumber(result.area)}} \\text{ ${unit}}^2`
	);

	function handleCalculate() {
		result = calculateSphere(radius);
	}

	function handleReset() {
		radius = 5;
		result = calculateSphere(radius);
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
	title="Sphere Calculator — Volume & Surface Area"
	description="Interactive sphere calculator. Calculate volume and surface area with step-by-step formulas, real-time diagrams, and instant results. Free — no signup."
	canonicalPath="/3d/sphere"
	keywords="sphere volume calculator, sphere surface area calculator, radius, ball shape math"
	structuredData={pageData}
/>

<Breadcrumb items={[
	{ label: 'Home', href: '/' },
	{ label: '3D Geometry', href: '/3d' },
	{ label: 'Sphere' }
]} />

<BackButton href="/3d" />

<div class="mb-8">
	<p class="micro-label mb-2">3D Geometry</p>
	<h1 class="font-display font-bold text-4xl tracking-tight text-text-primary">Sphere Calculator</h1>
	<p class="text-text-secondary mt-2">Calculate volume and surface area of a sphere.</p>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
	<!-- Left: Visualization -->
	<div class="glow-panel aspect-square flex items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow w-full h-full max-w-xs">
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
	<div class="surface-panel p-6 flex flex-col gap-6">
		<!-- Inputs -->
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<p class="micro-label">Dimensions</p>
				<UnitSelector bind:unit />
			</div>
			<div class="flex flex-col gap-1.5">
				<label class="micro-label" for="radius">Radius (r)</label>
				<div class="relative">
					<input
						id="radius"
						type="number"
						min="0"
						class="w-full bg-bg-inset border border-border-default rounded-lg px-4 py-2.5
								 font-mono text-text-primary placeholder:text-text-muted
								 focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20
								 transition-colors duration-150"
						placeholder="Enter a positive number"
						bind:value={radius}
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

<ShapeFacts shapeId="sphere" />
<ShapeProperties shapeId="sphere" />
