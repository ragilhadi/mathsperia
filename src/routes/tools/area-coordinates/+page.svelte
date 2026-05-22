<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import StepByStep from '$lib/components/StepByStep.svelte';
	import SafeDisplay from '$lib/components/SafeDisplay.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';
	import CalculationHistory from '$lib/components/CalculationHistory.svelte';
	import CopyLinkButton from '$lib/components/CopyLinkButton.svelte';
	import DownloadPngButton from '$lib/components/DownloadPngButton.svelte';
	import { addToHistory } from '$lib/utils/history';
	import { calculateShoelaceArea, shoelaceSteps } from '$lib/utils/coordinateGeometry';
	import { formatNumber } from '$lib/utils/format';
	import { tKey } from '$lib/stores/lang.svelte';

	const pageData = mathSolverData({
		shape: 'Area by Coordinates',
		urlPath: '/tools/area-coordinates',
		category: '2D',
		resultType: 'area',
		keywords:
			'area by coordinates calculator, shoelace formula, polygon area calculator, coordinate geometry, shoelace method'
	});

	let coordinates = $state<{ x: number; y: number }[]>([
		{ x: 0, y: 0 },
		{ x: 4, y: 0 },
		{ x: 2, y: 3 }
	]);

	let result = $derived(calculateShoelaceArea(coordinates));
	let steps = $derived(shoelaceSteps(coordinates, result.value));

	function svgX(coord: number): number {
		return ((coord + 10) / 20) * 180 + 10;
	}

	function svgY(coord: number): number {
		return 190 - ((coord + 10) / 20) * 180;
	}

	let polygonPath = $derived(
		coordinates.map((p, i) => `${i === 0 ? 'M' : 'L'}${svgX(p.x)},${svgY(p.y)}`).join(' ') + ' Z'
	);

	let evaluatedFormula = $derived(
		`A = \\frac{1}{2}|\\sum_{i=1}^{${coordinates.length}}(x_i y_{i+1} - x_{i+1} y_i) \\approx \\text{${formatNumber(result.value)}}`
	);

	function addPoint() {
		if (coordinates.length >= 10) return;
		coordinates = [...coordinates, { x: 0, y: 0 }];
	}

	function removePoint(index: number) {
		if (coordinates.length <= 3) return;
		coordinates = coordinates.filter((_, i) => i !== index);
	}

	function handleCalculate() {
		addToHistory('area-coordinates', {
			inputs: coordinates.map((p) => `(${p.x}, ${p.y})`).join(', '),
			results: `A=${formatNumber(result.value)}`,
			unit: 'units²',
			timestamp: Date.now()
		});
	}

	function handleReset() {
		coordinates = [
			{ x: 0, y: 0 },
			{ x: 4, y: 0 },
			{ x: 2, y: 3 }
		];
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		coordinates.forEach((p, i) => {
			params.set(`x${i + 1}`, String(p.x));
			params.set(`y${i + 1}`, String(p.y));
		});
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
		const parsedCoords: { x: number; y: number }[] = [];
		let i = 1;
		while (sp.has(`x${i}`) && sp.has(`y${i}`)) {
			const x = parseFloat(sp.get(`x${i}`) || '0');
			const y = parseFloat(sp.get(`y${i}`) || '0');
			if (!isNaN(x) && !isNaN(y)) {
				parsedCoords.push({ x, y });
			}
			i++;
		}
		if (parsedCoords.length >= 3) {
			coordinates = parsedCoords.slice(0, 10);
		}
	});

	$effect(() => {
		updateUrl();
	});
</script>

<SeoHead
	title="Area by Coordinates Calculator (Shoelace Formula)"
	description="Interactive polygon area calculator using the Shoelace Formula. Calculate the area of any polygon from its vertex coordinates with step-by-step formulas, grid visualization, and instant results. Free — no signup."
	canonicalPath="/tools/area-coordinates"
	keywords="area by coordinates calculator, shoelace formula, polygon area calculator, coordinate geometry, shoelace method"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('nav.tools'), href: '/tools' },
		{ label: tKey('pages.areaCoordinates.title') }
	]}
/>

