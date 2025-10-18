<script lang="ts">
	import FormulaDisplay from '$lib/components/FormulaDisplay.svelte';
	import { calculateCircle } from '$lib/utils/shapes';
	import { formatNumber, clamp } from '$lib/utils/format';

	let radius = $state(5);
	let result = $state(calculateCircle(radius));

	// Calculate responsive SVG radius (clamped between 20-80% of viewBox)
	let svgRadius = $derived(clamp(radius * 8, 20, 80));

	function handleCalculate() {
		result = calculateCircle(radius);
	}

	function handleReset() {
		radius = 5;
		result = calculateCircle(radius);
	}

	$effect(() => {
		handleCalculate();
	});
</script>

<svelte:head>
	<title>Circle Calculator - Mathsperia</title>
	<meta name="description" content="Calculate the area and circumference of a circle with an interactive visual calculator." />
</svelte:head>

<div class="min-h-screen bg-[#0e0e10] py-8 px-4">
	<div class="max-w-5xl mx-auto">
		<!-- Back Button -->
		<a
			href="/2d"
			class="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6 transition-colors"
		>
			← Back to 2D Geometry
		</a>

		<!-- Header -->
		<header class="text-center mb-8">
			<h1 class="text-4xl font-bold mb-2 text-blue-500">Circle Calculator</h1>
			<p class="text-[#9ca3af]">Calculate area and circumference of a circle</p>
		</header>

		<div class="grid md:grid-cols-2 gap-8">
			<!-- Left Column: SVG Canvas -->
			<div class="bg-[#1a1a1d] rounded-lg p-8 border border-blue-500/30">
				<div class="aspect-square flex items-center justify-center">
					<svg viewBox="0 0 200 200" class="w-full h-full">
						<!-- Grid background -->
						<defs>
							<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
								<path
									d="M 20 0 L 0 0 0 20"
									fill="none"
									stroke="#333"
									stroke-width="0.5"
								/>
							</pattern>
						</defs>
						<rect width="200" height="200" fill="url(#grid)" />

						<!-- Circle with neon glow -->
						<circle
							cx="100"
							cy="100"
							r={svgRadius}
							fill="none"
							stroke="#3b82f6"
							stroke-width="2"
							class="drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
						/>

						<!-- Radius line -->
						<line
							x1="100"
							y1="100"
							x2={100 + svgRadius}
							y2="100"
							stroke="#06b6d4"
							stroke-width="2"
							stroke-dasharray="4"
						/>

						<!-- Center point -->
						<circle cx="100" cy="100" r="3" fill="#06b6d4" />

						<!-- Radius label -->
						<text x={100 + (svgRadius / 2)} y="95" fill="#06b6d4" font-size="12" text-anchor="middle">
							r = {formatNumber(radius)}
						</text>
					</svg>
				</div>
			</div>

			<!-- Right Column: Controls and Results -->
			<div class="space-y-6">
				<!-- Input Controls -->
				<div class="bg-[#1a1a1d] rounded-lg p-6 border border-gray-700">
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Input</h2>

					<div class="space-y-4">
						<div>
							<label for="radius" class="block text-sm font-medium text-[#9ca3af] mb-2">
								Radius (r)
							</label>
							<input
								id="radius"
								type="number"
								bind:value={radius}
								min="0.1"
								step="0.1"
								oninput={(e) => { if (e.currentTarget.value && parseFloat(e.currentTarget.value) < 0) e.currentTarget.value = '0.1'; }}
								class="w-full px-4 py-2 bg-[#0e0e10] border border-gray-600 rounded-lg text-[#e5e7eb] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
							/>
						</div>
					</div>

					<button
						onclick={handleReset}
						class="mt-4 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-[#e5e7eb] rounded-lg transition-colors"
					>
						Reset
					</button>
				</div>

				<!-- Results -->
				<div class="bg-[#1a1a1d] rounded-lg p-6 border border-blue-500/30">
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Results</h2>

					<div class="space-y-3">
						<div class="flex justify-between items-center py-2 border-b border-gray-700">
							<span class="text-[#9ca3af]">Area:</span>
							<span class="text-2xl font-bold text-blue-500">
								{formatNumber(result.area)} units²
							</span>
						</div>

						<div class="flex justify-between items-center py-2">
							<span class="text-[#9ca3af]">Circumference:</span>
							<span class="text-2xl font-bold text-cyan-500">
								{formatNumber(result.perimeter)} units
							</span>
						</div>
					</div>
				</div>

				<!-- Formulas -->
				<div>
					<h2 class="text-xl font-semibold mb-4 text-[#e5e7eb]">Formulas</h2>
					<FormulaDisplay formula={result.formulas.area} label="Area" />
					<FormulaDisplay formula={result.formulas.perimeter} label="Circumference" />
				</div>
			</div>
		</div>
	</div>
</div>
