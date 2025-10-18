<script lang="ts">
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import { calculateSquare } from '$lib/utils/shapes';
	import { formatNumber, clamp } from '$lib/utils/format';

	let side = $state(6);
	let result = $state(calculateSquare(side));

	let svgSide = $derived(clamp(side * 10, 40, 140));

	function handleCalculate() {
		result = calculateSquare(side);
	}

	function handleReset() {
		side = 6;
		result = calculateSquare(side);
	}

	$effect(() => {
		handleCalculate();
	});
</script>

<svelte:head>
	<title>Square Calculator - Mathsperia</title>
</svelte:head>

<div class="min-h-screen bg-[#0e0e10] py-8 px-4">
	<div class="max-w-5xl mx-auto">
		<a href="/2d" class="inline-flex items-center text-violet-500 hover:text-violet-400 mb-6 transition-colors">← Back to 2D Geometry</a>

		<header class="text-center mb-8">
			<h1 class="text-4xl font-bold mb-2 text-violet-500">Square Calculator</h1>
			<p class="text-[#9ca3af]">Calculate area and perimeter of a square</p>
		</header>

		<div class="grid md:grid-cols-2 gap-8">
			<div class="bg-[#1a1a1d] rounded-lg p-8 border border-violet-500/30">
				<div class="aspect-square flex items-center justify-center">
					<svg viewBox="0 0 200 200" class="w-full h-full">
						<defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" stroke-width="0.5" /></pattern></defs>
						<rect width="200" height="200" fill="url(#grid)" />
						<rect x={100 - svgSide / 2} y={100 - svgSide / 2} width={svgSide} height={svgSide} fill="none" stroke="#8b5cf6" stroke-width="2" class="drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
						<text x="100" y={100 - svgSide / 2 - 8} fill="#8b5cf6" font-size="12" text-anchor="middle">s = {formatNumber(side)}</text>
					</svg>
				</div>
			</div>

			<div class="space-y-6">
				<div class="bg-[#1a1a1d] rounded-lg p-6 border border-gray-700">
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Input</h2>
					<div><label for="side" class="block text-sm font-medium text-[#9ca3af] mb-2">Side Length (s)</label>
					<input id="side" type="number" bind:value={side} min="0.1" step="0.1" oninput={(e) => { if (e.currentTarget.value && parseFloat(e.currentTarget.value) < 0) e.currentTarget.value = '0.1'; }} class="w-full px-4 py-2 bg-[#0e0e10] border border-gray-600 rounded-lg text-[#e5e7eb] focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500" /></div>
					<button onclick={handleReset} class="mt-4 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-[#e5e7eb] rounded-lg transition-colors">Reset</button>
				</div>

				<div class="bg-[#1a1a1d] rounded-lg p-6 border border-violet-500/30">
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Results</h2>
					<div class="space-y-3">
						<div class="flex justify-between items-center py-2 border-b border-gray-700"><span class="text-[#9ca3af]">Area:</span><span class="text-2xl font-bold text-violet-500">{formatNumber(result.area)} units²</span></div>
						<div class="flex justify-between items-center py-2"><span class="text-[#9ca3af]">Perimeter:</span><span class="text-2xl font-bold text-cyan-500">{formatNumber(result.perimeter)} units</span></div>
					</div>
				</div>

				<div>
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Formulas</h2>
					<FormulaDisplay formula={result.formulas.area} label="Area" />
					<FormulaDisplay formula={result.formulas.perimeter} label="Perimeter" />
				</div>
			</div>
		</div>
	</div>
</div>
