<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { categoryPageData } from '$lib/utils/seo';
	import { formatNumber } from '$lib/utils/format';
	import 'katex/dist/katex.min.css';
	import katex from 'katex';
	import { tKey } from '$lib/stores/lang.svelte';

	function renderFormula(formula: string): string {
		try {
			return katex.renderToString(formula, { throwOnError: false, displayMode: false });
		} catch {
			return formula;
		}
	}
	import {
		calculateCircle,
		calculateSquare,
		calculateRectangle,
		calculateEquilateralTriangle,
		calculateIsoscelesTriangle,
		calculateRightTriangle,
		calculateScaleneTriangle,
		calculateTrapezoid,
		calculateParallelogram,
		calculateEllipse,
		calculateRhombus,
		calculateKite
	} from '$lib/utils/shapes';

	const pageData = categoryPageData({
		name: 'Compare 2D Shapes',
		urlPath: '/2d/compare',
		description: 'Compare area and perimeter of any two 2D geometry shapes side by side.',
		itemList: [
			{ name: 'Circle Calculator', url: '/2d/circle' },
			{ name: 'Square Calculator', url: '/2d/square' },
			{ name: 'Rectangle Calculator', url: '/2d/rectangle' },
			{ name: 'Triangle Calculators', url: '/2d/triangle' }
		]
	});

	type ShapeDef = {
		id: string;
		nameKey: string;
		labels: string[];
		defaults: number[];
		results: { area: number; perimeter: number; areaLabel: string; perimeterLabel: string };
		formulaArea: string;
		formulaPerimeter: string;
	};

	function makeShapeDef(
		id: string,
		nameKey: string,
		labels: string[],
		defaults: number[],
		calc: (
			vals: number[]
		) => { area: number; perimeter: number; formulas: { area: string; perimeter: string } }
	): ShapeDef {
		const r = calc(defaults);
		return {
			id,
			nameKey,
			labels,
			defaults,
			results: {
				area: r.area,
				perimeter: r.perimeter,
				areaLabel: `≈ ${formatNumber(r.area)}`,
				perimeterLabel: `≈ ${formatNumber(r.perimeter)}`
			},
			formulaArea: r.formulas.area,
			formulaPerimeter: r.formulas.perimeter
		};
	}

	const shapeOptionsLabelKeys: Record<string, string[]> = {
		circle: ['shapes.circle.radius'],
		square: ['shapes.square.side'],
		rectangle: ['shapes.rectangle.length', 'shapes.rectangle.width'],
		'equilateral-triangle': ['shapes.equilateral-triangle.side'],
		'isosceles-triangle': ['shapes.isosceles-triangle.base', 'shapes.isosceles-triangle.equalSide'],
		'right-triangle': ['shapes.right-triangle.base', 'shapes.right-triangle.height'],
		'scalene-triangle': [
			'shapes.scalene-triangle.sideA',
			'shapes.scalene-triangle.sideB',
			'shapes.scalene-triangle.sideC'
		],
		trapezoid: ['shapes.trapezoid.baseA', 'shapes.trapezoid.baseB', 'shapes.trapezoid.height'],
		parallelogram: [
			'shapes.parallelogram.base',
			'shapes.parallelogram.height',
			'shapes.parallelogram.side'
		],
		ellipse: ['shapes.ellipse.semiMajor', 'shapes.ellipse.semiMinor'],
		rhombus: ['shapes.rhombus.diagonal1', 'shapes.rhombus.diagonal2'],
		kite: ['shapes.kite.diagonal1', 'shapes.kite.diagonal2']
	};

	const shapeOptions: ShapeDef[] = [
		makeShapeDef('circle', 'shapes.circle.name', ['radius'], [5], ([r]) => calculateCircle(r)),
		makeShapeDef('square', 'shapes.square.name', ['side'], [6], ([s]) => calculateSquare(s)),
		makeShapeDef('rectangle', 'shapes.rectangle.name', ['length', 'width'], [8, 5], ([l, w]) =>
			calculateRectangle(l, w)
		),
		makeShapeDef('equilateral-triangle', 'shapes.equilateral-triangle.name', ['side'], [6], ([s]) =>
			calculateEquilateralTriangle(s)
		),
		makeShapeDef(
			'isosceles-triangle',
			'shapes.isosceles-triangle.name',
			['base', 'equal side'],
			[6, 5],
			([b, s]) => calculateIsoscelesTriangle(b, s)
		),
		makeShapeDef(
			'right-triangle',
			'shapes.right-triangle.name',
			['base', 'height'],
			[6, 4],
			([a, b]) => calculateRightTriangle(a, b)
		),
		makeShapeDef(
			'scalene-triangle',
			'shapes.scalene-triangle.name',
			['side a', 'side b', 'side c'],
			[5, 6, 7],
			([a, b, c]) => calculateScaleneTriangle(a, b, c)
		),
		makeShapeDef(
			'trapezoid',
			'shapes.trapezoid.name',
			['base a', 'base b', 'height'],
			[8, 5, 4],
			([a, b, h]) => calculateTrapezoid(a, b, h)
		),
		makeShapeDef(
			'parallelogram',
			'shapes.parallelogram.name',
			['base', 'height', 'side'],
			[8, 5, 6],
			([b, h, s]) => calculateParallelogram(b, h, s)
		),
		makeShapeDef('ellipse', 'shapes.ellipse.name', ['semi-major', 'semi-minor'], [7, 4], ([a, b]) =>
			calculateEllipse(a, b)
		),
		makeShapeDef(
			'rhombus',
			'shapes.rhombus.name',
			['diagonal 1', 'diagonal 2'],
			[8, 6],
			([d1, d2]) => calculateRhombus(d1, d2)
		),
		makeShapeDef('kite', 'shapes.kite.name', ['diagonal 1', 'diagonal 2'], [8, 5], ([d1, d2]) =>
			calculateKite(d1, d2)
		)
	];

	let leftId = $state('circle');
	let rightId = $state('square');

	let leftInputs = $state<number[]>([5]);
	let rightInputs = $state<number[]>([6]);

	let leftDef = $derived(getDef(leftId));
	let rightDef = $derived(getDef(rightId));
	const calculators: Record<string, (vals: number[]) => { area: number; perimeter: number }> = {
		circle: ([r]) => calculateCircle(r),
		square: ([s]) => calculateSquare(s),
		rectangle: ([l, w]) => calculateRectangle(l, w),
		'equilateral-triangle': ([s]) => calculateEquilateralTriangle(s),
		'isosceles-triangle': ([b, s]) => calculateIsoscelesTriangle(b, s),
		'right-triangle': ([a, b]) => calculateRightTriangle(a, b),
		'scalene-triangle': ([a, b, c]) => calculateScaleneTriangle(a, b, c),
		trapezoid: ([a, b, h]) => calculateTrapezoid(a, b, h),
		parallelogram: ([b, h, s]) => calculateParallelogram(b, h, s),
		ellipse: ([a, b]) => calculateEllipse(a, b),
		rhombus: ([d1, d2]) => calculateRhombus(d1, d2),
		kite: ([d1, d2]) => calculateKite(d1, d2)
	};

	function calculateShapeResults(id: string, vals: number[]): { area: number; perimeter: number } {
		const def = getDef(id);
		const filled = vals
			.slice(0, def.defaults.length)
			.map((v, i) => (Number.isFinite(v) ? v : def.defaults[i]));
		const minArgs = def.defaults.length;
		const calc = calculators[id];
		if (calc && filled.length >= minArgs) {
			return calc(filled);
		}
		return { area: def.results.area, perimeter: def.results.perimeter };
	}

	let leftRes = $derived(calculateShapeResults(leftId, leftInputs));
	let rightRes = $derived(calculateShapeResults(rightId, rightInputs));

	function getDef(id: string) {
		return shapeOptions.find((s) => s.id === id) || shapeOptions[0];
	}

	function setDefaults(side: 'left' | 'right', id: string) {
		const def = getDef(id);
		if (side === 'left') {
			leftInputs = [...def.defaults];
		} else {
			rightInputs = [...def.defaults];
		}
	}

	function handleSelect(side: 'left' | 'right', id: string) {
		if (side === 'left') {
			leftId = id;
			setDefaults('left', id);
		} else {
			rightId = id;
			setDefaults('right', id);
		}
	}
