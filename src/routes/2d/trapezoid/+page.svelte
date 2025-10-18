<script lang="ts">
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import { calculateTrapezoid } from '$lib/utils/shapes';
	import { formatNumber, clamp } from '$lib/utils/format';

	let a = $state(8);
	let b = $state(12);
	let height = $state(6);
	let result = $state(calculateTrapezoid(a, b, height));

	let scaleFactor = $derived(Math.max(a, b, height) / 8);
	let svgA = $derived(clamp(a / scaleFactor * 8, 30, 120));
	let svgB = $derived(clamp(b / scaleFactor * 8, 30, 120));
	let svgHeight = $derived(clamp(height / scaleFactor * 8, 30, 100));

	function handleCalculate() {
		result = calculateTrapezoid(a, b, height);
	}

	function handleReset() {
		a = 8;
		b = 12;
		height = 6;
		result = calculateTrapezoid(a, b, height);
	}

	$effect(() => {
		handleCalculate();
	});
</script>

<svelte:head>
	<title>Trapezoid Calculator - Mathsperia</title>
</svelte:head>

<div class="min-h-screen bg-[#0e0e10] py-8 px-4">
	<div class="max-w-5xl mx-auto">
		<a href="/2d" class="inline-flex items-center text-cyan-500 hover:text-cyan-400 mb-6 transition-colors">← Back to 2D Geometry</a>

		<header class="text-center mb-8">
			<h1 class="text-4xl font-bold mb-2 text-cyan-500">Trapezoid Calculator</h1>
			<p class="text-[#9ca3af]">Calculate area and perimeter of a trapezoid</p>
		</header>

		<div class="grid md:grid-cols-2 gap-8">
			<div class="bg-[#1a1a1d] rounded-lg p-8 border border-cyan-500/30">
				<div class="aspect-square flex items-center justify-center">
					<svg viewBox="0 0 200 200" class="w-full h-full">
						<defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" stroke-width="0.5" /></pattern></defs>
						<rect width="200" height="200" fill="url(#grid)" />
						<polygon points="{100 - svgA / 2},{70} {100 + svgA / 2},{70} {100 + svgB / 2},{70 + svgHeight} {100 - svgB / 2},{70 + svgHeight}" fill="none" stroke="#06b6d4" stroke-width="2" class="drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
						<line x1="100" y1="70" x2="100" y2={70 + svgHeight} stroke="#8b5cf6" stroke-width="1" stroke-dasharray="4" />
						<text x="100" y="65" fill="#06b6d4" font-size="12" text-anchor="middle">a = {formatNumber(a)}</text>
						<text x="100" y={70 + svgHeight + 15} fill="#3b82f6" font-size="12" text-anchor="middle">b = {formatNumber(b)}</text>
						<text x="85" y={70 + svgHeight / 2} fill="#8b5cf6" font-size="12" text-anchor="end">h = {formatNumber(height)}</text>
					</svg>
				</div>
			</div>

			<div class="space-y-6">
				<div class="bg-[#1a1a1d] rounded-lg p-6 border border-gray-700">
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Input</h2>
					<div class="space-y-4">
						<div><label for="a" class="block text-sm font-medium text-[#9ca3af] mb-2">Top Base (a)</label>
						<input id="a" type="number" bind:value={a} min="0.1" step="0.1" oninput={(e) => { if (e.currentTarget.value && parseFloat(e.currentTarget.value) < 0) e.currentTarget.value = '0.1'; }} class="w-full px-4 py-2 bg-[#0e0e10] border border-gray-600 rounded-lg text-[#e5e7eb] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" /></div>
						<div><label for="b" class="block text-sm font-medium text-[#9ca3af] mb-2">Bottom Base (b)</label>
						<input id="b" type="number" bind:value={b} min="0.1" step="0.1" oninput={(e) => { if (e.currentTarget.value && parseFloat(e.currentTarget.value) < 0) e.currentTarget.value = '0.1'; }} class="w-full px-4 py-2 bg-[#0e0e10] border border-gray-600 rounded-lg text-[#e5e7eb] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" /></div>
						<div><label for="height" class="block text-sm font-medium text-[#9ca3af] mb-2">Height (h)</label>
						<input id="height" type="number" bind:value={height} min="0.1" step="0.1" oninput={(e) => { if (e.currentTarget.value && parseFloat(e.currentTarget.value) < 0) e.currentTarget.value = '0.1'; }} class="w-full px-4 py-2 bg-[#0e0e10] border border-gray-600 rounded-lg text-[#e5e7eb] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" /></div>
					</div>
					<button onclick={handleReset} class="mt-4 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-[#e5e7eb] rounded-lg transition-colors">Reset</button>
				</div>

				<div class="bg-[#1a1a1d] rounded-lg p-6 border border-cyan-500/30">
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Results</h2>
					<div class="space-y-3">
						<div class="flex justify-between items-center py-2 border-b border-gray-700"><span class="text-[#9ca3af]">Area:</span><span class="text-2xl font-bold text-cyan-500">{formatNumber(result.area)} units²</span></div>
						<div class="flex justify-between items-center py-2"><span class="text-[#9ca3af]">Perimeter (approx):</span><span class="text-2xl font-bold text-blue-500">{formatNumber(result.perimeter)} units</span></div>
					</div>
				</div>

				<div>
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Formulas</h2>
					<FormulaDisplay formula={result.formulas.area} label="Area" />
					<FormulaDisplay formula={result.formulas.perimeter} label="Perimeter" />
					<p class="text-sm text-[#9ca3af] mt-2">* Perimeter is estimated based on height and base difference</p>
				</div>
			</div>
		</div>
	</div>
</div>
