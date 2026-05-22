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
	import SliderInput from '$lib/components/SliderInput.svelte';
	import CalculationHistory from '$lib/components/CalculationHistory.svelte';
	import CopyLinkButton from '$lib/components/CopyLinkButton.svelte';
	import DownloadPngButton from '$lib/components/DownloadPngButton.svelte';
	import { addToHistory } from '$lib/utils/history';
	import { calculateSlope, slopeSteps } from '$lib/utils/coordinateGeometry';
	import { formatNumber } from '$lib/utils/format';
	import { tKey } from '$lib/stores/lang.svelte';

	const pageData = mathSolverData({
		shape: 'Slope',
		urlPath: '/tools/slope',
		category: '2D',
		resultType: 'slope',
		keywords:
			'slope calculator, slope of a line, line equation calculator, coordinate geometry, slope formula'
	});

	let x1 = $state(1);
	let y1 = $state(2);
	let x2 = $state(4);
	let y2 = $state(8);
	let result = $derived(calculateSlope(x1, y1, x2, y2));
	let steps = $derived(slopeSteps(x1, y1, x2, y2, result.slope.value, result.equation));

	function svgX(coord: number): number {
		return ((coord + 10) / 20) * 180 + 10;
	}

	function svgY(coord: number): number {
		return 190 - ((coord + 10) / 20) * 180;
	}

	let evaluatedFormula = $derived(
		`m = \\frac{${formatNumber(y2)} - ${formatNumber(y1)}}{${formatNumber(x2)} - ${formatNumber(x1)}} \\approx \\text{${formatNumber(result.slope.value)}}`
	);

	function handleCalculate() {
		addToHistory('slope', {
			inputs: `(${x1}, ${y1}), (${x2}, ${y2})`,
			results: `m=${formatNumber(result.slope.value)}`,
			unit: '',
			timestamp: Date.now()
		});
	}

	function handleReset() {
		x1 = 1;
		y1 = 2;
		x2 = 4;
		y2 = 8;
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('x1', String(x1));
		params.set('y1', String(y1));
		params.set('x2', String(x2));
		params.set('y2', String(y2));
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
		const px1 = sp.get('x1');
		const py1 = sp.get('y1');
		const px2 = sp.get('x2');
		const py2 = sp.get('y2');
		if (px1 !== null) { const v = parseFloat(px1); if (!isNaN(v)) x1 = v; }
		if (py1 !== null) { const v = parseFloat(py1); if (!isNaN(v)) y1 = v; }
		if (px2 !== null) { const v = parseFloat(px2); if (!isNaN(v)) x2 = v; }
		if (py2 !== null) { const v = parseFloat(py2); if (!isNaN(v)) y2 = v; }
		handleCalculate();
	});

	$effect(() => {
		handleCalculate();
		updateUrl();
	});

	let lineExtend = $derived.by(() => {
		const dx = x2 - x1;
		const dy = y2 - y1;
		if (Math.abs(dx) < 0.0001) {
			return { x1e: x1, y1e: -11, x2e: x2, y2e: 11 };
		}
		const m = dy / dx;
		const b = y1 - m * x1;
		const xMin = -10.5;
		const xMax = 10.5;
		const yAtXMin = m * xMin + b;
		const yAtXMax = m * xMax + b;
		return { x1e: xMin, y1e: yAtXMin, x2e: xMax, y2e: yAtXMax };
	});

	let rise = $derived(y2 - y1);
	let run = $derived(x2 - x1);
</script>

<SeoHead
	title="Slope and Line Equation Calculator"
	description="Interactive slope calculator. Calculate the slope between two points and find the line equation with step-by-step formulas, coordinate grid visualization, and instant results. Free — no signup."
	canonicalPath="/tools/slope"
	keywords="slope calculator, slope of a line, line equation calculator, coordinate geometry, slope formula"
	structuredData={pageData}
/>

<Breadcrumb
	items={[{ label: tKey('nav.home'), href: '/' }, { label: tKey('nav.tools'), href: '/tools' }, { label: tKey('pages.slope.title') }]}
/>