</script>

<SeoHead
	title="Compare 2D Shapes — Area & Perimeter Side by Side"
	description="Compare any two 2D geometry shapes. Pick shapes, enter dimensions, and see area and perimeter results side by side."
	canonicalPath="/2d/compare"
	structuredData={pageData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('common.geometry2d'), href: '/2d' },
		{ label: tKey('common.compare') }
	]}
/>

<BackButton href="/2d" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('common.geometry2d')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('pages.compare.title')}
	</h1>
	<p class="mt-2 text-text-secondary">
		{tKey('pages.compare.desc')}
	</p>
</div>

<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
	<!-- Left Column -->
	{#snippet leftColumn()}
		{@const leftDef = getDef(leftId)}
		<div class="surface-panel flex flex-col gap-6 p-6">
			<div class="flex items-center justify-between">
				<p class="micro-label">{tKey('pages.compare.shapeA')}</p>
				<select
					value={leftId}
					onchange={(e) => handleSelect('left', e.currentTarget.value)}
					class="border-border-default focus:border-border-strong rounded-lg border bg-bg-inset px-3 py-2 text-sm text-text-primary focus:outline-none"
				>
					{#each shapeOptions as s}
						<option value={s.id}>{tKey(s.nameKey)}</option>
					{/each}
				</select>
			</div>

			<div class="flex flex-col gap-4">
				{#each shapeOptionsLabelKeys[leftDef.id] as labelKey, i}
					<div class="flex flex-col gap-1.5">
						<label class="micro-label" for={`left-input-${i}`}>{tKey(labelKey)}</label>
						<input
							id={`left-input-${i}`}
							type="number"
							min="0"
							step="any"
							class="border-border-default focus:border-border-strong w-full rounded-lg border bg-bg-inset px-4 py-2.5 font-mono text-text-primary transition-colors duration-150 placeholder:text-text-muted focus:ring-2 focus:ring-indigo/20 focus:outline-none"
							value={leftInputs[i] ?? leftDef.defaults[i]}
							oninput={(e) => {
								const v = parseFloat(e.currentTarget.value);
								leftInputs = leftInputs.map((old, idx) =>
									idx === i ? (Number.isNaN(v) ? 0 : v) : old
								);
							}}
						/>
					</div>
				{/each}
			</div>

			<hr class="border-border-divider" />

			<div>
				<p class="micro-label mb-3">{tKey('common.formulas')}</p>
				<div class="flex flex-col gap-2 text-sm text-text-secondary">
					<div>{@html renderFormula(leftDef.formulaArea)}</div>
					<div>{@html renderFormula(leftDef.formulaPerimeter)}</div>
				</div>
			</div>

			<hr class="border-border-divider" />

			<div>
				<p class="micro-label mb-3">{tKey('common.results')}</p>
				<div class="flex flex-wrap gap-3" aria-live="polite" role="status">
					<div class="result-chip">
						<span class="micro-label text-text-muted">{tKey('common.area')}</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright"
							>{formatNumber(leftRes.area)}</span
						>
					</div>
					<div class="result-chip">
						<span class="micro-label text-text-muted">{tKey('common.perimeter')}</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright"
							>{formatNumber(leftRes.perimeter)}</span
						>
					</div>
				</div>
			</div>
		</div>
	{/snippet}

	{@render leftColumn()}

	<!-- Right Column -->
	{#snippet rightColumn()}
		{@const rightDef = getDef(rightId)}
		<div class="surface-panel flex flex-col gap-6 p-6">
			<div class="flex items-center justify-between">
				<p class="micro-label">{tKey('pages.compare.shapeB')}</p>
				<select
					value={rightId}
					onchange={(e) => handleSelect('right', e.currentTarget.value)}
					class="border-border-default focus:border-border-strong rounded-lg border bg-bg-inset px-3 py-2 text-sm text-text-primary focus:outline-none"
				>
					{#each shapeOptions as s}
						<option value={s.id}>{tKey(s.nameKey)}</option>
					{/each}
				</select>
			</div>

			<div class="flex flex-col gap-4">
				{#each shapeOptionsLabelKeys[rightDef.id] as labelKey, i}
					<div class="flex flex-col gap-1.5">
						<label class="micro-label" for={`right-input-${i}`}>{tKey(labelKey)}</label>
						<input
							id={`right-input-${i}`}
							type="number"
							min="0"
							step="any"
							class="border-border-default focus:border-border-strong w-full rounded-lg border bg-bg-inset px-4 py-2.5 font-mono text-text-primary transition-colors duration-150 placeholder:text-text-muted focus:ring-2 focus:ring-indigo/20 focus:outline-none"
							value={rightInputs[i] ?? rightDef.defaults[i]}
							oninput={(e) => {
								const v = parseFloat(e.currentTarget.value);
								rightInputs = rightInputs.map((old, idx) =>
									idx === i ? (Number.isNaN(v) ? 0 : v) : old
								);
							}}
						/>
					</div>
				{/each}
			</div>

			<hr class="border-border-divider" />

			<div>
				<p class="micro-label mb-3">{tKey('common.formulas')}</p>
				<div class="flex flex-col gap-2 text-sm text-text-secondary">
					<div>{@html renderFormula(rightDef.formulaArea)}</div>
					<div>{@html renderFormula(rightDef.formulaPerimeter)}</div>
				</div>
			</div>

			<hr class="border-border-divider" />

			<div>
				<p class="micro-label mb-3">{tKey('common.results')}</p>
				<div class="flex flex-wrap gap-3" aria-live="polite" role="status">
					<div class="result-chip">
						<span class="micro-label text-text-muted">{tKey('common.area')}</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright"
							>{formatNumber(rightRes.area)}</span
						>
					</div>
					<div class="result-chip">
						<span class="micro-label text-text-muted">{tKey('common.perimeter')}</span>
						<span class="mt-0.5 font-mono text-2xl font-medium text-emerald-bright"
							>{formatNumber(rightRes.perimeter)}</span
						>
					</div>
				</div>
			</div>
		</div>
	{/snippet}

	{@render rightColumn()}
</div>
