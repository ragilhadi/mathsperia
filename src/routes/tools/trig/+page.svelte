<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import SafeDisplay from '$lib/components/SafeDisplay.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { mathSolverData } from '$lib/utils/seo';
	import CalculationHistory from '$lib/components/CalculationHistory.svelte';
	import CopyLinkButton from '$lib/components/CopyLinkButton.svelte';
	import { addToHistory } from '$lib/utils/history';
	import { solveRightTriangle, COMMON_ANGLES, getUnitCirclePoint } from '$lib/utils/trigonometry';
	import type { TrigResult } from '$lib/utils/trigonometry';
	import { formatNumber } from '$lib/utils/format';
	import { tKey } from '$lib/stores/lang.svelte';

	const pageData = mathSolverData({
		shape: 'Trigonometry',
		urlPath: '/tools/trig',
		category: '2D',
		resultType: 'trigonometric ratios and sides',
		keywords:
			'trigonometry calculator, right triangle solver, sin cos tan calculator, unit circle, trig ratios'
	});

	type SideType = 'opposite' | 'adjacent' | 'hypotenuse';

	let angle = $state(30);
	let sideType = $state<SideType>('opposite');
	let sideValue = $state(5);
	let result = $state<TrigResult | null>(solveRightTriangle(30, { type: 'opposite', value: 5 }));

	let evaluatedFormula = $derived.by(() => {
		if (!result) return '';
		const a = formatNumber(angle);
		const sideLabel = sideType === 'opposite' ? 'opp' : sideType === 'adjacent' ? 'adj' : 'hyp';
		const sideVal = formatNumber(sideValue);
		return `\\theta = ${a}°, \\; ${sideLabel} = ${sideVal} \\;\\Rightarrow\\; \\text{sides found}`;
	});

	let templateFormula = $derived(
		'\\sin(\\theta) = \\frac{\\text{opp}}{\\text{hyp}}, \\quad \\cos(\\theta) = \\frac{\\text{adj}}{\\text{hyp}}, \\quad \\tan(\\theta) = \\frac{\\text{opp}}{\\text{adj}}'
	);

	function handleCalculate() {
		const clampedAngle = Math.max(0, Math.min(89, angle));
		const clampedValue = Math.max(0.01, sideValue);
		result = solveRightTriangle(clampedAngle, { type: sideType, value: clampedValue });
		if (result) {
			addToHistory('trig', {
				inputs: `θ=${clampedAngle}°, ${sideType}=${formatNumber(clampedValue)}`,
				results: `sin=${formatNumber(result.sine)}, cos=${formatNumber(result.cosine)}, tan=${formatNumber(result.tangent)}`,
				unit: '',
				timestamp: Date.now()
			});
		}
	}

	function handleReset() {
		angle = 30;
		sideType = 'opposite';
		sideValue = 5;
		result = solveRightTriangle(30, { type: 'opposite', value: 5 });
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('angle', String(angle));
		params.set('sideType', sideType);
		params.set('sideValue', String(sideValue));
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
		const pAngle = sp.get('angle');
		const pSideType = sp.get('sideType');
		const pSideValue = sp.get('sideValue');
		if (pAngle !== null) {
			const v = parseFloat(pAngle);
			if (!isNaN(v)) angle = Math.max(0, Math.min(89, Math.round(v)));
		}
		if (pSideType !== null && ['opposite', 'adjacent', 'hypotenuse'].includes(pSideType)) {
			sideType = pSideType as SideType;
		}
		if (pSideValue !== null) {
			const v = parseFloat(pSideValue);
			if (!isNaN(v)) sideValue = v;
		}
		handleCalculate();
	});

	$effect(() => {
		handleCalculate();
		updateUrl();
	});

	function formatTrigValue(val: number): string {
		if (val === Infinity) return '∞';
		if (val === -Infinity) return '-∞';
		if (Number.isNaN(val)) return '—';
		return formatNumber(val, 4);
	}

	function formatTanAngle(entry: (typeof COMMON_ANGLES)[number]): string {
		if (entry.tan === Infinity) return '∞';
		if (entry.tan === -Infinity) return '-∞';
		if (Math.abs(entry.tan) < 0.0001) return '0';
		if (Math.abs(entry.tan - 1) < 0.0001) return '1';
		if (Math.abs(entry.tan + 1) < 0.0001) return '-1';
		if (Math.abs(entry.tan - Math.sqrt(3)) < 0.0001) return '√3';
		if (Math.abs(entry.tan + Math.sqrt(3)) < 0.0001) return '-√3';
		if (Math.abs(entry.tan - Math.sqrt(3) / 3) < 0.0001) return '√3/3';
		if (Math.abs(entry.tan + Math.sqrt(3) / 3) < 0.0001) return '-√3/3';
		return formatNumber(entry.tan, 4);
	}

	function formatSinCosValue(val: number): string {
		if (Math.abs(val) < 0.0001) return '0';
		if (Math.abs(val - 1) < 0.0001) return '1';
		if (Math.abs(val + 1) < 0.0001) return '-1';
		if (Math.abs(val - 0.5) < 0.0001) return '1/2';
		if (Math.abs(val + 0.5) < 0.0001) return '-1/2';
		if (Math.abs(val - Math.sqrt(2) / 2) < 0.0001) return '√2/2';
		if (Math.abs(val + Math.sqrt(2) / 2) < 0.0001) return '-√2/2';
		if (Math.abs(val - Math.sqrt(3) / 2) < 0.0001) return '√3/2';
		if (Math.abs(val + Math.sqrt(3) / 2) < 0.0001) return '-√3/2';
		return formatNumber(val, 4);
	}

	let triangleSvgData = $derived.by(() => {
		if (!result || !result.sides) {
			return {
				opposite: 3,
				adjacent: 5.196,
				hypotenuse: 6,
				angleDeg: 30
			};
		}
		return {
			opposite: result.sides.opposite,
			adjacent: result.sides.adjacent,
			hypotenuse: result.sides.hypotenuse,
			angleDeg: result.angles?.A ?? angle
		};
	});

	let svgPoints = $derived.by(() => {
		const opp = triangleSvgData.opposite;
		const adj = triangleSvgData.adjacent;
		const maxDim = Math.max(opp, adj, 0.01);
		const scale = 160 / maxDim;
		const scaledOpp = opp * scale;
		const scaledAdj = adj * scale;
		const bl = { x: 20, y: 180 };
		const br = { x: 20 + scaledAdj, y: 180 };
		const tl = { x: 20, y: 180 - scaledOpp };
		return {
			bl,
			br,
			tl,
			scaledOpp,
			scaledAdj,
			angleDeg: triangleSvgData.angleDeg
		};
	});

	let svgLabels = $derived.by(() => {
		const p = svgPoints;
		return {
			oppMidX: p.bl.x - 8,
			oppMidY: (p.bl.y + p.tl.y) / 2,
			adjMidX: (p.bl.x + p.br.x) / 2,
			adjMidY: p.bl.y + 14,
			hypMidX: (p.tl.x + p.br.x) / 2,
			hypMidY: (p.tl.y + p.br.y) / 2,
			angleBX: p.br.x + 6,
			angleBY: p.br.y - 6
		};
	});
