<script lang="ts">
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import { calculateScaleneTriangle } from '$lib/utils/shapes';
	import { formatNumber, clamp } from '$lib/utils/format';

	let sideA = $state(6);
	let sideB = $state(8);
	let sideC = $state(10);
	let result = $state(calculateScaleneTriangle(sideA, sideB, sideC));

	let maxSide = $derived(Math.max(sideA, sideB, sideC));
	let scaleFactor = $derived(maxSide / 8);
	let svgA = $derived(clamp(sideA / scaleFactor * 10, 40, 120));
	let svgB = $derived(clamp(sideB / scaleFactor * 10, 40, 120));
	
	// Semi-perimeter formula (as string to avoid SSR issues)
	const semiPerimeterFormula = 's = \\frac{a + b + c}{2}';

	function handleCalculate() {
		// Ensure positive values
		if (sideA <= 0) sideA = 0.1;
		if (sideB <= 0) sideB = 0.1;
		if (sideC <= 0) sideC = 0.1;
		
		// Validate triangle inequality: sum of any two sides must be greater than the third
		// Fix in order to prevent cascading corrections
		if (sideA + sideB <= sideC) {
			sideC = (sideA + sideB) * 0.9; // 90% to ensure valid triangle
		}
		if (sideA + sideC <= sideB) {
			sideB = (sideA + sideC) * 0.9;
		}
		if (sideB + sideC <= sideA) {
			sideA = (sideB + sideC) * 0.9;
		}
		
		result = calculateScaleneTriangle(sideA, sideB, sideC);
	}

	function handleReset() {
		sideA = 6;
		sideB = 8;
		sideC = 10;
		result = calculateScaleneTriangle(sideA, sideB, sideC);
	}

	$effect(() => {
		handleCalculate();
	});
</script>

<svelte:head>
	<title>Scalene Triangle Calculator - Mathsperia</title>
</svelte:head>

<div class="min-h-screen bg-[#0e0e10] py-8 px-4">
	<div class="max-w-5xl mx-auto">
		<a href="/2d/triangle" class="inline-flex items-center text-green-500 hover:text-green-400 mb-6 transition-colors">← Back to Triangle Types</a>

		<header class="text-center mb-8">
			<h1 class="text-4xl font-bold mb-2 text-green-500">Scalene Triangle</h1>
			<p class="text-[#9ca3af]">All three sides are different lengths</p>
		</header>

		<div class="grid md:grid-cols-2 gap-8">
			<div class="bg-[#1a1a1d] rounded-lg p-8 border border-green-500/30">
				<div class="aspect-square flex items-center justify-center">
					<svg viewBox="0 0 200 200" class="w-full h-full">
						<defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" stroke-width="0.5" /></pattern></defs>
						<rect width="200" height="200" fill="url(#grid)" />
						<polygon points="{60},{140} {100},{60} {100 + svgA},{140}" fill="none" stroke="#22c55e" stroke-width="2" class="drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
						<text x="100" y="155" fill="#22c55e" font-size="12" text-anchor="middle">a = {formatNumber(sideA)}</text>
						<text x="75" y="95" fill="#06b6d4" font-size="12" text-anchor="end">b = {formatNumber(sideB)}</text>
						<text x="115" y="95" fill="#8b5cf6" font-size="12" text-anchor="start">c = {formatNumber(sideC)}</text>
					</svg>
				</div>
			</div>

			<div class="space-y-6">
				<div class="bg-[#1a1a1d] rounded-lg p-6 border border-gray-700">
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Input</h2>
					<div class="space-y-4">
						<div>
							<label for="sideA" class="block text-sm font-medium text-[#9ca3af] mb-2">Side A</label>
							<input id="sideA" type="number" bind:value={sideA} min="0.1" step="0.1" oninput={(e) => { if (e.currentTarget.value && parseFloat(e.currentTarget.value) < 0) e.currentTarget.value = '0.1'; }} class="w-full px-4 py-2 bg-[#0e0e10] border border-gray-600 rounded-lg text-[#e5e7eb] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
						</div>
						<div>
							<label for="sideB" class="block text-sm font-medium text-[#9ca3af] mb-2">Side B</label>
							<input id="sideB" type="number" bind:value={sideB} min="0.1" step="0.1" oninput={(e) => { if (e.currentTarget.value && parseFloat(e.currentTarget.value) < 0) e.currentTarget.value = '0.1'; }} class="w-full px-4 py-2 bg-[#0e0e10] border border-gray-600 rounded-lg text-[#e5e7eb] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
						</div>
						<div>
							<label for="sideC" class="block text-sm font-medium text-[#9ca3af] mb-2">Side C</label>
							<input id="sideC" type="number" bind:value={sideC} min="0.1" step="0.1" oninput={(e) => { if (e.currentTarget.value && parseFloat(e.currentTarget.value) < 0) e.currentTarget.value = '0.1'; }} class="w-full px-4 py-2 bg-[#0e0e10] border border-gray-600 rounded-lg text-[#e5e7eb] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
						</div>
					</div>
					<button onclick={handleReset} class="mt-4 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-[#e5e7eb] rounded-lg transition-colors">Reset</button>
				</div>

				<div class="bg-[#1a1a1d] rounded-lg p-6 border border-green-500/30">
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Results</h2>
					<div class="space-y-3">
						<div class="flex justify-between items-center py-2 border-b border-gray-700"><span class="text-[#9ca3af]">Area:</span><span class="text-2xl font-bold text-green-500">{formatNumber(result.area)} units²</span></div>
						<div class="flex justify-between items-center py-2"><span class="text-[#9ca3af]">Perimeter:</span><span class="text-2xl font-bold text-cyan-500">{formatNumber(result.perimeter)} units</span></div>
					</div>
				</div>

				<div>
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Formulas</h2>
					<FormulaDisplay formula={result.formulas.area} label="Area (Heron's Formula)" />
					<FormulaDisplay formula={result.formulas.perimeter} label="Perimeter" />
					<FormulaDisplay formula={semiPerimeterFormula} label="Semi-perimeter" />
					<p class="text-sm text-[#9ca3af] mt-2">* Uses Heron's formula for exact area calculation</p>
				</div>
			</div>
		</div>
	</div>
</div>
