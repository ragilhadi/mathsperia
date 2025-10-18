<script lang="ts">
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import { calculateIsoscelesTriangle } from '$lib/utils/shapes';
	import { formatNumber, clamp } from '$lib/utils/format';

	let base = $state(8);
	let equalSide = $state(10);
	let result = $state(calculateIsoscelesTriangle(base, equalSide));

	let scaleFactor = $derived(Math.max(base, equalSide) / 8);
	let svgBase = $derived(clamp(base / scaleFactor * 12, 60, 140));
	let svgSide = $derived(clamp(equalSide / scaleFactor * 12, 60, 140));

	function handleCalculate() {
		if (base <= 0) base = 0.1;
		if (equalSide <= 0) equalSide = 0.1;
		// Validate triangle inequality
		if (equalSide * 2 <= base) {
			equalSide = base / 2 + 1;
		}
		result = calculateIsoscelesTriangle(base, equalSide);
	}

	function handleReset() {
		base = 8;
		equalSide = 10;
		result = calculateIsoscelesTriangle(base, equalSide);
	}

	$effect(() => {
		handleCalculate();
	});
</script>

<svelte:head>
	<title>Isosceles Triangle Calculator - Mathsperia</title>
</svelte:head>

<div class="min-h-screen bg-[#0e0e10] py-8 px-4">
	<div class="max-w-5xl mx-auto">
		<a href="/2d/triangle" class="inline-flex items-center text-cyan-500 hover:text-cyan-400 mb-6 transition-colors">← Back to Triangle Types</a>

		<header class="text-center mb-8">
			<h1 class="text-4xl font-bold mb-2 text-cyan-500">Isosceles Triangle</h1>
			<p class="text-[#9ca3af]">Two sides are equal in length</p>
		</header>

		<div class="grid md:grid-cols-2 gap-8">
			<div class="bg-[#1a1a1d] rounded-lg p-8 border border-cyan-500/30">
				<div class="aspect-square flex items-center justify-center">
					<svg viewBox="0 0 200 200" class="w-full h-full">
						<defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" stroke-width="0.5" /></pattern></defs>
						<rect width="200" height="200" fill="url(#grid)" />
						<polygon points="{100},{60} {100 + svgBase / 2},{140} {100 - svgBase / 2},{140}" fill="none" stroke="#06b6d4" stroke-width="2" class="drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
						<text x="100" y="155" fill="#06b6d4" font-size="12" text-anchor="middle">b = {formatNumber(base)}</text>
						<text x={100 - svgBase / 4} y="95" fill="#8b5cf6" font-size="12" text-anchor="middle">s = {formatNumber(equalSide)}</text>
					</svg>
				</div>
			</div>

			<div class="space-y-6">
				<div class="bg-[#1a1a1d] rounded-lg p-6 border border-gray-700">
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Input</h2>
					<div class="space-y-4">
						<div>
							<label for="base" class="block text-sm font-medium text-[#9ca3af] mb-2">Base (b)</label>
							<input id="base" type="number" bind:value={base} min="0.1" step="0.1" oninput={(e) => { if (e.currentTarget.value && parseFloat(e.currentTarget.value) < 0) e.currentTarget.value = '0.1'; }} class="w-full px-4 py-2 bg-[#0e0e10] border border-gray-600 rounded-lg text-[#e5e7eb] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" />
						</div>
						<div>
							<label for="equalSide" class="block text-sm font-medium text-[#9ca3af] mb-2">Equal Side (s)</label>
							<input id="equalSide" type="number" bind:value={equalSide} min="0.1" step="0.1" oninput={(e) => { if (e.currentTarget.value && parseFloat(e.currentTarget.value) < 0) e.currentTarget.value = '0.1'; }} class="w-full px-4 py-2 bg-[#0e0e10] border border-gray-600 rounded-lg text-[#e5e7eb] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" />
						</div>
					</div>
					<button onclick={handleReset} class="mt-4 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-[#e5e7eb] rounded-lg transition-colors">Reset</button>
				</div>

				<div class="bg-[#1a1a1d] rounded-lg p-6 border border-cyan-500/30">
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Results</h2>
					<div class="space-y-3">
						<div class="flex justify-between items-center py-2 border-b border-gray-700"><span class="text-[#9ca3af]">Area:</span><span class="text-2xl font-bold text-cyan-500">{formatNumber(result.area)} units²</span></div>
						<div class="flex justify-between items-center py-2"><span class="text-[#9ca3af]">Perimeter:</span><span class="text-2xl font-bold text-blue-500">{formatNumber(result.perimeter)} units</span></div>
					</div>
				</div>

				<div>
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Formulas</h2>
					<FormulaDisplay formula={result.formulas.area} label="Area" />
					<FormulaDisplay formula={result.formulas.perimeter} label="Perimeter" />
					<p class="text-sm text-[#9ca3af] mt-2">* Two sides and two angles are equal</p>
				</div>
			</div>
		</div>
	</div>
</div>