</script>

<SeoHead
	title="Trigonometry Calculator — Right Triangle & Unit Circle"
	description="Interactive trigonometry calculator. Solve right triangles, compute trig ratios, and explore the unit circle with common angles reference table. Free — no signup."
	canonicalPath="/tools/trig"
	keywords="trigonometry calculator, right triangle solver, sin cos tan calculator, unit circle, trig ratios, common angles"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('nav.tools'), href: '/tools' },
		{ label: tKey('pages.trig.title') }
	]}
/>

<BackButton href="/tools" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('pages.trig.subtitle')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('pages.trig.title')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('pages.trig.desc')}</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left: Triangle Visualization -->
	<div class="glow-panel flex aspect-square items-center justify-center p-8">
		<svg viewBox="0 0 200 200" class="shape-glow h-full w-full max-w-xs">
			<!-- Triangle fill -->
			<polygon
				points="{svgPoints.bl.x},{svgPoints.bl.y} {svgPoints.br.x},{svgPoints.br.y} {svgPoints.tl
					.x},{svgPoints.tl.y}"
				fill="rgba(99,102,241,0.08)"
				stroke="#818CF8"
				stroke-width="1.5"
				stroke-linejoin="round"
			/>

			<!-- Right angle marker (bottom-left) -->
			<rect
				x={svgPoints.bl.x}
				y={svgPoints.bl.y - 12}
				width="12"
				height="12"
				fill="none"
				stroke="#818CF8"
				stroke-width="0.8"
			/>

			<!-- Angle arc (bottom-right corner for theta) -->
			{#if svgPoints.angleDeg > 0 && svgPoints.angleDeg < 90}
				{@const arcRadius = 20}
				{@const angleRad = (svgPoints.angleDeg * Math.PI) / 180}
				{@const arcEndX = svgPoints.br.x - arcRadius * Math.cos(angleRad)}
				{@const arcEndY = svgPoints.br.y - arcRadius * Math.sin(angleRad)}
				<path
					d="M {svgPoints.br.x - arcRadius},{svgPoints.br
						.y} A {arcRadius},{arcRadius} 0 0,0 {arcEndX},{arcEndY}"
					fill="none"
					stroke="#818CF8"
					stroke-width="1"
				/>
				<!-- θ label -->
				{@const labelR = arcRadius + 10}
				{@const labelX = svgPoints.br.x - labelR * Math.cos(angleRad / 2)}
				{@const labelY = svgPoints.br.y - labelR * Math.sin(angleRad / 2)}
				<text
					x={labelX}
					y={labelY + 3}
					font-family="JetBrains Mono"
					font-size="10"
					fill="#818CF8"
					text-anchor="middle"
				>
					θ
				</text>
			{/if}

			<!-- 90° label -->
			<text
				x={svgPoints.bl.x + 14}
				y={svgPoints.bl.y - 14}
				font-family="JetBrains Mono"
				font-size="8"
				fill="rgba(129,140,248,0.6)"
				text-anchor="start"
			>
				90°
			</text>

			<!-- Side labels -->
			<!-- Opposite (left vertical side) -->
			<text
				x={svgLabels.oppMidX}
				y={svgLabels.oppMidY}
				font-family="JetBrains Mono"
				font-size="9"
				fill="#475569"
				text-anchor="end"
				dominant-baseline="middle"
			>
				opp
			</text>
			{#if result?.sides}
				<text
					x={svgLabels.oppMidX}
					y={svgLabels.oppMidY + 11}
					font-family="JetBrains Mono"
					font-size="8"
					fill="#818CF8"
					text-anchor="end"
					dominant-baseline="middle"
				>
					{formatNumber(result.sides.opposite)}
				</text>
			{/if}

			<!-- Adjacent (bottom horizontal side) -->
			<text
				x={svgLabels.adjMidX}
				y={svgLabels.adjMidY}
				font-family="JetBrains Mono"
				font-size="9"
				fill="#475569"
				text-anchor="middle"
			>
				adj
			</text>
			{#if result?.sides}
				<text
					x={svgLabels.adjMidX}
					y={svgLabels.adjMidY + 11}
					font-family="JetBrains Mono"
					font-size="8"
					fill="#818CF8"
					text-anchor="middle"
				>
					{formatNumber(result.sides.adjacent)}
				</text>
			{/if}

			<!-- Hypotenuse (diagonal) -->
			<text
				x={svgLabels.hypMidX + 8}
				y={svgLabels.hypMidY - 4}
				font-family="JetBrains Mono"
				font-size="9"
				fill="#475569"
				text-anchor="start"
			>
				hyp
			</text>
			{#if result?.sides}
				<text
					x={svgLabels.hypMidX + 8}
					y={svgLabels.hypMidY + 7}
					font-family="JetBrains Mono"
					font-size="8"
					fill="#818CF8"
					text-anchor="start"
				>
					{formatNumber(result.sides.hypotenuse)}
				</text>
			{/if}

			<!-- Angle values at corners -->
			<text
				x={svgLabels.angleBX}
				y={svgLabels.angleBY}
				font-family="JetBrains Mono"
				font-size="9"
				fill="#818CF8"
				text-anchor="start"
			>
				{svgPoints.angleDeg}°
			</text>

			{#if result?.angles}
				{@const compAngleY = svgPoints.tl.y - 8}
				<text
					x={svgPoints.tl.x}
					y={compAngleY}
					font-family="JetBrains Mono"
					font-size="9"
					fill="rgba(129,140,248,0.6)"
					text-anchor="start"
				>
					{result.angles.B}°
				</text>
			{/if}
		</svg>
	</div>

	<!-- Right: Inputs + Formula + Results -->
	<div class="surface-panel flex flex-col gap-6 p-6">
		<!-- Inputs -->
		<div class="flex flex-col gap-4">
			<p class="micro-label">{tKey('pages.trig.angle')}</p>
			<div class="flex flex-col gap-3">
				<label class="flex flex-col gap-1.5">
					<span class="font-mono text-xs text-text-muted">Angle (degrees)</span>
					<input
						type="number"
						bind:value={angle}
						min="0"
						max="89"
						step="1"
						onkeydown={handleKeyDown}
						class="border-border-default focus:border-border-strong w-full rounded-lg border bg-bg-inset px-3 py-2 font-mono text-sm text-text-primary transition-colors duration-150 placeholder:text-text-muted focus:ring-2 focus:ring-indigo/20 focus:outline-none"
					/>
				</label>
				<label class="flex flex-col gap-1.5">
					<span class="font-mono text-xs text-text-muted">Side type</span>
					<select
						bind:value={sideType}
						onkeydown={handleKeyDown}
						class="border-border-default focus:border-border-strong w-full rounded-lg border bg-bg-inset px-3 py-2 font-mono text-sm text-text-primary transition-colors duration-150 focus:ring-2 focus:ring-indigo/20 focus:outline-none"
					>
						<option value="opposite">Opposite</option>
						<option value="adjacent">Adjacent</option>
						<option value="hypotenuse">Hypotenuse</option>
					</select>
				</label>
				<label class="flex flex-col gap-1.5">
					<span class="font-mono text-xs text-text-muted">Side length</span>
					<input
						type="number"
						bind:value={sideValue}
						min="0.01"
						step="0.1"
						onkeydown={handleKeyDown}
						class="border-border-default focus:border-border-strong w-full rounded-lg border bg-bg-inset px-3 py-2 font-mono text-sm text-text-primary transition-colors duration-150 placeholder:text-text-muted focus:ring-2 focus:ring-indigo/20 focus:outline-none"
					/>
				</label>
			</div>
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
			<FormulaDisplay template={templateFormula} evaluated={evaluatedFormula} />
		</div>

		<hr class="border-border-divider" />

		<!-- Results -->
		{#if result}
			<div>
				<p class="micro-label mb-3">{tKey('common.dimensions')}</p>
				<div class="flex flex-wrap gap-3" aria-live="polite" role="status">
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">Opposite</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							<SafeDisplay value={result.sides?.opposite ?? 0} />
						</span>
					</div>
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">Adjacent</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							<SafeDisplay value={result.sides?.adjacent ?? 0} />
						</span>
					</div>
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">Hypotenuse</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							<SafeDisplay value={result.sides?.hypotenuse ?? 0} />
						</span>
					</div>
				</div>

				<p class="micro-label mt-4 mb-3">{tKey('pages.trig.angle')}s</p>
				<div class="flex flex-wrap gap-3" aria-live="polite" role="status">
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">Angle A (θ)</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							{result.angles?.A ?? 0}°
						</span>
					</div>
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">Angle B</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							{result.angles?.B ?? 0}°
						</span>
					</div>
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">Angle C</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright"> 90° </span>
					</div>
				</div>

				<p class="micro-label mt-4 mb-3">Trig Ratios</p>
				<div class="flex flex-wrap gap-3" aria-live="polite" role="status">
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">sin(θ)</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							{formatTrigValue(result.sine)}
						</span>
					</div>
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">cos(θ)</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							{formatTrigValue(result.cosine)}
						</span>
					</div>
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">tan(θ)</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							{formatTrigValue(result.tangent)}
						</span>
					</div>
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">csc(θ)</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							{formatTrigValue(result.cosecant)}
						</span>
					</div>
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">sec(θ)</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							{formatTrigValue(result.secant)}
						</span>
					</div>
					<div class="result-chip animate-fade-slide-up">
						<span class="micro-label text-text-muted">cot(θ)</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright">
							{formatTrigValue(result.cotangent)}
						</span>
					</div>
				</div>

				<div class="mt-3 flex items-center gap-2">
					<CopyLinkButton />
				</div>
			</div>
		{/if}

		<CalculationHistory shapeId="trig" />
	</div>
</div>

<!-- Section 2: Common Angles Table -->
<div class="mt-10">
	<p class="micro-label mb-2">{tKey('pages.trig.subtitle')}</p>
	<h2 class="font-display text-2xl font-bold tracking-tight text-text-primary">
		{tKey('pages.trig.commonAngles')} & {tKey('pages.trig.unitCircle')}
	</h2>
	<p class="mt-1 text-text-secondary">{tKey('pages.trig.desc')}</p>
</div>

<div class="surface-panel mt-4 overflow-x-auto p-4">
	<table class="w-full border-collapse text-sm">
		<thead>
			<tr class="border-border-divider border-b">
				<th class="px-3 py-2 text-left font-mono text-xs font-medium text-text-muted"
					>{tKey('pages.trig.angle')}</th
				>
				<th class="px-3 py-2 text-left font-mono text-xs font-medium text-text-muted">Radians</th>
				<th class="px-3 py-2 text-right font-mono text-xs font-medium text-text-muted"
					>{tKey('pages.trig.sin')}</th
				>
				<th class="px-3 py-2 text-right font-mono text-xs font-medium text-text-muted"
					>{tKey('pages.trig.cos')}</th
				>
				<th class="px-3 py-2 text-right font-mono text-xs font-medium text-text-muted"
					>{tKey('pages.trig.tan')}</th
				>
			</tr>
		</thead>
		<tbody>
			{#each COMMON_ANGLES as entry}
				<tr class="border-border-divider/50 border-b transition-colors hover:bg-bg-inset/50">
					<td class="px-3 py-2 font-mono text-text-primary">{entry.degrees}°</td>
					<td class="px-3 py-2 font-mono text-text-secondary">{entry.radians}</td>
					<td class="px-3 py-2 text-right font-mono text-text-primary"
						>{formatSinCosValue(entry.sin)}</td
					>
					<td class="px-3 py-2 text-right font-mono text-text-primary"
						>{formatSinCosValue(entry.cos)}</td
					>
					<td class="px-3 py-2 text-right font-mono text-text-primary">{formatTanAngle(entry)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
