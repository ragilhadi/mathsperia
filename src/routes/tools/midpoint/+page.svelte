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
	import { calculateMidpoint, midpointSteps } from '$lib/utils/coordinateGeometry';
	import { formatNumber } from '$lib/utils/format';
	import { tKey } from '$lib/stores/lang.svelte';

	const pageData = mathSolverData({
		shape: 'Midpoint',
		urlPath: '/tools/midpoint',
		category: '2D',
		resultType: 'midpoint',
		keywords: 'midpoint calculator, midpoint of two points, coordinate geometry, midpoint formula'
	});

	let x1 = $state(0);
	let y1 = $state(0);
	let x2 = $state(6);
	let y2 = $state(8);
	let result = $derived(calculateMidpoint(x1, y1, x2, y2));
	let steps = $derived(midpointSteps(x1, y1, x2, y2, result.x.value, result.y.value));

	function svgX(coord: number): number {
		return ((coord + 10) / 20) * 180 + 10;
	}

	function svgY(coord: number): number {
		return 190 - ((coord + 10) / 20) * 180;
	}

	let evaluatedFormula = $derived(
		`M = \\left(\\frac{${formatNumber(x1)} + ${formatNumber(x2)}}{2}, \\frac{${formatNumber(y1)} + ${formatNumber(y2)}}{2}\\right) \\approx \\left(${formatNumber(result.x.value)}, ${formatNumber(result.y.value)}\\right)`
	);

	function handleCalculate() {
		addToHistory('midpoint', {
			inputs: `(${x1}, ${y1}), (${x2}, ${y2})`,
			results: `M=(${formatNumber(result.x.value)}, ${formatNumber(result.y.value)})`,
			unit: '',
			timestamp: Date.now()
		});
	}

	function handleReset() {
		x1 = 0;
		y1 = 0;
		x2 = 6;
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
		if (px1 !== null) {
			const v = parseFloat(px1);
			if (!isNaN(v)) x1 = v;
		}
		if (py1 !== null) {
			const v = parseFloat(py1);
			if (!isNaN(v)) y1 = v;
		}
		if (px2 !== null) {
			const v = parseFloat(px2);
			if (!isNaN(v)) x2 = v;
		}
		if (py2 !== null) {
			const v = parseFloat(py2);
			if (!isNaN(v)) y2 = v;
		}
		handleCalculate();
	});

	$effect(() => {
		handleCalculate();
		updateUrl();
	});
</script>

<SeoHead
	title="Midpoint Calculator"
	description="Interactive midpoint calculator. Calculate the midpoint between two points with step-by-step formulas, coordinate grid visualization, and instant results. Free — no signup."
	canonicalPath="/tools/midpoint"
	keywords="midpoint calculator, midpoint of two points, coordinate geometry, midpoint formula"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('nav.tools'), href: '/tools' },
		{ label: tKey('pages.midpoint.title') }
	]}
/>

<BackButton href="/tools" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('pages.midpoint.subtitle')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('pages.midpoint.title')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('pages.midpoint.desc')}</p>
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

			<!-- Dashed line connecting endpoints -->
			<line
				x1={svgX(x1)}
				y1={svgY(y1)}
				x2={svgX(x2)}
				y2={svgY(y2)}
				stroke="#818CF8"
				stroke-width="1.5"
				stroke-dasharray="4 3"
			/>

			<!-- Endpoint dots -->
			<circle cx={svgX(x1)} cy={svgY(y1)} r="4" fill="#818CF8" />
			<circle cx={svgX(x2)} cy={svgY(y2)} r="4" fill="#818CF8" />

			<!-- Endpoint labels -->
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

			<!-- Midpoint cross/bullseye -->
			<line
				x1={svgX(result.x.value) - 4}
				y1={svgY(result.y.value)}
				x2={svgX(result.x.value) + 4}
				y2={svgY(result.y.value)}
				stroke="#34D399"
				stroke-width="1.5"
			/>
			<line
				x1={svgX(result.x.value)}
				y1={svgY(result.y.value) - 4}
				x2={svgX(result.x.value)}
				y2={svgY(result.y.value) + 4}
				stroke="#34D399"
				stroke-width="1.5"
			/>

			<!-- Midpoint dot -->
			<circle cx={svgX(result.x.value)} cy={svgY(result.y.value)} r="4" fill="#34D399" />

			<!-- Midpoint label -->
			<text
				x={svgX(result.x.value)}
				y={svgY(result.y.value) + 14}
				font-family="JetBrains Mono"
				font-size="11"
				fill="#34D399"
				text-anchor="middle"
			>
				({formatNumber(result.x.value)}, {formatNumber(result.y.value)})
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
			<FormulaDisplay template={result.x.formula} evaluated={evaluatedFormula} />
			<StepByStep {steps} />
		</div>

		<hr class="border-border-divider" />

		<!-- Results -->
		<div>
			<p class="micro-label mb-3">{tKey('common.results')}</p>
			<div class="flex flex-wrap gap-3" aria-live="polite" role="status">
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">Midpoint X</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={result.x.value} />
					</span>
				</div>
				<div class="result-chip animate-fade-slide-up">
					<span class="micro-label text-text-muted">Midpoint Y</span>
					<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
						<SafeDisplay value={result.y.value} />
					</span>
				</div>
			</div>
			<div class="mt-3 flex items-center gap-2">
				<CopyLinkButton />
				<DownloadPngButton />
			</div>
		</div>

		<CalculationHistory shapeId="midpoint" />
	</div>
</div>