<BackButton href="/tools" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('pages.slope.subtitle')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('pages.slope.title')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('pages.slope.desc')}</p>
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

			<!-- Line extending through both points -->
			{#if Math.abs(run) >= 0.0001}
				<line
					x1={svgX(lineExtend.x1e)}
					y1={svgY(lineExtend.y1e)}
					x2={svgX(lineExtend.x2e)}
					y2={svgY(lineExtend.y2e)}
					stroke="#818CF8"
					stroke-width="1.5"
					stroke-opacity="0.6"
				/>
			{:else}
				<!-- Vertical line -->
				<line
					x1={svgX(x1)}
					y1="10"
					x2={svgX(x1)}
					y2="190"
					stroke="#818CF8"
					stroke-width="1.5"
					stroke-opacity="0.6"
				/>
			{/if}

			<!-- Slope triangle: rise (vertical dashed line from point1 to point2's y-level) -->
			<line
				x1={svgX(x1)}
				y1={svgY(y1)}
				x2={svgX(x1)}
				y2={svgY(y2)}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>

			<!-- Slope triangle: run (horizontal dashed line) -->
			<line
				x1={svgX(x1)}
				y1={svgY(y2)}
				x2={svgX(x2)}
				y2={svgY(y2)}
				stroke="rgba(148,163,184,0.4)"
				stroke-width="1"
				stroke-dasharray="4 3"
			/>

			<!-- Rise label -->
			<text
				x={svgX(x1) - 6}
				y={(svgY(y1) + svgY(y2)) / 2}
				font-family="JetBrains Mono"
				font-size="10"
				fill="#475569"
				text-anchor="end"
			>
				{formatNumber(rise)}
			</text>

			<!-- Run label -->
			<text
				x={(svgX(x1) + svgX(x2)) / 2}
				y={svgY(y2) + 12}
				font-family="JetBrains Mono"
				font-size="10"
				fill="#475569"
				text-anchor="middle"
			>
				{formatNumber(run)}
			</text>

			<!-- Point dots -->
			<circle cx={svgX(x1)} cy={svgY(y1)} r="4" fill="#818CF8" />
			<circle cx={svgX(x2)} cy={svgY(y2)} r="4" fill="#818CF8" />

			<!-- Point labels -->
			<text
				x={svgX(x1)}
				y={svgY(y1) - 8}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle"
			>
				({formatNumber(x1)}, {formatNumber(y1)})
			</text>
			<text
				x={svgX(x2)}
				y={svgY(y2) - 8}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#475569"
				text-anchor="middle"
			>
				({formatNumber(x2)}, {formatNumber(y2)})
			</text>
		</svg>
	</div>

	<!-- Right: Inputs + Formula + Results -->
	<div class="surface-panel flex flex-col gap-6 p-6">
		<!-- Inputs -->
		<div class="flex flex-col gap-4">
			<p class="micro-label">{tKey('common.dimensions')}</p>
			<SliderInput
				label="x1"
				bind:value={x1}
				min={-10}
				max={10}
				step={1}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label="y1"
				bind:value={y1}
				min={-10}
				max={10}
				step={1}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label="x2"
				bind:value={x2}
				min={-10}
				max={10}
				step={1}
				onkeydown={handleKeyDown}
			/>
			<SliderInput
				label="y2"
				bind:value={y2}
				min={-10}
				max={10}
				step={1}
				onkeydown={handleKeyDown}
			/>
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
			<FormulaDisplay template={result.slope.formula} evaluated={evaluatedFormula} />
			<StepByStep {steps} />
		</div>

		<hr class="border-border-divider" />

		<!-- Results -->
		<div>
			<p class="micro-label mb-3">{tKey('common.results')}</p>
			<div class="flex flex-wrap gap-3">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">Slope (m)</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={result.slope.value} />
					</span>
				</div>
				{#if result.equation}
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">Line Equation</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							{result.equation}
						</span>
					</div>
				{/if}
			</div>
			<div class="mt-3 flex items-center gap-2">
				<CopyLinkButton />
				<DownloadPngButton />
			</div>
		</div>

		<CalculationHistory shapeId="slope" />
	</div>
</div>