<BackButton href="/tools" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('pages.areaCoordinates.subtitle')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('pages.areaCoordinates.title')}
	</h1>
	<p class="mt-2 text-text-secondary">
		{tKey('pages.areaCoordinates.desc')}
	</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			{#each [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10] as gridVal}
				<line
					x1={svgX(gridVal)}
					y1="10"
					x2={svgX(gridVal)}
					y2="190"
					stroke={gridVal === 0 ? 'rgba(148,163,184,0.4)' : 'rgba(148,163,184,0.15)'}
					stroke-width="0.5"
				/>
				<line
					x1="10"
					y1={svgY(gridVal)}
					x2="190"
					y2={svgY(gridVal)}
					stroke={gridVal === 0 ? 'rgba(148,163,184,0.4)' : 'rgba(148,163,184,0.15)'}
					stroke-width="0.5"
				/>
			{/each}

			<!-- Axis labels -->
			{#each [-10, -5, 5, 10] as label}
				<text
					x={svgX(label)}
					y="198"
					font-family="JetBrains Mono"
					font-size="11"
					fill="#475569"
					text-anchor="middle"
				>
					{label}
				</text>
				<text
					x="4"
					y={svgY(label) + 3}
					font-family="JetBrains Mono"
					font-size="11"
					fill="#475569"
					text-anchor="start"
				>
					{label}
				</text>
			{/each}

			<!-- Polygon -->
			<path
				d={polygonPath}
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="1.5"
				stroke-linejoin="round"
			/>

			<!-- Vertex circles -->
			{#each coordinates as point}
				<circle cx={svgX(point.x)} cy={svgY(point.y)} r="4" fill="#818CF8" />
			{/each}

			<!-- Vertex labels -->
			{#each coordinates as point, i}
				<text
					x={svgX(point.x)}
					y={svgY(point.y) - 8}
					font-family="JetBrains Mono"
					font-size="11"
					fill="#475569"
					text-anchor="middle"
				>
					({formatNumber(point.x)}, {formatNumber(point.y)})
				</text>
			{/each}
		</svg>
	</div>

	<!-- Right: Inputs + Formula + Results -->
	<div class="surface-panel flex flex-col gap-6 p-6">
		<!-- Inputs -->
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<p class="micro-label">{tKey('common.dimensions')}</p>
				<span class="font-mono text-xs text-text-muted">{coordinates.length}/10 points</span>
			</div>

			<div class="flex flex-col gap-2">
				{#each coordinates as point, i}
					<div class="flex items-center gap-2">
						<span class="w-6 shrink-0 text-right font-mono text-xs text-text-muted">P{i + 1}</span>
						<div class="flex items-center gap-1">
							<input
								type="number"
								bind:value={coordinates[i].x}
								oninput={(e) => {
									const v = parseFloat((e.target as HTMLInputElement).value);
									if (!isNaN(v)) coordinates[i].x = v;
								}}
								onkeydown={handleKeyDown}
								placeholder="x"
								class="border-border-default focus:border-border-strong w-full rounded-lg border bg-bg-inset px-3 py-1.5 font-mono text-sm text-text-primary transition-colors duration-150 placeholder:text-text-muted focus:ring-2 focus:ring-indigo/20 focus:outline-none"
							/>
							<span class="text-text-muted">,</span>
							<input
								type="number"
								bind:value={coordinates[i].y}
								oninput={(e) => {
									const v = parseFloat((e.target as HTMLInputElement).value);
									if (!isNaN(v)) coordinates[i].y = v;
								}}
								onkeydown={handleKeyDown}
								placeholder="y"
								class="border-border-default focus:border-border-strong w-full rounded-lg border bg-bg-inset px-3 py-1.5 font-mono text-sm text-text-primary transition-colors duration-150 placeholder:text-text-muted focus:ring-2 focus:ring-indigo/20 focus:outline-none"
							/>
						</div>
						<button
							onclick={() => removePoint(i)}
							disabled={coordinates.length <= 3}
							class="border-border-default hover:border-border-strong shrink-0 rounded-lg border bg-bg-inset px-2 py-1.5 text-xs text-text-secondary transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
						>
							{tKey('pages.areaCoordinates.removePoint')}
						</button>
					</div>
				{/each}
			</div>

			<button
				onclick={addPoint}
				disabled={coordinates.length >= 10}
				class="border-border-default hover:border-border-strong rounded-lg border bg-bg-inset px-4 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
			>
				+ {tKey('pages.areaCoordinates.addPoint')}
			</button>

			<button
				onclick={handleReset}
				class="border-border-default hover:border-border-strong w-full rounded-lg border bg-bg-inset px-4 py-2.5 font-mono text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
				>{tKey('common.reset')}</button
			>
		</div>

		<hr class="border-border-divider" />

		<!-- Formula -->
		<div>
			<p class="micro-label mb-3">{tKey('common.formulas')}</p>
			<FormulaDisplay template={result.formula} evaluated={evaluatedFormula} />
			<StepByStep {steps} />
		</div>

		<hr class="border-border-divider" />

		<!-- Results -->
		<div>
			<p class="micro-label mb-3">{tKey('common.results')}</p>
			<div class="flex flex-wrap gap-3">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">{tKey('common.area')}</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={result.value} />
					</span>
					<span class="ml-1 text-sm text-text-muted">units²</span>
				</div>
			</div>
			<div class="mt-3 flex items-center gap-2">
				<CopyLinkButton />
				<DownloadPngButton />
			</div>
		</div>

		<CalculationHistory shapeId="area-coordinates" />
	</div>
</div>